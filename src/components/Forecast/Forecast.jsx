import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Forecast.module.css';
import PropTypes from 'prop-types';
import CurrentDay from '../CurrentDay'
import CurrentDayDescription from '../CurrentDayDescription';
import UpcomingDaysForecast from '../UpcomingDaysForecast'

const Forecast = ({ pronostico }) => (
    <Container className={styles.box}>
        <Row>
            <Col xs={12} md={4}>
                <div className={styles.card}>
                    <CurrentDay {...pronostico.Dia_actual} />
                </div>
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
            <CurrentDayDescription forecast={pronostico.Dia_actual_detalles} />
            <UpcomingDaysForecast days={pronostico.Proximo_dia} />
            </Col>
        </Row>
    </Container>
);

Forecast.propTypes = {
    pronostico: PropTypes.shape({
        Dia_actual: PropTypes.object,
        Dia_actual_detalles: PropTypes.array,
        Proximo_dia: PropTypes.array,
    }),

}

export default Forecast;
