import * as React from 'react';

const sporsmalImg = require('../ikoner/forstorrelsesglass.svg');

interface StartsideProps {
    startKartlegging: () => void;
}

function Startside({ startKartlegging }: StartsideProps) {
    return (
        <div className="startside">
            <h1 className="typo-sidetittel">Startside</h1>
            <img src={sporsmalImg} alt="Forstørrelseglass" />
            <button
                className="knapp knapp--hoved"
                onClick={() => startKartlegging()}
            >
                Start
            </button>
        </div>
    );
}

export default Startside;
