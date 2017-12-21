declare module 'nav-frontend-paneler' {
    import * as React from 'react';

    export interface PanelerProps {
        'aria-label'?: string;
        className?: string;
    }

    export class Panel extends React.Component<PanelerProps, {}> {}
}
