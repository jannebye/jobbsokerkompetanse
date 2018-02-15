import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../ducks/side-duck';
import { RouteComponentProps, withRouter } from 'react-router';
import { harBesvartSpm } from '../ducks/svar-duck';
import { BesvarelseModell } from '../svar/svar-modell';

interface UrlProps {
    spmId: string;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
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
        this.props.byttSpm(this.props.match.params.spmId, harBesvartSpm(this.props.besvarteSporsmal, this.props.match.params.spmId));
    }

    componentDidUpdate() {
        this.props.byttSpm(this.props.match.params.spmId, harBesvartSpm(this.props.besvarteSporsmal, this.props.match.params.spmId));
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
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    byttSpm: (sporsmalId: string, spmErBesvart: boolean) =>
        dispatch(nesteSporsmal(sporsmalId, spmErBesvart))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skjema));
