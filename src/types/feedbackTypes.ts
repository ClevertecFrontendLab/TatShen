import { ResultStatusType } from "antd/lib/result"

export interface IFeedback {
    id: string
    fullName: string|null
    imageSrc: string|null
    message: string|null
    rating: number
    createdAt: string
}

export interface IFeedbackResponse{
    statusCode: ResultStatusType;
    error: string;
    message: string;
}

export interface IFeedbackRequest {
    message: string|null
    rating: number
}