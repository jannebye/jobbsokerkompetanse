import { combineReducers } from 'redux';
import svarReducer, { SvarState } from './svar-duck';
import persistent from '../utils/persistentReducer';
import { initialState as initialSvarState } from './svar-duck';
import sideReducer, {
    SideState,
    initialState as initialSideState
} from './side-duck';
import raadReducer, { RaadState } from './raad-duck';
import tipsReducer, { TipsState } from './tips-duck';

export interface AppState {
    svar: SvarState;
    side: SideState;
    raad: RaadState;
    tips: TipsState;
}

export default combineReducers<AppState>({
    svar: persistent(
        'besvarelseState',
        location,
        svarReducer,
        initialSvarState
    ),
    side: persistent('sideState', location, sideReducer, initialSideState),
    raad: raadReducer,
    tips: tipsReducer,
});
