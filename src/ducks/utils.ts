/*
import {Dispatch} from "../types";
import {Handling} from "../actions";
*/

export enum STATUS {
    NOT_STARTED,
    PENDING,
    OK,
    FEILET,
    RELOADING
}

export interface StatusModell {
    NOT_STARTED: 'NOT_STARTED';
    PENDING: 'PENDING';
    OK: 'OK';
    FEILET: 'FEILET';
    RELOADING: 'RELOADING';
}

/*
export function sendResultatTilDispatch(dispatch: Dispatch, action: Handling) {
    return (...data) => {
        if (data.length === 1) {
            return dispatch({type: action, data: data[0]});
        }
        return dispatch({type: action, data});
    };
}
*/

/*
export function doThenDispatch(fn: Function, {OK, FEILET, PENDING}: StatusModell) {
    return (dispatch: Dispatch) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn().then(sendResultatTilDispatch(dispatch, OK))
    };
}
*/
