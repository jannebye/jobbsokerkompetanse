import * as React from 'react';
import {expect} from 'chai';
import BesvarelseModell from "../svar/svar-modell";
import SvarAlternativModell from "../sporsmal/svaralternativ";
import { Resultat } from './resultat';
import {configure, shallow, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import getStore from '../store';
import IntlProvider from "../Intl-provider";
import {Provider} from "react-redux";
configure({ adapter: new Adapter() });
let store = getStore();

describe('<Resultat />', function() {
    let besvarteSpm : BesvarelseModell[];
    let svarAlternativer: SvarAlternativModell[];

    beforeEach(() => {
        svarAlternativer = new Array<SvarAlternativModell>()
        besvarteSpm = new Array<BesvarelseModell>();
    });

    it('rendrer klasse', () => {
        let wrapper = shallow(<Resultat besvarteSporsmal={besvarteSpm} startPaNytt={()=>{}}/>);
        expect(wrapper.exists()).to.equal(true);
        expect(wrapper.hasClass('resultatside')).to.equal(true);
        expect(true).to.equal(true);
    });

    it('skal vise overskrift', () => {

        let wrapper = mount(<Provider store={store}><IntlProvider><Resultat besvarteSporsmal={besvarteSpm} startPaNytt={()=>{}}/></IntlProvider></Provider>);
        expect(wrapper.find('.overskrift__tema'));//.text()).to.contain('Vi har uthevet 4 råd til deg');
    });

    it('skal foreslå å søke på flere bransjer', () => {
        svarAlternativer.push({id:'finn-svar-0301'});
        besvarteSpm.push({sporsmalId:'finn-spm-03', svarAlternativer:svarAlternativer});
        let wrapper = mount(<Provider store={store}><IntlProvider><Resultat besvarteSporsmal={besvarteSpm} startPaNytt={()=>{}}/></IntlProvider></Provider>);
        let fantTema = wrapper.find('.enkelt__tema').filterWhere(x=> x.length==1 && x.text() === 'Søk jobb i ulike bransjer').exists();
        expect(fantTema).to.equal(true);

    });
    it('skal ikke foreslå å søke på flere bransjer', () => {
        svarAlternativer.push({id:'finn-svar-0302'});
        besvarteSpm.push({sporsmalId:'finn-spm-03', svarAlternativer:svarAlternativer});

        let wrapper = mount(<Provider store={store}><IntlProvider><Resultat besvarteSporsmal={besvarteSpm} startPaNytt={()=>{}}/></IntlProvider></Provider>);
        let fantTema = wrapper.find('.enkelt__tema').filterWhere(x=> x.length==1 && x.text() === 'Søk jobb i ulike bransjer').exists();
        expect(fantTema).to.equal(false);

    });
});