import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { setupStore } from './store/configure-store';
import Routers from './router';

import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const store = setupStore()
root.render(
    <Provider store={store}>
        <BrowserRouter basename='/'>
            <Routers />
        </BrowserRouter>
    </Provider>,
);
