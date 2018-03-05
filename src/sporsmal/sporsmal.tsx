import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import AlternativContainer from '../skjema/alternativ-container';
import TipsVisning from '../skjema/tips/tipsvisning';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import SVG from 'react-inlinesvg';
import KnappBase from 'nav-frontend-knapper';
import * as cls from 'classnames';
import { nesteSporsmal, starteSvar, stoppForAViseNyttTips } from '../ducks/side-duck';
import { Link } from 'react-router-dom';
import { Sidetype } from '../utils/konstanter';
import { BesvartSporsmal, leggTilBesvartSporsmal } from '../ducks/sporsmal-duck';
import { Framdrift } from './framdrift';
import { visNyttTips } from '../ducks/svar-duck';

interface DispatchProps {
    gaTilNesteSporsmal: (spmId: string, nesteSpmId: string, svar: string[], tips: string | undefined) => void;
    ikkeNySideLenger: () => void;
    doStoppForAViseNyttTips: (stopp: boolean) => void;
    doVisNyttTips: (visTips: boolean) => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
    spmRef: any; // tslint:disable-line:no-any
}

interface StateProps {
    besvarteSporsmal: BesvartSporsmal[];
    paVeiBakover: boolean;
    sporsmalSomVises: string[];
    avgitteSvar: string[];
    erNySide: boolean;
    tips: string | undefined;
    skalStoppeForAViseNyttTips: boolean;
    skalViseNyttTips: boolean;
}

type SporsmalProps = OwnProps & DispatchProps & StateProps;

export class Sporsmal extends React.Component<SporsmalProps> {

    constructor(props: SporsmalProps) {
        super(props);
    }

    render() {
        const {
            sporsmal,
            spmRef,
            paVeiBakover,
            sporsmalSomVises,
            avgitteSvar,
            erNySide,
            ikkeNySideLenger,
            tips,
            skalStoppeForAViseNyttTips,
            doStoppForAViseNyttTips,
            doVisNyttTips,
            skalViseNyttTips,
            gaTilNesteSporsmal,
        } = this.props;

        const gjeldendeSpmIndex = sporsmalSomVises.indexOf(sporsmal.id);
        const nesteSpmId = sporsmalSomVises[gjeldendeSpmIndex + 1];
        const forrigeSpmId = sporsmalSomVises[gjeldendeSpmIndex - 1];
        const sporsmalImg = require('../ikoner/' + sporsmal.id + '.svg');

        const klassenavn = cls('sporsmal vis_alternativer', {
            tilbake: paVeiBakover,
        });

        const tilbakeUrl = sporsmal.erForsteSpm
            ? '/' + Sidetype.START
            : '/' + Sidetype.KARTLEGGING + '/' + forrigeSpmId;

        let nesteUrl = sporsmal.erSisteSpm
            ? '/' + Sidetype.RESULTAT
            : '/' + Sidetype.KARTLEGGING + '/' + nesteSpmId;

        const spmArr = sporsmal.id.split('-');
        const svarId = spmArr[0] + '-svar-' + spmArr[2];

        let harSvar = false;
        avgitteSvar.filter((svar, i) => {
            if (!harSvar) {
                harSvar = svar.startsWith(svarId);
            }
        });

        return (
            <React.Fragment>
                <Framdrift sporsmal={sporsmal} sporsmalSomVises={sporsmalSomVises}/>
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

                                        <Sidetittel className="sporsmal__overskrift blokk-xs" tag="h1">
                                            <FormattedHTMLMessage id={sporsmal.id}/>
                                        </Sidetittel>
                                        <p
                                            className="skjemaelement__feilmelding"
                                            role="alert"
                                            aria-live="assertive"
                                        >
                                            {!harSvar && !erNySide && (
                                                <FormattedMessage id="feilmelding-mangler-svar"/>
                                            )}
                                        </p>
                                    </div>
                                    <Undertekst className="sporsmal__ingress" tag="p">
                                        <FormattedMessage id={sporsmal.egenUndertekst || sporsmal.type}/>
                                    </Undertekst>
                                </div>
                                <KnappBase type={'standard'} className="sporsmal__knapp sporsmal__videre">
                                    <FormattedMessage id="fortsett-knapp"/>
                                </KnappBase>
                            </div>
                            <AlternativContainer sporsmal={sporsmal} />
                            <section className="tips" role="alert" aria-live="polite">
                                {skalViseNyttTips && tips && (
                                    <TipsVisning id={tips}/>
                                {!isUndefined(besvartSpm.tips) && (
                                    <TipsVisning id={besvartSpm.tips!}/>
                                )}
                            </section>
                            <section
                                className={sporsmal.type === 'skala' ? 'skalavalidering' : 'validering'}
                            >
                                {this.state.feil && (
                                    <AlertStripeAdvarsel>
                                        <FormattedMessage id="feilmelding-mangler-svar"/>
                                    </AlertStripeAdvarsel>

                                )}
                            </section>
                            <div className="knapperad blokk-s">
                                <Link
                                    to={nesteUrl}
                                    className={sporsmal.erSisteSpm ? '' : 'knapp knapp--hoved sporsmal__knapp'}
                                    key="besvar"
                                    onClick={(e) => {
                                        if (!harSvar) {
                                            e.preventDefault();
                                        } else {
                                            if (skalStoppeForAViseNyttTips) {
                                                e.preventDefault();
                                                doVisNyttTips(true);
                                                doStoppForAViseNyttTips(false);
                                            } else {
                                                gaTilNesteSporsmal(sporsmal.id, nesteSpmId, avgitteSvar, tips);
                                            }
                                        }
                                        ikkeNySideLenger();
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
    besvarteSporsmal: state.sporsmal.besvarteSporsmal,
    paVeiBakover: state.side.paVeiBakover,
    sporsmalSomVises: state.sporsmal.sporsmalSomVises,
    avgitteSvar: state.svar.avgitteSvar,
    erNySide: state.side.erNySide,
    tips: state.svar.tips,
    skalStoppeForAViseNyttTips: state.side.skalStoppeForAViseNyttTips,
    skalViseNyttTips: state.svar.skalViseNyttTips
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    gaTilNesteSporsmal: (spmId: string, nesteSpmId: string, svar: string[], tips: string | undefined) => {
        dispatch(nesteSporsmal(nesteSpmId, false));
        dispatch(leggTilBesvartSporsmal(spmId, svar, tips));
    },
    ikkeNySideLenger: () => dispatch(starteSvar()),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
    doVisNyttTips: (visTips: boolean) => dispatch(visNyttTips(visTips)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
