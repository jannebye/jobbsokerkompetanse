declare module 'nav-frontend-ekspanderbartpanel' {
    import * as React from 'react';

    export interface EkspanderbartanelProps {
        apen: boolean;
        className?: string;
        onClick?: Function;
        tittel: string;
        tittelProps?: string;
        children?: {};
    }

    export default class EkspanderbartPanel extends React.Component<EkspanderbartanelProps, {}> {}
}