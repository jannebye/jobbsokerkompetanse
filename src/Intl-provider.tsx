import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import { connect } from 'react-redux';
import * as nb from 'react-intl/locale-data/nb';
import { LedeTekstState } from './ducks/ledetekster-reducer';
import { AppState } from "./ducks/reducer";

addLocaleData(nb);

interface IntlProviderProps {
    ledetekster: LedeTekstState;
}

class IntlProvider extends React.Component<IntlProviderProps> {

    render() {
        const {children, ledetekster, ...props} = this.props;
        const locale = 'nb';

        return (
            <Provider {...props} locale={locale} messages={ledetekster.data.nb || []}>
                {children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    ledetekster: state.ledetekster,
});

export default connect(mapStateToProps)(IntlProvider);
