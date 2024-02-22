import { ResultStatusType } from "antd/lib/result";

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration {
    email: string;
    password: string;
}

export interface ICheckEmail {
    email: string;
}

export interface IConfirmEmail {
    email: string;
    code:string
}


export interface IChangePassword {
    password: string;
    confirmPassword:string
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IServerErrorData {
    statusCode: ResultStatusType | 409;
    error: string;
    message: string;
}

export interface IServerErrorResponse {
    status: string | number;
    data: IServerErrorData;
}

export interface IRequestAnswer {
    data: IServerErrorData | null;
    email?: string;
    password?: string;
}

export type ServerResponse = IServerErrorResponse | object;