/* tslint:disable */
import { SvarState } from '../svar/svar-duck';

function read(scope: string) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope: string, content: any) {
    return localStorage.setItem(scope, JSON.stringify(content)); // eslint-disable-line no-undef
}

function erFiltreringEndret(scope: string, initialState: SvarState) {
    const content = localStorage.getItem(scope); // eslint-disable-line no-undef
    if (!content || content === 'undefined') {
        return true;
    }
    const keysFromStorage = Object.keys(JSON.parse(content));
    const keysFromInitialState = Object.keys(initialState);

    return !(keysFromStorage.length === keysFromInitialState.length &&
        keysFromStorage.every((key) => keysFromInitialState.includes(key)));
}

export default (scope: string, location: Location, reducer: any, initialSvarState: SvarState) => (state: any, action: any) => {
    let nState = state;
    if (location.search.includes('clean') || erFiltreringEndret(scope, initialSvarState)) {
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