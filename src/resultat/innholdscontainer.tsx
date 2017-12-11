import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface InnholdsContainerProps {
    overskrift: string;
    innhold: string;
    link?: string;
}

function InnholdsContainer({overskrift, innhold, link}: InnholdsContainerProps) {
    return (
        <section className="innholdscontainer" >
            <FormattedMessage id={overskrift} tagName="h3"/>
            <FormattedMessage id={innhold}  tagName="p"/>
            <FormattedMessage id={'les-mer-link'} tagName="a" />
        </section>
    );
}

export default InnholdsContainer;