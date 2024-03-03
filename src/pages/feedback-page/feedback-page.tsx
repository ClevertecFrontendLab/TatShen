import React, { useEffect, useState } from 'react';

import style from './feedback-page.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import Feedback from '@components/Feddback/Fedback';
import { IFeedback } from '../../types/feedbackTypes';
import { removeLocalStorageItem, sortArrayByDate } from '@utils/index';
import { Button, Rate, Result } from 'antd';
import { CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { IFeedbackForm, initialFeedbackForm } from './types';
import {
    useCreateFeedbackMutation,
    useGetAllFeedbacksQuery,
} from '../../services/FeedbacksService';
import TextArea from 'antd/lib/input/TextArea';
import Modal from '@components/Modal/Modal';
import { setIsLoading } from '@redux/loaderReducer';
import { setFeedbacks } from '@redux/feedbacksReducer';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '@constants/router';
import { IServerErrorResponse } from '../../types/enterTypes';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { setToken } from '@redux/userReducer';

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();
    const dispath = useAppDispatch();
    const allFeedbacksData = useAppSelector((state) => state.feedbacks.feedbacks);
    console.log(allFeedbacksData);
    
    const [allFeedbacks, setAllFeedbacks] = useState(true);
    const [isModalActive, setIsModalActive] = useState<string>('');
    const [formState, setFormState] = useState<IFeedbackForm>(initialFeedbackForm);
    const {
        isError: isFeedbackError,
        isLoading: isFeedbackLoading,
        isSuccess: isFeedbackSuccess,
        data: feedbacksData,
        error: feedbacksErrorData,
    } = useGetAllFeedbacksQuery(null, {
        pollingInterval: 10000,
    });

    const [
        createFeedback,
        {
            isError: isCreateFeedbackError,
            isLoading: isCreateFeedbackLoading,
            isSuccess: isCreateFeedbackSuccess,
        },
    ] = useCreateFeedbackMutation();

    useEffect(() => {
        if (isFeedbackLoading) {
            dispath(setIsLoading(true));
        }
    }, [dispath, isFeedbackLoading]);

    useEffect(()=> {if (isFeedbackSuccess) {
        dispath(setIsLoading(false));
        const feedbacks = sortArrayByDate<IFeedback, 'createdAt'>(feedbacksData, 'createdAt');
        dispath(setFeedbacks(feedbacks));
    }}, [dispath, feedbacksData, isFeedbackSuccess])
    
    useEffect(()=> {if (
        isFeedbackError &&
        (feedbacksErrorData as IServerErrorResponse).status.toString() === '403'
    ) {
        dispath(setIsLoading(false));
        dispath(setToken(''));
        removeLocalStorageItem(LOCAL_STORAGE);
        navigate(AUTH);
    }}, [dispath, feedbacksErrorData, isFeedbackError, navigate])

    useEffect(() => {
        if (isFeedbackError) {
            dispath(setIsLoading(false));
            setIsModalActive('500');
        }
    }, [dispath, isFeedbackError]);

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
        if (isCreateFeedbackLoading) {
            setIsLoading(true);
        } 
    }, [isCreateFeedbackLoading]);

    useEffect(()=> {
        if (isCreateFeedbackSuccess) {
            setIsLoading(false);
            setIsModalActive('success');
            setFormState((formState) => ({
                ...formState,
                rating: 0,
                message: '',
            }));
        } 
    }, [isCreateFeedbackSuccess])

    useEffect(()=> {
        if (isCreateFeedbackError) {
            setIsLoading(false);
            setIsModalActive('error');
        }
    }, [isCreateFeedbackError])

    return (
        <div className={ allFeedbacksData.length > 0 ? style.feedback_container : style.feedback_container_empty}>
            {allFeedbacksData.length > 0 ? (
                    <div className={style.feedbacks}>
                        {allFeedbacksData && allFeedbacks
                            ? allFeedbacksData
                                  .slice(0, 4)
                                  .map((item) => <Feedback data={item}></Feedback>)
                            : allFeedbacksData.map((item) => <Feedback data={item}></Feedback>)}
                    </div>
                ) : (
                    <div className={style.feedbackNone}>
                        <p className={style.title}> Оставьте свой отзыв первым</p>
                        <div className={style.content}>
                            Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                            Поделитесь своим мнением и опытом с другими пользователями, и помогите
                            им сделать правильный выбор.
                        </div>
                    </div>
                )}
            <div className={style.buttons}>
                <Button
                    onClick={() => setIsModalActive('newFeedback')}
                    className={style.newFeedback}
                    data-test-id='write-review'
                >
                    Написать отзыв
                </Button>
                {allFeedbacksData.length > 0 ?   <Button
                    onClick={() => setAllFeedbacks(!allFeedbacks)}
                    className={style.allFeedback}
                    data-test-id='all-reviews-button'
                >
                    {allFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button> : ''}
              
            </div>
            <div className={isModalActive ? style.addNewFeedback : style.none}>
                {isModalActive === 'newFeedback' ? (
                    <Modal className={style.modal}>
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
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
                            <Button onClick={addNewFeedback} data-test-id='new-review-submit-button'>Опубликовать</Button>
                        </div>
                    </Modal>
                ) : isModalActive === 'success' ? (
                    <Result
                        status='success'
                        title='Отзыв успешно опубликован'
                        extra={
                            <Button
                                type='primary'
                                onClick={() => setIsModalActive('')}
                                style={{ width: '368px' }}
                            >
                                Отлично
                            </Button>
                        }
                    />
                ) : isModalActive === 'error' ? (
                    <Result
                        status='error'
                        title='Данные не сохранились'
                        subTitle='Что-то пошло не так. Попробуйте еще раз.'
                        extra={[
                            <Button
                                type='primary'
                                key='console'
                                onClick={() => setIsModalActive('newFeedback')}
                                data-test-id='write-review-not-saved-modal'
                            >
                                Написать отзыв
                            </Button>,
                            <Button key='buy' onClick={() => setIsModalActive('')}>
                                Закрыть
                            </Button>,
                        ]}
                    />
                ) : (
                    <Result
                        title='Что-то пошло не так'
                        subTitle='Произошла ошибка, попробуйте еще раз.'
                        extra={
                            <Button type='primary' onClick={() => setIsModalActive('')}>
                                Назад
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
