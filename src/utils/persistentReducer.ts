/* tslint:disable */

import { SvarState } from '../ducks/svar-duck';
import { SideState } from '../ducks/side-duck';

function read(scope: string) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope: string, content: any) {
    return localStorage.setItem(scope, JSON.stringify(content));
}

function erBesvarelseEndret(
    scope: string,
    initialState: SvarState | SideState
) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return true;
    }
    const keysFromStorage = Object.keys(JSON.parse(content));
    const keysFromInitialState = Object.keys(initialState);

    return !(
        keysFromStorage.length === keysFromInitialState.length &&
        keysFromStorage.every(key => keysFromInitialState.some(k => k === key))
    );
}

export default (
    scope: string,
    location: Location,
    reducer: any,
    initialState: SvarState | SideState
) => (state: any, action: any) => {
    let nState = state;
    if (
        erBesvarelseEndret(scope, initialState) ||
        erBesvarelseEndret(scope, initialState)
    ) {
        write(scope, undefined);
    }
    if (state === undefined) {
        nState = read(scope);
    }

    const rState = reducer(nState, action);

    if (rState !== nState) {
        write(scope, rState);
    }

    return rState;
};
