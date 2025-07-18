import { RequestState, RequestStatus } from '../../models';

export function noneRequest<T>(
    defaultValue: T | null = null,
): RequestState<T | null> {
    return {
        status: RequestStatus.None,
        error: null,
        value: defaultValue,
    };
}

export function loadingRequest<T>(
    value: T | null = null,
): RequestState<T | null> {
    return {
        status: RequestStatus.Loading,
        error: null,
        value,
    };
}

export function successRequest<T>(value: T): RequestState<T> {
    return {
        status: RequestStatus.Success,
        error: null,
        value,
    };
}

export function failRequest<T = null>(error: Error): RequestState<T | null> {
    return {
        status: RequestStatus.Fail,
        value: null,
        error,
    };
}
