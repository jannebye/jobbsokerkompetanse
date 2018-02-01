/* tslint:disable*/
import * as qs from 'query-string';

export function respondWith(handler: any) {
    return (url: string, config: any, extra: any) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, bodyParams, extra });
        } else {
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        if (console.groupCollapsed) {
            console.groupCollapsed(url);
            console.groupCollapsed('config');
            console.log('url', url);
            console.log('config', config);
            console.log('queryParams', queryParams);
            console.log('bodyParams', bodyParams);
            console.log('extra', extra);
            console.groupEnd();

            console.log('response', response);
            console.groupEnd();
        }
        /* tslint:enable */
        return response;
    };
}