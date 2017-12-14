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

    let inputKlasser = 'skjemaelement__input alternativ__input ';
    let inputType;
    switch(sporsmalType) {
        case AlternativTyper.ETTVALG:
            inputKlasser += 'radioknapp ';
            inputType = 'radio';
            break;
        case AlternativTyper.FLERVALG:
            inputKlasser += 'checkboks';
            inputType = 'checkbox';
            break;
        case AlternativTyper.SKALA:
            inputKlasser += 'skala';
            inputType = 'range';
    }

    return (
        <li key={alternativ.id} className="alternativ">
            <input
                id={alternativ.id}
                className={inputKlasser}
                type={inputType}
                name={sporsmalId.toString()}
                defaultValue={alternativ.id}
            />
            <label
                htmlFor={alternativ.id}
                className={`skjemaelement__label alternativ__label ${kanVelges
                    ? erValgt ? 'markert' : ''
                    : 'disabled'}`}
                onClick={e => {
                    if (kanVelges) {
                        markerAlternativ();
                    }
                }}
            >
                <FormattedMessage id={alternativ.id} />
                {skalHaHjelpetekst && (
                    <OverskriftMedHjelpeTekst
                        overskriftId=""
                        hjelpetekstId="finn-svar-0111-hjelpetekst"
                    />
                )}
            </label>
        </li>
    );
}

export default Alternativ;
