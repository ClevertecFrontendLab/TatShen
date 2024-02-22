import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../utils/index';

import { RootState } from '../store/configure-store';
import { IRequestAnswer, IRegistration } from '../types/enterTypes';
 


export const enterApi = createApi({
    reducerPath: 'enterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://marathon-api.clevertec.ru/auth`,
        credentials: 'include',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            if (endpoint === 'changePassword') {
                const cookie = getCookie('email_token');
                headers.set('set-cookie', cookie);
            }

            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        loginWithGoogle: builder.query({
            query: () => ({
                url: '/google'
            }),
        }),
        login: builder.mutation<{ accessToken: string }, IRegistration>({
            query: (body: IRegistration) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        registration: builder.mutation<IRequestAnswer, IRegistration>({
            query: (body: IRegistration) => ({
                url: '/registration',
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                return {
                    status: 'success',
                    data: {
                        statusCode: 'success',
                        error: '',
                        message: '',
                    },
                };
            },
        }),
        checkEmail: builder.mutation<{ email: string; message: string }, { email: string }>({
            query: (body) => ({
                url: '/check-email',
                method: 'POST',
                body,
            }),
        }),
        confirmEmail: builder.mutation<{ email: string }, { email: string; code: string }>({
            query: (body) => ({
                url: '/confirm-email',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<{ message: string }, { password: string; confirmPassword: string }>({
            query: (body) => ({
                url: '/change-password',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});


export const {useChangePasswordMutation, useCheckEmailMutation, useConfirmEmailMutation, useLoginWithGoogleQuery, useLoginMutation, useRegistrationMutation } = enterApi