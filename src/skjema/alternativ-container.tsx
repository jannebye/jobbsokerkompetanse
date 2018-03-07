import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import Alternativ from '../alternativ/alternativ';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { klikkAlternativ } from '../ducks/svar-duck';
import { BesvartSporsmal, sjekkAvhengigheter } from '../ducks/sporsmal-duck';
import { starteSvar, stoppForAViseNyttTips } from '../ducks/side-duck';
import { AlternativTyper } from '../utils/konstanter';

interface ParentProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    avgitteSvar: string[];
    besvarteSporsmal: BesvartSporsmal[];
    tips: string | undefined;
    erNySide: boolean;
}

interface DispatchProps {
    doKlikkAlternativ: (svarId: string,
                        spmId: string,
                        besvarteSporsmal: BesvartSporsmal[],
                        alternativType: AlternativTyper) => void;
    doSjekkAvhengigheter: (svarId: string, spmId: string) => void;
    ikkeNySideLenger: () => void;
    doStoppForAViseNyttTips: (stopp: boolean) => void;
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

    componentDidUpdate(prevProps: AlternativContainerProps) {
        if (this.props.tips !== undefined && (!this.sporsmalErBesvartFraFor() && !this.props.erNySide)) {
            this.props.doStoppForAViseNyttTips(true);
        }
        if (this.props.tips === undefined) {
            this.props.doStoppForAViseNyttTips(false);
        }
    }

    sporsmalErBesvartFraFor() {
        return this.props.besvarteSporsmal
            .map(besvartSpm => besvartSpm.spmId)
            .includes(this.props.sporsmal.id);
    }

    render() {
        const {
            sporsmal,
            doKlikkAlternativ,
            doSjekkAvhengigheter,
            ikkeNySideLenger,
            avgitteSvar,
            besvarteSporsmal,
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
                                doKlikkAlternativ(alternativ, sporsmal.id, besvarteSporsmal, sporsmal.type);
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
    besvarteSporsmal: state.sporsmal.besvarteSporsmal,
    tips: state.svar.tips,
    erNySide: state.side.erNySide,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doKlikkAlternativ: (svarId: string,
                        spmId: string,
                        besvarteSporsmal: BesvartSporsmal[],
                        type: AlternativTyper) => dispatch(klikkAlternativ(svarId, spmId, besvarteSporsmal, type)),
    doSjekkAvhengigheter: (svarId: string, spmId: string) => dispatch(sjekkAvhengigheter(svarId, spmId)),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
    ikkeNySideLenger: () => dispatch(starteSvar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlternativContainer);
