import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';
import ScrollView from './scrollview';

interface SkjemaProps {
    handleSubmit: () => void;
}

export default function({ handleSubmit }: SkjemaProps) {
    const sporsmal = alleSporsmal.map(spm => {
        return <Sporsmal isActive={false} key={spm.id} sporsmal={spm} />;
    });

    return (
        <form className="sporsmalsskjema">
            <ScrollView>{sporsmal}</ScrollView>
            <button onClick={() => handleSubmit()}>Send inn</button>
        </form>
    );
}
