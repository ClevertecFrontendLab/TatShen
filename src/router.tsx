import { Navigate, Route, Routes } from 'react-router-dom';
import * as ROUTERS from './constants/router'
import App from './App';
import { MainPage } from './pages';
import AuthPage from '@pages/auth-page/auth-page';
import ResultPage from '@pages/result-page/result-page';
import ErrorLogin from '@pages/result-page/[error-login]/error-login';
import Success from '@pages/result-page/[success]/success';
import Code from '@pages/auth-page/[confirm-email]/confirm-email';
import ErrorUnknown from '@pages/result-page/[error]/error';
import ErrorUserExistWithEmail from '@pages/result-page/[error-user-exist]/error-user-exist';
import  {  RequireAuth, ResultRoute, UnRequireAuth } from './hoc/PrivateRoute';
import Auth from '@pages/auth-page/[auth]/auth';
import Registration from '@pages/auth-page/[registartion]/registration';
import Error from '@pages/result-page/[error]/error';
import ErrorEmailNoExist from '@pages/result-page/[error-check-email-no-exist]/error-check-email-no-exist';
import ChangePassword from '@pages/auth-page/[change-password]/change-password';
import SuccessChangePassword from '@pages/result-page/[success-change-password]/success-change-password';
import ErrorChangePassword from '@pages/result-page/[error-change-password]/error-change-password';
import ErrorCheckEmail from '@pages/result-page/[error-check-email]/error-check-email';



const Routers = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTERS.AUTH} replace={true}/>}/>

      <Route path={ROUTERS.HOMEPAGE} element={<App />}>
        <Route index element={<RequireAuth> <MainPage/></RequireAuth>}/> 
      </Route>

      <Route path={ROUTERS.AUTH} element={<UnRequireAuth> <AuthPage/></UnRequireAuth>}> 
        <Route index element={<Auth />}/>
        <Route path={ROUTERS.REGISTRATION} element={<Registration />}/>
        <Route path={ROUTERS.CONFIRM_EMAIL} element={<Code/>}/>
        <Route path={ROUTERS.CHANGE_PASSWORD} element={<ChangePassword/>}/>
      </Route>

      <Route path={ROUTERS.RESULTS} element={<ResultRoute> <ResultPage /> </ResultRoute>}>
        <Route path={ROUTERS.ERROR_LOGIN} element={<ResultRoute> <ErrorLogin/> </ResultRoute>}/>
        <Route path={ROUTERS.SUCCESS} element={<ResultRoute> <Success/> </ResultRoute>}/>
        <Route path={ROUTERS.SUCCESS_CHANGE_PASSWORD} element={<ResultRoute> <SuccessChangePassword/> </ResultRoute>}/>
        <Route path={ROUTERS.RESULT_ERROR} element={<ResultRoute> <Error/> </ResultRoute>}/>
        <Route path={ROUTERS.ERROR_CHANGE_PASSWORD} element={<ResultRoute> <ErrorChangePassword/></ResultRoute>}/>
        <Route path={ROUTERS.ERROR_USER_EXIST} element={<ResultRoute> <ErrorUserExistWithEmail/> </ResultRoute>}/>
        <Route path={ROUTERS.ERROR_EMAIL_NO_EXIST} element={<ResultRoute> <ErrorEmailNoExist/> </ResultRoute>}/>
        <Route path={ROUTERS.ERROR_UNKNOWN} element={<ResultRoute> <ErrorUnknown/> </ResultRoute>}/>
        <Route path={ROUTERS.ERROR_CHECK_EMAIL} element={<ResultRoute> <ErrorCheckEmail/> </ResultRoute>}/>
      </Route>
    </Routes>
  );
};

export default Routers;