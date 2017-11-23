import * as React from 'react';
import * as PT from 'prop-types';
import {addLocaleData, IntlProvider as Provider} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as nb from 'react-intl/locale-data/nb';
import {hentLedetekster} from './ducks/ledetekster-reducer';
import {STATUS} from './ducks/utils';
import {Dispatch} from "./types";

addLocaleData(nb);


class IntlProvider extends React.Component {
    componentDidMount() {
        this.props.actions.hentLedetekster();
    }

    componentDidUpdate() {
        const {ledetekster, actions} = this.props;
        if (ledetekster.status === STATUS.NOT_STARTED) {
            actions.hentLedetekster();
        }
    }

    render() {
        const {children, actions: _, ledetekster, ...props} = this.props;
        const locale = this.props.locale;

        return (
            <Provider {...props} messages={ledetekster.data[locale] || {}}>
                <div>
                    <Innholdslaster avhengigheter={[ledetekster]}>
                        {children}
                    </Innholdslaster>
                </div>
            </Provider>
        );
    }
}

IntlProvider.propTypes = {
    children: PT.node.isRequired,
    actions: PT.objectOf(PT.func).isRequired,
    locale: PT.string.isRequired,
    ledetekster: PT.shape({
        status: PT.string.isRequired,
        data: PT.object,
    }).isRequired,
};

const mapStateToProps = (state: State) => ({
    ledetekster: state.data.ledetekster,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators(
        {
            hentLedetekster,
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntlProvider);
