import * as React from 'react';
import { Sporsmal } from './sporsmal';
import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';
import spm from '../sporsmal/sporsmal-alle';
import { BesvarelseModell } from '../svar/svar-modell';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import SvarAlternativModell from '../svar/svaralternativ';
import { SinonSpy } from 'sinon';
const sinon = require('sinon');

configure({ adapter: new Adapter() });
const store = getStore();

function getJSXElement(
    besvarteSpm: Array<BesvarelseModell>,
    spmModell: SporsmalModell,
    spy: SinonSpy
) {
    return (
        <Provider store={store}>
            <IntlProvider>
                <Sporsmal
                    nesteSpm={spy}
                    forrigeSpm={spy}
                    sporsmal={spmModell}
                    spmRef={spmModell}
                    markerAlternativ={() => {
                        return;
                    }}
                    visAlternativer={() => {
                        return;
                    }}
                    viserAlternativer={false}
                    paVeiBakover={false}
                    besvarteSporsmal={besvarteSpm}
                    visTips={ () => {
                        return;
                    }}
                    totaltAntallSpm={1}
                    handleSubmit={() => {return; }}
                    startPaNytt={() => {return; }}
                />
            </IntlProvider>
        </Provider>
    );
}

describe('<Sporsmal />', function() {
    let tips: string | undefined;
    let spy: SinonSpy;
    let svarAlternativer: Array<SvarAlternativModell>;
    const preventDefault = {
        preventDefault: () => {
            return;
        }
    };
    const tilbakeKnappSelector =
        'KnappBase[className="sporsmal__knapp-tilbake"] > button';

    beforeEach(() => {
        spy = sinon.spy();
        svarAlternativer = [];
    });

    it('skal rendre komponent', () => {
        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const besvarteSpm = [
            {
                sporsmalId: sisteSpm!.id,
                svarAlternativer: svarAlternativer,
                tips: tips
            }
        ];

        shallow(getJSXElement(besvarteSpm, sisteSpm, spy));
    });

    it('skal kunne trykke på tilbakeknapp dersom det er siste spørsmål', () => {
        const sisteSpm = spm.find(x => x.erSisteSpm === true)!;
        const besvarteSpm = [
            {
                sporsmalId: sisteSpm.id,
                svarAlternativer: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, sisteSpm!, spy));
        const knapp = wrapper.find(tilbakeKnappSelector);

        expect(knapp.exists()).toBe(true);
        knapp.simulate('click', preventDefault);
        expect(spy.calledOnce).toBeTruthy();
    });

    it('skal vise tilbakeknapp hvis det hverken er første eller siste spørsmål', () => {
        const sporsmal = spm.find(x => !x.erSisteSpm && !x.erForsteSpm)!;
        const besvarteSpm = [
            {
                sporsmalId: sporsmal.id,
                svarAlternativer: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, sporsmal!, spy));

        expect(wrapper.find(tilbakeKnappSelector).exists()).toBe(true);
    });

    it('skal vise nesteknapp', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        const besvarteSpm = [
            {
                sporsmalId: forsteSpm.id,
                svarAlternativer: svarAlternativer,
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
                sporsmalId: forsteSpm.id,
                svarAlternativer: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy));

        wrapper
            .find('.sporsmal__knapp')
            .last()
            .simulate('click', preventDefault);

        expect(wrapper.find('#feilmelding-mangler-svar')).toHaveLength(1);
    });

    it('skal ikke vise feilmelding dersom man trykker på nesteknapp og spørsmål er besvart', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push({ id: forsteSpm!.alternativer[0].id });
        const besvarteSpm = [
            {
                sporsmalId: forsteSpm.id,
                svarAlternativer: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy));

        wrapper
            .find('.sporsmal__knapp')
            .last()
            .simulate('click', preventDefault);

        expect(wrapper.find('#feilmelding-mangler-svar')).toHaveLength(0);
        expect(spy.calledOnce).toBeTruthy();
    });

    it('skal vise tips', () => {
        const tipsId = 'sok-utenfor-hjemsted';
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push({ id: forsteSpm!.alternativer[0].id });
        const besvarteSpm = [
            {
                sporsmalId: forsteSpm.id,
                svarAlternativer: svarAlternativer,
                tips: tipsId
            }
        ];
        const wrapper = mount(getJSXElement(besvarteSpm, forsteSpm!, spy));
        const tipsCss = `TipsVisning`;

        expect(wrapper.find(tipsCss)).toHaveLength(1);
    });
});
