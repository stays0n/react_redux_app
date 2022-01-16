import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
    titleChanged,
    taskDeleted,
    completeTask,
    getTasks,
} from './store/task';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

const store = configureStore();

const App = () => {
    const state = useSelector((state) => state);

    useEffect(() => {
        store.dispatch(getTasks());
    }, []);

    const changeTitle = (taskId) => {
        store.dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        store.dispatch(taskDeleted(taskId));
    };

    return (
        <React.Fragment>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.description}</p>
                        <p>{el.title}</p>
                        <p>{`Complited: ${el.completed}`}</p>
                        <button
                            onClick={() => store.dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default App;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
