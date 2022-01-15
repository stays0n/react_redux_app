import { createStore, compose, applyMiddleware } from 'redux';
import { logger } from './middleware/logger';
import taskReducer from './task';

const middlewareEnhancer = applyMiddleware(logger);

function configureStore() {
    return createStore(
        taskReducer,
        compose(
            middlewareEnhancer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
}

export default configureStore;
