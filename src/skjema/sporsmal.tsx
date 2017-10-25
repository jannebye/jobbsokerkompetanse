import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { besvar } from '../svar/svar-duck';
import { Dispatch } from '../types';

interface DispatchProps {
    besvarSporsmal: () => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
}

type SporsmalProps = DispatchProps & OwnProps;

const Sporsmal = function({ sporsmal, besvarSporsmal }: SporsmalProps) {
    return (
        <section className="sporsmal">
            <h1 className="typo-element blokk-xs">{sporsmal.id}</h1>
            <button className="knapp knapp--hoved" onClick={besvarSporsmal}>
                svar
            </button>
        </section>
    );
};

const mapDispatchToProps = (
    dispatch: Dispatch,
    props: OwnProps
): DispatchProps => ({
    besvarSporsmal: () =>
        dispatch(
            besvar({
                sporsmalId: props.sporsmal.id,
                svarAlternativer: []
            })
        )
});

export default connect(null, mapDispatchToProps)(Sporsmal);
