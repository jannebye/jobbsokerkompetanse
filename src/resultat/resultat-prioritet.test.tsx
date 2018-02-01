import * as React from 'react';
import { expect } from 'chai';
import { BesvarelseModell } from '../svar/svar-modell';
import { Resultat } from './resultat';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });
const store = getStore();

function getJSXElement(besvarteSpm: Array<BesvarelseModell>) {
    return (
        <Provider store={store}>
            <IntlProvider>
                <Resultat besvarteSporsmal={besvarteSpm} />
            </IntlProvider>
        </Provider>
    );
}

// key : se id i alle-temaer.ts/ tema.tsx
function hentTema(wrapper: ReactWrapper, key: string) {
    return wrapper
        .find('.enkelt__tema')
        .filterWhere(x => (key.length === 0 ? true : x.key() === key));
}

// besvarteSpm.Id, svarAlternativer.sporsmalId: se alle-tekster.ts
describe('<Resultat />', function() {
    const besvarteSpm = new Array<BesvarelseModell>();

    it('skal foreslå å søke utenfor hjemstedet (pri 5) og å beskrive kompetanse (pri 6)', () => {
        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '525225').exists()).to.equal(true);
        expect(hentTema(wrapper, '540674').exists()).to.equal(true);
    });

    it('skal foreslå å sende en åpen søknad (pri 7) isteden for å søke utenfor hjemstedet(pri 5)', () => {
        const svarAlternativer = [{ id: 'finn-svar-0203' }]; // Dekvalifiser tema pri 5
        besvarteSpm.push({
            sporsmalId: 'finn-spm-02',
            svarAlternativer: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));
        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454378').exists()).to.equal(true);
        expect(hentTema(wrapper, '525225').exists()).to.equal(false);
    });

    it('skal foreslå å lage en god CV (pri 8) isteden for å sende en åpen søknad (pri 7)', () => {
        const svarAlternativer = [{ id: 'cv-svar-0504' }]; // Dekvalifiser tema pri 7
        besvarteSpm.push({
            sporsmalId: 'cv-spm-05',
            svarAlternativer: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '526632').exists()).to.equal(true);
        expect(hentTema(wrapper, '454378').exists()).to.equal(false);
    });

    it('skal foreslå å opprette et automatisk stillingssøk (pri 9) isteden for å søke i ulike bransjer (pri 1)', () => {
        const svarAlternativer = [{ id: 'finn-svar-0302' }]; // Dekvalifiser tema pri 1
        besvarteSpm.push({
            sporsmalId: 'finn-spm-03',
            svarAlternativer: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454091').exists()).to.equal(true);
        expect(hentTema(wrapper, '525215').exists()).to.equal(false);
    });

    it('skal foreslå å bruke nettverket (pri 10) isteden for å opprette et automatisk stillingssøk (pri 9)', () => {
        const svarAlternativer = [{ id: 'finn-svar-0103' }]; // Dekvalifiser tema pri 9
        besvarteSpm.push({
            sporsmalId: 'finn-spm-01',
            svarAlternativer: svarAlternativer,
            tips: ''
        });
        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454097').exists()).to.equal(true);
        expect(hentTema(wrapper, '454091').exists()).to.equal(false);
    });

    it('skal foreslå å forberede til intervjuet (pri 4) isteden for å bruke nettverket (pri 10)', () => {
        besvarteSpm.find(
            x => x.sporsmalId === 'finn-spm-01'
        )!.svarAlternativer.push({ id: 'finn-svar-0107' }); // Dekvalifiser tema pri 10

        const svarAlternativer = [{ id: 'intervju-svar-0102' }]; // Kvalifiserer for pri 4, 11
        besvarteSpm.push({
            sporsmalId: 'intervju-spm-01',
            svarAlternativer: svarAlternativer,
            tips: ''
        });

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454121').exists()).to.equal(true);
        expect(hentTema(wrapper, '454126').exists()).to.equal(false);
        expect(hentTema(wrapper, '454097').exists()).to.equal(false);
    });

    it('skal foreslå å øve til intervjusituasjonen (pri 11) isteden for å ta kontakt med en bedrift (pri 3)', () => {
        besvarteSpm.find(
            x => x.sporsmalId === 'finn-spm-01'
        )!.svarAlternativer.push({ id: 'finn-svar-0110' }); // Dekvalifiser tema pri 3

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454126').exists()).to.equal(true);
        expect(hentTema(wrapper, '526645').exists()).to.equal(false);
    });

    it('skal foreslå å gjøre et godt førsteinntrykk (pri 12) ', () => {
        besvarteSpm.find(
            x => x.sporsmalId === 'intervju-spm-01'
        )!.svarAlternativer = [{ id: 'intervju-svar-0103' }]; // Dekvalifiser tema pri 4, 11

        const wrapper = mount(getJSXElement(besvarteSpm));

        expect(hentTema(wrapper, '').length).to.equal(4);
        expect(hentTema(wrapper, '454127').exists()).to.equal(true);
        expect(hentTema(wrapper, '454121').exists()).to.equal(false);
        expect(hentTema(wrapper, '454126').exists()).to.equal(false);
    });
});
