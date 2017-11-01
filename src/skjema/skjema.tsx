import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';
import ScrollView from './scrollview';

export default function() {
    const sporsmal = alleSporsmal.map(spm => {
        return <Sporsmal isActive={false} key={spm.sporsmal} sporsmal={spm} />;
    });

    return (
        <form className="sporsmalsskjema">
            <ScrollView>{sporsmal}</ScrollView>
        </form>
    );
}
