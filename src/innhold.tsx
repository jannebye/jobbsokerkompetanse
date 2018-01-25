import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import { AppState } from './ducks/reducer';
import { connect } from 'react-redux';
import { BesvarelseModell } from './svar/svar-modell';
import { Sidetype } from './utils/konstanter';
import { Dispatch } from './types';
import { endreSide } from './ducks/side-duck';
import Startside from './skjema/startside';
import { reset } from './svar/svar-duck';

interface DispatchProps {
    reset: () => Promise<{}>;
    byttSide: (side: Sidetype) => void;
}

interface InnholdStateProps {
    besvarteSporsmal: BesvarelseModell[];
    side: Sidetype;
}

type Props = InnholdStateProps & DispatchProps;

class Innhold extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startKartlegging = this.startKartlegging.bind(this);
        this.startPaNytt = this.startPaNytt.bind(this);
    }

    handleSubmit() {
        return this.props.byttSide(Sidetype.RESULTAT);
    }

    startKartlegging() {
        return this.props.byttSide(Sidetype.KARTLEGGING);
    }

    startPaNytt() {
        return this.props
            .reset()
            .then(res => this.props.byttSide(Sidetype.START));
    }

    render() {
        return this.props.side === Sidetype.START ? (
            <Startside startKartlegging={() => this.startKartlegging()} />
        ) : this.props.side === Sidetype.KARTLEGGING ? (
            <Skjema
                handleSubmit={() => this.handleSubmit()}
                startPaNytt={() => this.startPaNytt()}
            />
        ) : (
            <Resultat startPaNytt={() => this.startPaNytt()} />
        );
    }
}

const mapStateToProps = (state: AppState): InnholdStateProps => ({
    besvarteSporsmal: state.svar.data,
    side: state.side.data
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    reset: () => new Promise(resolve => resolve(dispatch(reset()))),
    byttSide: (side: Sidetype) => dispatch(endreSide(side))
});

export default connect(mapStateToProps, mapDispatchToProps)(Innhold);
