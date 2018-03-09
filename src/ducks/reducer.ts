import { combineReducers } from 'redux';
import persistent from '../utils/persistentReducer';
import sideReducer, {
    SideState,
    initialState as initialSideState
} from './side-duck';
import raadReducer, { RaadState } from './raad-duck';
import tipsReducer, { TipsState } from './tips-duck';
import sporsmalReducer, { SporsmalState, initialState as initialSporsmalState } from './sporsmal-duck';
import svarReducer, { SvarState } from './svar-duck';

export interface AppState {
    side: SideState;
    raad: RaadState;
    tips: TipsState;
    sporsmal: SporsmalState;
    svar: SvarState;
}

export default combineReducers<AppState>({
    side: persistent('sideState', location, sideReducer, initialSideState),
    raad: raadReducer,
    tips: tipsReducer,
    sporsmal: persistent('sporsmalState', location, sporsmalReducer, initialSporsmalState),
    svar: svarReducer,
});
