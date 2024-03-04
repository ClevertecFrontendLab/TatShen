import React, { useEffect, useState } from 'react';

import style from './feedback-page.module.scss';
import { useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks';
import Feedback from '@components/Feddback/Fedback';
import { IFeedback } from '../../types/feedbackTypes';
import { removeLocalStorageItem, sortArrayByDate} from '@utils/index';
import { Button, Modal, Rate, Result } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { IFeedbackForm, initialFeedbackForm } from './types';
import {
    useCreateFeedbackMutation,
    useGetAllFeedbacksQuery,
} from '../../services/FeedbacksService';
import TextArea from 'antd/lib/input/TextArea';
import { setIsLoading } from '@redux/loaderReducer';
import { setFeedbacks } from '@redux/feedbacksReducer';
import { useNavigate } from 'react-router-dom';
import { IServerErrorResponse } from '../../types/enterTypes';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { setToken } from '@redux/userReducer';
import { HOMEPAGE } from '@constants/router';

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const allFeedbacksData = useAppSelector((state) => state.feedbacks.feedbacks);
    const feedbacks = sortArrayByDate<IFeedback, 'createdAt'>(allFeedbacksData, 'createdAt');
    const [allFeedbacks, setAllFeedbacks] = useState(true);
    const [isModalActive, setIsModalActive] = useState<string>('');
    const [formState, setFormState] = useState<IFeedbackForm>(initialFeedbackForm);
    const {
        isError: isFeedbackError,
        isLoading: isFeedbackLoading,
        isSuccess: isFeedbackSuccess,
        data: feedbacksData = [],
        error: feedbacksErrorData,
    } = useGetAllFeedbacksQuery('', {
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
            dispatch(setIsLoading(true));
        }
    }, [dispatch, isFeedbackLoading]);

    useEffect(()=> {if (isFeedbackSuccess) {
        dispatch(setIsLoading(false));
        dispatch(setFeedbacks(feedbacksData))

    }}, [dispatch, feedbacksData, isFeedbackSuccess])
    
    useEffect(()=> {if (
        isFeedbackError &&
        (feedbacksErrorData as IServerErrorResponse)?.status.toString() === '403'
    ) { 
        dispatch(setIsLoading(false));
        dispatch(setToken(''))
        removeLocalStorageItem(LOCAL_STORAGE);
    }{ if (isFeedbackError){
        dispatch(setIsLoading(false));
        setIsModalActive('500')}}}, 
        [dispatch, feedbacksErrorData, isFeedbackError, navigate])



    const handleChangeMessage = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            message: e.target.value,
        }));
    };

    const handleError = () => {
        navigate(HOMEPAGE)
        setIsModalActive('')
    }

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
        <div className={ feedbacks && feedbacks?.length > 0 ? style.feedback_container : style.feedback_container_empty}>
            {feedbacks && feedbacks?.length > 0 ? (
                    <div className={style.feedbacks}>
                        {feedbacks && allFeedbacks
                            ? feedbacks
                                  .slice(0, 4)
                                  .map((item: IFeedback) => <Feedback data={item} key={item.id}></Feedback>)
                            : feedbacks.map((item: IFeedback, index: React.Key | null | undefined) => <Feedback data={item} key={index}></Feedback>)}
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
                {feedbacks?.length > 0 ?   <Button
                    onClick={() => setAllFeedbacks(!allFeedbacks)}
                    className={style.allFeedback}
                    data-test-id='all-reviews-button'
                >
                    {allFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button> : ''}
              
            </div>
            <div className={isModalActive ? style.addNewFeedback : style.none}>
                {isModalActive === 'newFeedback' ? (
                    <Modal title="Ваш отзыв" open={isModalActive === 'newFeedback' }  onCancel={() => setIsModalActive('')} footer={<Button disabled = {!formState.rating} onClick={addNewFeedback} data-test-id='new-review-submit-button'>Опубликовать</Button>}>
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
                                autoSize={{ minRows: 2}}
                                value={formState.message}
                                onChange={(e) => handleChangeMessage(e)}
                                placeholder='Расскажите, почему Вам понравилось наше приложение'
                            />
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
                                onClick={()=> setIsModalActive('')}
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
                        status={500}
                        title='Что-то пошло не так'
                        subTitle='Произошла ошибка, попробуйте еще раз.'
                        extra={
                            <Button type='primary' onClick={handleError}>
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


