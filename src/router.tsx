import { Route, Routes } from 'react-router-dom';
import * as ROUTERS from './constants/router'
import App from './App';
import { MainPage } from './pages';
import AuthPage from '@pages/auth-page/auth-page';
import ResultPage from '@pages/result-page/result-page';
import ErrorLogin from '@pages/result-page/[error-login]/error-login';
import Success from '@pages/result-page/[success]/success';
import ErrorEmail from '@pages/result-page/[error-email]/error-email';
import Code from '@pages/auth-page/[confirm-email]/confirm-email';
import ErrorUnknown from '@pages/result-page/[error-unknown]/error-unrnown';
import ErrorUserExistWithEmail from '@pages/result-page/[error-user-exist]/error-user-exist';
import ErrorNetwork from '@pages/result-page/[error-network]/error';



const Routers = () => {

  return (
    <Routes>
       <Route path="/" element={<AuthPage />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path={ROUTERS.HOMEPAGE} element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path={ROUTERS.AUTH} element={<AuthPage />}>
      </Route>
      <Route path={ROUTERS.REGISTRATION} element={<AuthPage />}>
      </Route>
      <Route path={ROUTERS.ERROR_LOGIN} element={<ResultPage />}>
        <Route index element={<ErrorLogin/>}/>
      </Route>
      <Route path={ROUTERS.SUCCESS}element={<ResultPage />}>
        <Route index element={<Success/>}/>
      </Route>
      <Route path={ROUTERS.ERROR_USER_EXIST_WITH_EMAIL}element={<ResultPage />}>
        <Route index element={<ErrorUserExistWithEmail/>}/>
      </Route>
      <Route path={ROUTERS.ERROR_EMAIL} element={<ResultPage />}>
        <Route index element={<ErrorEmail/>}/>
      </Route>
      <Route path={ROUTERS.CODE} element={<ResultPage />}>
        <Route index element={<Code/>}/>
      </Route>
      <Route path={ROUTERS.ERROR_UNKNOWN} element={<ResultPage />}>
        <Route index element={<ErrorUnknown/>}/>
      </Route>
      <Route path={ROUTERS.ERROR_NETWORK} element={<ResultPage />}>
        <Route index element={<ErrorNetwork/>}/>
      </Route>
    </Routes>
  );
};

export default Routers;