export interface IFeedbackForm{
    message?: string
    rating: number
}

export const initialFeedbackForm:IFeedbackForm = {
    message:'',
    rating: 0
}