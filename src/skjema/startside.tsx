import * as React from 'react';

const sporsmalImg = require('../ikoner/forside.svg');

interface StartsideProps {
    startKartlegging: () => void;
}

function Startside({startKartlegging}: StartsideProps) {
    return (
        <div className="startside">
            <h1 className="typo-sidetittel">Startside</h1>
            <img src={sporsmalImg} alt="Forstørrelseglass"/>
            <div className="knapperad">
                <button
                    className="knapp knapp--hoved"
                    onClick={() => startKartlegging()}
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default Startside;
