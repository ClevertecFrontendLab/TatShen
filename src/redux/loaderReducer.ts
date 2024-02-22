import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILoaderState{
    isLoading: boolean
}

const LoaderStateInit:ILoaderState = {
    isLoading: false
}

const loaderSlice = createSlice({
    name:'loader',
    initialState: LoaderStateInit,
    reducers:{
        setIsLoading:(state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        }
    }
})

const {actions, reducer} = loaderSlice;

export const {setIsLoading} = actions;
export {reducer as loaderReducer}