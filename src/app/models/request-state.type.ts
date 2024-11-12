import { RequestStatus } from './request-status.enum';

export type RequestState<T> = {
    status: RequestStatus;
    value: T | null;
    error: Error | null;
};
