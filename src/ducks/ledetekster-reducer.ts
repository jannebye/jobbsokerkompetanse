import * as Tekster from '../tekster/sporsmal-tekster';

export enum STATUS {
    NOT_STARTED,
    PENDING,
    OK,
    FEILET
}

interface TekstModell {
    [key: string]: string;
}

interface SprakModell {
    [key: string]: TekstModell[];
}

export interface LedeTekstState {
    status: STATUS;
    data: SprakModell;
}

const initalState: LedeTekstState = {
    status: STATUS.NOT_STARTED,
    data: Tekster.bundle
};

// Reducer
export default function reducer(state: LedeTekstState = initalState) {
    return state;
}

/*
function konverterledetekster(ledetekster) {
    return Object.keys(ledetekster)
        .map(key => ({key, value: `${ledetekster[key]} [${key}]`}))
        .reduce((previous, current) => {
            previous[current.key] = current.value; // eslint-disable-line no-param-reassign
            return previous;
        }, {});
}
*/

/*
function hentLedeteksterMedKeys() {
    return ApiHentLedetekster().then(data =>
        Object.keys(data)
            .map(sprak => ({sprak, keys: konverterledetekster(data[sprak])}))
            .reduce((previous, current) => {
                previous[current.sprak] = current.keys; // eslint-disable-line no-param-reassign
                return previous;
            }, {})
    );
}
*/

// Action Creators
/*
export function hentLedetekster() {
    const vistekster = window.location.search.indexOf('vistekster') !== -1;
    return doThenDispatch(
        vistekster ? hentLedeteksterMedKeys : ApiHentLedetekster,
        {OK, FEILET, PENDING,}: STATUS
    );
}
*/
