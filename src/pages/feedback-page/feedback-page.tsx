import React, { useState } from 'react';

import style from './feedback-page.module.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import Feedback from '@components/Feddback/Fedback';
import { IFeedback } from '../../types/feedbackTypes';
import { sortArrayByDate } from '@utils/index';
import { Button } from 'antd';

const FeedbackPage: React.FC = () => {
    const feedbacksData = useAppSelector((state) => state.feedbacks.feedbacks);
    const feedbacks = sortArrayByDate<IFeedback, 'createdAt'>(feedbacksData, 'createdAt')
    const [feedbacksQuantity, setFeedbacksQuantity] = useState('4')
    

    return <div className={style.feedback_container}>
        <div className={style.feedbacks}>
            {feedbacksQuantity  ? feedbacks.slice(0,4).map((item) => <Feedback data= {item}></Feedback>) : feedbacks.map((item) => <Feedback data= {item}></Feedback>)}
        </div>
        
        <div className={style.buttons}>
            <Button className={style.newFeedback}>Написать отзыв</Button>
            <Button onClick={() => setFeedbacksQuantity('')} className={style.allFeedback}>Развернуть все отзывы</Button>
        </div>
    </div>;
};

export default FeedbackPage;
