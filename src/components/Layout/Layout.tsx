
import background from '../../assets/background.jpg';
import { Layout } from "antd";
import SiderBar from "@components/SiderBar/Sider";
import Header_TS from "@components/Header/Header";
import { Outlet } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";

export const Layout_TS = () => {
    const { isLoading } = useAppSelector((state) => state.loader);
    return <Layout
    style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${background})`,
        minHeight: '100vh',
        height: 'auto',
        maxWidth: '1440px',
        display:'flex',
        flexDirection:'row'
    }}
>
    <SiderBar />
    <Layout style={{ background: 'transparent', gap: '24' }}>
        <Header_TS />
        <Loader isLoading={isLoading}></Loader>
        <Outlet />
    </Layout>
</Layout>
}