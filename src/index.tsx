import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {HistoryRouter as Router } from 'redux-first-history/rr6'

import { store, history } from './store/configure-store';
import Routers from './router';

import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <Router history={history}>
            <Routers />
        </Router>
    </Provider>,
);
