import * as React from 'react';
import Skjema from './skjema/skjema';
import Resultat from './resultat/resultat';
import { AppState } from './ducks/reducer';
import { connect } from 'react-redux';
import { BesvarelseModell } from './svar/svar-modell';
import { Sidetype } from './utils/konstanter';
import { Dispatch } from './types';
import { endreSide } from './ducks/side-duck';
import Startside from './startside/startside';
import { reset } from './ducks/svar-duck';
import { hentRaad, fetchTema } from './ducks/raad-duck';

const baseUrl = '/jobbsokerkompetanse/';

interface DispatchProps {
    reset: () => Promise<{}>;
    byttSide: (side: Sidetype) => void;
    doHentRaad: () => void;
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

    componentDidMount() {
        this.props.doHentRaad();
        const innholdProps = this.props;
        window.addEventListener('popstate', function() {
            const path = window.location.pathname.split('/');
            const page = path[path.length - 1];
            switch (page) {
                case 'startside':
                    return innholdProps.byttSide(Sidetype.START);
                case 'kartleggingside':
                    return innholdProps.byttSide(Sidetype.KARTLEGGING);
                case 'resultatside':
                    return innholdProps.byttSide(Sidetype.RESULTAT);
                default:
                    break;
            }
        });
        history.pushState(this.props.besvarteSporsmal, '', baseUrl + Sidetype.START);
    }

    handleSubmit() {
        history.pushState(this.props.besvarteSporsmal, '', baseUrl + Sidetype.RESULTAT);
        return this.props.byttSide(Sidetype.RESULTAT);
    }

    startKartlegging() {
        history.pushState(this.props.besvarteSporsmal, '', baseUrl + Sidetype.KARTLEGGING);
        return this.props.byttSide(Sidetype.KARTLEGGING);
    }

    startPaNytt() {
        history.pushState(this.props.besvarteSporsmal, '', baseUrl + Sidetype.START);
        return this.props
            .reset()
            .then(() => this.props.byttSide(Sidetype.START));
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
            <Resultat />
        );
    }
}

const mapStateToProps = (state: AppState): InnholdStateProps => ({
    besvarteSporsmal: state.svar.data,
    side: state.side.data
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    reset: () => new Promise(resolve => resolve(dispatch(reset()))),
    byttSide: (side: Sidetype) => dispatch(endreSide(side)),
    doHentRaad: () => fetchTema().then(raad => dispatch(hentRaad(raad)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Innhold);
