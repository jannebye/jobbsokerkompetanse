import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../reducer';
import {
    ettValgHjelpetekst,
    flereValgHjelpetekst,
    skalaHjelpetekst
} from '../tekster/hjelptetekster';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';

function finnHjelpetekst(type: string): string {
    switch (type) {
        case 'flervalg':
            return flereValgHjelpetekst;
        case 'ettvalg':
            return ettValgHjelpetekst;
        case 'skala':
            return skalaHjelpetekst;
        default:
            return '';
    }
}

interface DispatchProps {
    markerAlternativ: (sporsmalId: number, alternativ: SvarAlternativModell[]) => void;
}

interface OwnProps {
    isActive: boolean;
    sporsmal: SporsmalModell;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}

export type SporsmalProps = DispatchProps & OwnProps & StateProps;

function prepMarkerAlternativ(alternativ: SvarAlternativModell, erValgt: boolean,
                              alternativListe: SvarAlternativModell[]): SvarAlternativModell[] {
    if (erValgt) {
        return alternativListe.filter((alt) => alt.id !== alternativ.id);
    } else {
        return [...alternativListe, alternativ];
    }
}

const Sporsmal = function ({
                               isActive,
                               sporsmal,
                               markerAlternativ,
                               besvarteSporsmal
                           }: SporsmalProps) {
    const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
    const besvartSpm: BesvarelseModell | undefined =
        besvarteSporsmal.find((besvarelse) => besvarelse.sporsmalId === sporsmal.id);
    const markerteAlternativer: SvarAlternativModell[] = besvartSpm ? besvartSpm.svarAlternativer : [];
    const cls = ['sporsmal', isActive ? 'active' : ''].join(' ');
    return (
        <li id={'sp-' + sporsmal.id} className={cls}>
            <h1 className="typo-element blokk-xs">{sporsmal.sporsmal}</h1>
            <p className="hjelpetekst">{hjelpetekst}</p>
            {sporsmal.alternativer.map(function (alternativ: SvarAlternativModell) {
                const erValgt = !!markerteAlternativer.find(alt => alt.id === alternativ.id);
                return (
                    <div key={alternativ.id} className="svar">
                        <input
                            id={alternativ.id}
                            className="svar__radio"
                            type="radio"
                            name={sporsmal.id.toString()}
                            value={alternativ.id}
                        />
                        <label
                            htmlFor={alternativ.id}
                            className={`svar__label ${erValgt ? 'markert' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                markerAlternativ(sporsmal.id,
                                                 prepMarkerAlternativ(alternativ, erValgt, markerteAlternativer));
                            }}
                        >
                            {alternativ.tekst}
                        </label>
                    </div>
                );
            })}
            <button
                className="knapp knapp--hoved"
                key="besvar"
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                Fortsett
            </button>
        </li>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
