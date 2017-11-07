import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import { selectErAlleSpormalBesvart } from './svar/svar-selector';
import { AppState } from './reducer';
import { connect } from 'react-redux';
import BesvarelseModell from './svar/svar-modell';

interface InnholdStateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface InnholdProps {
    erAlleSporsmalBesvart: boolean;
}

class Innhold extends React.Component<InnholdStateProps, InnholdProps> {
    constructor(props: any) { // tslint:disable-line:no-any
        super(props);

        this.state = { erAlleSporsmalBesvart: false };
    }

    handleSubmit() {
        if (selectErAlleSpormalBesvart(this.props.besvarteSporsmal)) {
            this.setState({ erAlleSporsmalBesvart: true });
            return <div>OK</div>;
        } else {
            return (
              <div>Ikke alle spørsmål er besvart</div>
            );
        }
    }

render() {
    const erAlleSpormalBesvart = this.state.erAlleSporsmalBesvart;
    return (
            erAlleSpormalBesvart ?
                <Resultat/> : <Skjema handleSubmit={this.handleSubmit}/>
    );
}
}

const mapStateToProps = (state: AppState): InnholdStateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Innhold);
