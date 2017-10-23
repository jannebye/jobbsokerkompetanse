import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './Sporsmal';

export default function () {
    const sporsmal = alleSporsmal.map(spm => {
        return <Sporsmal key={spm.id} sporsmal={spm} />;
    });

    return (
        <div className="Skjema">
            {sporsmal}
        </div>
    );
};
