import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { byttSporsmal, stoppForAViseNyttTips } from '../ducks/side-duck';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { harBesvartSpm } from '../ducks/sporsmal-duck';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';
import { lastInnBesvartSporsmal, nullStillAvitteSvar } from '../ducks/svar-duck';
import { Framdrift } from './framdrift';

interface UrlProps {
    spmId: string;
}

interface StateProps {
    besvarteSporsmal: BesvartSporsmal[];
    sporsmalSomVises: string[];
    avgitteSvar: string[];
    spmIdLagret: string;
}

interface DispatchProps {
    doByttSporsmal: (sporsmalId: string, spmErBeesvart: boolean) => void;
    doLastInnBesvartSporsmal: (svar: string[], tips: string | undefined) => void;
    doNullStillAvgitteSvar: () => void;
    doStoppForAViseNyttTips: (stopp: boolean) => void;
}

interface MatchParams {
    spmId: string;
}

export type SkjemaProps = StateProps & DispatchProps & RouteComponentProps<MatchParams> & UrlProps;

class Skjema extends React.PureComponent<SkjemaProps, {}> {
    constructor(props: SkjemaProps) {
        super(props);
    }

    componentWillUpdate(nextProps: SkjemaProps) {
        if (nextProps.spmIdLagret !== this.props.spmIdLagret) {
            this.props.doStoppForAViseNyttTips(false);
        }
    }

    componentDidUpdate(prevProps: SkjemaProps) {
        if (prevProps.spmIdLagret !== this.props.spmIdLagret) {
            const sporsmalId = this.props.match.params.spmId;
            this.props.doByttSporsmal(sporsmalId, harBesvartSpm(this.props.besvarteSporsmal, sporsmalId));
            this.oppdaterSporsmal();
        }
    }

    oppdaterSporsmal() {
        const besvartSpm = this.props.besvarteSporsmal.find(
            besvart => besvart.spmId === this.props.match.params.spmId);
        if (besvartSpm !== undefined && this.props.avgitteSvar.length === 0) {
            this.props.doLastInnBesvartSporsmal(besvartSpm.svar, besvartSpm.tips);
        }
    }

    forrigeSporsmalErBesvart() {
        const {sporsmalSomVises, match, besvarteSporsmal} = this.props;
        const forrigeSpmId = sporsmalSomVises[sporsmalSomVises.indexOf(match.params.spmId) - 1];
        return besvarteSporsmal.map(besvartSpm => besvartSpm.spmId).includes(forrigeSpmId);
    }

    erForsteSporsmal() {
        return this.props.match.params.spmId === this.props.sporsmalSomVises[0];
    }

    render() {
        const {sporsmalSomVises, spmIdLagret} = this.props;
        const {spmId} = this.props.match.params;
        const sporsmal = alleSporsmal.find(spm => spm.id === spmId)!;

        if (this.forrigeSporsmalErBesvart() || this.erForsteSporsmal()) {
            return (
                <React.Fragment>
                    <Framdrift sporsmal={sporsmal} sporsmalSomVises={sporsmalSomVises} lagretSpmId={spmIdLagret}/>
                    <Sporsmal
                        key={spmId}
                        sporsmal={sporsmal}
                    />
                </React.Fragment>
            );
        }
        return <Redirect to={'/startside'}/>;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.sporsmal.besvarteSporsmal,
    sporsmalSomVises: state.sporsmal.sporsmalSomVises,
    avgitteSvar: state.svar.avgitteSvar,
    spmIdLagret: state.side.spmId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doByttSporsmal: (sporsmalId: string, spmErBesvart: boolean) =>
        dispatch(byttSporsmal(sporsmalId, spmErBesvart)),
    doLastInnBesvartSporsmal: (svar: string[], tips: string | undefined) =>
        dispatch(lastInnBesvartSporsmal(svar, tips)),
    doNullStillAvgitteSvar: () => dispatch(nullStillAvitteSvar()),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skjema));
