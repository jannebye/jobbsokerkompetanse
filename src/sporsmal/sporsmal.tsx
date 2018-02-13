import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker, skjulTips, visTips, visHeleSporsmal, leggeTilSporsmal } from '../ducks/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../svar/svaralternativ';
import { BesvarelseModell } from '../svar/svar-modell';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import AlternativContainer from '../skjema/alternativ-container';
import TipsVisning from '../skjema/tips/tipsvisning';
import { visTipsEtterSporsmal } from '../skjema/tips/tips-generering';
import { isUndefined } from 'util';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import SVG from 'react-inlinesvg';
import KnappBase from 'nav-frontend-knapper';
import * as cls from 'classnames';
import { Sidetype } from '../utils/konstanter';
import { nesteSporsmal } from '../ducks/side-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { AvhengighetModell, default as Avhengigheter } from '../utils/avhengigheter';

const baseUrl = '/jobbsokerkompetanse/';

interface DispatchProps {
    markerAlternativ: (sporsmalId: string, alternativ: SvarAlternativModell[]) => void;
    visTips: (tipsId: string, spmId: string) => void;
    visAlternativer: () => void;
    gaTilNesteSporsmal: (spmId: string) => void;
}

interface OwnProps {
    forrigeSpm: () => void;
    startPaNytt: () => void;
    sporsmal: SporsmalModell;
    spmRef: any; // tslint:disable-line:no-any
    viserAlternativer: boolean;
    handleSubmit: () => void;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
    viserAlternativer: boolean;
    paVeiBakover: boolean;
    totaltAntallSpm: number;
}

interface EgenStateProps {
    feil: boolean;
}

type SporsmalProps = OwnProps & DispatchProps & StateProps;

export class Sporsmal extends React.Component<SporsmalProps, EgenStateProps> {
    constructor(props: SporsmalProps) {
        super(props);
        this.state = {feil: false};
    }

    finnNesteSpmIListe(id: string): string {
        const gjeldendeIndex = alleSporsmal.findIndex(spm => spm.id === id);
        return alleSporsmal.find((value, index) => index === gjeldendeIndex + 1)!
            .id;
    }

    finnNesteSpm(sporsmalId: string, forelopigBesvarelse: BesvarelseModell[]): string {
        const avhengighet: AvhengighetModell | undefined = Avhengigheter.find(
            avh => avh.sporsmalId === sporsmalId
        );
        if (
            !!avhengighet &&
            !!forelopigBesvarelse.find(
                b =>
                    !!b.svarAlternativer.find(
                        alternativ =>
                            alternativ.id === avhengighet.harSvartAlternativId
                    )
            )
        ) {
            return avhengighet.sendesTilSporsmalId;
        }

        return this.finnNesteSpmIListe(sporsmalId);
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[],
              sporsmalId: string,
              besvarteSporsmal: BesvarelseModell[],
              besvartSpm: BesvarelseModell) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        } else {
            const tip = visTipsEtterSporsmal(sporsmalId, besvarteSporsmal);
            if (isUndefined(besvartSpm.tips) && !isUndefined(tip)) {
                return this.props.visTips(tip, sporsmalId);
            } else {
                return this.props.gaTilNesteSporsmal(this.finnNesteSpm(sporsmalId, besvarteSporsmal));
            }
        }
    }

    fjernFeil(markerteAlternativer: SvarAlternativModell[]) {
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
    }

    componentDidMount() {
        history.pushState(
            this.props.besvarteSporsmal, '',
            baseUrl + Sidetype.KARTLEGGING + '/' + this.props.sporsmal.id);
        if (this.props.paVeiBakover) {
            window.scrollTo(0, 0);
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
            paVeiBakover,
            totaltAntallSpm,
            handleSubmit,
            startPaNytt
        } = this.props;

        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        )!; // Vil alltid ligge i listen

        let markerteAlternativer: SvarAlternativModell[] = [];
        if (besvartSpm) {
            markerteAlternativer = besvartSpm.svarAlternativer;
        }
        const sporsmalImg = require('../ikoner/' + sporsmal.id + '.svg');

        const erForsteSporsmal = () =>
            this.props.sporsmal.erForsteSpm ? startPaNytt() : forrigeSpm();

        const klassenavn = cls('sporsmal', {
            vis_alternativer: viserAlternativer,
            tilbake: paVeiBakover,
        });

        const gjeldendeSpmIndex = this.props.besvarteSporsmal.findIndex(
            besvarelse => besvarelse.sporsmalId === this.props.sporsmal.id
        ) + 1;
        console.log('spmId', this.props.sporsmal.id);
        console.log('besvarte', this.props.besvarteSporsmal);
        console.log('totaltAntallSpm', totaltAntallSpm);

        const framdriftValue = Math.round(gjeldendeSpmIndex / totaltAntallSpm * 100 * 100) / 100;
        /** @type {{search: React.CSSProperties}} */
        console.log('gjeldendeSpmIndex', gjeldendeSpmIndex);
        const framdriftStyle = {
            width: framdriftValue + '%'
        };

        return (
            <React.Fragment>
                <div
                    className="framdrift"
                    role="progressbar"
                    aria-valuenow={Math.round(framdriftValue)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    tabIndex={0}
                >
                    <div className="andel" style={framdriftStyle}/>
                </div>
                <div className="limit">
                    <div
                        ref={spmRef}
                        id={'sp-' + sporsmal.id}
                        className={klassenavn}
                        tabIndex={0}
                    >
                        <section>
                            <div className={'sporsmal__start'}>
                                <div className="sporsmal__header">
                                    <KnappBase
                                        type={'standard'}
                                        className="sporsmal__knapp-tilbake"
                                        onClick={() => {
                                            erForsteSporsmal();
                                        }}
                                    >
                                        {sporsmal.erForsteSpm ? (
                                            <FormattedMessage id="forrige-knapp-start"/>
                                        ) : (
                                            <FormattedMessage id="forrige-knapp"/>
                                        )}
                                    </KnappBase>
                                </div>
                                <div className="sporsmal__innhold">
                                    <div className="sporsmal__hode">
                                        <FormattedMessage id={sporsmal.id + ''}>
                                            {(tekst: string) => (
                                                <SVG
                                                    src={sporsmalImg}
                                                    className="sporsmal__ikon"
                                                    role="img"
                                                    aria-label={tekst}
                                                >
                                                    <img
                                                        src={sporsmalImg}
                                                        className="sporsmal__ikon"
                                                        alt={tekst}
                                                    />
                                                </SVG>
                                            )}
                                        </FormattedMessage>

                                        <Sidetittel
                                            className="sporsmal__overskrift blokk-xs"
                                            tag="h1"
                                        >
                                            <FormattedHTMLMessage id={sporsmal.id}/>
                                        </Sidetittel>
                                        <p
                                            className="skjemaelement__feilmelding"
                                            role="alert"
                                            aria-live="assertive"
                                        >
                                            {this.state.feil && (
                                                <FormattedMessage id="feilmelding-mangler-svar"/>
                                            )}
                                        </p>
                                    </div>
                                    <Undertekst className="sporsmal__ingress" tag="p">
                                        <FormattedMessage
                                            id={
                                                sporsmal.egenUndertekst || sporsmal.type
                                            }
                                        />
                                    </Undertekst>
                                </div>
                                <KnappBase
                                    type={'standard'}
                                    className="sporsmal__knapp sporsmal__videre"
                                    onClick={() => {
                                        visAlternativer();
                                    }}
                                >
                                    <FormattedMessage id="fortsett-knapp"/>
                                </KnappBase>
                            </div>
                            <AlternativContainer
                                alternativer={sporsmal.alternativer}
                                markerteAlternativer={markerteAlternativer}
                                sporsmal={sporsmal}
                                markerAlternativ={(id, alternativ) => {
                                    this.fjernFeil(markerteAlternativer);
                                    markerAlternativ(id, alternativ);
                                }}
                            />
                            <section className="tips" role="alert" aria-live="polite">
                                {!isUndefined(besvartSpm) && (
                                    !isUndefined(besvartSpm.tips) && (
                                        <TipsVisning id={besvartSpm.tips!}/>
                                    )
                                )}
                            </section>
                            {sporsmal.erSisteSpm ? (
                                <div className="knapperad blokk-s">
                                    <KnappBase
                                        type={'hoved'}
                                        onClick={() => handleSubmit()}
                                    >
                                        <FormattedMessage id="send-inn"/>
                                    </KnappBase>
                                </div>
                            ) : (
                                <KnappBase
                                    type={'hoved'}
                                    className={'sporsmal__knapp'}
                                    key="besvar"
                                    onClick={() => {
                                        this.sjekkSvar(
                                            markerteAlternativer,
                                            sporsmal.id,
                                            besvarteSporsmal,
                                            besvartSpm
                                        );
                                    }}
                                >
                                    <FormattedMessage id="fortsett-knapp"/>
                                </KnappBase>
                            )}
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data,
    viserAlternativer: state.svar.viserAlternativer,
    paVeiBakover: state.side.paVeiBakover,
    totaltAntallSpm: state.svar.totalAntallSpm
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    visTips: (tipsId: string, spmId: string) => dispatch(visTips(tipsId, spmId)),
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) => {
        dispatch(marker(sporsmalId, alternativ));
        dispatch(skjulTips(sporsmalId));
    },
    visAlternativer: () => dispatch(visHeleSporsmal),
    gaTilNesteSporsmal: (spmId: string) => {
        dispatch(nesteSporsmal(spmId, false));
        dispatch(leggeTilSporsmal(spmId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
