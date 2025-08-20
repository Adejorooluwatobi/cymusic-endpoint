export class ApiResponseDto<T> {
  data: T;
  message: string;
  statusCode: number;

  constructor(data: T, message: string, statusCode: number = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class UserResponseDto {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
    
    constructor(id: string, email: string, role: string, isVerified: boolean) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.isVerified = isVerified;
    }
}

export class PaginatedResponseDto<T> {
  items: T[];
    total: number;
    page: number;
    pageSize: number;
    constructor(items: T[], total: number, page: number, pageSize: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
  }
}

export class ErrorResponseDto {
  error: string;
  message: string;
  statusCode: number;

  constructor(error: string, message: string, statusCode: number = 400) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}