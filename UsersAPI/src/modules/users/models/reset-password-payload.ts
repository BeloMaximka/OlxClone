import { OperationTypes } from "../enums/operation-types.ts";

export interface ResetPasswordPayload {
  operation: OperationTypes;
  email: string;
  timestamp: Date;
}
