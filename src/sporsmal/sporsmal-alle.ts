import Sporsmal from './sporsmal-modell';
import { AlternativTyper } from '../utils/konstanter';

const spm: Sporsmal[] = [
    {
        id: 'finn-spm-01',
        alternativer: [
            'finn-svar-0101',
            'finn-svar-0102',
            'finn-svar-0103',
            'finn-svar-0104',
            'finn-svar-0105',
            'finn-svar-0106',
            'finn-svar-0107',
            'finn-svar-0108',
            'finn-svar-0109',
            'finn-svar-0110',
            'finn-svar-0111'
        ],
        type: AlternativTyper.FLERVALG,
        erForsteSpm: true
    },
    {
        id: 'finn-spm-02',
        alternativer: [
            'finn-svar-0201',
            'finn-svar-0202',
            'finn-svar-0203',
            'finn-svar-0204',
            'finn-svar-0205',
            'finn-svar-0206'
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'finn-spm-03',
        alternativer: [
            'finn-svar-0301',
            'finn-svar-0302',
            'finn-svar-0303'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'finn-spm-04',
        alternativer: [
            'finn-svar-0401',
            'finn-svar-0402',
            'finn-svar-0403',
            'finn-svar-0404',
            'finn-svar-0405',
            'finn-svar-0406'
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'finn-spm-05',
        alternativer: [
            'finn-svar-0501',
            'finn-svar-0502',
            'finn-svar-0503',
            'finn-svar-0504'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-01',
        alternativer: [
            'cv-svar-0101',
            'cv-svar-0102',
            'cv-svar-0103',
            'cv-svar-0104',
            'cv-svar-0105',
            'cv-svar-0106',
            'cv-svar-0107',
            'cv-svar-0108'
        ],
        type: AlternativTyper.FLERVALG,
        uniktAlternativ: 'cv-svar-0108'
    },
    {
        id: 'cv-spm-02',
        alternativer: [
            'cv-svar-0201',
            'cv-svar-0202',
            'cv-svar-0203'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-03',
        alternativer: [
            'cv-svar-0301',
            'cv-svar-0302',
            'cv-svar-0303'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-04',
        alternativer: [
            'cv-svar-0401',
            'cv-svar-0402',
            'cv-svar-0403',
            'cv-svar-0404',
            'cv-svar-0405'
        ],
        type: AlternativTyper.SKALA,
        egenUndertekst: 'mellomtekst-spm-cv-04'
    },
    {
        id: 'cv-spm-05',
        alternativer: [
            'cv-svar-0501',
            'cv-svar-0502',
            'cv-svar-0503',
            'cv-svar-0504',
            'cv-svar-0505',
            'cv-svar-0506',
            'cv-svar-0507'
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'soke-spm-01',
        alternativer: [
            'soke-svar-0101',
            'soke-svar-0102',
            'soke-svar-0103',
            'soke-svar-0104',
            'soke-svar-0105'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-02',
        alternativer: [
            'soke-svar-0201',
            'soke-svar-0202',
            'soke-svar-0203'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-03',
        alternativer: [
            'soke-svar-0301',
            'soke-svar-0302',
            'soke-svar-0303'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-04',
        alternativer: [
            'soke-svar-0401',
            'soke-svar-0402',
            'soke-svar-0403'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'intervju-spm-01',
        alternativer: [
            'intervju-svar-0101',
            'intervju-svar-0102',
            'intervju-svar-0103',
            'intervju-svar-0104',
            'intervju-svar-0105'
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'intervju-spm-02',
        alternativer: [
            'intervju-svar-0201',
            'intervju-svar-0202',
            'intervju-svar-0203',
            'intervju-svar-0204',
            'intervju-svar-0205',
            'intervju-svar-0206',
            'intervju-svar-0207'
        ],
        type: AlternativTyper.FLERVALG,
        uniktAlternativ: 'intervju-svar-0201'
    },
    {
        id: 'intervju-spm-03',
        alternativer: [
            'intervju-svar-0301',
            'intervju-svar-0302',
            'intervju-svar-0303',
            'intervju-svar-0304',
            'intervju-svar-0305'
        ],
        type: AlternativTyper.SKALA
    },
    {
        id: 'intervju-spm-04',
        alternativer: [
            'intervju-svar-0401',
            'intervju-svar-0402',
            'intervju-svar-0403',
            'intervju-svar-0404',
            'intervju-svar-0405',
            'intervju-svar-0406',
            'intervju-svar-0407',
            'intervju-svar-0408',
            'intervju-svar-0409'
        ],
        type: AlternativTyper.FLERVALG,
        uniktAlternativ: 'intervju-svar-0409'
    },
    {
        id: 'intervju-spm-05',
        alternativer: [
            'intervju-svar-0501',
            'intervju-svar-0502',
            'intervju-svar-0503',
            'intervju-svar-0504',
            'intervju-svar-0505'
        ],
        type: AlternativTyper.ETTVALG,
        erSisteSpm: true
    }
];

export default spm;
