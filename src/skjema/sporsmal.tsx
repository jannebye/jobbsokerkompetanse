import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker, visHeleSporsmal } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Innholdstittel, Undertekst } from 'nav-frontend-typografi';
import AlternativContainer from './alternativ-container';

interface DispatchProps {
    markerAlternativ: (sporsmalId: string,
                       alternativ: SvarAlternativModell[]) => void;

    visAlternativer: () => void;
}

interface OwnProps {
    nesteSpm: (id: string) => void;
    forrigeSpm: () => void;
    sporsmal: SporsmalModell;
    spmRef: any; // tslint:disable-line:no-any
    viserAlternativer: boolean;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
    viserAlternativer: boolean;
    totaltAntallSpm: number;
}

interface EgenStateProps {
    feil: boolean;
}

type SporsmalProps = OwnProps & DispatchProps & StateProps;

class Sporsmal extends React.Component<SporsmalProps, EgenStateProps> {

    constructor(props: SporsmalProps) {
        super(props);
        this.state = {feil: false};
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[], sporsmalId: string) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        } else {
            return this.props.nesteSpm(sporsmalId);
        }
    }

    fjernFeil(markerteAlternativer: SvarAlternativModell[]) {
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
    }

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            forrigeSpm,
            spmRef,
            viserAlternativer,
            visAlternativer,
            totaltAntallSpm
        } = this.props;

        const markerteAlternativer: SvarAlternativModell[] = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id)!.svarAlternativer;
        const sporsmalImg = require('../ikoner/' + sporsmal.id + '.svg');

        return (
            <div
                ref={spmRef}
                id={'sp-' + sporsmal.id}
                className={viserAlternativer ? 'sporsmal vis_alternativer' : 'sporsmal'}
                tabIndex={0}
            >
                <section>
                    <div className={'sporsmal__start'}>
                        <div className="sporsmal__header">
                            {!sporsmal.erForsteSpm && (
                                <button
                                    className="sporsmal__knapp__tilbake"
                                    onClick={e => {
                                        e.preventDefault();
                                        forrigeSpm();
                                    }}
                                >
                                    <FormattedMessage id="forrige-knapp"/>
                                </button>
                            )}
                            <div className="sporsmal__paginering typo-normal">
                                <FormattedMessage
                                    id="paginering"
                                    values={{indeks: besvarteSporsmal.findIndex(
                                    besvarelse => besvarelse.sporsmalId === sporsmal.id) + 1, total: totaltAntallSpm}}
                                />
                            </div>
                        </div>
                        <div className="sporsmal__innhold">
                            <img
                                src={sporsmalImg}
                                className="sporsmal__ikon"
                                alt=""
                            />
                            <Innholdstittel className="sporsmal__overskrift typo-innholdstittel blokk-xs" tag="h1">
                                <FormattedHTMLMessage id={sporsmal.id}/>
                            </Innholdstittel>
                            {this.state.feil && (
                                <p className="skjemaelement__feilmelding">
                                    <FormattedMessage id="feilmelding-mangler-svar"/>
                                </p>
                            )}
                            <Undertekst className="sporsmal__ingress" tag="p">
                                <FormattedMessage id={sporsmal.egenUndertekst || sporsmal.type} />
                            </Undertekst>
                        </div>
                        <button
                            className="sporsmal__knapp sporsmal__videre"
                            onClick={e => {
                                e.preventDefault();
                                visAlternativer();
                            }}
                        >
                            <FormattedMessage id="fortsett-knapp"/>
                        </button>
                    </div>
                    <AlternativContainer
                        alternativer={sporsmal.alternativer}
                        markerteAlternativer={markerteAlternativer}
                        sporsmal={sporsmal}
                        markerAlternativ={(id, alternativ) => {this.fjernFeil(markerteAlternativer);
                                                               markerAlternativ(id, alternativ); }}
                    />
                </section>
                {!sporsmal.erSisteSpm && (
                    <button
                        className={'sporsmal__knapp'}
                        key="besvar"
                        onClick={e => {
                            e.preventDefault();
                            this.sjekkSvar(markerteAlternativer, sporsmal.id);
                        }}
                    >
                        <FormattedMessage id="fortsett-knapp"/>
                    </button>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data,
    viserAlternativer: state.svar.viserAlternativer,
    totaltAntallSpm: state.svar.totalAntallSpm
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ)),
    visAlternativer: () => dispatch(visHeleSporsmal)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
