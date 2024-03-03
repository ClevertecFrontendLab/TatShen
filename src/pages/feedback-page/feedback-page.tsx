import React, { useEffect, useState } from 'react';

import style from './feedback-page.module.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import Feedback from '@components/Feddback/Fedback';
import { IFeedback } from '../../types/feedbackTypes';
import { getLocalStorageItem, sortArrayByDate } from '@utils/index';
import { Button, Rate, Result } from 'antd';
import { CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { IFeedbackForm, initialFeedbackForm } from './types';
import { useCreateFeedbackMutation } from '../../services/FeedbacksService';
import TextArea from 'antd/lib/input/TextArea';
import Modal from '@components/Modal/Modal';
import { setIsLoading } from '@redux/loaderReducer';


const FeedbackPage: React.FC = () => {
    const feedbacksData = useAppSelector((state) => state.feedbacks.feedbacks);
    const feedbacks = sortArrayByDate<IFeedback, 'createdAt'>(feedbacksData, 'createdAt');
    const [allFeedbacks, setAllFeedbacks] = useState(true);
    const [isModalActive, setIsModalActive] = useState<string>('');
    const [formState, setFormState] = useState<IFeedbackForm>(initialFeedbackForm);
    
    const [
        createFeedback,
        {
            isError: isCreateFeedbackError,
            isLoading: isCreateFeedbackLoading,
            isSuccess: isCreateFeedbackSuccess,
            error: createFeedbackError,
        },
    ] = useCreateFeedbackMutation();

    const handleChangeMessage = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            message: e.target.value,
        }));
    };

    const handleRate = (stars: number) => {
        setFormState((formState) => ({
            ...formState,
            rating: stars,
        }));
    };

    const addNewFeedback = () => {
        if (formState.rating) {
            createFeedback({ message: formState?.message || '', rating: formState?.rating });
        }
    };

    useEffect(() => {
        if (isCreateFeedbackLoading){
            setIsLoading(true)
        } else if(isCreateFeedbackSuccess){
            setIsLoading(false)
            setIsModalActive('success')
        } else if(isCreateFeedbackError){
            setIsLoading(false)
            setIsModalActive('error')
        }
    }, [isCreateFeedbackError, isCreateFeedbackLoading, isCreateFeedbackSuccess]);

    return (
        <div className={style.feedback_container}>
            <div className={style.feedbacks}>
                {allFeedbacks
                    ? feedbacks.slice(0, 4).map((item) => <Feedback data={item}></Feedback>)
                    : feedbacks.map((item) => <Feedback data={item}></Feedback>)}
            </div>

            <div className={style.buttons}>
                <Button
                    onClick={() => setIsModalActive('newFeedback')}
                    className={style.newFeedback}
                >
                    Написать отзыв
                </Button>
                <Button
                    onClick={() => setAllFeedbacks(!allFeedbacks)}
                    className={style.allFeedback}
                >
                    {allFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button>
            </div>
            <div className={isModalActive ? style.addNewFeedback : style.none}> { isModalActive === 'newFeedback' ? <Modal className={style.modal}>
                        <div className={style.modal_header}>
                            <p>Ваш отзыв</p>
                            <CloseOutlined
                                onClick={() => setIsModalActive('')}
                                width={14}
                                height={15}
                            />
                        </div>
                        <div className={style.modal_body}>
                            <Rate
                                onChange={handleRate}
                                defaultValue={formState.rating}
                                character={({ value, index }) => {
                                    return value && index! < value ? (
                                        <StarFilled />
                                    ) : (
                                        <StarOutlined />
                                    );
                                }}
                            ></Rate>
                            <TextArea
                                value={formState.message}
                                onChange={(e) => handleChangeMessage(e)}
                                autoSize={{ minRows: 2, maxRows: 8 }}
                                style={{ height: 120 }}
                                placeholder='Расскажите, почему Вам понравилось наше приложение'
                            />
                        </div>
                        <div className={style.modal_footer}>
                            <Button onClick={addNewFeedback}>Опубликовать</Button>
                        </div>
                    </Modal> : isModalActive === 'success' ? <Result
                        status='success'
                        title='Отзыв успешно опубликован'
                        extra={[<Button onClick={() => setIsModalActive('')}>Отлично</Button>]}
                    /> : <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте еще раз.'
                    extra={[
                        <Button type='primary' key='console' onClick={() => setIsModalActive('newFeedback')}>
                            Написать отзыв
                        </Button>,
                        <Button key='buy' onClick={() => setIsModalActive('')}>Закрыть</Button>,
                    ]}
                />}
                
            </div>
        </div>
    );
};

export default FeedbackPage;
