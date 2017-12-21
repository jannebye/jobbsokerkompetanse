import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import AlleSporsmal from '../sporsmal/sporsmal-alle';
import { marker, visHeleSporsmal } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import Alternativ from '../alternativ/alternativ';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Sidetittel, Undertekst } from 'nav-frontend-typografi';
import SVG from 'react-inlinesvg';

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
}

interface EgenStateProps {
    feil: boolean;
}

function prepMarkerAlternativ(alternativ: SvarAlternativModell,
                              alternativListe: SvarAlternativModell[],
                              sporsmal: SporsmalModell,
                              type: string): SvarAlternativModell[] {
    const erValgt = !!alternativListe.find(alt => alt.id === alternativ.id);
    if (erValgt) {
        if (type === 'ettvalg' || type === 'skala') {
            return alternativListe;
        }
        return alternativListe.filter(alt => alt.id !== alternativ.id);
    } else {
        if (
            !!sporsmal.uniktAlternativ &&
            sporsmal.uniktAlternativ === alternativ.id
        ) {
            return [alternativ];
        }
        if (type === 'ettvalg' || type === 'skala') {
            return [alternativ];
        }
        return [...alternativListe, alternativ];
    }
}

/* Gjelder for skalaSpørsmål */
function skalAlternativMarkeres(markerteAlternativ: SvarAlternativModell[],
                                alternativ: SvarAlternativModell): boolean {
    return !!markerteAlternativ.find(
        altId => altId.skalaId! >= alternativ.skalaId!
    );
}

function erAlternativMulig(uniktAlternativId: string,
                           gjeldendeAlternativId: string,
                           markerteAlternativer: SvarAlternativModell[]): boolean {
    if (uniktAlternativId === gjeldendeAlternativId) {
        return true;
    } else {
        if (!!markerteAlternativer.find(alt => alt.id === uniktAlternativId)) {
            return gjeldendeAlternativId === 'intervju-svar-0202';
        }
    }
    return true;
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

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            forrigeSpm,
            spmRef,
            viserAlternativer,
            visAlternativer
        } = this.props;

        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );
        const markerteAlternativer: SvarAlternativModell[] = besvartSpm
            ? besvartSpm.svarAlternativer
            : [];
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
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
                                <strong>
                                    {besvarteSporsmal.findIndex(
                                        besvarelse =>
                                            besvarelse.sporsmalId ===
                                            sporsmal.id
                                    ) + 1}
                                </strong>{' '}
                                <FormattedMessage id="paginering-av"/>{' '}
                                <strong>{AlleSporsmal.length}</strong>
                            </div>
                        </div>
                        <div className="sporsmal__innhold">
                            <div className="sporsmal__hode">
                                <FormattedMessage id={sporsmal.id + ''}>
                                    {(tekst: string) =>
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
                                    }
                                </FormattedMessage>

                                <Sidetittel className="sporsmal__overskrift blokk-xs" tag="h1">
                                    <FormattedHTMLMessage id={sporsmal.id}/>
                                </Sidetittel>
                                {this.state.feil && (
                                    <p className="skjemaelement__feilmelding">
                                        <FormattedMessage id="feilmelding-mangler-svar"/>
                                    </p>
                                )}
                            </div>
                            <Undertekst className="sporsmal__ingress" tag="p">
                                <FormattedMessage id={sporsmal.egenUndertekst || sporsmal.type}/>
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
                    <ul className="alternativer">
                        {sporsmal.alternativer.map(function (alternativ: SvarAlternativModell) {
                            const erValgt = !!markerteAlternativer.find(
                                alt => alt.id === alternativ.id
                            )
                                ? true
                                : sporsmal.type === 'skala'
                                    ? skalAlternativMarkeres(
                                        markerteAlternativer,
                                        alternativ
                                    )
                                    : false;
                            const kanVelges: boolean = !!sporsmal.uniktAlternativ
                                ? erAlternativMulig(
                                    sporsmal.uniktAlternativ,
                                    alternativ.id,
                                    markerteAlternativer
                                )
                                : true;
                            return (
                                <Alternativ
                                    key={alternativ.id}
                                    alternativ={alternativ}
                                    erValgt={erValgt}
                                    sporsmalId={sporsmal.id}
                                    sporsmalType={sporsmal.type}
                                    kanVelges={kanVelges}
                                    markerAlternativ={() =>
                                        markerAlternativ(
                                            sporsmal.id,
                                            prepMarkerAlternativ(
                                                alternativ,
                                                markerteAlternativer,
                                                sporsmal,
                                                sporsmal.type
                                            )
                                        )}
                                />
                            );
                        })}
                    </ul>
                </section>
                {!sporsmal.erSisteSpm && (
                    <button
                        className={'sporsmal__knapp'}
                        key="besvar"
                        onClick={e => {
                            e.preventDefault();
                            this.sjekkSvar(markerteAlternativer, sporsmal.id);
                            window.scrollTo(0, 0);
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
    viserAlternativer: state.svar.viserAlternativer
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ)),
    visAlternativer: () => dispatch(visHeleSporsmal)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
