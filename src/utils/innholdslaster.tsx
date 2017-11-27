/*
import * as React from 'react';
import {STATUS} from '../ducks/utils';
import {SvarState} from "../svar/svar-duck";
import {LedeTekstState} from "../ducks/ledetekster-reducer";
import {Spinner} from "nav-frontend-spinner";

interface AvhengigheterModell {
    avhengighet: SvarState | LedeTekstState;
}

interface InnholdsLasterProps {
    avhengigheter: AvhengigheterModell[];
    spinnerStorrelse: string;
    className: string;
    children: React.ReactElement<any>;
    minstEn: boolean;
    visChildrenVedFeil: boolean;
}

const array = (value: STATUS | STATUS[]) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: STATUS[]) => (element: AvhengigheterModell) => element && array(status).includes(element.status);
const noenHarFeil = (avhengigheter: AvhengigheterModell[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.FEILET));
const minstEnErOK = (avhengigheter: AvhengigheterModell[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.OK));
const alleLastet = (avhengigheter: AvhengigheterModell[]) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));

function Innholdslaster({avhengigheter, spinnerStorrelse, className, children, minstEn, visChildrenVedFeil}: InnholdsLasterProps) {
    const visChildren =
        alleLastet(avhengigheter) ||
        (minstEn && minstEnErOK(avhengigheter)) ||
        (visChildrenVedFeil && noenHarFeil(avhengigheter));

    if (visChildren) {
        if (typeof children === 'function') {
            return children(avhengigheter);
        }
        if (Array.isArray(children)) {
            return (
                {children}
            );
        }
        return children;
    }

    return (
        <Spinner className={className} storrelse={spinnerStorrelse}/>
    );
}

export default Innholdslaster;
*/
