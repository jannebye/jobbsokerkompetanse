import * as React from 'react';
import SporsmalModell from './sporsmal-modell';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Sidetype } from '../utils/konstanter';
import { Dispatch } from '../types';
import { nesteSporsmal, starteSvar, stoppForAViseNyttTips } from '../ducks/side-duck';
import { leggTilBesvartSporsmal } from '../ducks/sporsmal-duck';
import { connect } from 'react-redux';
import { AppState } from '../ducks/reducer';
import { visNyttTips } from '../ducks/svar-duck';

interface DispatchProps {
    gaTilNesteSporsmal: (spmId: string, nesteSpmId: string, svar: string[], tips: string | undefined) => void;
    ikkeNySideLenger: () => void;
    doVisNyttTips: (visTips: boolean) => void;
    doStoppForAViseNyttTips: (stopp: boolean) => void;
}

interface OwnProps {
    sporsmal: SporsmalModell;
    nesteSpmId: string;
    harSvar: boolean;
}

interface StateProps {
    avgitteSvar: string[];
    skalStoppeForAViseNyttTips: boolean;
    tips: string | undefined;
}

type NesteLinkProps = OwnProps & DispatchProps & StateProps;

export class NesteLink extends React.Component<NesteLinkProps> {

    constructor(props: NesteLinkProps) {
        super(props);
    }

    render() {
        const {
            sporsmal,
            nesteSpmId,
            harSvar,
            tips,
            ikkeNySideLenger,
            gaTilNesteSporsmal,
            avgitteSvar,
            skalStoppeForAViseNyttTips,
            doVisNyttTips,
            doStoppForAViseNyttTips,
        } = this.props;

        let nesteUrl = sporsmal.erSisteSpm
            ? '/' + Sidetype.RESULTAT
            : '/' + Sidetype.KARTLEGGING + '/' + nesteSpmId;

        return (
            <Link
                to={nesteUrl}
                className={sporsmal.erSisteSpm ? '' : 'knapp knapp--hoved sporsmal__knapp'}
                key="besvar"
                onClick={(e) => {
                    if (!harSvar) {
                        e.preventDefault();
                    } else {
                        if (skalStoppeForAViseNyttTips) {
                            e.preventDefault();
                            doVisNyttTips(true);
                            doStoppForAViseNyttTips(false);
                        } else {
                            gaTilNesteSporsmal(sporsmal.id, nesteSpmId, avgitteSvar, tips);
                        }
                    }
                    ikkeNySideLenger();
                }}
            >
                {sporsmal.erSisteSpm ? (
                    <FormattedMessage id="send-inn"/>
                ) : (
                    <FormattedMessage id="fortsett-knapp"/>
                )}
            </Link>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    avgitteSvar: state.svar.avgitteSvar,
    skalStoppeForAViseNyttTips: state.side.skalStoppeForAViseNyttTips,
    tips: state.svar.tips,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    ikkeNySideLenger: () => dispatch(starteSvar()),
    gaTilNesteSporsmal: (spmId: string, nesteSpmId: string, svar: string[], tips: string | undefined) => {
        dispatch(nesteSporsmal(nesteSpmId, false));
        dispatch(leggTilBesvartSporsmal(spmId, svar, tips));
    },
    doVisNyttTips: (visTips: boolean) => dispatch(visNyttTips(visTips)),
    doStoppForAViseNyttTips: (stopp: boolean) => dispatch(stoppForAViseNyttTips(stopp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NesteLink);
