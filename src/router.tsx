import { Route, Routes } from 'react-router-dom';
import App from './App';
import { MainPage } from './pages';
import AuthPage from '@pages/auth-page/auth-page';
import ResultPage from '@pages/result-page/result-page';
import ErrorLogin from '@pages/result-page/[error-login]/error-login';
import Success from '@pages/result-page/[success]/success';
import ErrorUserExist from '@pages/result-page/[error-user-exist]/error-user-exist';
import ErrorEmail from '@pages/result-page/[error-email]/error-email';
import Code from '@pages/result-page/[code]/code';
import ErrorUnknown from '@pages/result-page/[error-unknown]/error-unrnown';



const Routers = () => {

  return (
    <Routes>
     
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />}>
      </Route>
      <Route path="/result/error-login" element={<ResultPage />}>
        <Route index element={<ErrorLogin/>}/>
      </Route>
      <Route path="/result/success" element={<ResultPage />}>
        <Route index element={<Success/>}/>
      </Route>
      <Route path="/result/error-user-exist" element={<ResultPage />}>
        <Route index element={<ErrorUserExist/>}/>
      </Route>
      <Route path="/result/error-email" element={<ResultPage />}>
        <Route index element={<ErrorEmail/>}/>
      </Route>
      <Route path="/result/code" element={<ResultPage />}>
        <Route index element={<Code/>}/>
      </Route>
      <Route path="/result/error-unknown" element={<ResultPage />}>
        <Route index element={<ErrorUnknown/>}/>
      </Route>
    </Routes>
  );
};

export default Routers;