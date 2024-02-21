import { AUTH, HOMEPAGE } from "@constants/router";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";




const RequireAuth = ({children}) => {
    const {token} = useAppSelector(state => state.user)
    if(!token) {
        return <Navigate to={AUTH} replace/>
    } 
    return children
}


const UnRequireAuth = ({children}) => {
    const {token} = useAppSelector(state => state.user)
    if(token) {
        return <Navigate to={HOMEPAGE} replace/>
    } 
    return children
}

const ResultRoute = ({children}) => {
    
    const lastPage = useAppSelector((state) => state.router.previousLocations)
    if(lastPage.length > 1){
        return children
    } return <Navigate to={AUTH} replace/>
}

export {RequireAuth, UnRequireAuth, ResultRoute}