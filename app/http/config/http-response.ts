import { HandlingErrorType } from "../../../internal/common/enums/errors";

export interface IHandlingResponseError {
    property: string;
    type: HandlingErrorType;
    message?: string;
}
