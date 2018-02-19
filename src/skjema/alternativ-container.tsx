import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import Alternativ from '../alternativ/alternativ';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { klikkAlternativ } from '../ducks/svar-duck';
import { sjekkAvhengigheter } from '../ducks/sporsmal-duck';

interface ParentProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    avgitteSvar: string[];
}

interface DispatchProps {
    doKlikkAlternativ: (svarId: string) => void;
    doSjekkAvhengigheter: (svarId: string, spmId: string) => void;
}

type AlternativContainerProps = ParentProps & StateProps & DispatchProps;

function erAlternativMulig(
    uniktAlternativId: string,
    gjeldendeAlternativId: string,
    markerteAlternativer: string[]
): boolean {
    if (uniktAlternativId === gjeldendeAlternativId) {
        return true;
    } else {
        if (!!markerteAlternativer.find(alt => alt === uniktAlternativId)) {
            return gjeldendeAlternativId === 'intervju-svar-0202';
        }
    }
    return true;
}

/*function prepMarkerAlternativ(
    alternativ: string,
    alternativListe: string[],
    sporsmal: SporsmalModell,
    type: string
): string[] {
    const erValgt = !!alternativListe.find(alt => alt === alternativ);
    if (erValgt) {
        if (type === 'ettvalg' || type === 'skala') {
            return alternativListe;
        }
        return alternativListe.filter(alt => alt !== alternativ);
    } else {
        if (
            !!sporsmal.uniktAlternativ &&
            sporsmal.uniktAlternativ === alternativ
        ) {
            return [alternativ];
        }
        if (type === 'ettvalg' || type === 'skala') {
            return [alternativ];
        }
        return [...alternativListe, alternativ];
    }
}*/

function AlternativContainer(
        {avgitteSvar, sporsmal, doKlikkAlternativ, doSjekkAvhengigheter}: AlternativContainerProps) {
    return (
        <ul className={'alternativer alternativer__' + sporsmal.type} role="group" aria-label={sporsmal.id}>
            {sporsmal.alternativer.map((alternativ: string) => {
                const kanVelges: boolean = !!sporsmal.uniktAlternativ
                    ? erAlternativMulig(
                        sporsmal.uniktAlternativ,
                        alternativ,
                        avgitteSvar
                    )
                    : true;
                return (
                    <Alternativ
                        key={alternativ}
                        alternativ={alternativ}
                        erValgt={avgitteSvar.includes(alternativ)}
                        sporsmalId={sporsmal.id}
                        sporsmalType={sporsmal.type}
                        kanVelges={kanVelges}
                        klikk={() => {
                            doKlikkAlternativ(alternativ);
                            doSjekkAvhengigheter(alternativ, sporsmal.id);
                        }}
                    />
                );
            })}
        </ul>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    avgitteSvar: state.svar.avgitteSvar,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doKlikkAlternativ: (svarId: string) => dispatch(klikkAlternativ(svarId)),
    doSjekkAvhengigheter: (svarId: string, spmId: string) => dispatch(sjekkAvhengigheter(svarId, spmId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlternativContainer);
