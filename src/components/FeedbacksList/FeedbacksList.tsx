import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { IFeedback } from "../../types/feedbackTypes";
import { sortArrayByDate } from "@utils/index";
import React from "react";

import style from './FeedbacksList.module.scss'
import Feedback from "./Feedback/Fedback";
import { Button } from "antd";

interface IFeddbacksListPros{
    showAllFeedbacks: boolean
    setShowAllFeedbacks: () => void,
    setIsModalActive: () => void
}

export const FeedbacksList:React.FC<IFeddbacksListPros> = ({showAllFeedbacks, setIsModalActive, setShowAllFeedbacks}) => {
    const allFeedbacksData = useAppSelector((state) => state.feedbacks.feedbacks);
    const feedbacks = sortArrayByDate<IFeedback, 'createdAt'>(allFeedbacksData, 'createdAt');
    return  <div
    className={
        feedbacks && feedbacks?.length > 0
            ? style.feedback_container
            : style.feedback_container_empty
    }
>
    {feedbacks && feedbacks?.length > 0 ? (
        <div className={style.feedbacks}>
            {feedbacks && showAllFeedbacks
                ? feedbacks.map((item: IFeedback) => (
                    <Feedback data={item} key={item.id}></Feedback>
                )) :
                 feedbacks
                      .slice(0, 4)
                      .map((item: IFeedback) => (
                          <Feedback data={item} key={item.id}></Feedback>
                      ))
                }
        </div>
    ) : (
        <div className={style.feedbackNone}>
            <p className={style.title}> Оставьте свой отзыв первым</p>
            <div className={style.content}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                Поделитесь своим мнением и опытом с другими пользователями, и помогите им
                сделать правильный выбор.
            </div>
        </div>
    )}
    <div className={style.buttons}>
        <Button
            onClick={() => setIsModalActive()}
            className={style.newFeedback}
            data-test-id='write-review'
        >
            Написать отзыв
        </Button>
        {feedbacks?.length > 0 ? (
            <Button
                onClick={() => setShowAllFeedbacks()}
                className={style.allFeedback}
                data-test-id='all-reviews-button'
            >
                {showAllFeedbacks ? 'Свернуть все отзывы' :  'Развернуть все отзывы'}
            </Button>
        ) : (
            ''
        )}
    </div>
    </div>
    }
