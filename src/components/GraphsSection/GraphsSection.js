import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";
import Loader from '../Loader/Loader';
import { formattedDate } from '../../utils';
import './GraphsSection.css'

import { GiSiren } from "react-icons/gi";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraphsSection = () => {
    const [dbData, setDbData] = useState([]);
    const [lastResultsLPG, setLastResultsLPG] = useState([]);
    const [lastResultsCO, setLastResultsCO] = useState([]);
    const [lastResultsSMOKE, setLastResultsSMOKE] = useState([]);
    const [lastDates, setLastDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        const query = ref(db, "Dispositivo1");
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data.Historico);
                console.log(data.Historico);
                setDbData(dataArray);

                let lastLPG = [];
                let lastCO = [];
                let lastSMOKE = [];
                let lastDates = [];
                dataArray.forEach((data, i) => {
                    if (i >= dataArray.length - 10) {
                        lastDates.push(formattedDate(data.date));
                        lastCO.push(data.co);
                        lastLPG.push(data.lpg);
                        lastSMOKE.push(data.smoke);
                    }
                })

                setLastDates(lastDates);
                setLastResultsCO(lastCO);
                setLastResultsLPG(lastLPG);
                setLastResultsSMOKE(lastSMOKE);
                setIsLoading(false)

            }
        });
    }, []);


    return (
        isLoading ? <Loader /> :
            <div className="container">
                <Line options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Datos del dispositivo 1',
                        },
                    },
                }} data={{
                    labels: lastDates,
                    datasets: [
                        {
                            label: 'Monóxido de carbono',
                            data: lastResultsCO,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Gas licuado del petróleo',
                            data: lastResultsLPG,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Humo',
                            data: lastResultsSMOKE,
                            borderColor: 'rgb(120, 40, 140)',
                            backgroundColor: 'rgba(120, 40, 140, 0.7)',
                        },
                    ],
                }} />
                <div className="alarm-btn">
                    <div className="alarm-btn-items">
                        <GiSiren className="alarm" /> <p className=" ">Forzar alarma</p>
                    </div>
                </div>

            </div>

    )
}

export default GraphsSection