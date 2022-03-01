import React, { Fragment } from 'react';
import styles from './Page.module.css'
import Header from '../Header';
import Form from '../Form'
import Error from '../Error'
import Loader from '../Loader'
import Forecast from '../Forecast'
import usePronostico from '../../Hooks/usePronostico';
const Page = () => {

    const { error, cargando, pronostico, enviarPeticion } = usePronostico();
    const enSubmit = (value) => {
        //console.log({value});
        enviarPeticion(value);
    }
    return (
        <Fragment>
            <Header />
            {!pronostico && (
                <div className={`${styles.box} position-relative`}>
                    {/* Formulario */}
                    {!cargando && <Form SubmitBuscar={enSubmit} />}
                    {/* Error */}
                    {error && <Error message={error} />}
                    {/* Cargando */}
                    {cargando && <Loader />}
                </div>
            )}

            {/* Pronostico */}
            {pronostico && <Forecast pronostico={pronostico}/>}
        </Fragment>
    );
};

export default Page;
