import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFeedback, IFeedbackRequest } from '../types/feedbackTypes';

import { RootState } from 'src/store/configure-store';

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://marathon-api.clevertec.ru`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['feedbacks'],
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query({
            query: (limit = '') => ({
                url: `/feedback?${limit && `_limit=${limit}`}`
            }),
            providesTags: (result) =>
            result
                ? [
                      ...result.map(({ id }) => ({ type: 'feedback' as const, id })),
                      { type: 'feedbacks', id: 'LIST' },
                  ]
                : [{ type: 'feedbacks', id: 'LIST' }],
        }),
        createFeedback: builder.mutation<Array<IFeedback>, IFeedbackRequest>({
            query: (body: IFeedback) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'feedbacks', id: 'LIST' }],
        }),   
})
})


export const { useCreateFeedbackMutation, useLazyGetAllFeedbacksQuery} = feedbacksApi