import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SporsmalModell from './sporsmal-modell';

interface OwnProps {
    sporsmal: SporsmalModell;
}

export class SporsmalBilde extends React.Component<OwnProps> {

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const {sporsmal} = this.props;
        const sporsmalImg = require('../ikoner/' + sporsmal.id + '.svg');

        return (
            <FormattedMessage id={sporsmal.id + ''}>
                {(tekst: string) => (
                    <img src={sporsmalImg} className="sporsmal__ikon" alt={tekst} />
                )}
            </FormattedMessage>
        );
    }
}
