import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import { AppState } from './reducer';
import { connect } from 'react-redux';
import BesvarelseModell from './svar/svar-modell';

interface InnholdStateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface InnholdProps {
    visResultat: boolean;
}

class Innhold extends React.Component<InnholdStateProps, InnholdProps> {
    constructor(props: InnholdStateProps) {
        super(props);

        this.state = { visResultat: false };
    }

    handleSubmit() {
        this.setState({ visResultat: true}); // Foreløpig
    }

render() {
    const erAlleSpormalBesvart = this.state.visResultat;
    return (
            erAlleSpormalBesvart ?
                <Resultat/> : <Skjema handleSubmit={() => this.handleSubmit()}/>
    );
}
}

const mapStateToProps = (state: AppState): InnholdStateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Innhold);
