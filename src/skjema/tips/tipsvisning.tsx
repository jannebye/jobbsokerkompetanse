import * as React from 'react';
import {  FormattedMessage } from 'react-intl';

interface TipsProps {
    id: string;
}

function TipsVisning({ id }: TipsProps) {
    return (
        <div className="tips">
            <h3 className="tips__overskrift">
                <FormattedMessage id="tips-standard-overskrift" />
            </h3>
            <FormattedMessage id={id} />

        </div>
    );
}

export default TipsVisning;
