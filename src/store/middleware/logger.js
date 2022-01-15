export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            return next(action);
        };
    };
}

// // https://redux.js.org/tutorials/fundamentals/part-4-store#middleware
// // middleware example
// export function logger({ getStore, dispatch }) {
//     return function wrapDispatch(next) {
//         return function handleAction(action) {
//             // console.log(store);
//             console.log(next);
//             console.log(action);
//             if (action.type === 'task/update') {
//                 return dispatch({
//                     type: 'task/remove',
//                     payload: { ...action.payload },
//                 });
//             }

//             return next(action);
//         };
//     };
// }
