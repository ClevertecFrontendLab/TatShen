import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFeedback, IFeedbackRequest } from '../types/feedbackTypes';

import { RootState } from 'src/store/configure-store';
import { getLocalStorageItem, getSessionStorage } from '@utils/index';
import { LOCAL_STORAGE } from '@constants/localStorage';

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://marathon-api.clevertec.ru`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token || getSessionStorage(LOCAL_STORAGE);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } 
            return headers;
        },
    }),
    tagTypes: ['feedbacks'],
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query({
            query: () => ({
                url: '/feedback'}),
            providesTags:['feedbacks'],
        }),
        createFeedback: builder.mutation<Array<IFeedback>, IFeedbackRequest>({
            query: (body: IFeedback) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags:['feedbacks'],
        }),   
})
})


export const { useCreateFeedbackMutation, useLazyGetAllFeedbacksQuery, useGetAllFeedbacksQuery} = feedbacksApi