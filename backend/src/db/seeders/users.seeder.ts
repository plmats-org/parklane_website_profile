import { User } from "../models";
import config from "../../config";

export const seedSuperAdmin = async () => {
  try {
    const superadminEmail = config.superadmin.email || "superadmin@parklane.com";

    const existingSuperAdmin = await User.findOne({
      email: superadminEmail,
      role: "super_admin",
    });

    if (existingSuperAdmin) {
      console.log("+++ Superadmin already exists");
      return;
    }

    const superadmin = new User({
      first_name: config.superadmin.first_name,
      last_name: config.superadmin.last_name,
      email: superadminEmail,
      phone: config.superadmin.phone,
      password: config.superadmin.password,
      role: "super_admin",
      status: "active",
    });

    await superadmin.save();

    console.log("+++ Superadmin seeded successfully");
  } catch (error) {
    console.error("--- Error seeding superadmin:", error);
    throw error;
  }
};
