import * as React from 'react';
import SporsmalModell from './sporsmal-modell';

interface StateProps {
    sporsmal: SporsmalModell;
    sporsmalSomVises: string[];
}

export class Framdrift extends React.Component<StateProps> {
    render() {
        const {
            sporsmal,
            sporsmalSomVises,
        } = this.props;

        const gjeldendeSpmIndex = sporsmalSomVises.indexOf(sporsmal.id);

        const framdriftValue = Math.round((gjeldendeSpmIndex + 1) / sporsmalSomVises.length * 100);
        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftValue + '%'
        };

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
        );
    }
}
