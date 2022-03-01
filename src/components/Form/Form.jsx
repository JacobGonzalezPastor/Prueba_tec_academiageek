import React, { useState } from 'react';
import styles from './Form.module.css';
import PropTypes from 'prop-types';
const Form = ({ SubmitBuscar }) => {
    const [ubicacion, setUbacion] = useState('');

    const enSubmit = e => {
        e.preventDefault();
        //console.log({ubicacion})
        if (!ubicacion || ubicacion === '') return;
        SubmitBuscar(ubicacion);
    }
    return (
        <form onSubmit={enSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Buscar Por Ubicacion"
                required
                value={ubicacion}
                onChange={e => setUbacion(e.target.value)}
            />

            <button type="submit" className={styles.button} onClick={enSubmit}>
                BUSCAR
            </button>
        </form>
    );
};

Form.propTypes={
    SubmitBuscar: PropTypes.func.isRequired,
}

export default Form;
