/* tslint:disable*/
import * as React from 'react';
import { Sporsmal } from './sporsmal';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import spm from '../sporsmal/sporsmal-alle';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';
import { BrowserRouter } from 'react-router-dom';
import {shallowWithIntl} from "../test/intl-enzyme-test-helper";
configure({ adapter: new Adapter() });

function getJSXElement(
    besvarteSpm: Array<BesvartSporsmal>,
    spmModell: SporsmalModell,
    avgitteSvar?: string[],
    erNySide?: boolean,
    tips ?: string
) {
    return (
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
                tips={tips? tips : ''}
                skalStoppeForAViseNyttTips={false}
                doStoppForAViseNyttTips={() => {}}
                doVisNyttTips={() => {}}
                skalViseNyttTips={tips? true : false}
            />
        </BrowserRouter>
    );
}

describe('<Sporsmal />', function() {
    let tips: string | undefined;
    let svarAlternativer: Array<string>;

    const tilbakeLenkeSelector =
        'Link[className="sporsmal__knapp-tilbake"]';

    beforeEach(() => {
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

        shallowWithIntl(getJSXElement(besvarteSpm, sisteSpm));
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
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, sisteSpm!));
        const lenke = wrapper.dive().dive().find(tilbakeLenkeSelector);

        expect(lenke.exists()).toBe(true);
        lenke.simulate('click', { button: 0 });

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
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, sporsmal!));

        expect(wrapper.dive().dive().find(tilbakeLenkeSelector).exists()).toBe(true);
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
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, forsteSpm!));

        expect(wrapper.dive().dive().find('.sporsmal__videre').exists()).toBe(true);
    });

    it('skal vise feilmelding dersom spørsmål ikke er besvart og siden ikke er ny', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                svar: svarAlternativer,
                tips: tips
            }
        ];
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, forsteSpm!, [], false));
        const wrapperWithDive = wrapper.dive().dive();
        const feilmelding = wrapperWithDive.find('#feilmelding-mangler-svar');

        expect(feilmelding).toHaveLength(1);
        expect(feilmelding.text().length).toBeGreaterThan(5);
    });

    it('skal ikke vise feilmelding dersom spørsmål ikke er besvart og siden er ny', () => {
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push(forsteSpm!.alternativer[0]);
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                tips: tips,
                svar: []
            }
        ];
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, forsteSpm!, svarAlternativer, true));

        expect(wrapper.dive().dive().find('#feilmelding-mangler-svar')).toHaveLength(0);

    });

    it('skal vise tips', () => {
        const tipsId = 'sok-utenfor-hjemsted', tipsCss = 'TipsVisning';
        const forsteSpm = spm.find(x => x.erForsteSpm === true)!;
        svarAlternativer.push(forsteSpm!.alternativer[0]);
        const besvarteSpm = [
            {
                spmId: forsteSpm.id,
                svar: svarAlternativer,
                tips: tipsId
            }
        ];
        const wrapper = shallowWithIntl(getJSXElement(besvarteSpm, forsteSpm!,[], true, tipsId));
        expect(wrapper.dive().dive().find(tipsCss)).toHaveLength(1);
    });
});
