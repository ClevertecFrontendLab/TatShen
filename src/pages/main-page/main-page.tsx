import React from 'react';

import styles from './main-page.module.scss';
import { Button, Typography } from 'antd';
import Card_TS from '@components/Card/Card';
import {HeartFilled, IdcardOutlined, SettingOutlined } from '@ant-design/icons';
import calendar from '../../assets/calendar-light.svg'
import { useResize } from '@hooks/useResize';

import Title from 'antd/lib/typography/Title';
import Footer_TS from '@components/Footer/Footer';


export const MainPage: React.FC = () => {
    const {width} = useResize()
  
    return (
        <main className={styles.main}>
             <div className={styles.headerContent}>
                <Title >Приветствуем тебя в CleverFit — приложении, <br/>которое поможет тебе добиться своей
                    мечты!
                </Title>
                <Button style={{ border:'none'}} icon= { <SettingOutlined className={styles.buttonIcon}/>} className={styles.settings}>{width< 600 ? '': 'Настройки'}</Button>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.possibilities}>
                    <Typography>
                        <Typography.Text className={styles.possibilitiesText}>
                            С CleverFit ты сможешь: <br/>— планировать свои тренировки на календаре,
                            выбирая тип и уровень нагрузки; <br/>— отслеживать свои достижения в разделе
                            статистики, сравнивая свои результаты {width< 1000? '':<br/>}с нормами и рекордами; <br/>—
                            создавать свой профиль, где ты можешь загружать свои фото, видео
                            и отзывы {width< 1000? '':<br/>}о тренировках; <br/> — выполнять расписанные тренировки для разных
                            частей тела, следуя подробным инструкциям и советам профессиональных
                            тренеров.
                        </Typography.Text>
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography>
                        <Typography.Text className={styles.descriptionText}>
                        CleverFit — это не просто приложение, а твой личный помощник {width< 600? '':<br/>} в мире фитнеса. {width< 600? <br/> : ''}  Не откладывай на завтра — начни тренироваться {width< 600? '':<br/>}  уже сегодня!
                        </Typography.Text>
                    </Typography>
                    <div className={styles.cardsContainer}>
                        <Card_TS title='Расписать тренировки' icon={<HeartFilled/>} buttonContent='Tренировки'></Card_TS>
                        <Card_TS title='Назначить календарь' icon={<img src={calendar} alt='calendar' className={styles.icon}/>} buttonContent='Kалендарь'></Card_TS>
                        <Card_TS title='Заполнить профиль' icon={<IdcardOutlined/>} buttonContent='Профиль'></Card_TS>
                    </div>
                </div>
            </div>
            <Footer_TS/>
        </main>
    );
};
