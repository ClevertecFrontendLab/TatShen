import React, { useEffect, useState } from 'react';

import style from './feedback-page.module.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { removeLocalStorageItem} from '@utils/index';
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
import { FeedbacksList} from '@components/FeedbacksList/FeedbacksList';

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [allFeedbacks, setAllFeedbacks] = useState(false);
    const [isModalActive, setIsModalActive] = useState<string>('');
    const [formState, setFormState] = useState<IFeedbackForm>(initialFeedbackForm);
    const {
        isError: isFeedbackError,
        isLoading: isFeedbackLoading,
        isSuccess: isFeedbackSuccess,
        data: feedbacksData = [],
        error: feedbacksErrorData,
    } = useGetAllFeedbacksQuery('', {});

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

    useEffect(() => {
        if (isFeedbackSuccess) {
            dispatch(setIsLoading(false));
            dispatch(setFeedbacks(feedbacksData));
        }
    }, [dispatch, feedbacksData, isFeedbackSuccess]);

    useEffect(() => {
        if (
            isFeedbackError &&
            (feedbacksErrorData as IServerErrorResponse)?.status.toString() === '403'
        ) {
            dispatch(setIsLoading(false));
            dispatch(setToken(''));
            removeLocalStorageItem(LOCAL_STORAGE);
        }
        {
            if (isFeedbackError) {
                dispatch(setIsLoading(false));
                setIsModalActive('500');
            }
        }
    }, [dispatch, feedbacksErrorData, isFeedbackError, navigate]);

    const handleChangeMessage = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            message: e.target.value,
        }));
    };

    const handleError = () => {
        navigate(HOMEPAGE);
        setIsModalActive('');
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

    useEffect(() => {
        if (isCreateFeedbackSuccess) {
            setIsLoading(false);
            setIsModalActive('success');
            setFormState((formState) => ({
                ...formState,
                rating: 0,
                message: '',
            }));
        }
    }, [isCreateFeedbackSuccess]);

    useEffect(() => {
        if (isCreateFeedbackError) {
            setIsLoading(false);
            setIsModalActive('error');
        }
    }, [isCreateFeedbackError]);

    return (
        <>
            <FeedbacksList 
            setIsModalActive={()=> setIsModalActive('newFeedback')} 
            setShowAllFeedbacks={()=>setAllFeedbacks(!allFeedbacks)} 
            showAllFeedbacks={allFeedbacks}/>
            <div className={isModalActive ? style.addNewFeedback : style.none}>
                {isModalActive === 'newFeedback' ? (
                    <Modal
                        title='Ваш отзыв'
                        open={isModalActive === 'newFeedback'}
                        onCancel={() => setIsModalActive('')}
                        footer={
                            <Button
                                disabled={!formState.rating}
                                onClick={addNewFeedback}
                                data-test-id='new-review-submit-button'
                            >
                                Опубликовать
                            </Button>
                        }
                    >
                        <Rate
                            onChange={handleRate}
                            defaultValue={formState.rating}
                            character={({ value, index }) => {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                return value && index! < value ? <StarFilled /> : <StarOutlined />;
                            }}
                        ></Rate>
                        <TextArea
                            autoSize={{ minRows: 2 }}
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
                                onClick={() => setIsModalActive('')}
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
            </>
        // </div>
    );
};

export default FeedbackPage;
