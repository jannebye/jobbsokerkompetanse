import { combineReducers } from 'redux';
import svarReducer, { SvarState } from '../svar/svar-duck';
import ledeteksterReducer, {
    LedeTekstState
} from '../ducks/ledetekster-reducer';

export interface AppState {
    svar: SvarState;
    ledetekster: LedeTekstState;
}

export default combineReducers<AppState>({
    svar: svarReducer,
    ledetekster: ledeteksterReducer
});
