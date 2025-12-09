import { Document, Model, FilterQuery } from 'mongoose';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  select?: string;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Efficient pagination utility
 * - Uses lean() for better performance
 * - Counts only when necessary
 * - Limits maximum page size
 */
export async function paginate<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  options: PaginationOptions = {}
): Promise<PaginationResult<T>> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10)); // Max 100 items per page
  const skip = (page - 1) * limit;
  
  // Build query
  let query = model.find(filter).skip(skip).limit(limit);
  
  // Apply sorting
  if (options.sort) {
    query = query.sort(options.sort);
  }
  
  // Select specific fields for efficiency
  if (options.select) {
    query = query.select(options.select);
  }
  
  // Use lean() for better performance (returns plain JS objects)
  const leanQuery = query.lean();
  
  // Execute query and count in parallel
  const [data, total] = await Promise.all([
    leanQuery.exec(),
    model.countDocuments(filter)
  ]);
  
  const totalPages = Math.ceil(total / limit);
  
  return {
    data: data as T[],
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

/**
 * Cursor-based pagination for real-time data
 * More efficient for large datasets
 */
export async function cursorPaginate<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  options: {
    cursor?: string;
    limit?: number;
    sort?: string;
    select?: string;
  } = {}
): Promise<{ data: T[]; nextCursor?: string }> {
  const limit = Math.min(100, options.limit || 10);
  
  // Add cursor to filter if provided
  if (options.cursor) {
    filter._id = { $gt: options.cursor };
  }
  
  let query = model.find(filter).limit(limit + 1); // Fetch one extra to check if there's more
  
  if (options.sort) {
    query = query.sort(options.sort);
  }
  
  if (options.select) {
    query = query.select(options.select);
  }
  
  const leanQuery = query.lean();
  
  const data = await leanQuery.exec();
  
  let nextCursor: string | undefined;
  if (data.length > limit) {
    const lastItem = data.pop(); // Remove the extra item
    nextCursor = (lastItem as any)._id.toString();
  }
  
  return {
    data: data as T[],
    nextCursor
  };
}
