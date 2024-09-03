import { ApiResponse } from "./ApiResponse";

export class SuccessResponse<T> extends ApiResponse<T> {
  data: T;

  constructor(status: number, message: string, data: T) {
    super(status, message);
    this.data = data;
  }
}
