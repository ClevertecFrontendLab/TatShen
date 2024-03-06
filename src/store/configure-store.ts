import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { enterApi } from '../services/EnterService';
import { userReducer } from '@redux/userReducer';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { loaderReducer } from '@redux/loaderReducer';
import { feedbacksReducer } from '@redux/feedbacksReducer';
import { feedbacksApi } from '../services/FeedbacksService';
import { newFeedbackReducer } from '@redux/newfeedbackReducer';

const {createReduxHistory, routerMiddleware, routerReducer} = createReduxHistoryContext({history: createBrowserHistory(), savePreviousLocations:1})


export const store = configureStore({

        reducer: combineReducers({
            [enterApi.reducerPath]: enterApi.reducer,
            user: userReducer,
            router: routerReducer,
            loader: loaderReducer,
            feedbacks: feedbacksReducer,
            newFeedback: newFeedbackReducer,
            [feedbacksApi.reducerPath]:feedbacksApi.reducer
        }),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enterApi.middleware, routerMiddleware, feedbacksApi.middleware),
    })




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
    
export const history = createReduxHistory(store);
    
