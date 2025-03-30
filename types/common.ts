export interface ApiResponse {
  message: string
  success?: boolean
}

export interface APIError {
  status: number
  message: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface Paginated<T> {
  items: T[]
  total_count: number
}
