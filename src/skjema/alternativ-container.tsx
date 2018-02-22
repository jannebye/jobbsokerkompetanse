import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import Alternativ from '../alternativ/alternativ';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { klikkAlternativ } from '../ducks/svar-duck';
import { BesvartSporsmal, sjekkAvhengigheter } from '../ducks/sporsmal-duck';
import { stoppForAViseNyttTips } from '../ducks/side-duck';

interface ParentProps {
    sporsmal: SporsmalModell;
}

interface StateProps {
    avgitteSvar: string[];
    besvarteSporsmal: BesvartSporsmal[];
    tips: string | undefined;
}

interface DispatchProps {
    doKlikkAlternativ: (svarId: string, spmId: string, besvarteSporsmal: BesvartSporsmal[]) => void;
    doSjekkAvhengigheter: (svarId: string, spmId: string) => void;
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

/*function prepMarkerAlternativ(
    alternativ: string,
    alternativListe: string[],
    sporsmal: SporsmalModell,
    type: string
): string[] {
    const erValgt = !!alternativListe.find(alt => alt === alternativ);
    if (erValgt) {
        if (type === 'ettvalg' || type === 'skala') {
            return alternativListe;
        }
        return alternativListe.filter(alt => alt !== alternativ);
    } else {
        if (
            !!sporsmal.uniktAlternativ &&
            sporsmal.uniktAlternativ === alternativ
        ) {
            return [alternativ];
        }
        if (type === 'ettvalg' || type === 'skala') {
            return [alternativ];
        }
        return [...alternativListe, alternativ];
    }
}*/

class AlternativContainer extends React.Component<AlternativContainerProps> {
    constructor(props: AlternativContainerProps) {
        super(props);
    }

    componentDidUpdate(prevProps: AlternativContainerProps) {
        if (this.props.tips && prevProps.tips !== this.props.tips) {
            this.props.doStoppForAViseNyttTips(true);
        }
    }

    render() {
        const { avgitteSvar, sporsmal, doKlikkAlternativ, doSjekkAvhengigheter, besvarteSporsmal } = this.props;
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
                                doKlikkAlternativ(alternativ, sporsmal.id, besvarteSporsmal);
                                doSjekkAvhengigheter(alternativ, sporsmal.id);
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
    tips: state.svar.tips
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doKlikkAlternativ: (svarId: string, spmId: string, besvarteSporsmal: BesvartSporsmal[]) =>
        dispatch(klikkAlternativ(svarId, spmId, besvarteSporsmal)),
    doSjekkAvhengigheter: (svarId: string, spmId: string) => dispatch(sjekkAvhengigheter(svarId, spmId)),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlternativContainer);
