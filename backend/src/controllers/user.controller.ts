import { Request, Response, NextFunction } from "express";
import { User } from "../db/models";
import { ApiError } from "../utils/api-error";
import { AuthRequest } from "../middlewares/auth.middleware";
import { paginate } from "../utils/pagination";
import { generateSecurePassword } from "../utils/password-generator";
import {
  sendSuccess,
  sendSuccessWithMessage,
  sendCreated,
  sendError,
} from "../utils/response";
import { sendEmail } from "../utils/mail";

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      status,
      sort = "-createdAt",
    } = req.query;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (role) filter.role = role;
    if (status) filter.status = status;

    const result = await paginate(User, filter, {
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      select: "-password",
    });

    const users = result.data.map((u: any) => (u.toObject ? u.toObject() : u));

    return sendSuccess(res, {
      users,
      pagination: result.pagination,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccess(res, { user });
  } catch (error) {
    return sendError(res, error);
  }
};

export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, email, role, phone } = req.body;
    const creator = req.user!;

    if (creator.role === "admin" && role !== "agent") {
      throw new ApiError(403, "Admins can only create agents");
    }

    if (creator.role === "agent") {
      throw new ApiError(403, "Agents cannot create users");
    }

    const existingUser = await User.findOne({ email }).select("_id").lean();
    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }
    const generatedPassword = generateSecurePassword(6);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: generatedPassword,
      role,
      phone,
    });
    await sendEmail({
      to: user.email,
      subject: "Welcome to Parklane - Your Account is Ready",
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
                <h2 style="color: #1a2236; margin-bottom: 16px;">Welcome, ${user.first_name}!</h2>
                <p style="font-size: 1rem; color: #333;">Your account has been successfully created. Here are your temporary credentials:</p>
                <table style="margin: 24px 0; width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="font-weight: bold; color: #1a2236; padding: 8px 0;">Email:</td>
                    <td style="color: #333; padding: 8px 0;">${user.email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; color: #1a2236; padding: 8px 0;">Password:</td>
                    <td style="color: #333; padding: 8px 0;">${generatedPassword}</td>
                  </tr>
                </table>
                <p style="font-size: 1rem; color: #333;">Please log in and change your password as soon as possible to secure your account.</p>
                <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 0.9rem; color: #999;">Best regards,<br>The Parklane Team</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return sendCreated(res, {
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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, role, phone, status } = req.body;

    const updateData: any = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (role) updateData.role = role;
    if (phone) updateData.phone = phone;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccessWithMessage(res, "User updated successfully", { user });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deactivateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.status = "inactive";
    await user.save();

    return sendSuccessWithMessage(res, "User deactivated successfully", {
      user,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const activateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.status = "active";
    await user.save();

    return sendSuccessWithMessage(res, "User activated successfully", { user });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUser = req.user!;

    if (currentUser.role !== "super_admin") {
      throw new ApiError(
        403,
        "Only super administrators can delete users"
      );
    }

    // Prevent self-deletion
    if (currentUser.id === id) {
      throw new ApiError(
        400,
        "You cannot delete your own account"
      );
    }

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    await User.findByIdAndDelete(id);

    return sendSuccessWithMessage(res, "User deleted successfully");
  } catch (error) {
    return sendError(res, error);
  }
};
