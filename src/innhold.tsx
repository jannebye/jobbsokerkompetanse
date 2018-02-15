import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import Startside from './startside/startside';
import { Switch, Route } from 'react-router-dom';
import { RouteComponentProps, withRouter } from "react-router";

class Innhold extends React.Component<RouteComponentProps<any>, {}> {
    constructor(props: RouteComponentProps<any>) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Switch location={this.props.history.location}>
                    <Route path="/kartleggingside/:spmId" component={Skjema} />
                    <Route path="/startside" component={Startside} />
                    <Route path="/resultatside" component={Resultat} />
                    <Route exact path="/" component={Startside} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(Innhold);
