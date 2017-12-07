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
    kanVelges: boolean;
}

function Alternativ({
    alternativ,
    erValgt,
    markerAlternativ,
    sporsmalId,
    sporsmalType,
    kanVelges
}: AlternativProps) {
    const skalHaHjelpetekst: boolean = alternativ.id === 'finn-svar-0111';
    return (
        <li key={alternativ.id} className="alternativ">
            <input
                id={alternativ.id}
                className="alternativ__radio"
                type={
                    sporsmalType !== AlternativTyper.SKALA
                        ? sporsmalType
                        : 'radio'
                }
                name={sporsmalId.toString()}
                defaultValue={alternativ.id}
            />
            <label
                htmlFor={alternativ.id}
                className={`typo-undertittel alternativ__label ${kanVelges
                    ? erValgt ? 'markert' : ''
                    : 'disabled'}`}
                onClick={e => {
                    e.preventDefault();
                    if (kanVelges) {
                        markerAlternativ();
                    }
                }}
            >
                <FormattedMessage id={alternativ.id} />
                {skalHaHjelpetekst && (
                    <OverskriftMedHjelpeTekst
                        overskriftId=""
                        hjelpetekstId="Papiravis, oppslagstavler, butikkvinduer mm."
                    />
                )}
            </label>
        </li>
    );
}

export default Alternativ;
