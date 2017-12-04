import { combineReducers } from 'redux';
import svarReducer, { SvarState } from '../svar/svar-duck';
import persistent from '../utils/persistentReducer';
import { initialState } from '../svar/svar-duck';

export interface AppState {
    svar: SvarState;
}

export default combineReducers<AppState>({
    svar: persistent('besvarelseState', location, svarReducer, initialState)
});