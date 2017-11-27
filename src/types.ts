import { Dispatch as ReduxDispatch } from 'redux';
import { AppState } from './ducks/reducer';

export interface Dispatch extends ReduxDispatch<AppState> {}
