import * as React from 'react';
import SporsmalModell from './sporsmal-modell';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Sidetype } from '../utils/konstanter';

interface OwnProps {
    sporsmal: SporsmalModell;
    forrigeSpmId: string;
}

export class TilbakeLink extends React.Component<OwnProps> {

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const {sporsmal, forrigeSpmId} = this.props;
        const tilbakeUrl = sporsmal.erForsteSpm
            ? '/' + Sidetype.START
            : '/' + Sidetype.KARTLEGGING + '/' + forrigeSpmId;

        return (
            <Link
                to={tilbakeUrl}
                type={'standard'}
                className="sporsmal__knapp-tilbake"
            >
                {sporsmal.erForsteSpm ? (
                    <FormattedMessage id="forrige-knapp-start"/>
                ) : (
                    <FormattedMessage id="forrige-knapp"/>
                )}
            </Link>
        );
    }
}
