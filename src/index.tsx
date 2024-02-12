import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import Routers from './router';

import 'normalize.css';
// import 'antd/dist/antd.css';
import './index.css';


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
        <Provider store={store}>
            <BrowserRouter basename='/'>
                <Routers/>
            </BrowserRouter>
        </Provider>
);
