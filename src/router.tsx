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
import ErrorNetwork from '@pages/result-page/[error-network]/error';
import  {  RequireAuth, UnRequireAuth } from './hoc/PrivateRoute';
import Auth from '@pages/auth-page/[auth]/auth';
import Registration from '@pages/auth-page/[registartion]/registration';
import Error from '@pages/result-page/[error]/error';
import ErrorEmailNoExist from '@pages/result-page/[error-check-email-no-exist]/error-check-email-no-exist';
import ChangePassword from '@pages/auth-page/[change-password]/change-password';



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

      <Route path={ROUTERS.RESULTS} element={<ResultPage />}>
        <Route path={ROUTERS.ERROR_LOGIN} element={<ErrorLogin/>}/>
        <Route path={ROUTERS.SUCCESS} element={<Success/>}/>
        <Route path={ROUTERS.RESULT_ERROR} element={<Error/>}/>
        <Route path={ROUTERS.ERROR_USER_EXIST} element={<ErrorUserExistWithEmail/>}/>
        <Route path={ROUTERS.ERROR_EMAIL_NO_EXIST} element={<ErrorEmailNoExist/>}/>
        <Route path={ROUTERS.ERROR_UNKNOWN} element={<ErrorUnknown/>}/>
        <Route path={ROUTERS.ERROR_NETWORK} element={<ErrorNetwork/>}/>
      </Route>
    </Routes>
  );
};

export default Routers;