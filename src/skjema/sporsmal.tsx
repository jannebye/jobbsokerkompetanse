import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import AlleSporsmal from '../sporsmal/sporsmal-alle';
import { marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import Alternativ from './alternativ';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const sporsmalImg = require('../ikoner/forstorrelsesglass.svg');

interface DispatchProps {
    markerAlternativ: (
        sporsmalId: string,
        alternativ: SvarAlternativModell[]
    ) => void;
}

interface OwnProps {
    nesteSpm: (id: string) => void;
    forrigeSpm: () => void;
    sporsmal: SporsmalModell;
    feil?: boolean;
    spmRef: any; // tslint:disable-line:no-any
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface EgenStateProps {
    feil: boolean;
}

function prepMarkerAlternativ(
    alternativ: SvarAlternativModell,
    alternativListe: SvarAlternativModell[],
    sporsmal: SporsmalModell,
    type: string
): SvarAlternativModell[] {
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
function skalAlternativMarkeres(
    markerteAlternativ: SvarAlternativModell[],
    alternativ: SvarAlternativModell
): boolean {
    return !!markerteAlternativ.find(
        altId => altId.skalaId! >= alternativ.skalaId!
    );
}

function erAlternativMulig(
    uniktAlternativId: string,
    gjeldendeAlternativId: string,
    markerteAlternativer: SvarAlternativModell[]
): boolean {
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
    spmStart: HTMLElement;

    constructor(props: SporsmalProps) {
        super(props);
        this.state = { feil: false };
        this.refhandler = this.refhandler.bind(this);
    }

    refhandler(spmStart: HTMLElement | null) {
        if (spmStart != null) {
            this.spmStart = spmStart;
        }
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[], sporsmalId: string) {
        if (markerteSpm.length === 0) {
            this.setState({ feil: true });
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
            spmRef
        } = this.props;
        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );
        const markerteAlternativer: SvarAlternativModell[] = besvartSpm
            ? besvartSpm.svarAlternativer
            : [];
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({ feil: false });
        }
        return (
            <div
                ref={spmRef}
                id={'sp-' + sporsmal.id}
                className={'sporsmal'}
                tabIndex={0}
            >
                <section>
                    <div className="sporsmal__start" ref={this.refhandler}>
                        <div className="sporsmal__header">
                            {!sporsmal.erForsteSpm && (
                                <button
                                    className="sporsmal__knapp__tilbake"
                                    onClick={e => {
                                        e.preventDefault();
                                        forrigeSpm();
                                    }}
                                >
                                    <FormattedMessage id="forrige-knapp" />
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
                                <FormattedMessage id="paginering-av" />
                                <strong>{AlleSporsmal.length}</strong>
                            </div>
                        </div>
                        <div className="sporsmal__innhold">
                            <img
                                src={sporsmalImg}
                                className="sporsmal__ikon"
                                alt="Forstørrelsesglass"
                            />
                            <h1 className="sporsmal__overskrift typo-innholdstittel blokk-xs">
                                <FormattedHTMLMessage id={sporsmal.id} />
                            </h1>
                            {this.state.feil && (
                                <p className="skjemaelement__feilmelding">
                                    <FormattedMessage id="feilmelding-mangler-svar" />
                                </p>
                            )}
                            <p className="sporsmal__ingress typo-undertekst">
                                <FormattedMessage
                                    id={
                                        sporsmal.egenUndertekst || sporsmal.type
                                    }
                                />
                            </p>
                        </div>
                        <button
                            className="sporsmal__knapp sporsmal__videre"
                            onClick={e => {
                                e.preventDefault();
                                console.log(
                                    'classList-neste-1',
                                    this.spmStart.classList
                                );
                                this.spmStart.classList.contains(
                                    'sporsmal__start-lukket'
                                )
                                    ? this.spmStart.classList.remove(
                                          'sporsmal__start-lukket'
                                      )
                                    : this.spmStart.classList.add(
                                          'sporsmal__start-lukket'
                                      );
                                console.log(
                                    'classList-neste-2',
                                    this.spmStart.classList
                                );
                            }}
                        >
                            <FormattedMessage id="fortsett-knapp" />
                        </button>
                    </div>
                    <ul className="alternativer">
                        {sporsmal.alternativer.map(function(
                            alternativ: SvarAlternativModell
                        ) {
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
                        className="sporsmal__knapp"
                        key="besvar"
                        onClick={e => {
                            e.preventDefault();
                            this.sjekkSvar(markerteAlternativer, sporsmal.id);
                        }}
                    >
                        <FormattedMessage id="fortsett-knapp" />
                    </button>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (
    dispatch: Dispatch,
    props: OwnProps
): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
