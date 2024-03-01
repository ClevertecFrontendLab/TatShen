import SiderBar from "@components/SiderBar/Sider";
import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header_TS from "@components/Header/Header";
import background from './assets/background.jpg'
import { Loader } from "@components/Loader/Loader";
import { useAppSelector } from "./hooks";


const App: React.FC = () => {
    const {isLoading} = useAppSelector((state) => state.loader)
    return (<Layout style={{backgroundSize:'cover' ,backgroundPosition: 'center', backgroundImage: `url(${background})`, minHeight:'100vh', height:'auto', maxWidth:'1440px'}}>
            <SiderBar/>
            <Layout style={{background: 'transparent', gap:'24'}} >
                <Header_TS/>
                <Loader isLoading= {isLoading}></Loader>
                    <Outlet/>           
            </Layout>
    </Layout>)
}

export default App

