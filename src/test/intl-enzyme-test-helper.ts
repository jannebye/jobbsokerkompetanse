/* tslint:disable*/
import { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { shallow } from 'enzyme';
import * as React from 'react';
// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'no' }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(component: ReactElement<any>) {
    return React.cloneElement(component, { intl });
}

export function shallowWithIntl(component: ReactElement<any>, context: any = {}) {
    return shallow(nodeWithIntlProp(component), {
        context: Object.assign({}, context, { intl }),
    });
}
