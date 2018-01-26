import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

interface TipsProps {
    id: string;
}

class TipsVisning extends React.Component<TipsProps> {
    constructor(props: TipsProps) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    render() {
        return (
            <div>
                <Undertittel tag={'h1'} className={'tips__overskrift'}>
                    <FormattedMessage id="tips-standard-overskrift" />
                </Undertittel>
                <FormattedMessage id={this.props.id} />
            </div>
        );
    }
}

export default TipsVisning;
