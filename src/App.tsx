import SiderBar from "@components/SiderBar/Sider";
import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header_TS from "@components/Header/Header";
import Footer_TS from "@components/Footer/Footer";
import background from './assets/background.jpg'


const App: React.FC = () => {
    return (<Layout style={{backgroundSize:'cover' ,backgroundPosition: 'center', backgroundImage: `url(${background})`, minHeight:'100vh', height:'100%', maxWidth:'1440px'}}>
            <SiderBar/>
            <Layout style={{background: 'transparent', gap:'24'}} >
                <Header_TS/>
                    <Outlet/>
                <Footer_TS />              
            </Layout>
    </Layout>)
}

export default App

