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
import { FormattedMessage } from 'react-intl';
import { injectIntl, InjectedIntlProps } from 'react-intl';

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
    erValgt: boolean,
    alternativListe: SvarAlternativModell[],
    sporsmal: SporsmalModell,
    type: string
): SvarAlternativModell[] {
    let sporsmalAlternativer = [...sporsmal.alternativer];
    if (erValgt) {
        if (type === 'ettvalg') {
            return alternativListe;
        } else if (type === 'skala') {
            return alternativListe.filter(
                alt =>
                    !sporsmalAlternativer.find(
                        a => alt.id === a.id && a.skalaId! > alternativ.skalaId!
                    )
            );
        }
        return alternativListe.filter(alt => alt.id !== alternativ.id);
    } else {
        if (
            !!sporsmal.uniktAlternativ &&
            sporsmal.uniktAlternativ === alternativ.id
        ) {
            return [alternativ];
        }
        if (type === 'ettvalg') {
            return [alternativ];
        } else if (type === 'skala') {
            alternativListe = [];
            return [
                ...sporsmalAlternativer.filter(alt => {
                    return alternativ.skalaId! >= alt.skalaId!;
                })
            ];
        }
        return [...alternativListe, alternativ];
    }
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

type SporsmalProps = OwnProps & DispatchProps & StateProps & InjectedIntlProps;

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
            <li
                ref={spmRef}
                id={'sp-' + sporsmal.id}
                className={'sporsmal'}
                tabIndex={0}
            >
                <section>
                    <div className="sporsmal__start" ref={this.refhandler}>
                        <span className="sporsmal__paginering typo-normal">
                            <strong>
                                {Number(sporsmal.id.split('-')[2])}
                            </strong>{' '}
                            av <strong>{AlleSporsmal.length}</strong>
                        </span>
                        <div className="sporsmal__innhold">
                            <h1 className="sporsmal__overskrift typo-sidetittel blokk-xs">
                                <FormattedMessage id={sporsmal.id} />
                            </h1>
                            {this.state.feil && (
                                <p className="skjemaelement__feilmelding">
                                    <FormattedMessage id="feilmelding-mangler-svar" />
                                </p>
                            )}
                            <p className="sporsmal__ingress typo-undertekst">
                                <FormattedMessage id={sporsmal.type} />
                            </p>
                        </div>
                        <button
                            className="sporsmal__knapp sporsmal__videre"
                            onClick={e => {
                                e.preventDefault();
                                this.spmStart.classList.contains('sporsmal__start') ?
                                    this.spmStart.classList.remove('sporsmal__start') :
                                    this.spmStart.classList.add('sporsmal__start');
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
                            );
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
                                                erValgt,
                                                markerteAlternativer,
                                                sporsmal,
                                                sporsmal.type
                                            )
                                        )}
                                />
                            );
                        })}
                    </ul>
                    {!sporsmal.erForsteSpm && (
                        <button
                            className="knapp"
                            key="tilbake"
                            onClick={e => {
                                e.preventDefault();
                                forrigeSpm();
                            }}
                        >
                            Tilbake
                        </button>
                    )}
                    {!sporsmal.erSisteSpm && (
                        <button
                            className="sporsmal__knapp"
                            key="besvar"
                            onClick={e => {
                                e.preventDefault();
                                this.sjekkSvar(
                                    markerteAlternativer,
                                    sporsmal.id
                                );
                            }}
                        >
                            <FormattedMessage id="fortsett-knapp" />
                        </button>
                    )}
                </section>
            </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Sporsmal));
