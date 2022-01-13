/*
 * ducks pattern
 */

const TASK_UPDATED = 'task/updated';
const TASK_DELETED = 'task/deleted';

// functions - action creators:
export function taskCompleted(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, completed: true },
    };
}
export function titleChanged(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, title: `new title for ${id}` },
    };
}
export function taskDeleted(id) {
    return {
        type: TASK_DELETED,
        payload: { id },
    };
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case TASK_UPDATED: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id,
            );
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            };
            return newArray;
        }
        case TASK_DELETED: {
            const newArray = [...state].filter(
                (el) => el.id !== action.payload.id,
            );
            return newArray;
        }
        default:
            return state;
    }
}

export default taskReducer;
