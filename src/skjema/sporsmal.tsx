import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { besvar, marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../reducer';

interface DispatchProps {
    besvarSporsmal: (sporsmalId: number, svar: string[]) => void;
    markerAlternativ: (alternativ: string) => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    markerteAlternativ: string[];
}

type SporsmalProps = DispatchProps & OwnProps & StateProps;

const Sporsmal = function ({sporsmal, besvarSporsmal, markerAlternativ, markerteAlternativ}: SporsmalProps) {
    return (
        <div className="sporsmal">
            <h4 className="typo-element blokk-xs">{sporsmal.sporsmal}</h4>
            {sporsmal.alternativer.map((alternativ) =>
                <button key={alternativ} onClick={() => markerAlternativ(alternativ)}>{alternativ}</button>)}
            <button className="knapp knapp--hoved" key="besvar" onClick={() => besvarSporsmal(sporsmal.id, markerteAlternativ)}>Fortsett</button>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    markerteAlternativ: state.svar.alternativer
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
    markerAlternativ: (alternativ: string) => dispatch(marker(alternativ)),
    besvarSporsmal: (sporsmal, svar) => dispatch(besvar({
        sporsmalId: props.sporsmal.id,
        svarAlternativer: svar
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
