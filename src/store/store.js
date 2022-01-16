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

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logger } from './middleware/logger';
import errorReducer from './errors';
import taskReducer from './task';

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer,
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export default createStore;
