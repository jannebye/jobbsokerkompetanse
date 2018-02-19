import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker, skjulTips, visTips, visHeleSporsmal } from '../svar/svar-duck';
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

interface DispatchProps {
    markerAlternativ: (sporsmalId: string,
                       alternativ: SvarAlternativModell[]) => void;
    visTips: (tipsId: string) => void;

    visAlternativer: () => void;
}

interface OwnProps {
    nesteSpm: (id: string) => void;
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

    sjekkSvar(markerteSpm: SvarAlternativModell[],
              sporsmalId: string,
              besvarteSporsmal: BesvarelseModell[],
              besvartSpm: BesvarelseModell) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        } else {
            const tip = visTipsEtterSporsmal(sporsmalId, besvarteSporsmal);
            if (isUndefined(besvartSpm.tips) && !isUndefined(tip)) {
                return this.props.visTips(tip);
            } else {
                return this.props.sporsmal.erSisteSpm ? this.props.handleSubmit() : this.props.nesteSpm(sporsmalId);
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
        window.scroll(function(){
            if (window.scrollTop() >= 300) {
                framdrift.classList.add('fixed-header');
            }
            else {
                framdrift.classList.remove('fixed-header');
            }
        });
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
            startPaNytt
        } = this.props;

        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        )!; // Vil alltid ligge i listen
        const markerteAlternativer: SvarAlternativModell[] = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        )!.svarAlternativer;
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

        const framdriftValue = Math.round(gjeldendeSpmIndex / totaltAntallSpm * 100 * 100) / 100;
        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftValue + '%'
        };

        return (
            <React.Fragment>
                <div
                    className="framdrift"
                    role="progressbar"
                    aria-valuenow={framdriftValue}
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
                                {!isUndefined(besvartSpm.tips) && (
                                    <TipsVisning id={besvartSpm.tips!}/>
                                )}
                            </section>
                                <div className="knapperad blokk-s">
                                    <KnappBase
                                        type={'hoved'}
                                        className={sporsmal.erSisteSpm ? '' : 'sporsmal__knapp'}
                                        key="besvar"
                                        onClick={e => {
                                            this.sjekkSvar(
                                                markerteAlternativer,
                                                sporsmal.id,
                                                besvarteSporsmal,
                                                besvartSpm
                                            );
                                        }}
                                    >
                                        {sporsmal.erSisteSpm ? (
                                            <FormattedMessage id="send-inn"/>
                                        ) : (
                                            <FormattedMessage id="fortsett-knapp"/>
                                        )}
                                    </KnappBase>
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
    paVeiBakover: state.svar.paVeiBakover,
    totaltAntallSpm: state.svar.totalAntallSpm
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    visTips: (tipsId: string) => dispatch(visTips(tipsId)),
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) => {
        dispatch(marker(sporsmalId, alternativ));
        dispatch(skjulTips());
    },
    visAlternativer: () => dispatch(visHeleSporsmal)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
