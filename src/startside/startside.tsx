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
            <FormattedMessage id="startside-image-alt">
                {(tekst: string) => (
                    <img
                        src={sporsmalImg}
                        alt={tekst}
                        className="startside__bilde"
                        role="img"
                    />
                )}
            </FormattedMessage>
            <div className="startside__innhold">
                <Sidetittel tag="h1" className="blokk-xs">
                    <FormattedMessage id="startside-tittel"/>
                </Sidetittel>
                <Normaltekst>
                    <FormattedHTMLMessage id="startside-ingress"/>
                </Normaltekst>
                <div className="startside__knapperad">
                    <Hovedknapp
                        onClick={() => startKartlegging()}
                        className="sporsmal__knapp"
                    >
                        <FormattedMessage id="start-knapp"/>
                    </Hovedknapp>
                </div>
            </div>
        </div>
    );
}

export default Startside;
