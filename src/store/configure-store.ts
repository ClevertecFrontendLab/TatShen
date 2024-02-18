import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { enterApi } from '../services/EnterService';
import { userReducer } from '@redux/userReducer';


const rootReducer = combineReducers({
    [enterApi.reducerPath]: enterApi.reducer,
    user: userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enterApi.middleware)
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
