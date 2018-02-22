import {
    Handling, ActionType, LeggTilBesvartSporsmalAction, SjekkAvhengigheterAction
} from '../actions';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import alleSporsmal  from '../sporsmal/sporsmal-alle';
import { SporsmalId } from './side-duck';
import Avhengigheter from '../utils/avhengigheter';

export interface BesvartSporsmal {
    spmId: string;
    svar: string[];
    tips: string | undefined;
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
                tips: action.tips,
            };
            return { ...state, besvarteSporsmal: tempListe.concat(besvartSpm) };
        }
        case ActionType.SJEKK_AVHENGIGHETER:
            const avhengighet = Avhengigheter.find(a => a.sporsmalId === action.spmId);
            if (avhengighet) {

                if (viserAvhengighetsSporsmal(state.sporsmalSomVises, avhengighet.sporsmalSomIkkeVises)) {
                    return {
                        ...state,
                        sporsmalSomVises: fjernAvhengighetsSporsmal(
                            state.sporsmalSomVises,
                            avhengighet.sporsmalSomIkkeVises
                        )
                    };
                }
                return {
                    ...state,
                    sporsmalSomVises: leggTilAvhengighetsSporsmal(
                        state.sporsmalSomVises,
                        avhengighet.sporsmalSomIkkeVises
                    )
                };
            }
            return { ...state };
        default:
            return state;
    }
}

function viserAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomIkkeVises: string[]): boolean {
    return sporsmalSomIkkeVises.some(
        spmIkkeVises => sporsmalSomVises.some(
            spmVises => spmVises === spmIkkeVises
        )
    );
}

function fjernAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomIkkeVises: string[]): string[] {
    return sporsmalSomVises.filter(
        spmVises => sporsmalSomIkkeVises.some(
            spmIkkeVises => spmIkkeVises === spmVises
        )
    );
}

function leggTilAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomIkkeVises: string[]): string[] {
    return sporsmalSomVises.filter(
        spmVises => sporsmalSomIkkeVises.some(
            spmIkkeVises => spmIkkeVises !== spmVises
        )
    );
}

export function leggTilBesvartSporsmal(spmId: string, svar: string[],
                                       tips: string | undefined): LeggTilBesvartSporsmalAction {
    return {
        type: ActionType.LEGG_TIL_BESVART_SPORSMAL,
        spmId: spmId,
        svar: svar,
        tips: tips,
    };
}

export function sjekkAvhengigheter(svarId: string, spmId: string): SjekkAvhengigheterAction {
    return {
        type: ActionType.SJEKK_AVHENGIGHETER,
        svarId: svarId,
        spmId: spmId
    };
}

export function harBesvartSpm(utforteBesvarelser: BesvartSporsmal[], sporsmalId: SporsmalId): boolean {
    return utforteBesvarelser.map((besvarelse) => {
        return besvarelse.spmId;
    }).includes(sporsmalId);
}
