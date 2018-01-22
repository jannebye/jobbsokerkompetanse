import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import { AlternativTyper } from '../utils/konstanter';
import OverskriftMedHjelpeTekst from '../skjema/overskrift-med-hjelpetekst';

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const valgt = e.target.checked;
            e.target.checked = !valgt;
    }

    function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        const ENTER_KEYCODE = 13;
        if (e.which === ENTER_KEYCODE) {
            markerAlternativ();
        }
    }

    return (
        <li key={alternativ.id} className="alternativ">
            <input
                id={alternativ.id}
                className={inputKlasser}
                type={inputType}
                name={sporsmalId.toString()}
                defaultValue={alternativ.id}
                checked={erValgt}
                disabled={!kanVelges}
                onChange={e => handleChange(e)}
                onFocus={e => {
                    if (kanVelges && inputType === 'radio') {
                        markerAlternativ();
                    }
                }}
                onKeyUp={e => {
                    if (kanVelges && inputType === 'checkbox') {
                        onKeyUp(e);
                    }
                }}
            />
            <label
                htmlFor={alternativ.id}
                className={`skjemaelement__label ${erValgt ? 'markert' : ''}`}
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
