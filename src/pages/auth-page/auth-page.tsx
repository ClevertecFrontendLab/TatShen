import React from "react";
import background from '../../assets/enter_page_light.jpg'
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";


const AuthPage:React.FC = () => {
    const {isLoading} = useAppSelector(state => state.loader)
    return (<Layout style={{background:`url(${background})`, backgroundSize:'cover' ,backgroundPosition: 'center', minHeight:'100vh', height:'100%', maxWidth:'1440px'}}>
        <Loader isLoading={isLoading}></Loader>
        <Outlet></Outlet>
    </Layout>)
}

export default AuthPage