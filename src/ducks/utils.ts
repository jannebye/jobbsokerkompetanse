import {Dispatch} from "../types";
import {Handling} from "../actions";

export enum STATUS {
    NOT_STARTED, PENDING, OK, FEILET
}

export interface StatusModell {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    FEILET: 'FEILET'
}


export function sendResultatTilDispatch(dispatch: Dispatch, action: Handling) {
    return (...data) => {
        if (data.length === 1) {
            return dispatch({type: action, data: data[0]});
        }
        return dispatch({type: action, data});
    };
}

function parseError(errorData: string) {
    try {
        return JSON.parse(errorData);
    } catch (e) {
        console.error(e); // eslint-disable-line no-console
        return errorData;
    }
}

export function handterFeil(dispatch: Dispatch, FEILET_TYPE: StatusModell) {
    return (error: string) => {
        const response: Response = error.response;
        if (response) {
            response.text().then(data => {
                console.error(error, error.stack, data); // eslint-disable-line no-console
                dispatch({
                    type: FEILET_TYPE,
                    data: {
                        type: FEILET_TYPE,
                        httpStatus: response.status,
                        melding: parseError(data),
                    },
                });
            });
        } else {
            console.error(error, error.stack); // eslint-disable-line no-console
            dispatch({
                type: FEILET_TYPE,
                data: {
                    type: FEILET_TYPE,
                    melding: error.toString(),
                },
            });
        }
        return Promise.reject(error);
    };
}

export function doThenDispatch(fn: Function, {OK, FEILET, PENDING}: StatusModell) {
    return (dispatch: Dispatch) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn()
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));
    };
}
