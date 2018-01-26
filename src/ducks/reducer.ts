import { combineReducers } from 'redux';
import svarReducer, { SvarState } from '../svar/svar-duck';
import persistent from '../utils/persistentReducer';
import { initialState as initialSvarState } from '../svar/svar-duck';
import sideReducer, {
    SideState,
    initialState as initialSideState
} from './side-duck';
import temaReducer, { TemaState } from '../resultat/tema-duck';

export interface AppState {
    svar: SvarState;
    side: SideState;
    tema: TemaState;
}

export default combineReducers<AppState>({
    svar: persistent(
        'besvarelseState',
        location,
        svarReducer,
        initialSvarState
    ),
    side: persistent('sideState', location, sideReducer, initialSideState),
    tema: temaReducer,
});
