import Sporsmal from './sporsmal-modell';
import { AlternativTyper } from '../utils/konstanter';

const spm: Sporsmal[] = [
    {
        id: 'finn-spm-01',
        alternativer: [
            { id: 'finn-svar-0101' },
            { id: 'finn-svar-0102' },
            { id: 'finn-svar-0103' },
            { id: 'finn-svar-0104' },
            { id: 'finn-svar-0105' },
            { id: 'finn-svar-0106' },
            { id: 'finn-svar-0107' },
            { id: 'finn-svar-0108' },
            { id: 'finn-svar-0109' },
            { id: 'finn-svar-0110' },
            { id: 'finn-svar-0111' }
        ],
        type: AlternativTyper.FLERVALG,
        erForsteSpm: true
    },
    {
        id: 'finn-spm-02',
        alternativer: [
            { id: 'finn-svar-0201' },
            { id: 'finn-svar-0202' },
            { id: 'finn-svar-0203' },
            { id: 'finn-svar-0204' },
            { id: 'finn-svar-0205' },
            { id: 'finn-svar-0206' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'finn-spm-03',
        alternativer: [
            { id: 'finn-svar-0301' },
            { id: 'finn-svar-0302' },
            { id: 'finn-svar-0303' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'finn-spm-04',
        alternativer: [
            { id: 'finn-svar-0401' },
            { id: 'finn-svar-0402' },
            { id: 'finn-svar-0403' },
            { id: 'finn-svar-0404' },
            { id: 'finn-svar-0405' },
            { id: 'finn-svar-0406' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'finn-spm-05',
        alternativer: [
            { id: 'finn-svar-0501' },
            { id: 'finn-svar-0502' },
            { id: 'finn-svar-0503' },
            { id: 'finn-svar-0504' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-01',
        alternativer: [
            { id: 'cv-svar-0101' },
            { id: 'cv-svar-0102' },
            { id: 'cv-svar-0103' },
            { id: 'cv-svar-0104' },
            { id: 'cv-svar-0105' },
            { id: 'cv-svar-0106' },
            { id: 'cv-svar-0107' },
            { id: 'cv-svar-0108' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'cv-spm-02',
        alternativer: [
            { id: 'cv-svar-0201' },
            { id: 'cv-svar-0202' },
            { id: 'cv-svar-0203' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-03',
        alternativer: [
            { id: 'cv-svar-0301' },
            { id: 'cv-svar-0302' },
            { id: 'cv-svar-0303' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'cv-spm-04',
        alternativer: [
            { id: 'cv-svar-0401', skalaId: 1 },
            { id: 'cv-svar-0402', skalaId: 2 },
            { id: 'cv-svar-0403', skalaId: 3 },
            { id: 'cv-svar-0404', skalaId: 4 },
            { id: 'cv-svar-0405', skalaId: 5 }
        ],
        type: AlternativTyper.SKALA
    },
    {
        id: 'cv-spm-05',
        alternativer: [
            { id: 'cv-svar-0501' },
            { id: 'cv-svar-0502' },
            { id: 'cv-svar-0503' },
            { id: 'cv-svar-0504' },
            { id: 'cv-svar-0505' },
            { id: 'cv-svar-0506' },
            { id: 'cv-svar-0507' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'soke-spm-01',
        alternativer: [
            { id: 'soke-svar-0101' },
            { id: 'soke-svar-0102' },
            { id: 'soke-svar-0103' },
            { id: 'soke-svar-0104' },
            { id: 'soke-svar-0105' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-02',
        alternativer: [
            { id: 'soke-svar-0201' },
            { id: 'soke-svar-0202' },
            { id: 'soke-svar-0203' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-03',
        alternativer: [
            { id: 'soke-svar-0301' },
            { id: 'soke-svar-0302' },
            { id: 'soke-svar-0303' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'soke-spm-04',
        alternativer: [
            { id: 'soke-svar-0401' },
            { id: 'soke-svar-0402' },
            { id: 'soke-svar-0403' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'intervju-spm-01',
        alternativer: [
            { id: 'intervju-svar-0101' },
            { id: 'intervju-svar-0102' },
            { id: 'intervju-svar-0103' },
            { id: 'intervju-svar-0104' },
            { id: 'intervju-svar-0105' }
        ],
        type: AlternativTyper.ETTVALG
    },
    {
        id: 'intervju-spm-02',
        alternativer: [
            { id: 'intervju-svar-0201' },
            { id: 'intervju-svar-0202' },
            { id: 'intervju-svar-0203' },
            { id: 'intervju-svar-0204' },
            { id: 'intervju-svar-0205' },
            { id: 'intervju-svar-0206' },
            { id: 'intervju-svar-0207' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'intervju-spm-03',
        alternativer: [
            { id: 'intervju-svar-0301', skalaId: 1 },
            { id: 'intervju-svar-0302', skalaId: 2 },
            { id: 'intervju-svar-0303', skalaId: 3 },
            { id: 'intervju-svar-0304', skalaId: 4 },
            { id: 'intervju-svar-0305', skalaId: 5 }
        ],
        type: AlternativTyper.SKALA
    },
    {
        id: 'intervju-spm-04',
        alternativer: [
            { id: 'intervju-svar-0401' },
            { id: 'intervju-svar-0402' },
            { id: 'intervju-svar-0403' },
            { id: 'intervju-svar-0404' },
            { id: 'intervju-svar-0405' },
            { id: 'intervju-svar-0406' },
            { id: 'intervju-svar-0407' },
            { id: 'intervju-svar-0408' },
            { id: 'intervju-svar-0409' }
        ],
        type: AlternativTyper.FLERVALG
    },
    {
        id: 'intervju-spm-05',
        alternativer: [
            { id: 'intervju-svar-0501' },
            { id: 'intervju-svar-0502' },
            { id: 'intervju-svar-0503' },
            { id: 'intervju-svar-0504' },
            { id: 'intervju-svar-0505' }
        ],
        type: AlternativTyper.ETTVALG,
        erSisteSpm: true
    }
];

export default spm;
