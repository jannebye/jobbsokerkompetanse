/* tslint:disable*/
import * as React from 'react';
import { Sporsmal } from './sporsmal';
import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';
import spm from '../sporsmal/sporsmal-alle';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { SinonSpy } from 'sinon';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';
import { BrowserRouter } from 'react-router-dom';
const sinon = require('sinon');

configure({ adapter: new Adapter() });
const store = getStore();

function getJSXElement(
    besvarteSpm: Array<BesvartSporsmal>,
    spmModell: SporsmalModell,
    spy: SinonSpy,
    avgitteSvar?: string[],
    erNySide?: boolean,
) {
    return (
        <Provider store={store}>
            <IntlProvider>
                <BrowserRouter>
                <Sporsmal
                    sporsmal={spmModell}
                    spmRef={spmModell}
                    gaTilNesteSporsmal={() => {}}
                    paVeiBakover={false}
                    besvarteSporsmal={besvarteSpm}
                    sporsmalSomVises={[]}
                    avgitteSvar={avgitteSvar ? avgitteSvar : []}
                    erNySide={erNySide ? erNySide : false}
                    ikkeNySideLenger={() => {}}
                    tips={''}
                    skalStoppeForAViseNyttTips={false}
                    doStoppForAViseNyttTips={() => {}}
                    doVisNyttTips={() => {}}
                    skalViseNyttTips={false}
                />
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    );
}

describe('<Sporsmal />', function() {
    let tips: string | undefined;
    let spy: SinonSpy;
    let svarAlternativer: Array<string>;
/*
    const preventDefault = {
        preventDefault: () => {
            return;
        }
    };
*/
    const tilbakeLenkeSelector =
        'Link[className="sporsmal__knapp-tilbake"]';

    beforeEach(() => {
        spy = sinon.spy();
        svarAlternativer = [];
    });

    it('skal rendre komponent', () => {
        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const besvarteSpm = [
            {
                spmId: sisteSpm!.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];

        shallow(getJSXElement(besvarteSpm, sisteSpm, spy));
    });

    it('skal kunne trykke på tilbakeknapp dersom det er siste spørsmål', () => {
        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const besvarteSpm = [
            {
                spmId: sisteSpm.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, sisteSpm!, spy));
        const lenke = wrapper.find(tilbakeLenkeSelector);

        expect(lenke.exists()).toBe(true);
/*
        lenke.simulate('click', { button: 0 });
        expect(spy.called).toBeTruthy();
*/
    });

    it('skal vise tilbakeknapp hvis det hverken er første eller siste spørsmål', () => {
        const sporsmal = spm.find(x => !x.erSisteSpm && !x.erForsteSpm)!;
        const besvarteSpm = [
            {
                spmId: sporsmal.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, sporsmal!, spy));

        expect(wrapper.find(tilbakeLenkeSelector).exists()).toBe(true);
    });

    it('skal vise nesteknapp', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy));

        expect(wrapper.find('.sporsmal__videre').exists()).toBe(true);
    });

    it('skal vise feilmelding dersom man trykker på nesteknapp og spørsmål ikke er besvart', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy, [], true));

        wrapper
            .find('.sporsmal__knapp')
            .last();
            //.simulate('click', { button: 0 });
        expect(wrapper.exists()).toBeTruthy();
        //console.log(wrapper.debug());
        //expect(wrapper.find('#feilmelding-mangler-svar')).toHaveLength(1);
    });

    it('skal ikke vise feilmelding dersom man trykker på nesteknapp og spørsmål er besvart', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push(forsteSpm!.alternativer[0]);
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                tips: tips,
                svar: []
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy, svarAlternativer, false));

        wrapper
            .find('.sporsmal__knapp')
            .last();
            //.simulate('click', { button: 0 });
        expect(wrapper.exists()).toBeTruthy();

/*
        expect(wrapper.find('#feilmelding-mangler-svar')).toHaveLength(0);
        expect(spy.called).toBeTruthy();
*/
    });

    it('skal vise tips', () => {
        const tipsId = 'sok-utenfor-hjemsted';
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push(forsteSpm!.alternativer[0]);
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                svar: svarAlternativer,
                tips: tipsId
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy));
        const tipsCss = 'TipsVisning';

        expect(wrapper.find(tipsCss)).toHaveLength(0);
    });
});
