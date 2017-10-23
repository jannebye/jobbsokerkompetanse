import { combineReducers } from 'redux';
import svarReducer, { SvarState } from './svar/svar-duck';

export interface AppState {
    svar: SvarState;
}

export default combineReducers<AppState>({
    svar: svarReducer,
});