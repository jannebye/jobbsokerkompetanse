import {
    Handling, ActionType, LeggTilSporsmalSomVisesAction, FjerneSporsmalSomVisesAction, LeggTilBesvartSporsmalAction, SjekkAvhengigheterAction
} from '../actions';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import alleSporsmal  from '../sporsmal/sporsmal-alle';
import { visTipsEtterSporsmal } from '../skjema/tips/tips-generering-ny';
import { SporsmalId } from './side-duck';
import Avhengigheter from '../utils/avhengigheter';

export interface BesvartSporsmal {
    spmId: string;
    svar: string[];
    tips?: string;
}

export interface SporsmalState {
    alleSporsmal: SporsmalModell[];
    sporsmalSomVises: string[];
    besvarteSporsmal: BesvartSporsmal[];
}

export const initialState = {
    alleSporsmal: alleSporsmal,
    sporsmalSomVises: alleSporsmal.map((spm) => spm.id),
    besvarteSporsmal: []
};

//  Reducer
export default function reducer(state: SporsmalState = initialState, action: Handling): SporsmalState {
    let tempListe;
    switch (action.type) {
        case ActionType.LEGG_TIL_SPORSMAL_SOM_VISES:
            tempListe = state.sporsmalSomVises.includes(action.spmId) ?
                state.sporsmalSomVises :
                state.sporsmalSomVises.concat(action.spmId);
            return { ...state, sporsmalSomVises: tempListe };
        case ActionType.LEGG_TIL_BESVART_SPORSMAL: {
            tempListe = state.besvarteSporsmal.filter(spm => spm.spmId !== action.spmId);
            let besvartSpm: BesvartSporsmal = {
                spmId: action.spmId,
                svar: action.svar,
            };
            tempListe = tempListe.concat(besvartSpm);
            const tips = visTipsEtterSporsmal(action.spmId, tempListe);
            if (tips) {
                tempListe = tempListe.map(spm => {
                    if (spm.spmId === action.spmId) {
                        return { ...spm, tips: tips };
                    }
                    return spm;
                });
            }
            return { ...state, besvarteSporsmal: tempListe };
        }
        case ActionType.SJEKK_AVHENGIGHETER:
            const avhengighet = Avhengigheter.find(a => a.sporsmalId === action.spmId);
            if (avhengighet) {

                if (avhengighet.sporsmalSomIkkeVises)

                return {
                    ...state,
                    sporsmalSomVises: state.sporsmalSomVises.filter(
                        spmVises => avhengighet.sporsmalSomIkkeVises.some(
                            spmIkkeVises => spmIkkeVises !== spmVises
                        )
                    )
                };
            }
            return { ...state };
        default:
            return state;
    }
}

export function leggTilSporsmalSomVises(spmId: string): LeggTilSporsmalSomVisesAction {
    return {
        type: ActionType.LEGG_TIL_SPORSMAL_SOM_VISES,
        spmId: spmId,
    };
}

export function leggTilBesvartSporsmal(spmId: string, svar: string[]): LeggTilBesvartSporsmalAction {
    return {
        type: ActionType.LEGG_TIL_BESVART_SPORSMAL,
        spmId: spmId,
        svar: svar,
    };
}

export function sjekkAvhengigheter(svarId: string, spmId: string): SjekkAvhengigheterAction {
    return {
        type: ActionType.SJEKK_AVHENGIGHETER,
        svarId: svarId,
        spmId: spmId
    }
}

export function harBesvartSpm(utforteBesvarelser: BesvartSporsmal[], sporsmalId: SporsmalId): boolean {
    return utforteBesvarelser.map((besvarelse) => {
        return besvarelse.spmId;
    }).includes(sporsmalId);
}
