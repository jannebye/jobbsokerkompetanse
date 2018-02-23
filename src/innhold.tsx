import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import Startside from './startside/startside';
import { Switch, Route } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { fetchTema, hentRaad } from './ducks/raad-duck';
import { connect } from 'react-redux';
import { Dispatch } from './types';

interface DispatchProps {
    doHentRaad: () => void;
}

type InnholdProps = DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

class Innhold extends React.Component<InnholdProps> {
    constructor(props: InnholdProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentRaad();
    }

    render() {
        return (
            <React.Fragment>
                <Switch location={this.props.history.location}>
                    <Route path="/kartleggingside/:spmId" component={Skjema} />
                    <Route path="/startside" component={Startside} />
                    <Route path="/resultatside" component={Resultat} />
                    <Route exact={true} path="/" component={Startside} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentRaad: () => fetchTema().then(raad => dispatch(hentRaad(raad)))
});

export default withRouter(connect(null, mapDispatchToProps)(Innhold));
