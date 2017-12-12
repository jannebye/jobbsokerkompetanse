import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

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
        <section className="innholdscontainer">
            <FormattedMessage id={overskrift} tagName="h3" />
            <FormattedMessage id={innhold} tagName="p" />
            <FormattedHTMLMessage id={'les-mer-link'} values={{ link }} />
        </section>
    );
}

export default InnholdsContainer;
