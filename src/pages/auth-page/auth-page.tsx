import React, { useEffect } from "react";
import background from '../../assets/enter_page_light.jpg'
import { Layout } from "antd";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { setLocalStorageItem } from "@utils/index";
import { setToken } from "@redux/userReducer";
import { LOCAL_STORAGE } from "@constants/localStorage";
import {  HOMEPAGE } from "@constants/router";


const AuthPage:React.FC = () => {
    const {isLoading} = useAppSelector(state => state.loader)
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        if (accessToken) {
            console.log(accessToken);
            setLocalStorageItem(LOCAL_STORAGE, accessToken);
            dispatch(setToken(accessToken));
            navigate(HOMEPAGE)
        } 
    }, [dispatch, navigate, searchParams]);
    return (<Layout style={{background:`url(${background})`, backgroundSize:'cover' ,backgroundPosition: 'center', minHeight:'100vh', height:'100%', maxWidth:'1440px'}}>
        <Loader isLoading={isLoading}></Loader>
        <Outlet></Outlet>
    </Layout>)
}

export default AuthPage