import * as React from 'react';
import { expect } from 'chai';
import { Resultat } from './resultat';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';

configure({ adapter: new Adapter() });
const store = getStore();

function getJSXElement(besvarteSpm: Array<BesvartSporsmal>) {
    return (
        <Provider store={store}>
            <IntlProvider>
                <Resultat
                    besvarteSporsmal={besvarteSpm}
                />
            </IntlProvider>
        </Provider>
    );
}

// key : se id i alle-temaer.ts
function hentTema(wrapper: ReactWrapper, key: string) {
    return wrapper
        .find('.enkelt__raad')
        .filterWhere(x => (key.length === 0 ? true : x.key() === key));
}

// besvarteSpm.Id, svarAlternativer.sporsmalId: se alle-tekster.ts
describe('<Resultat />', function() {
    let besvarteSpm: BesvartSporsmal[];
    let svarAlternativer: string[];
    let tips: string | undefined;

    beforeEach(() => {
        svarAlternativer = new Array<string>();
        besvarteSpm = new Array<BesvartSporsmal>();
        tips = undefined;
    });

    it('skal vise overskrift', () => {
        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(wrapper.find('#overskrift-raad').text()).to.contain(
            'Jobbsøkertips til deg'
        );
    });

    it('skal foreslå å søke i flere bransjer hvis man søker på en type stilling', () => {
        svarAlternativer.push('finn-svar-0301');
        besvarteSpm.push({
            spmId: 'finn-spm-03',
            svar: svarAlternativer,
            tips: tips
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '525215').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(true);
    });

    it('skal ikke foreslå å søke i flere bransjer hvis man søker på flere typer stilling', () => {
        svarAlternativer.push('finn-svar-0302');
        besvarteSpm.push({
            spmId: 'finn-spm-03',
            svar: svarAlternativer,
            tips: tips
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '525215').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(false);
    });

    it('skal ikke foreslå hjelp til å skrive søknad', () => {
        svarAlternativer.push('cv-svar-0506');
        besvarteSpm.push({
            spmId: 'cv-spm-05',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '454152').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(false);
    });

    it('skal foreslå hjelp til å skrive søknad hvis man har lite erfaring med å søke', () => {
        svarAlternativer.push('cv-svar-0507');
        besvarteSpm.push({
            spmId: 'cv-spm-05',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '454152').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(true);
    });

    it('skal foreslå hjelp til å skrive søknad hvis man ikke har søkt det siste året', () => {
        svarAlternativer.push('soke-svar-0101');
        besvarteSpm.push({
            spmId: 'soke-spm-01',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '454152').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(true);
    });

    it('skal foreslå hjelp til å skrive søknad hvis man ikke har vært på intervju det siste året', () => {
        svarAlternativer.push('soke-svar-0201');
        besvarteSpm.push({
            spmId: 'soke-spm-02',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '454152').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(true);
    });

    it('skal foreslå hjelp til å skrive søknad hvis man ikke tilpasser søknaden', () => {
        svarAlternativer.push('soke-svar-0401');
        besvarteSpm.push({
            spmId: 'soke-spm-04',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        const fantTema = hentTema(wrapper, '454152').exists();

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(fantTema).to.equal(true);
    });

    it('skal foreslå å ta kontakt med en bedrift', () => {
        svarAlternativer.push('finn-svar-0108');
        besvarteSpm.push({
            spmId: 'finn-spm-01',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '526645').exists()).to.equal(true);
    });

    it('skal ikke foreslå å ta kontakt med en bedrift hvis man har kontaktet arbeidsgivere direkte', () => {
        svarAlternativer.push('finn-svar-0110');
        besvarteSpm.push({
            spmId: 'finn-spm-01',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '526645').exists()).to.equal(false);
    });

    it('skal ikke foreslå å ta kontakt med en bedrift selv om man krysser av for flere alternativer', () => {
        svarAlternativer.push('finn-svar-0101');
        svarAlternativer.push('finn-svar-0110');
        svarAlternativer.push('finn-svar-0109');
        besvarteSpm.push({
            spmId: 'finn-spm-01',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '526645').exists()).to.equal(false);
    });

    it('skal foreslå å forberede seg til intervju hvis man ikke har blitt innkalt det siste året', () => {
        svarAlternativer.push('soke-svar-0201');
        besvarteSpm.push({
            spmId: 'soke-spm-02',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454121').exists()).to.equal(true);
    });

    it('skal ikke foreslå å beskrive kompetanse', () => {
        svarAlternativer.push('soke-svar-0401');
        besvarteSpm.push({
            spmId: 'soke-spm-04',
            svar: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '54067').exists()).to.equal(false);
    });
});
