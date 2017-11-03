import * as React from 'react';
import SvarAlternativModell from '../sporsmal/svaralternativ';

interface AlternativProps {
    alternativ: SvarAlternativModell;
    erValgt: boolean;
    markerAlternativ: () => void;
    sporsmalId: number;
    sporsmalType: string;
}

function Alternativ({ alternativ, erValgt, markerAlternativ, sporsmalId, sporsmalType }: AlternativProps) {
    return (
        <div key={alternativ.id} className="svar">
            <input
                id={alternativ.id}
                className="svar__radio"
                type={
                    sporsmalType !== 'skala'
                        ? sporsmalType
                        : 'radio'
                }
                name={sporsmalId.toString()}
                value={alternativ.id}
            />
            <label
                htmlFor={alternativ.id}
                className={`svar__label ${erValgt
                    ? 'markert'
                    : ''}`}
                onClick={e => {
                    e.preventDefault();
                    markerAlternativ();
                }}
            >
                {alternativ.tekst}
            </label>
        </div>
    );
}

export default Alternativ;