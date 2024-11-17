export type RequestToken = Readonly<{
    expires_at: string;
    request_token: string;
    success: boolean;
}>;
