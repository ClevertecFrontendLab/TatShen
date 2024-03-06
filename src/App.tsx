import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { setLocalStorageItem } from './utils';
import { AUTH, HOMEPAGE } from '@constants/router';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { setToken } from '@redux/userReducer';

const App: React.FC = () => {
   
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAppSelector((state) => state.user);
    const accessToken = searchParams.get('accessToken');

    useEffect(() => {
        token ? navigate(HOMEPAGE) : navigate(AUTH);
        if (accessToken) {
            setLocalStorageItem(LOCAL_STORAGE, accessToken);
            dispatch(setToken(accessToken));
            navigate(HOMEPAGE);
        }
    }, [accessToken, dispatch, navigate, searchParams, token]);

    return <></>;
};

export default App;
