import * as React from 'react';

export class Framdrift extends React.Component {
    render() {

        const gjeldendeSpmIndex = 0;
        const totaltAntallSpm = 19;

        const framdriftValue = Math.round(gjeldendeSpmIndex / totaltAntallSpm * 100 * 100) / 100;
        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftValue + '%'
        };

        console.log('framdriftValue: ' + framdriftValue); // tslint:disable-line:no-console

        return (
            <div
                className="framdrift"
                role="progressbar"
                aria-valuenow={Math.round(framdriftValue)}
                aria-valuemin="0"
                aria-valuemax="100"
                tabIndex={0}
            >
                <div className="andel" style={framdriftStyle}/>
            </div>
        )
    }
}
