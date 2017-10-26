import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { besvar, marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../reducer';
import { ettValgHjelpetekst, flereValgHjelpetekst, skalaHjelpetekst } from '../tekster/hjelptetekster';
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
    besvarSporsmal: (sporsmalId: number, svar: string[]) => void;
    markerAlternativ: (alternativ: SvarAlternativModell) => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    markerteAlternativ: string[];
}

type SporsmalProps = DispatchProps & OwnProps & StateProps;

const Sporsmal = function ({sporsmal, besvarSporsmal, markerAlternativ, markerteAlternativ}: SporsmalProps) {
    const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
    return (
        <section className="sporsmal">
            <h1 className="typo-element blokk-xs">{sporsmal.sporsmal}</h1>
            {sporsmal.alternativer.map((alternativ) =>
                <div className="svar">
                    <input id={alternativ.id} className="svar__radio" type="radio" name={sporsmal.id.toString()}/>
                    <label
                        for={alternativ.id}
                        className="svar__label"
                        key={alternativ}
                        onClick={() => markerAlternativ(alternativ)}
                    >
                        {alternativ.tekst}
                    </label>
                </div>
            )}
            <button className="knapp knapp--hoved" key="besvar" onClick={() => besvarSporsmal(sporsmal.id, markerteAlternativ)}>Fortsett</button>
        </section>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    markerteAlternativ: state.svar.alternativer
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
    markerAlternativ: (alternativ: SvarAlternativModell) => dispatch(marker(alternativ)),
    besvarSporsmal: (sporsmal, svar) => dispatch(besvar({
        sporsmalId: props.sporsmal.id,
        svarAlternativer: svar
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
