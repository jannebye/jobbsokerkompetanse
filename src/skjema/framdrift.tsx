import * as React from 'react';
import SporsmalModell from '../sporsmal/sporsmal-modell';

interface StateProps {
    sporsmal: SporsmalModell;
    sporsmalSomVises: string[];
}

export class Framdrift extends React.Component<StateProps> {
    private framdriftContainer: HTMLDivElement;
    private framdriftIndikator: HTMLDivElement;

    scrolling() {
        let scrollHeight = 130.5;
        if (window.matchMedia('(min-width: 768px)').matches) {
            scrollHeight = 182;
        }
        if (window.scrollY >= scrollHeight) {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.add('framdrift-fixed');
            }
        } else {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.remove('framdrift-fixed');
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.scrolling();
        });
    }

    componentDidUpdate() {
        this.scrolling();
    }

    render() {
        const {sporsmal, sporsmalSomVises} = this.props;
        const gjeldendeSpmIndex = sporsmalSomVises.indexOf(sporsmal.id);
        const framdriftBredde = Math.round((gjeldendeSpmIndex + 1) / sporsmalSomVises.length * 100);

        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftBredde + '%'
        };

        return (
            <div
                ref={(div: HTMLDivElement) => this.framdriftContainer = div}
                className="framdrift"
                role="progressbar"
                aria-valuenow={Math.round(framdriftBredde)}
                aria-valuemin="0"
                aria-valuemax="100"
                tabIndex={0}
            >
                <div
                    ref={(div: HTMLDivElement) => this.framdriftIndikator = div}
                    className="andel"
                    style={framdriftStyle}
                />
                {this.scrolling()}
            </div>
        );
    }
}
