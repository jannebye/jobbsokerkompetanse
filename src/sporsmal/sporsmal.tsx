import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker, skjulTips, visTips, visHeleSporsmal } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../sporsmal/svaralternativ';
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
                return this.props.nesteSpm(sporsmalId);
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

        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: (gjeldendeSpmIndex / totaltAntallSpm * 100) + '%'
    };

        return (
            <div
                ref={spmRef}
                id={'sp-' + sporsmal.id}
                className={klassenavn}
                tabIndex={0}
            >
                <div className="framdrift">
                    <div className="andel" style={framdriftStyle}/>
                </div>
                <section>
                    <div className={'sporsmal__start'}>
                        <div className="sporsmal__header">
                            <KnappBase
                                type={'standard'}
                                className="sporsmal__knapp-tilbake"
                                onClick={e => {
                                    {
                                        erForsteSporsmal();
                                    }
                                }}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        {
                                            erForsteSporsmal();
                                        }
                                    }
                                }}
                            >
                                {sporsmal.erForsteSpm ? (
                                    <FormattedMessage id="forrige-knapp-start"/>
                                ) : (
                                    <FormattedMessage id="forrige-knapp"/>
                                )}
                            </KnappBase>

                            <div className="sporsmal__paginering typo-normal">
                                <FormattedMessage
                                    id="paginering"
                                    values={{
                                        indeks: gjeldendeSpmIndex,
                                        total: totaltAntallSpm
                                    }}
                                />
                            </div>
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
                            onClick={e => {
                                e.preventDefault();
                                visAlternativer();
                            }}
                            onKeyPress={e => {
                                if (e.which === 13) {
                                    e.preventDefault();
                                    visAlternativer();
                                }
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
                    {sporsmal.erSisteSpm ? (
                        <div className="knapperad blokk-s">
                            <KnappBase
                                type={'hoved'}
                                onClick={() => handleSubmit()}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        handleSubmit();
                                    }
                                }}
                            >
                                <FormattedMessage id="send-inn"/>
                            </KnappBase>
                        </div>
                    ) : (
                        <KnappBase
                            type={'hoved'}
                            className={'sporsmal__knapp'}
                            key="besvar"
                            onClick={e => {
                                e.preventDefault();
                                this.sjekkSvar(
                                    markerteAlternativer,
                                    sporsmal.id,
                                    besvarteSporsmal,
                                    besvartSpm
                                );
                            }}
                            onKeyPress={e => {
                                if (e.which === 13) {
                                    e.preventDefault();
                                    this.sjekkSvar(
                                        markerteAlternativer,
                                        sporsmal.id,
                                        besvarteSporsmal,
                                        besvartSpm
                                    );
                                }
                            }}
                        >
                            <FormattedMessage id="fortsett-knapp"/>
                        </KnappBase>
                    )}
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data,
    viserAlternativer: state.svar.viserAlternativer,
    paVeiBakover: state.svar.paVeiBakover,
    totaltAntallSpm: state.svar.totalAntallSpm
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    visTips: (tipsId: string) => dispatch(visTips(tipsId)),
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) => {
        dispatch(marker(sporsmalId, alternativ));
        dispatch(skjulTips());
    },
    visAlternativer: () => dispatch(visHeleSporsmal)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
