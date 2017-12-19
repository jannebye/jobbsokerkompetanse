import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper'

const sporsmalImg = require('../ikoner/forside.svg');

interface StartsideProps {
    startKartlegging: () => void;
}

function Startside({startKartlegging}: StartsideProps) {
    return (
        <div className="startside">
            <Sidetittel tag="h1">
                Startside
            </Sidetittel>
            <img src={sporsmalImg} alt="Forstørrelseglass"/>
            <div className="knapperad">
                <Hovedknapp onClick={() => startKartlegging()}>
                    Start
                </Hovedknapp>
            </div>
        </div>
    );
}

export default Startside;
