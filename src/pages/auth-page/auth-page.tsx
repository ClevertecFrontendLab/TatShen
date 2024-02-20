import React from "react";
import background from '../../assets/enter_page_light.jpg'
import { Layout } from "antd";
import { Outlet } from "react-router-dom";


const AuthPage:React.FC = () => {
    return (<Layout style={{background:`url(${background})`, backgroundSize:'cover' ,backgroundPosition: 'center', minHeight:'100vh', height:'100%', maxWidth:'1440px'}}>
            <Outlet></Outlet>
    </Layout>)
}

export default AuthPage