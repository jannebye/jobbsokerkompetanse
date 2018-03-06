import {
    Handling, ActionType, LeggTilBesvartSporsmalAction, SjekkAvhengigheterAction
} from '../actions';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import alleSporsmal from '../sporsmal/sporsmal-alle';
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
        case ActionType.LEGG_TIL_BESVART_SPORSMAL: {
            tempListe = state.besvarteSporsmal.filter(spm => spm.spmId !== action.spmId);
            let besvartSpm: BesvartSporsmal = {
                spmId: action.spmId,
                svar: action.svar,
                tips: action.tips
            };
            return {...state, besvarteSporsmal: tempListe.concat(besvartSpm)};
        }
        case ActionType.SJEKK_AVHENGIGHETER:
            const avhengighet =
                Avhengigheter.find(avh =>
                    avh.sporsmalId === action.spmId
                );
            if (avhengighet) {
                if (avhengighet.svarId === action.svarId) {
                    return {
                        ...state,
                        sporsmalSomVises: fjernAvhengighetsSporsmal(
                            state.sporsmalSomVises,
                            avhengighet.sporsmalSomSkalFjernes
                        )
                    };
                }
                return {
                    ...state,
                    sporsmalSomVises: inkluderAvhengighetsSporsmal(
                        state,
                        avhengighet.sporsmalSomSkalFjernes
                    )
                };
            }
            return {...state};
        default:
            return state;
    }
}

export function sporsmalSomSkalVisesInneholderAvhengighetsSporsmal(sporsmalSomVises: string[],
                                                                   avhengighetsSporsmal: string[]): boolean {
    return avhengighetsSporsmal.some(
        spmIkkeVises => sporsmalSomVises.some(
            spmVises => spmVises === spmIkkeVises
        )
    );
}

export function fjernAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomSkalFjernes: string[]): string[] {
    return sporsmalSomVises.filter(sporsmal => !sporsmalSomSkalFjernes.includes(sporsmal));
}

function leggTilAvhengihetsSporsmal(state: SporsmalState, sporsmalSomSkalLeggesTil: string[]): string[] {
    return state.sporsmalSomVises
        .concat(sporsmalSomSkalLeggesTil)
        .sort((a: string, b: string) => {
            const spmA = state.alleSporsmal.find(sporsmal => sporsmal.id === a)!;
            const spmB = state.alleSporsmal.find(sporsmal => sporsmal.id === b)!;
            return spmA.sorter - spmB.sorter;
        });
}

export function inkluderAvhengighetsSporsmal(state: SporsmalState, avhengighetsSporsmal: string[]): string[] {
    if (sporsmalSomSkalVisesInneholderAvhengighetsSporsmal(state.sporsmalSomVises, avhengighetsSporsmal)) {
        return state.sporsmalSomVises;
    }
    return leggTilAvhengihetsSporsmal(state, avhengighetsSporsmal);
}

export function leggTilBesvartSporsmal(spmId: string, svar: string[],
                                       tips: string | undefined): LeggTilBesvartSporsmalAction {
    return {
        type: ActionType.LEGG_TIL_BESVART_SPORSMAL,
        spmId: spmId,
        svar: svar,
        tips: tips
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
