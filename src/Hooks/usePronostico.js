import { useState } from "react";
import axios from 'axios'
import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';


const URL_BASE = 'https://www.metaweather.com/api/location';
const DOMINIO_CRUZADO = 'https://the-ultimate-api-challenge.herokuapp.com';
const ENVIAR_URL = `${DOMINIO_CRUZADO}/${URL_BASE}`;


const usePronostico = () => {
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [pronostico, setPronostico] = useState(false);

    const GetWoeid = async (location) => {
        const { data } = await axios(`${ENVIAR_URL}/search`, { params: { query: location } });
        if (!data || data.length === 0) {
            setError('No se encontro la ubicacion');
            setCargando(false);
            return;
        }

        return data[0]
    }

    const getPronosticoData = async (woeid) => {

        const { data } = await axios(`${ENVIAR_URL}/${woeid}`);
        if (!data || data.length === 0) {
            setError('Algo salio mal');
            setCargando(false);
            return;
        }
        return data

    }

    const recopilarpronostico = (data) => {
        const Dia_actual = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const Dia_actual_detalles = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const Proximo_dia = getUpcomingDaysForecast(data.consolidated_weather);

        setPronostico({ Dia_actual, Dia_actual_detalles, Proximo_dia });
        setCargando(false);
    }

    // consumir api
    const enviarPeticion = async location => {
        setCargando(true);
        setError(false);

        const response = await GetWoeid(location);
        if (!response?.woeid) return;
        const data = await getPronosticoData(response.woeid);
        if (!data) return;

        recopilarpronostico(data);
    }

    return {
        error,
        cargando,
        pronostico,
        enviarPeticion,
    }
}

export default usePronostico;