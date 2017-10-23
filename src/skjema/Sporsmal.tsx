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

const Sporsmal = function ({sporsmal, besvarSporsmal}: SporsmalProps) {
    return (
        <div className="sporsmal">
            <h4>{sporsmal.id}</h4>
            <button onClick={besvarSporsmal}>svar</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
    besvarSporsmal: () => dispatch(besvar({
        sporsmalId: props.sporsmal.id,
        svarAlternativer: []
    }))
});

export default connect(null, mapDispatchToProps)(Sporsmal);
