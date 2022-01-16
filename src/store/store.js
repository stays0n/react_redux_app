// import { createStore, compose, applyMiddleware } from 'redux';
// import { logger } from './middleware/logger';
// import { thunk } from './middleware/thunk';
// import taskReducer from './task';

// const middlewareEnhancer = applyMiddleware(logger, thunk);

// function configureStore() {
//     return createStore(
//         taskReducer,
//         compose(
//             middlewareEnhancer,
//             window.__REDUX_DEVTOOLS_EXTENSION__ &&
//                 window.__REDUX_DEVTOOLS_EXTENSION__(),
//         ),
//     );
// }

// export default configureStore;

import { configureStore } from '@reduxjs/toolkit';
import { logger } from './middleware/logger';
import taskReducer from './task';

function createStore() {
    return configureStore({
        reducer: taskReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export default createStore;
