import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const sporsmalImg = require('../ikoner/forside.svg');

interface StartsideProps {
    startKartlegging: () => void;
}

function Startside({startKartlegging}: StartsideProps) {
    return (
        <div className="startside">
            <div className="bakgrunn"/>
            <FormattedMessage id="startside-image-alt">
                {(tekst: string) =>
                    <img src={sporsmalImg} alt={tekst} className="forside-bilde"/>
                }
            </FormattedMessage>
            <div>
                <Sidetittel tag="h1" className="blokk-xs">
                    <FormattedMessage id="startside-tittel"/>
                </Sidetittel>
                <Normaltekst>
                    <FormattedHTMLMessage id="startside-ingress"/>
                </Normaltekst>
            </div>
            <div className="knapperad">
                <Hovedknapp onClick={() => startKartlegging()} className="sporsmal__knapp">
                    <FormattedMessage id="start-knapp"/>
                </Hovedknapp>
            </div>
        </div>
    );
}

export default Startside;
