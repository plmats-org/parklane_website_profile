import apiClient from "../lib/api-client";

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  category: string;
  size: number;
  uploaded_at: Date;
  resource_type?: string;
}

export interface UploadResponse {
  status: "success" | "error";
  message: string;
  data?: UploadedFile | UploadedFile[];
}

/**
 * Upload a single file
 */
export const uploadFile = async (
  file: File,
  options?: { folder?: string; category?: string }
): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append("file", file);
  if (options?.folder) formData.append("folder", options.folder);
  if (options?.category) formData.append("category", options.category);

  const result = await apiClient.post<UploadResponse>(
    "/upload/single",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!result || result.status === "error" || !result.data) {
    throw new Error(result?.message || "Upload failed");
  }

  return result.data as UploadedFile;
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (
  files: File[],
  options?: { folder?: string; category?: string }
): Promise<UploadedFile[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  if (options?.folder) formData.append("folder", options.folder);
  if (options?.category) formData.append("category", options.category);

  const result = await apiClient.post<UploadResponse>(
    "/upload/multiple",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!result || result.status === "error" || !result.data) {
    throw new Error(result?.message || "Upload failed");
  }

  return result.data as UploadedFile[];
};

/**
 * Upload a vendor document
 */
export const uploadVendorDocument = async (
  file: File,
  options?: { vendor_id?: string; document_type?: string; category?: string }
): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append("file", file);
  if (options?.vendor_id) formData.append("vendor_id", options.vendor_id);
  if (options?.document_type)
    formData.append("document_type", options.document_type);
  if (options?.category) formData.append("category", options.category);

  const result = await apiClient.post<UploadResponse>(
    "/upload/vendor-document",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!result || result.status === "error" || !result.data) {
    throw new Error(result?.message || "Upload failed");
  }

  return result.data as UploadedFile;
};

/**
 * Upload multiple vendor documents
 */
export const uploadVendorDocuments = async (
  files: File[],
  options?: { vendor_id?: string; category?: string }
): Promise<UploadedFile[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  if (options?.vendor_id) formData.append("vendor_id", options.vendor_id);
  if (options?.category) formData.append("category", options.category);

  const result = await apiClient.post<UploadResponse>(
    "/upload/vendor-documents",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (!result || result.status === "error" || !result.data) {
    throw new Error(result?.message || "Upload failed");
  }

  return result.data as UploadedFile[];
};

/**
 * Delete a file
 */
export const deleteFile = async (publicId: string): Promise<void> => {
  const result = await apiClient.delete<UploadResponse>(
    `/upload/${encodeURIComponent(publicId)}`
  );

  if (result && result.status === "error") {
    throw new Error(result.message || "Delete failed");
  }
};

export const uploadService = {
  uploadFile,
  uploadFiles,
  uploadVendorDocument,
  uploadVendorDocuments,
  deleteFile,
};

export default uploadService;
