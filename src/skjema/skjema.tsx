import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';
import ScrollView from './scrollview';
import * as fs from 'fs';

const bundle = JSON.parse(fs.readFileSync('path/test.json', 'utf8'));

interface SkjemaProps {
    handleSubmit: () => void;
}

export default function({ handleSubmit }: SkjemaProps) {
    const sporsmal = alleSporsmal.map(spm => {
        return <Sporsmal isActive={false} key={spm.id} sporsmal={bundle[0][spm.id]} />;
    });

    return (
        <form className="sporsmalsskjema">
            <ScrollView>{sporsmal}</ScrollView>
            <button onClick={() => handleSubmit()}>Send inn</button>
        </form>
    );
}
