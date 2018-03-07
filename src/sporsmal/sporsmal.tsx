import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { AppState } from '../ducks/reducer';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import AlternativContainer from '../skjema/alternativ-container';
import TipsVisning from '../skjema/tips/tipsvisning';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as cls from 'classnames';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';
import { SporsmalBilde } from './sporsmal-bilde';
import { TilbakeLink } from './tilbake-link';
import NesteLink from './neste-link';

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
    skalViseNyttTips: boolean;
}

type SporsmalProps = OwnProps & StateProps;

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
            erNySide,
            tips,
            avgitteSvar,
            skalViseNyttTips,
        } = this.props;

        const gjeldendeSpmIndex = sporsmalSomVises.indexOf(sporsmal.id);
        const nesteSpmId = sporsmalSomVises[gjeldendeSpmIndex + 1];
        const forrigeSpmId = sporsmalSomVises[gjeldendeSpmIndex - 1];

        const klassenavn = cls('sporsmal vis_alternativer', {
            tilbake: paVeiBakover,
        });

        const spmArr = sporsmal.id.split('-');
        const svarId = spmArr[0] + '-svar-' + spmArr[2];

        let harSvar = false;
        avgitteSvar.filter((svar) => {
            if (!harSvar) {
                harSvar = svar.startsWith(svarId);
            }
        });

        return (
            <React.Fragment>
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
                                    <TilbakeLink sporsmal={sporsmal} forrigeSpmId={forrigeSpmId} />
                                </div>
                                <div className="sporsmal__innhold">
                                    <div className="sporsmal__hode">
                                        <SporsmalBilde sporsmal={sporsmal} />
                                        <Sidetittel className="sporsmal__overskrift blokk-xs" tag="h1">
                                            <FormattedHTMLMessage id={sporsmal.id}/>
                                        </Sidetittel>
                                    </div>
                                    <Undertekst className="sporsmal__ingress" tag="p">
                                        <FormattedMessage id={sporsmal.egenUndertekst || sporsmal.type}/>
                                    </Undertekst>
                                </div>
                                <KnappBase type={'standard'} className="sporsmal__knapp sporsmal__videre">
                                    <FormattedMessage id="fortsett-knapp"/>
                                </KnappBase>
                            </div>
                            <AlternativContainer sporsmal={sporsmal}/>
                            <section className="tips" role="alert" aria-live="polite">
                                {skalViseNyttTips && tips && (
                                    <TipsVisning id={tips}/>
                                )}
                            </section>
                            <section
                                className={sporsmal.type === 'skala' ? 'skalavalidering' : 'validering'}
                            >
                                {!harSvar && !erNySide && (
                                    <AlertStripeAdvarsel>
                                        <FormattedMessage id="feilmelding-mangler-svar"/>
                                    </AlertStripeAdvarsel>
                                )}
                            </section>
                            <div className="knapperad blokk-s">
                                <NesteLink sporsmal={sporsmal} nesteSpmId={nesteSpmId} harSvar={harSvar} />
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
    erNySide: state.side.erNySide,
    tips: state.svar.tips,
    avgitteSvar: state.svar.avgitteSvar,
    skalViseNyttTips: state.svar.skalViseNyttTips
});

export default connect(mapStateToProps)(Sporsmal);
