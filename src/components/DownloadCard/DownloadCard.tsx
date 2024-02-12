import React from "react";
import Card from "antd/lib/card/Card";
import Meta from "antd/lib/card/Meta";
import { Button } from "antd";
import { AndroidFilled, AppleFilled } from "@ant-design/icons";
import styles from './dowmload.module.scss'


const DownloadCard:React.FC = () => {
    return <Card actions={[<Button icon={<AndroidFilled />}>Android OS</Button>, <Button icon={<AppleFilled />}>Apple iOS</Button>]} className={styles.card}>
        <Meta title='Скачать на телефон ' description='Доступно в PRO-тарифе'>
        </Meta>
    </Card>
}

export default DownloadCard