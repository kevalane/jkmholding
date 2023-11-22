import React from 'react';

import './Landing.css';

export const Landing: React.FC = (): JSX.Element => {
    return(
        <>
            
            <section className="landing-wrap">
                <div className="container" style={{position: 'relative'}}>
                    <p className="landing-text">
                        Boîte de nuit<br />
                        Maison Rose
                    </p>
                    <p className="landing-text">
                        Adresse Berzelii Park Rue Hamngatan 2<br />
                        Ville Stockholm Code Postal 111 47
                    </p>
                    <p className="landing-text">
                        Lundi Fermé<br />
                        Mardi Fermé<br />
                        &#62;&#62; Mercredi Ovvert 22-03<br />
                        Jeudi Fermé<br />
                        &#62;&#62; Vendredi Ovvert 23–05<br />
                        &#62;&#62; Samedi Ovvert 23–05<br />
                        Diamanche Fermé
                    </p>
                    <img src="/img/logo/rose.png" alt="Rose logo" className="landing-logo" />
                </div>
            </section>
            
        </>
    )
}