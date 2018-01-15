import * as React from 'react';
import {  FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

interface TipsProps {
    id: string;
}

function TipsVisning({ id }: TipsProps) {
    return (
        <section className="tips">
            <Undertittel tag={'h1'} className={'tips__overskrift'}>
                <FormattedMessage id="tips-standard-overskrift" />
            </Undertittel>
            <FormattedMessage id={id} />
        </section>
    );
}

export default TipsVisning;
