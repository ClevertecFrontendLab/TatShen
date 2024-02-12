import React from 'react';

import styles from './main-page.module.scss';
import { Typography } from 'antd';
import Card_TS from '@components/Card/Card';
import {HeartFilled, IdcardOutlined } from '@ant-design/icons';
import calendar from '../../../public/calendar-light.svg'

export const MainPage: React.FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.mainContent}>
                <div className={styles.possibilities}>
                    <Typography>
                        <Typography.Text className={styles.possibilitiesText}>
                            С CleverFit ты сможешь: <br/>— планировать свои тренировки на календаре,
                            выбирая тип и уровень нагрузки; <br/>— отслеживать свои достижения в разделе
                            статистики, сравнивая свои результаты с нормами и рекордами; <br/>—
                            создавать свой профиль, где ты можешь загружать свои фото, видео
                            и отзывы о тренировках; <br/> — выполнять расписанные тренировки для разных
                            частей тела, следуя подробным инструкциям и советам профессиональных
                            тренеров.
                        </Typography.Text>
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography>
                        <Typography.Text className={styles.descriptionText}>
                        CleverFit — это не просто приложение, а твой личный помощник <br/>в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </Typography.Text>
                    </Typography>
                    <div className={styles.cardsContainer}>
                        <Card_TS title='Расписать тренировки' icon={<HeartFilled/>} buttonContent='Tренировки'></Card_TS>
                        <Card_TS title='Назначить календарь' icon={<img src={calendar} alt='calendar' className={styles.icon}/>} buttonContent='Kалендарь'></Card_TS>
                        <Card_TS title='Заполнить профиль' icon={<IdcardOutlined/>} buttonContent='Профиль'></Card_TS>
                    </div>
                </div>
            </div>
        </main>
    );
};
