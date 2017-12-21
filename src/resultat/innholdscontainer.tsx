import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';

interface InnholdsContainerProps {
    overskrift: string;
    innhold: string;
    link: string;
}

function InnholdsContainer({
    overskrift,
    innhold,
    link
}: InnholdsContainerProps) {
    return (
        <Panel>
            <Sidetittel tag="h1">
                <FormattedMessage id={overskrift} />
            </Sidetittel>
            <FormattedMessage id={innhold} tagName="p" />
            <FormattedHTMLMessage id={'les-mer-link'} values={{ link }} />
        </Panel>
    );
}

export default InnholdsContainer;
