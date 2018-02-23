import {
    Handling, ActionType, LeggTilBesvartSporsmalAction, SjekkAvhengigheterAction
} from '../actions';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { visTipsEtterSporsmal } from '../skjema/tips/tips-generering';
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
            return {...state, sporsmalSomVises: tempListe};

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
                        return {...spm, tips: tips};
                    }
                    return spm;
                });
            }
            return {...state, besvarteSporsmal: tempListe};
        }

        case ActionType.SJEKK_AVHENGIGHETER:
            const avhengighet =
                Avhengigheter.find(avh =>
                    avh.sporsmalId === action.spmId &&
                    avh.svarId === action.svarId
                );

            if (avhengighet) {
                if (inneholderSporsmalSomSkalFjernes(state.sporsmalSomVises, avhengighet.sporsmalSomSkalFjernes)) {
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
                    sporsmalSomVises: leggTilAvhengighetsSporsmal(
                        state.sporsmalSomVises,
                        avhengighet.sporsmalSomSkalFjernes
                    )
                };
            }
            return {...state};

        default:
            return state;
    }
}

export function inneholderSporsmalSomSkalFjernes(sporsmalSomVises: string[], sporsmalSomSkalFjernes: string[]): boolean {
    return sporsmalSomSkalFjernes.some(
        spmIkkeVises => sporsmalSomVises.some(
            spmVises => spmVises === spmIkkeVises
        )
    );
}

export function fjernAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomSkalFjernes: string[]): string[] {
    return sporsmalSomVises.filter(sporsmal => !sporsmalSomSkalFjernes.includes(sporsmal));
}

export function leggTilAvhengighetsSporsmal(sporsmalSomVises: string[], sporsmalSomSkalFjernes: string[]): string[] {
    return sorterListeOgFjernDuplikater([...sporsmalSomVises, ...sporsmalSomSkalFjernes]);
}

function sorterListeOgFjernDuplikater(spm: string[]): string[] {
    return alleSporsmal
        .map(sporsmal => sporsmal.id)
        .filter(sporsmal => spm.includes(sporsmal));
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
    };
}

export function harBesvartSpm(utforteBesvarelser: BesvartSporsmal[], sporsmalId: SporsmalId): boolean {
    return utforteBesvarelser.map((besvarelse) => {
        return besvarelse.spmId;
    }).includes(sporsmalId);
}
