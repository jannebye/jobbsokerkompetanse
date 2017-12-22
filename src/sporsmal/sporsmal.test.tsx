import * as React from 'react';
import { Sporsmal } from './sporsmal';
import {configure, mount, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';
import { SinonSpy } from 'sinon';
import spm from '../sporsmal/sporsmal-alle';
import BesvarelseModell from '../svar/svar-modell';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import SvarAlternativModell from "./svaralternativ";
var sinon = require('sinon');

configure({ adapter: new Adapter() });
let store = getStore();

function getJSXElement (besvarteSpm: Array<BesvarelseModell>, spmModell: SporsmalModell, spy: SinonSpy) {
    return (
        <Provider store={store}>
            <IntlProvider>
                <Sporsmal
                    nesteSpm={spy}
                    forrigeSpm={spy}
                    sporsmal={spmModell}
                    spmRef={spmModell}
                    markerAlternativ={() => {return; }}
                    visAlternativer={() => {return; }}
                    viserAlternativer={false}
                    besvarteSporsmal={besvarteSpm}
                    visTips={(x) => {return; }}
                    totaltAntallSpm={1}
                />
            </IntlProvider>
        </Provider>
    );
}

describe('<Sporsmal />', function() {
    let tips: string | undefined;

    it('skal rendre komponent', () => {

        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const svarAlternativer = [{id: sisteSpm!.alternativer[0].id}];
        const besvarteSpm = [{sporsmalId: sisteSpm!.id, svarAlternativer: svarAlternativer, tips: tips}];
        const spmModell = spm.find(x => x.id === sisteSpm.id)!;

        shallow(getJSXElement(besvarteSpm, spmModell, sinon.spy()));
    });

    it('skal vise tilbakeknapp hvis det er siste spørsmål', () => {

        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const svarAlternativer = new Array<SvarAlternativModell>();
        const besvarteSpm = [{sporsmalId: sisteSpm.id, svarAlternativer: svarAlternativer, tips: tips}];
        const spmModell = spm.find(x => x.id === sisteSpm.id);
        const wrapper = mount(getJSXElement(besvarteSpm, spmModell!, sinon.spy()));

        expect(wrapper.find('.sporsmal__knapp__tilbake').exists()).toBe(true);
    });

    it('skal vise tilbakeknapp hvis det hverken er første eller siste spørsmål', () => {

        const sporsmal = spm.find(x => !x.erSisteSpm && !x.erForsteSpm)!;
        const svarAlternativer = new Array<SvarAlternativModell>();
        const besvarteSpm = [{sporsmalId: sporsmal.id, svarAlternativer: svarAlternativer, tips: tips}];
        const spmModell = spm.find(x => x.id === sporsmal.id);
        const wrapper = mount(getJSXElement(besvarteSpm, spmModell!, sinon.spy()));

        expect(wrapper.find('.sporsmal__knapp__tilbake').exists()).toBe(true);
    });

    it('skal ikke vise tilbakeknapp dersom det er første spørsmål', () => {

        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        let svarAlternativer = new Array<SvarAlternativModell>();
        const besvarteSpm = [{sporsmalId: forsteSpm.id, svarAlternativer: svarAlternativer, tips: tips}];
        const spmModell = spm.find(x => x.id === forsteSpm.id);
        const wrapper = mount(getJSXElement(besvarteSpm, spmModell!, sinon.spy()));

        expect(wrapper.find('.sporsmal__knapp__tilbake').exists()).toBe(false);
    });

});