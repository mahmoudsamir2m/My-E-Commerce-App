export interface SuccessSignupResponse {
    message: string,
    user: UserResponse,
    token: string,
}

export interface FailedSignupResponse {
    message: string,
    statusMsg: string,
}

export interface UserResponse {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
}
