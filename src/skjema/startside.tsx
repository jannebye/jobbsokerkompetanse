import * as React from 'react';

interface StartsideProps {
    startKartlegging: () => void;
}

function Startside({ startKartlegging }: StartsideProps) {
    return (
        <div>
            Startside
            <button
                className="knapp knapp--hoved"
                onClick={() => startKartlegging()}
            >
                Start
            </button>;
        </div>
    );
}

export default Startside;
