import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import Alternativ from '../alternativ/alternativ';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { klikkAlternativ } from '../ducks/svar-duck';
import { sjekkAvhengigheter } from '../ducks/sporsmal-duck';
import { starteSvar } from '../ducks/side-duck';
import { AlternativTyper } from '../utils/konstanter';

interface ParentProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    avgitteSvar: string[];
}

interface DispatchProps {
    doKlikkAlternativ: (svarId: string, alternativType: AlternativTyper) => void;
    doSjekkAvhengigheter: (svarId: string, spmId: string) => void;
    ikkeNySideLenger: () => void;
}

type AlternativContainerProps = ParentProps & StateProps & DispatchProps;

function erAlternativMulig(
    uniktAlternativId: string,
    gjeldendeAlternativId: string,
    markerteAlternativer: string[]
): boolean {
    if (uniktAlternativId === gjeldendeAlternativId) {
        return true;
    } else {
        if (!!markerteAlternativer.find(alt => alt === uniktAlternativId)) {
            return gjeldendeAlternativId === 'intervju-svar-0202';
        }
    }
    return true;
}

export class AlternativContainer extends React.Component<AlternativContainerProps> {

    constructor(props: AlternativContainerProps) {
        super(props);
    }

    render() {
        const {
            sporsmal,
            doKlikkAlternativ,
            doSjekkAvhengigheter,
            ikkeNySideLenger,
            avgitteSvar,
        } = this.props;

        return (
            <ul className={'alternativer alternativer__' + sporsmal.type} role="group" aria-label={sporsmal.id}>
                {sporsmal.alternativer.map((alternativ: string) => {
                    const kanVelges: boolean = !!sporsmal.uniktAlternativ
                        ? erAlternativMulig(
                            sporsmal.uniktAlternativ,
                            alternativ,
                            avgitteSvar
                        )
                        : true;
                    return (
                        <Alternativ
                            key={alternativ}
                            alternativ={alternativ}
                            erValgt={avgitteSvar.includes(alternativ)}
                            sporsmalId={sporsmal.id}
                            sporsmalType={sporsmal.type}
                            kanVelges={kanVelges}
                            klikk={() => {
                                doKlikkAlternativ(alternativ, sporsmal.type);
                                doSjekkAvhengigheter(alternativ, sporsmal.id);
                                ikkeNySideLenger();
                            }}
                        />
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    avgitteSvar: state.svar.avgitteSvar,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doKlikkAlternativ: (svarId: string, type: AlternativTyper) => dispatch(klikkAlternativ(svarId, type)),
    doSjekkAvhengigheter: (svarId: string, spmId: string) => dispatch(sjekkAvhengigheter(svarId, spmId)),
    ikkeNySideLenger: () => dispatch(starteSvar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlternativContainer);
