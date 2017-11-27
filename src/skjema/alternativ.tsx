import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import { AlternativTyper } from '../utils/konstanter';
import OverskriftMedHjelpeTekst from './overskrift-med-hjelpetekst';

interface AlternativProps {
    alternativ: SvarAlternativModell;
    erValgt: boolean;
    markerAlternativ: () => void;
    sporsmalId: string;
    sporsmalType: AlternativTyper;
}

function Alternativ({
    alternativ,
    erValgt,
    markerAlternativ,
    sporsmalId,
    sporsmalType
}: AlternativProps) {
    const skalHaHjelpetekst: boolean = alternativ.id === '0111';
    return (
        <div key={alternativ.id} className="svar">
            <input
                id={alternativ.id}
                className="svar__radio"
                type={
                    sporsmalType !== AlternativTyper.SKALA
                        ? sporsmalType
                        : AlternativTyper.ETTVALG
                }
                name={sporsmalId.toString()}
                value={alternativ.id}
            />
            <label
                htmlFor={alternativ.id}
                className={`svar__label ${erValgt ? 'markert' : ''}`}
                onClick={e => {
                    e.preventDefault();
                    markerAlternativ();
                }}
            >
                <FormattedMessage id={alternativ.id} />
                {skalHaHjelpetekst && (
                    <OverskriftMedHjelpeTekst
                        overskriftId=""
                        hjelpetekstId="F.eks I papiraviser"
                    />
                )}
            </label>
        </div>
    );
}

export default Alternativ;
