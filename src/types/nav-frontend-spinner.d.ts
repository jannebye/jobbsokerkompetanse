declare module 'nav-frontend-spinner' {
    import * as React from 'react';

    export interface SpinnerProps {
        'aria-label'?: string;
        negativ?: boolean;
        stroke?: boolean;
        storrelse: string;
        className?: string;
    }

    export class Spinner extends React.Component<SpinnerProps, {}> {}
}
