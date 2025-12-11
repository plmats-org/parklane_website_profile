import { Request, Response } from "express";
import { Vendor } from "../db/models";
import { ApiError } from "../utils/api-error";
import { AuthRequest } from "../middlewares/auth.middleware";
import { paginate } from "../utils/pagination";
import {
  sendSuccess,
  sendSuccessWithMessage,
  sendCreated,
  sendError,
} from "../utils/response";
import { IVendor, VendorFilters } from "../types";

export const createVendor = async (req: AuthRequest, res: Response) => {
  try {
    const vendorData = req.body;

    // Check if a vendor with the same company registration number already exists
    const existingVendor = await Vendor.findOne({
      "company_information.company_registration_number":
        vendorData.company_information.company_registration_number,
    }).lean();

    if (existingVendor) {
      throw new ApiError(
        400,
        "A vendor with this company registration number already exists"
      );
    }

    const vendor = await Vendor.create({
      ...vendorData,
      status: "pending",
      submitted_at: new Date(),
    });

    return sendCreated(res, { vendor: vendor.toObject() });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getAllVendors = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      email,
      status,
      business_type,
      country,
      sort = "-submitted_at",
    } = req.query;

    const filter: any = { is_deleted: { $ne: true } };

    if (search) {
      filter.$or = [
        {
          "company_information.registered_company_name": {
            $regex: search,
            $options: "i",
          },
        },
        {
          "company_information.corporate_email": {
            $regex: search,
            $options: "i",
          },
        },
        {
          "company_profile.company_overview": { $regex: search, $options: "i" },
        },
      ];
    }

    // Filter by exact email
    if (email) {
      filter["company_information.corporate_email"] = {
        $regex: `^${email}$`,
        $options: "i",
      };
    }

    if (status) {
      filter.status = Array.isArray(status) ? { $in: status } : status;
    }

    if (business_type) {
      filter["company_profile.business_type"] = Array.isArray(business_type)
        ? { $in: business_type }
        : business_type;
    }

    if (country) {
      filter["company_information.country_of_registration"] = Array.isArray(
        country
      )
        ? { $in: country }
        : country;
    }

    const result = await paginate(Vendor, filter, {
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
    });

    const vendors = result.data.map((v: any) =>
      v.toObject ? v.toObject() : v
    );

    return sendSuccess(res, {
      vendors,
      pagination: result.pagination,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getVendorById = async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findOne({
      _id: req.params.id,
      is_deleted: { $ne: true },
    }).lean();

    if (!vendor) {
      throw new ApiError(404, "Vendor not found");
    }

    return sendSuccess(res, { vendor });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateVendor = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason, note } = req.body;
    const admin = req.user!;

    const updateData: any = {
      updated_at: new Date(),
    };

    const messages: string[] = [];

    if (status) {
      updateData.status = status;
      updateData.reviewed_by = admin.id;
      updateData.reviewed_at = new Date();
      messages.push(`Status updated to ${status}`);
    }

    if (rejection_reason) {
      updateData.rejection_reason = rejection_reason;
    }

    const updateOperation: any = { $set: updateData };

    if (note) {
      updateOperation.$push = {
        admin_notes: {
          note,
          created_by: admin.id,
          created_at: new Date(),
        },
      };
      messages.push("Note added");
    }

    const vendor = await Vendor.findOneAndUpdate(
      { _id: id, is_deleted: { $ne: true } },
      updateOperation,
      { new: true, runValidators: true }
    );

    if (!vendor) {
      throw new ApiError(404, "Vendor not found");
    }

    const message =
      messages.length > 0 ? messages.join(". ") : "Vendor updated successfully";

    return sendSuccessWithMessage(res, message, { vendor: vendor.toObject() });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteVendor = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const admin = req.user!;

    // Soft delete - data retention as per requirements
    const vendor = await Vendor.findOneAndUpdate(
      { _id: id, is_deleted: { $ne: true } },
      {
        is_deleted: true,
        deleted_at: new Date(),
        deleted_by: admin.id,
      },
      { new: true }
    );

    if (!vendor) {
      throw new ApiError(404, "Vendor not found");
    }

    return sendSuccessWithMessage(res, "Vendor deleted successfully");
  } catch (error) {
    return sendError(res, error);
  }
};

export const getVendorStatistics = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await Vendor.aggregate([
      { $match: { is_deleted: { $ne: true } } },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          byStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byBusinessType: [
            {
              $group: {
                _id: "$company_profile.business_type",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          byCountry: [
            {
              $group: {
                _id: "$company_information.country_of_registration",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ],
          recentSubmissions: [
            { $sort: { submitted_at: -1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 1,
                registered_company_name:
                  "$company_information.registered_company_name",
                status: 1,
                submitted_at: 1,
              },
            },
          ],
        },
      },
    ]);

    return sendSuccess(res, {
      statistics: stats[0],
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const exportVendors = async (req: AuthRequest, res: Response) => {
  try {
    const { status, business_type, country, format = "json" } = req.query;

    const filter: any = { is_deleted: { $ne: true } };

    if (status) {
      filter.status = Array.isArray(status) ? { $in: status } : status;
    }

    if (business_type) {
      filter["company_profile.business_type"] = Array.isArray(business_type)
        ? { $in: business_type }
        : business_type;
    }

    if (country) {
      filter["company_information.country_of_registration"] = Array.isArray(
        country
      )
        ? { $in: country }
        : country;
    }

    const vendors = await Vendor.find(filter).lean();

    if (format === "json") {
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="vendors_${new Date().toISOString().split("T")[0]}.json"`
      );
      return res.send(JSON.stringify(vendors, null, 2));
    }

    // CSV export
    if (format === "csv") {
      const csv = convertToCSV(vendors);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="vendors_${new Date().toISOString().split("T")[0]}.csv"`
      );
      return res.send(csv);
    }

    throw new ApiError(
      400,
      "Invalid export format. Supported formats: json, csv"
    );
  } catch (error) {
    return sendError(res, error);
  }
};

// Helper function to convert vendors to CSV
function convertToCSV(vendors: any[]): string {
  if (vendors.length === 0) {
    return "";
  }

  const headers = [
    "Company Name",
    "Trading Name",
    "Registration Number",
    "Country",
    "Email",
    "Phone",
    "Business Type",
    "Status",
    "Submitted Date",
    "Updated Date",
  ];

  const rows = vendors.map((v) => [
    v.company_information?.registered_company_name || "",
    v.company_information?.trading_name || "",
    v.company_information?.company_registration_number || "",
    v.company_information?.country_of_registration || "",
    v.company_information?.corporate_email || "",
    v.company_information?.phone_numbers?.[0] || "",
    v.company_profile?.business_type || "",
    v.status || "",
    v.submitted_at || "",
    v.updated_at || "",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape CSV cells that contain commas or quotes
          if (
            typeof cell === "string" &&
            (cell.includes(",") || cell.includes('"'))
          ) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(",")
    ),
  ].join("\n");

  return csv;
}
