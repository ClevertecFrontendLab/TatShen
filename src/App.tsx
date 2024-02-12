import SiderBar from "@components/SiderBar/Sider";
import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import styles from './App.module.scss'
import Header_TS from "@components/Header/Header";
import Footer_TS from "@components/Footer/Footer";


const App: React.FC = () => {
    return (<Layout className={styles.app}>
        <SiderBar/>
        <Layout className={styles.siteLayout}>
            <Header_TS/>
                <Outlet/>
            <Footer_TS />
        </Layout>
    </Layout>)
}

export default App