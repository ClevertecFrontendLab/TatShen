import { Route, Routes } from 'react-router-dom';
import App from './App';
import { MainPage } from './pages';



const Routers = () => {

  return (
    <Routes>
     
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;