import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { IFeedback } from "../types/feedbackTypes";

export interface IFeedbacksState{
    feedbacks : IFeedback[]
}

const FeedbacksStateInit: IFeedbacksState = {
    feedbacks: []
}

const feedbackSlice = createSlice({
    name:'feedbacks',
    initialState: FeedbacksStateInit,
    reducers:{
        setFeedbacks:( state, {payload}:PayloadAction<IFeedback[]>) => {
            state.feedbacks = payload
        }
    }
})

const {actions, reducer} = feedbackSlice

export const {setFeedbacks} = actions
export {reducer as feedbacksReducer}