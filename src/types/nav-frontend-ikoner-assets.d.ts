declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    export interface IkonerProps {
        kind: string;
        height?: number | string;
        width?: number | string;
        onClick?: Function;
        preview?: boolean;
        size?: number;
        style?: string;
        wrapperStyle?: any; // tslint:disable-line:no-any
    }

    export default class Ikon extends React.Component<IkonerProps, {}> {}
}
