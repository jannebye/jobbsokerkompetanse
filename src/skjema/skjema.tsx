import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal, stoppForAViseNyttTips } from '../ducks/side-duck';
import { RouteComponentProps, withRouter } from 'react-router';
import { harBesvartSpm } from '../ducks/sporsmal-duck';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';
import { lastInnBesvartSporsmal, nullStillAvitteSvar } from '../ducks/svar-duck';

interface UrlProps {
    spmId: string;
}

interface StateProps {
    besvarteSporsmal: BesvartSporsmal[];
}

interface DispatchProps {
    byttSpm: (sporsmalId: string, spmErBeesvart: boolean) => void;
    doLastInnBesvartSporsmal: (svar: string[], tips: string | undefined) => void;
    doNullStillAvgitteSvar: () => void;
    doStoppForAViseNyttTips: (stopp: boolean) => void;
}

type SkjemaProps = StateProps & DispatchProps & RouteComponentProps<any> & UrlProps; // tslint:disable-line:no-any

class Skjema extends React.PureComponent<SkjemaProps, {}> {
    private sporsmalRefs = {};

    constructor(props: SkjemaProps) {
        super(props);
    }

    componentWillUpdate() {
        this.props.doNullStillAvgitteSvar();
        this.props.doStoppForAViseNyttTips(false);
    }

    componentDidUpdate() {
        const sporsmalId = this.props.match.params.spmId;
        this.props.byttSpm(sporsmalId, harBesvartSpm(this.props.besvarteSporsmal, sporsmalId));
        this.oppdaterSporsmal();
    }

    oppdaterSporsmal() {
        const besvartSpm = this.props.besvarteSporsmal.find(
            besvart => besvart.spmId === this.props.match.params.spmId);
        if (besvartSpm !== undefined) {
            this.props.doLastInnBesvartSporsmal(besvartSpm.svar, besvartSpm.tips);
        }
    }

    render() {
        const {spmId} = this.props.match.params;
        let sporsmalRefs = this.sporsmalRefs;

        return (
            <Sporsmal
                key={spmId}
                sporsmal={
                    alleSporsmal.find(
                        sporsmal => sporsmal.id === spmId
                    )!
                }
                spmRef={(ref: {}) => (sporsmalRefs[spmId] = ref)}
            />
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.sporsmal.besvarteSporsmal
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    byttSpm: (sporsmalId: string, spmErBesvart: boolean) =>
        dispatch(nesteSporsmal(sporsmalId, spmErBesvart)),
    doLastInnBesvartSporsmal: (svar: string[], tips: string | undefined) =>
        dispatch(lastInnBesvartSporsmal(svar, tips)),
    doNullStillAvgitteSvar: () => dispatch(nullStillAvitteSvar()),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skjema));
