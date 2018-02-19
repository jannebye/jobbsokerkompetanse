import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AlternativTyper } from '../utils/konstanter';
import OverskriftMedHjelpeTekst from '../skjema/overskrift-med-hjelpetekst';

interface AlternativProps {
    alternativ: string;
    erValgt: boolean;
    klikk: () => void;
    sporsmalId: string;
    sporsmalType: AlternativTyper;
    kanVelges: boolean;
}

function Alternativ({
    alternativ,
    erValgt,
    klikk,
    sporsmalId,
    sporsmalType,
    kanVelges
}: AlternativProps) {
    const skalHaHjelpetekst: boolean = alternativ === 'finn-svar-0111';
    let inputKlasser = 'skjemaelement__input ';
    let inputType: 'radio' | 'checkbox';

    switch (sporsmalType) {
        case AlternativTyper.ETTVALG:
            inputKlasser += 'radioknapp';
            inputType = 'radio';
            break;
        case AlternativTyper.FLERVALG:
            inputKlasser += 'checkboks';
            inputType = 'checkbox';
            break;
        case AlternativTyper.SKALA:
            inputKlasser += 'skala';
            inputType = 'radio';
            break;
        default:
            inputType = 'radio';
            break;
    }

    return (
        <li key={alternativ} className="alternativ">
            <input
                id={alternativ}
                className={inputKlasser}
                type={inputType}
                name={sporsmalId.toString()}
                defaultValue={alternativ}
                checked={erValgt}
                disabled={!kanVelges}
                onFocus={() => {
                    if (kanVelges && inputType === 'radio') {
                        klikk();
                    }
                }}
                onChange={() => {
                    if (kanVelges) {
                        klikk();
                    }
                }}
            />
            <label
                htmlFor={alternativ}
                className={`skjemaelement__label ${erValgt ? 'markert' : ''}`}
            >
                <FormattedMessage id={alternativ} />
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
