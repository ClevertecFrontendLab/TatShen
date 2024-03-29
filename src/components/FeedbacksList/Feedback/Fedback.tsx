import React from 'react';
import { Avatar, Comment, Rate } from 'antd';
import { IFeedback } from '../../../types/feedbackTypes';

import style from './Feedback.module.scss';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { getDate } from '@utils/index';

interface IFeedbackProps {
    data: IFeedback;
}

const Feedback: React.FC<IFeedbackProps> = ({ data }) => {
    return (
        <Comment
            author={
                <div className={style.author}>
                    {data.imageSrc ? (
                        <Avatar
                            src={data.imageSrc}
                            alt={data.fullName || 'avatar'}
                            className={style.avatar}
                        />
                    ) : (
                        <UserOutlined className={style.icon} />
                    )}
                    <div className={style.name}>
                        {data.fullName ? (
                            data.fullName
                                .split(' ')
                                .map((item) => <p key={data.id + item}>{item}</p>)
                        ) : (
                            <p>Пользователь</p>
                        )}
                    </div>
                </div>
            }
            content={
                <>
                    <div className={style.information}>
                        <Rate
                            value={data.rating}
                            character={({ value, index }) => {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                return value && index! < value ? <StarFilled /> : <StarOutlined />;
                            }}
                        />
                        <p>{getDate(data.createdAt)}</p>
                    </div>
                    <p>{data.message}</p>
                </>
            }
        />
    );
};

export default Feedback;
