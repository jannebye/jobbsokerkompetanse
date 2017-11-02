import * as React from 'react';
import { SporsmalProps } from './sporsmal';

function beregnDistanse(element: HTMLElement) {
    const windowMidpoint = window.innerHeight / 2;
    const br = element.getBoundingClientRect();
    const elementMidpoint = br.top + br.height / 2;
    const distance = Math.abs(windowMidpoint - elementMidpoint);

    return { element, distance };
}

interface ScrollviewState {
    activeIndex: number;
}

class ScrollView extends React.Component<{}, ScrollviewState> {
    element: HTMLElement;

    constructor() {
        super();
        this.refhandler = this.refhandler.bind(this);
        this.state = { activeIndex: 0 };
    }

    refhandler(element: HTMLElement | null) {
        if (element != null) {
            this.element = element;
        }
    }

    scrollHandler() {
        const children = Array.from(this.element.childNodes);
        const closestChild = children.map(beregnDistanse).reduce(
            (closest, distance) => {
                if (distance.distance < closest.distance) {
                    return distance;
                }
                return closest;
            },
            {element: null, distance: 99999}
        ).element;

        this.setState({ activeIndex: children.indexOf(closestChild!) });
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler.bind(this));
    }

    render() {
        const augmentedChildren = React.Children.map(
            this.props.children,
            (child: React.ReactElement<SporsmalProps>, index: number) =>
                React.cloneElement(child, {
                    isActive: index === this.state.activeIndex
                })
        );
        return (
            <ul className="sporsmalsliste" ref={this.refhandler}>
                {augmentedChildren}
            </ul>
        );
    }
}

export default ScrollView;
