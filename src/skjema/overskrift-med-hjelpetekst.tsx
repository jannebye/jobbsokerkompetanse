import * as React from 'react';

import { Element } from 'nav-frontend-typografi';
import { HjelpetekstMidt } from 'nav-frontend-hjelpetekst';

interface OverskriftMedHjelpeTekstProps {
    overskriftId: string;
    hjelpetekstId: string;
}

const OverskriftMedHjelpeTekst = ({
    overskriftId,
    hjelpetekstId
}: OverskriftMedHjelpeTekstProps) => (
    <div className="overskrift-med-hjelpetekst">
        <Element tag="h3">{overskriftId}</Element>
        <HjelpetekstMidt>{hjelpetekstId}</HjelpetekstMidt>
    </div>
);

export default OverskriftMedHjelpeTekst;
