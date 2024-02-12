import { Button, Card } from 'antd';
import React from 'react';
import styles from './card.module.scss'

interface ICardProps {
    title: string;
    buttonContent: string;
    icon: React.ReactNode;
}

const Card_TS: React.FC<ICardProps> = ({ title, buttonContent, icon }) => {
    return (
        <Card title={title} bordered={false} className={styles.card}>
            <Button icon={icon} className={styles.button}>{buttonContent}</Button>
        </Card>
    );
};

export default Card_TS;
