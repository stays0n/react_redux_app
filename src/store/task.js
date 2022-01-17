/*
 * ducks pattern
 */

import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = [...action.payload, ...state.entities];
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id,
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id,
            );
        },
        taskRequested(state, action) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            state.isLoading = false;
        },
    },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed } = actions;

export const loadTasks = () => async (dispatch, getState) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};
export const createTask = () => async (dispatch, getState) => {
    dispatch(taskRequested());
    const payload = {
        userId: Math.trunc(Math.random() * 1000),
        title: 'new task',
        completed: false,
    };
    try {
        const data = await todosService.create(payload);
        // console.log(data);
        dispatch(recived([data]));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
    return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
