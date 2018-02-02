import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
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
        <Panel className="resultat__panel">
            <Innholdstittel tag="h1">
                <FormattedMessage id={overskrift} />
            </Innholdstittel>
            <FormattedHTMLMessage id={innhold} values={{ link }} tagName="p" />
        </Panel>
    );
}

export default InnholdsContainer;
