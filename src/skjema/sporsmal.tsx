import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { besvar, marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../reducer';
import {
    ettValgHjelpetekst,
    flereValgHjelpetekst,
    skalaHjelpetekst
} from '../tekster/hjelptetekster';
import SvarAlternativModell from '../sporsmal/svaralternativ';

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
    besvarSporsmal: (sporsmalId: number, svar: SvarAlternativModell[]) => void;
    markerAlternativ: (alternativ: SvarAlternativModell) => void;
}

interface OwnProps {
    isActive: boolean;
    sporsmal: SporsmalModell;
}

interface StateProps {
    markerteAlternativ: SvarAlternativModell[];
}

export type SporsmalProps = DispatchProps & OwnProps & StateProps;

const Sporsmal = function({
    isActive,
    sporsmal,
    besvarSporsmal,
    markerAlternativ,
    markerteAlternativ
}: SporsmalProps) {
    const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
    const cls = ['sporsmal', isActive ? 'active' : ''].join(' ');
    return (
        <li id={'sp-' + sporsmal.id} className={cls}>
            <h1 className="typo-element blokk-xs">{sporsmal.sporsmal}</h1>
            <p className="hjelpetekst">{hjelpetekst}</p>
            {sporsmal.alternativer.map(alternativ => (
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
                        className="svar__label"
                        onClick={() => markerAlternativ(alternativ)}
                    >
                        {alternativ.tekst}
                    </label>
                </div>
            ))}
            <button
                className="knapp knapp--hoved"
                key="besvar"
                onClick={() => besvarSporsmal(sporsmal.id, markerteAlternativ)}
            >
                Fortsett
            </button>
        </li>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    markerteAlternativ: state.svar.alternativer
});

const mapDispatchToProps = (
    dispatch: Dispatch,
    props: OwnProps
): DispatchProps => ({
    markerAlternativ: (alternativ: SvarAlternativModell) =>
        dispatch(marker(alternativ)),
    besvarSporsmal: (sporsmal, svar) =>
        dispatch(
            besvar({
                sporsmalId: props.sporsmal.id,
                svarAlternativer: svar
            })
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
