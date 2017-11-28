import { combineReducers } from 'redux';
import svarReducer, { SvarState } from '../svar/svar-duck';
import sporsmalReducer, { VisningState } from './sporsmal-duck';

export interface AppState {
    svar: SvarState;
    gjeldendeSporsmal: VisningState;
}

export default combineReducers<AppState>({
    svar: svarReducer,
    gjeldendeSporsmal: sporsmalReducer
});
