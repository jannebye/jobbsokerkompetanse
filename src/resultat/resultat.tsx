import * as React from 'react';
import { AppState } from '../reducer';
import BesvarelseModell from '../svar/svar-modell';
import { connect } from 'react-redux';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { sorterSvar } from '../svar/svar-selector';

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}
function Resultat({ besvarteSporsmal }: StateProps) {
    sorterSvar(besvarteSporsmal);
    return (
        <div>
            Din besvarelse:
            <ul className="resultatliste">
                {besvarteSporsmal.map((spm) => (<li className="sporsmal__besvarelse">
                    <h3>Spørsmål {spm.sporsmalId}:</h3>
                    <h4>{alleSporsmal.find(spom => spom.id === spm.sporsmalId)!.sporsmal}</h4>
                    <p>Dine svar: </p>
                    <ul>
                        {spm.svarAlternativer.map(alt => (<li>{alt.tekst}</li>))}
                    </ul>
                </li>))}
            </ul>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Resultat);
