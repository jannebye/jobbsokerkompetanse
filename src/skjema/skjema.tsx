import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';

export default function () {
    const sporsmal = alleSporsmal.map(spm => {
        return <Sporsmal key={spm.id} sporsmal={spm} />;
    });

    return (
        <form className="skjema">
            {sporsmal}
        </form>
    );
};
