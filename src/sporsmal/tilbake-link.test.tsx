import * as React from 'react';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import spm from '../sporsmal/sporsmal-alle';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { shallowWithIntl } from '../test/intl-enzyme-test-helper';
import { TilbakeLink } from './tilbake-link';
configure({ adapter: new Adapter() });

function getJSXElement(
    sporsmal: SporsmalModell,
    forrigeSpm: string

) {
    return (
        <TilbakeLink sporsmal={sporsmal} forrigeSpmId={forrigeSpm}/>
    );
}

describe('<TilbakeLink />', function() {
    const forrigeSpm = 'Test123';
    it('første spm', () => {
        const cssLinkStartSide = 'Link[to="/startside"]',
            cssStartKnapp = 'FormattedMessage[id="forrige-knapp-start"]',
            forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        const wrapper = shallowWithIntl(getJSXElement(forsteSpm, forrigeSpm));

        expect(wrapper.find(cssLinkStartSide).find(cssStartKnapp).length).toEqual(1);

    });

    it('ikke første spm', () => {
        const cssForrigeKnapp = 'FormattedMessage[id="forrige-knapp"]',
            cssLinkIkkeStart = `Link[to="/kartleggingside/${forrigeSpm}"]`,
            ikkeForsteSpm = spm.find(x => x.erForsteSpm !== true)!;
        const wrapper = shallowWithIntl(getJSXElement(ikkeForsteSpm, forrigeSpm));

        expect(wrapper.find(cssLinkIkkeStart).find(cssForrigeKnapp).length).toEqual(1);

    });
});