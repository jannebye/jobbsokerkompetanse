import { Dispatch as ReduxDispatch } from 'redux';
import { AppState } from './reducer';

export interface Dispatch extends ReduxDispatch<AppState> {}