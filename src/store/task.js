/*
 * ducks pattern
 */

import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';

const initialState = { entities: [], isLoading: true, error: null };

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload;
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
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed } = actions;

export const getTasks = () => async (dispatch, getState) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(taskRequestFailed(error.message));
    }
};

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};

// functions - action creators:
export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
    return remove({ id });
}

export default taskReducer;
