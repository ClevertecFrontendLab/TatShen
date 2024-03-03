import React, { useEffect, useState } from "react";
import { Footer } from "antd/lib/layout/layout";
import DownloadCard from "@components/DownloadCard/DownloadCard";
import {  useNavigate } from "react-router-dom";
import { useLazyGetAllFeedbacksQuery } from "../../services/FeedbacksService";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { setFeedbacks } from "@redux/feedbacksReducer";
import { AUTH, FEEDBACKS } from "@constants/router";
import { IFeedbackResponse } from "../../types/feedbackTypes";
import Modal from "@components/Modal/Modal";
import { setToken } from "@redux/userReducer";
import { setIsLoading } from "@redux/loaderReducer";
import error from '../../assets/error.svg'
import styles from './footer.module.scss'
import { Button } from "antd";
import { IServerErrorResponse } from "../../types/enterTypes";
import { removeLocalStorageItem } from "@utils/index";
import { LOCAL_STORAGE } from "@constants/localStorage";

const Footer_TS:React.FC = () => {
    const navigate = useNavigate()
    const dispath= useAppDispatch()
    const[ getAllFeedbacks, {
        isError: isFeedbackError,
        isLoading: isFeedbackLoading,
        isSuccess: isFeedbackSuccess,
        data: feedbacksData, error: feedbacksErrorData}] = useLazyGetAllFeedbacksQuery()
    const [isModalActive, setIsModalActive] = useState(false)   
    const hadleClick = () => {
        getAllFeedbacks('')}

    useEffect(() => {
        if(isFeedbackLoading){dispath(setIsLoading(true))}
        if(isFeedbackSuccess){
            dispath(setIsLoading(false))
            dispath(setFeedbacks(feedbacksData))
            navigate(FEEDBACKS)
        } 
        if(isFeedbackError && (feedbacksErrorData as IServerErrorResponse).status.toString() === '403' ){
                dispath(setIsLoading(false))
                dispath(setToken(''))
                removeLocalStorageItem(LOCAL_STORAGE)
                navigate(AUTH)
        } 
     }, [dispath, feedbacksData, feedbacksErrorData, isFeedbackError, isFeedbackLoading, isFeedbackSuccess, isModalActive, navigate])

     useEffect(() => {
        if (isFeedbackError){
            dispath(setIsLoading(false))
            setIsModalActive(true)
        }
     }, [dispath, isFeedbackError])
   
    return <Footer className={styles.footer} style={{background: 'transparent'}} >
        <div className={isModalActive ? styles.container : styles.none}>
            <Modal className={styles.error_container}>
                    <div className={styles.content}>
                        <img src={error} alt="error"></img>
                        <div className={styles.text_content} style={{padding:'0px'}}>
                            <h2>Что-то пошло не так</h2>
                            <span className={styles.error_user_exist} >Произошла ошибка, попробуйте ещё раз.</span>
                        </div>
                        <Button  style={{width:'74px', height:'40px', padding:'4px 15px', background:'#2f54eb'}} onClick={() => setIsModalActive(false)}> Назад</Button>
                    </div>
            </Modal>
        </div>
        <button className={styles.link} onClick={hadleClick} >Смотреть отзывы</button>
        <DownloadCard></DownloadCard>
    </Footer>
}

export default Footer_TS

