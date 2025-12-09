import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { User, IUser } from "../db/models";
import config from "../config";
import { ApiError } from "../utils/api-error";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Types } from "mongoose";
import { TokenPayload } from "../types";
import {
  sendError,
  sendSuccess,
  sendSuccessWithMessage,
} from "../utils/response";
import { sendEmail } from "../utils/mail";

const generateTokens = (user: IUser) => {
  const payload: TokenPayload = {
    id: (user._id as Types.ObjectId).toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    payload,
    config.jwt.secret || "your-secret-key",
    {
      expiresIn: config.jwt.expiresIn || "15m",
    } as SignOptions
  );

  const refreshToken = jwt.sign(
    payload,
    config.jwt.refreshSecret || "your-refresh-secret",
    {
      expiresIn: config.jwt.refreshExpiresIn || "7d",
    } as SignOptions
  );

  return { accessToken, refreshToken };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Email or password incorrect");
    }

    if (user.isAccountLocked()) {
      throw new ApiError(
        403,
        "Account temporarily locked due to multiple failed login attempts. Please try again later."
      );
    }

    if (user.status !== "active") {
      throw new ApiError(
        403,
        "Inactive account. Please contact the administrator."
      );
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      await user.incrementFailedAttempts();
      throw new ApiError(401, "Email or password incorrect");
    }

    await user.resetFailedAttempts();

    const { accessToken, refreshToken } = generateTokens(user);

    return sendSuccessWithMessage(res, "Login successful", {
      user: {
        id: (user._id as any).toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccess(res, {
      user: {
        id: (user._id as any).toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        createdAt: user.createdAt
          ? new Date(user.createdAt).toISOString()
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { first_name, last_name, phone },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccessWithMessage(res, "Profile updated successfully", {
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
      },
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id).select("+password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      throw new ApiError(401, "Current password incorrect");
    }

    user.password = newPassword;
    await user.save();

    return sendSuccessWithMessage(res, "Password changed successfully");
  } catch (error) {
    return sendError(res, error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendSuccessWithMessage(
        res,
        "If an account with this email exists, you will receive a reset link"
      );
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { id: (user._id as Types.ObjectId).toString(), email: user.email },
      config.jwt.secret || "your-secret-key",
      { expiresIn: "1h" }
    );

    // Build reset link
    const resetLink = `${config.frontend.url}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset - Parklane",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
          <table style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; overflow: hidden;">
            <tr>
              <td style="background: #1a2236; padding: 24px 0; text-align: center;">
                <span style="font-size: 1.5rem; color: #fff; font-weight: bold; letter-spacing: 2px;">Parklane</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 24px 24px 24px;">
                <h2 style="color: #1a2236; margin-bottom: 16px;">Password Reset</h2>
                <p style="font-size: 1rem; color: #333;">Hello <b>${user.first_name}</b>,</p>
                <p style="font-size: 1rem; color: #333;">You have requested to reset your password. Click the button below to set a new password:</p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${resetLink}" style="background: #1a2236; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 4px; font-weight: bold; font-size: 1rem; display: inline-block;">Reset Password</a>
                </div>
                <p style="font-size: 0.95rem; color: #666;">If you did not make this request, simply ignore this email.</p>
                <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 0.9rem; color: #999;">Best regards,<br>The Parklane Team</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return sendSuccessWithMessage(
      res,
      "If an account with this email exists, you will receive a reset link"
    );
  } catch (error) {
    return sendError(res, error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      throw new ApiError(400, "Reset token required");
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.jwt.secret || "your-secret-key");
    } catch (error) {
      throw new ApiError(400, "Invalid or expired token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return sendSuccessWithMessage(res, "Password reset successfully");
  } catch (error) {
    return sendError(res, error);
  }
};
