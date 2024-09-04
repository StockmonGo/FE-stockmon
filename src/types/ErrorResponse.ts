import { ApiResponse } from "./ApiResponse";

export class ErrorResponse extends ApiResponse<null> {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
