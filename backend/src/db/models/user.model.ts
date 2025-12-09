import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../types";
import { UserRole, UserStatus } from "../../config/enums";

const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please provide a valid phone number (E.164 format)",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status",
      },
      default: UserStatus.ACTIVE,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["super_admin", "admin"],
        message: "{VALUE} is not a valid role",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete (ret as any).password;
        delete (ret as any).__v;
        delete (ret as any).failedLoginAttempts;
        delete (ret as any).accountLockedUntil;
        return ret;
      },
    },
  }
);

// Indexes for performance
userSchema.index({ email: 1, status: 1 });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ phone: 1 });

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Method to increment failed login attempts
userSchema.methods.incrementFailedAttempts = async function (): Promise<void> {
  // Not implemented - keeping for compatibility
  await this.save();
};

// Method to reset failed login attempts
userSchema.methods.resetFailedAttempts = async function (): Promise<void> {
  // Not implemented - keeping for compatibility
  await this.save();
};

// Method to check if account is locked
userSchema.methods.isAccountLocked = function (): boolean {
  return false; // Not implemented - keeping for compatibility
};

export const User = mongoose.model<IUser>("User", userSchema);
export type { IUser } from "../../types";
