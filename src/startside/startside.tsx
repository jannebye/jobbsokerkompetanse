import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Link } from "react-router-dom";
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { Sidetype } from '../utils/konstanter';

const sporsmalImg = require('../ikoner/forside.svg');

function Startside() {
    const start_spm_url = '/' + Sidetype.KARTLEGGING + '/' + alleSporsmal[0].id;

    return (
        <div className="limit">
            <div className="startside">
                <div className="startside__bildewrap">
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
                </div>
                <div className="startside__innhold">
                    <Sidetittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="startside-tittel"/>
                    </Sidetittel>
                    <Normaltekst>
                        <FormattedHTMLMessage id="startside-ingress"/>
                    </Normaltekst>
                    <div className="startside__knapperad">
                        <Link to={start_spm_url} className="knapp knapp--hoved sporsmal__knapp">
                            <FormattedMessage id="start-knapp"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Startside;
