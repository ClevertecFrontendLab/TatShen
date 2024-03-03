import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLocalStorageItem, getSessionStorage } from '@utils/index';
import { LOCAL_STORAGE } from '@constants/localStorage';

interface IUserState {
    isAuth: boolean;
    token: string;
    email: string;
    password: string;
    code: string;
}

const userStateInit: IUserState = {
    isAuth: false,
    token: getLocalStorageItem(LOCAL_STORAGE) || getSessionStorage(LOCAL_STORAGE),
    email: '',
    password: '',
    code: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: userStateInit,
    reducers: {
        setToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
        },
        setEmail: (state, { payload }: PayloadAction<string>) => {
            state.email = payload;
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload;
        },
        setCode: (state, { payload }: PayloadAction<string>) => {
            state.code = payload;
        },
        setAuth: (state, { payload }: PayloadAction<boolean>) => {
            state.isAuth = payload;
        },
    },
});

const { actions, reducer } = userSlice;

export const {setToken, setPassword, setEmail, setCode, setAuth } = actions;
export { reducer as userReducer };
