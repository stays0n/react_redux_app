import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as actions from './store/task/actions';
import configureStore from './store/store';

const store = configureStore();

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => setState(store.getState()));
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        store.dispatch(actions.taskDeleted(taskId));
    } 

    return (
        <React.Fragment>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.description}</p>
                        <p>{el.title}</p>
                        <p>{`Complited: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
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
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
