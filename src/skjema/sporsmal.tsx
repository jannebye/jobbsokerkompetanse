import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import AlleSporsmal from '../sporsmal/sporsmal-alle';
import { marker, skjulTips, visTips } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import Alternativ from './alternativ';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import TipsVisning from './tipsvisning';
import { finnTips, default as tipsLogikk } from './tips-mapping';

interface DispatchProps {
    markerAlternativ: (sporsmalId: string,
                       alternativ: SvarAlternativModell[]) => void;
    visTips: (tipsId: string) => void;
}

interface OwnProps {
    nesteSpm: (id: string) => void;
    forrigeSpm: () => void;
    sporsmal: SporsmalModell;
    spmRef: any; // tslint:disable-line:no-any
    skalVaereLukket: boolean;
    tips: {
        skalVises: boolean;
        id: string;
    };
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
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
    spmStart: HTMLElement;

    constructor(props: SporsmalProps) {
        super(props);
        this.state = {feil: false};
        this.refhandler = this.refhandler.bind(this);
    }

    refhandler(spmStart: HTMLElement | null) {
        if (spmStart != null) {
            this.spmStart = spmStart;
        }
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[], sporsmalId: string) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        } else {
            const tip = this.visTips();
            if (!this.props.tips.skalVises && !!tip) {
                this.props.visTips(tip);
            } else {
                return this.props.nesteSpm(sporsmalId);
            }
        }
    }

    visTips() {
        const gjeldendeSpmBesvarelse =
            this.props.besvarteSporsmal.find(besvarelse => besvarelse.sporsmalId === this.props.sporsmal.id)!;
        const tips = finnTips(gjeldendeSpmBesvarelse.sporsmalId, gjeldendeSpmBesvarelse.svarAlternativer);
        if (!!tips) {
            return tips;
        }
        return false;
    }

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            forrigeSpm,
            spmRef,
            skalVaereLukket,
            tips
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
                className={'sporsmal'}
                tabIndex={0}
            >
                <section className={skalVaereLukket ? 'lukket' : ''}>
                    <div
                        className={skalVaereLukket ? 'sporsmal__start sporsmal__start-lukket' : 'sporsmal__start'}
                        ref={this.refhandler}
                    >
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
                                <FormattedMessage id="paginering-av"/>
                                <strong>{AlleSporsmal.length}</strong>
                            </div>
                        </div>
                        <div className="sporsmal__innhold">
                            <img
                                src={sporsmalImg}
                                className="sporsmal__ikon"
                                alt=""
                            />
                            <h1 className="sporsmal__overskrift typo-innholdstittel blokk-xs">
                                <FormattedHTMLMessage id={sporsmal.id}/>
                            </h1>
                            {this.state.feil && (
                                <p className="skjemaelement__feilmelding">
                                    <FormattedMessage id="feilmelding-mangler-svar"/>
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
                                this.spmStart.classList.contains(
                                    'sporsmal__start-lukket'
                                )
                                    ? this.spmStart.classList.remove(
                                          'sporsmal__start-lukket'
                                      )
                                    : this.spmStart.classList.add(
                                          'sporsmal__start-lukket'
                                      );
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
                                        ) }
                                />
                            );
                        })}
                    </ul>
                </section>
                {tips.skalVises && tipsLogikk.find(tip => tip.id === tips.id)!.visesEtterSpm === sporsmal.id &&
                    <TipsVisning id={tips.id} />}
                {!sporsmal.erSisteSpm && (
                    <button
                        className="sporsmal__knapp"
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
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    visTips: (tipsId: string) => dispatch(visTips(tipsId)),
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) => {
        dispatch(marker(sporsmalId, alternativ));
        dispatch(skjulTips());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
