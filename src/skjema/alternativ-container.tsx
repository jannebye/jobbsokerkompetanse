import * as React from 'react';
import SvarAlternativModell from "../sporsmal/svaralternativ";
import SporsmalModell from "../sporsmal/sporsmal-modell";
import Alternativ from "./alternativ";

interface AlternativContainerProps {
    alternativer: SvarAlternativModell[];
    markerteAlternativer: SvarAlternativModell[];
    sporsmal: SporsmalModell;
    markerAlternativ: (sporsmalId: string,
                       alternativ: SvarAlternativModell[]) => void;
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

function AlternativContainer({alternativer, markerteAlternativer, sporsmal, markerAlternativ}: AlternativContainerProps) {
    return (
        <ul className="alternativer">
            {alternativer.map(function (alternativ: SvarAlternativModell) {
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
    );
}

export default AlternativContainer;
