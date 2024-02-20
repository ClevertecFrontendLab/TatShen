import { AUTH, HOMEPAGE } from "@constants/router";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import React from "react";
import { Navigate } from "react-router-dom";




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



export {RequireAuth, UnRequireAuth}