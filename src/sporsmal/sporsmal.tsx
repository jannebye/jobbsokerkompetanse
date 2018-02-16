import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker, visHeleSporsmal, leggeTilSporsmal } from '../ducks/svar-duck';
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
import { nesteSporsmal } from '../ducks/side-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { AvhengighetModell, default as Avhengigheter } from '../utils/avhengigheter';
import { Link } from 'react-router-dom';
import { Sidetype } from '../utils/konstanter';
import { skjulTips, visTips } from '../ducks/tips-duck';

interface DispatchProps {
    markerAlternativ: (sporsmalId: string, alternativ: SvarAlternativModell[]) => void;
    doVisTips: (tipsId: string, spmId: string) => void;
    visAlternativer: () => void;
    gaTilNesteSporsmal: (spmId: string) => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
    spmRef: any; // tslint:disable-line:no-any
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
    viserAlternativer: boolean;
    paVeiBakover: boolean;
    totaltAntallSpm: number;
    spmTilTipsMap: {
        [key: string]: string
    };
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
              e: any) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        } else {
            const tipId = visTipsEtterSporsmal(sporsmalId, besvarteSporsmal);
            if (isUndefined(this.props.spmTilTipsMap[sporsmalId]) && !isUndefined(tipId)) {
                e.preventDefault();
                this.props.doVisTips(tipId, sporsmalId);
            } else {
                this.props.gaTilNesteSporsmal(this.finnNesteSpm(sporsmalId, besvarteSporsmal));
            }
        }
    }

    fjernFeil(markerteAlternativer: SvarAlternativModell[]) {
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
    }

    componentDidMount() {
        if (this.props.paVeiBakover) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            spmRef,
            viserAlternativer,
            visAlternativer,
            paVeiBakover,
            totaltAntallSpm,
        } = this.props;

        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        )!;

        let markerteAlternativer: SvarAlternativModell[] = [];
        if (besvartSpm) {
            markerteAlternativer = besvartSpm.svarAlternativer;
        }
        const sporsmalImg = require('../ikoner/' + sporsmal.id + '.svg');

        const klassenavn = cls('sporsmal', {
            vis_alternativer: viserAlternativer,
            tilbake: paVeiBakover,
        });

        const gjeldendeSpmIndex = this.props.besvarteSporsmal.findIndex(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );

        const framdriftValue = Math.round(gjeldendeSpmIndex / totaltAntallSpm * 100 * 100) / 100;
        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftValue + '%'
        };

        const tilbakeUrl = sporsmal.erForsteSpm
            ? '/' + Sidetype.START
            : '/' + Sidetype.KARTLEGGING + '/' + alleSporsmal[gjeldendeSpmIndex - 1].id;

        const nesteUrl = '/' + Sidetype.KARTLEGGING + '/' + alleSporsmal[gjeldendeSpmIndex + 1].id;

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
                            <p className="typo-undertekst">
                                {'gjeldendeSpmIndex: ' + gjeldendeSpmIndex}<br/>
                                {'framdriftValue: ' + framdriftValue}<br/>
                                {'besvarteSporsmal: ' + besvarteSporsmal.length}<br/>
                                {'tilbakeUrl: ' + tilbakeUrl}
                            </p>
                            <div className={'sporsmal__start'}>
                                <div className="sporsmal__header">
                                    <Link
                                        to={tilbakeUrl}
                                        type={'standard'}
                                        className="sporsmal__knapp-tilbake"
                                    >
                                        {sporsmal.erForsteSpm ? (
                                            <FormattedMessage id="forrige-knapp-start"/>
                                        ) : (
                                            <FormattedMessage id="forrige-knapp"/>
                                        )}
                                    </Link>
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
                                {!isUndefined(this.props.spmTilTipsMap[this.props.sporsmal.id]) && (
                                    <TipsVisning id={this.props.spmTilTipsMap[this.props.sporsmal.id]}/>
                                )}
                            </section>
                                <div className="knapperad blokk-s">
                                    <Link
                                        to={nesteUrl}
                                        className={sporsmal.erSisteSpm ? '' : 'knapp knapp--hoved sporsmal__knapp'}
                                        key="besvar"
                                        onClick={(e) => {
                                            this.sjekkSvar(
                                                markerteAlternativer,
                                                sporsmal.id,
                                                besvarteSporsmal,
                                                e
                                            );
                                        }}
                                    >
                                        {sporsmal.erSisteSpm ? (
                                            <FormattedMessage id="send-inn"/>
                                        ) : (
                                            <FormattedMessage id="fortsett-knapp"/>
                                        )}
                                    </Link>
                                </div>
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
    totaltAntallSpm: state.svar.totalAntallSpm,
    spmTilTipsMap: state.tips.spmTilTipsMap
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doVisTips: (tipsId: string, spmId: string) => dispatch(visTips(tipsId, spmId)),
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) => {
        dispatch(marker(sporsmalId, alternativ));
        dispatch(skjulTips());
    },
    visAlternativer: () => dispatch(visHeleSporsmal),
    gaTilNesteSporsmal: (spmId: string) => {
        dispatch(nesteSporsmal(spmId, false));
        dispatch(leggeTilSporsmal(spmId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
