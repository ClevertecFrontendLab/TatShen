import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { enterApi } from '../services/EnterService';
import { userReducer } from '@redux/userReducer';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const {createReduxHistory, routerMiddleware, routerReducer} = createReduxHistoryContext({history: createBrowserHistory(), savePreviousLocations:1})


export const store = configureStore({

        reducer: combineReducers({
            [enterApi.reducerPath]: enterApi.reducer,
            user: userReducer,
            router: routerReducer
        }),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enterApi.middleware, routerMiddleware),
    })




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
    
export const history = createReduxHistory(store);
    
