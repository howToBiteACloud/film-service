export type RequestState<T> = {
    status: RequestStatus;
    value: T | null;
    error: Error | null;
};

export enum RequestStatus {
    None,
    Loading,
    Success,
    Fail,
}
