import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../ducks/side-duck';
import { RouteComponentProps, withRouter } from 'react-router';
import { harBesvartSpm } from '../ducks/sporsmal-duck';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';

interface UrlProps {
    spmId: string;
}

interface StateProps {
    besvartSporsmal: BesvartSporsmal[];
}

interface DispatchProps {
    byttSpm: (sporsmalId: string, spmErBeesvart: boolean) => void;
}

type SkjemaProps = StateProps & DispatchProps & RouteComponentProps<any> & UrlProps; // tslint:disable-line:no-any

class Skjema extends React.PureComponent<SkjemaProps, {}> {
    private sporsmalRefs = {};

    constructor(props: SkjemaProps) {
        super(props);
    }

    componentWillMount() {
        const sporsmalId = this.props.match.params.spmId;
        this.props.byttSpm(sporsmalId, harBesvartSpm(this.props.besvartSporsmal, sporsmalId));
    }

    componentDidUpdate() {
        const sporsmalId = this.props.match.params.spmId;
        this.props.byttSpm(sporsmalId, harBesvartSpm(this.props.besvartSporsmal, sporsmalId));
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
    besvartSporsmal: state.sporsmal.besvarteSporsmal
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    byttSpm: (sporsmalId: string, spmErBesvart: boolean) =>
        dispatch(nesteSporsmal(sporsmalId, spmErBesvart))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skjema));
