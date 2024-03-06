import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IFeedbackForm{
    message?: string
    rating: number
}

export const initialFeedbackForm:IFeedbackForm = {
    message:'',
    rating: 0
}

const newFeedback = createSlice({
    name:'newFeedback',
    initialState: initialFeedbackForm,
    reducers:{
        setMessage:(state, {payload}: PayloadAction<string>) => {
            state.message = payload
        },
        setRating:(state, {payload}: PayloadAction<number>) => {
            state.rating = payload
        }
    }
})

const {actions, reducer} = newFeedback;

export const {setMessage, setRating} = actions;
export {reducer as newFeedbackReducer}