import * as React from 'react';

import { Element } from 'nav-frontend-typografi';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';
import { FormattedMessage } from 'react-intl';

interface OverskriftMedHjelpeTekstProps {
    overskriftId: string;
    hjelpetekstId: string;
}

const OverskriftMedHjelpeTekst = ({
    overskriftId,
    hjelpetekstId
}: OverskriftMedHjelpeTekstProps) => (
    <div className="overskrift-med-hjelpetekst">
        <Element tag="strong">{overskriftId}</Element>
        <HjelpetekstAuto>
            <FormattedMessage id={hjelpetekstId}/>
        </HjelpetekstAuto>
    </div>
);

export default OverskriftMedHjelpeTekst;
