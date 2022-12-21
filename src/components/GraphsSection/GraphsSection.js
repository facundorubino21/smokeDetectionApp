import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import Loader from '../Loader/Loader';
import { formattedDate } from '../../utils';
import './GraphsSection.css';
import '../Toggle/Toggle.css'


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
    const [isLoading, setIsLoading] = useState(true);
    const [estadoToggle1, setEstadoToggle1] = useState("on")
    const [estadoToggle2, setEstadoToggle2] = useState("on")
    const [estadoToggleEmer, setEstadoToggleEmer] = useState("on")



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


    const toggleAlarma1 = (direction) => {
        console.log(direction);
        if (direction === "on") {
            set(ref(db, "General/Alarma1"), true)
            setEstadoToggle1("off")
        } else if (direction === "off") {
            set(ref(db, "General/Alarma1"), false)
            setEstadoToggle1("on")
        }
    }

    const toggleAlarma2 = (direction) => {
        if (direction === "on") {
            set(ref(db, "General/Alarma2"), true)
            setEstadoToggle2("off")
        } else {
            set(ref(db, "General/Alarma2"), false)
            setEstadoToggle2("on")
        };
        console.log(estadoToggle2);

    }

    const toggleEmergencia = (direction) => {
        if (direction === "on") {
            toggleAlarma1("on");
            toggleAlarma2("on");
            setEstadoToggleEmer("off")
        } else {
            toggleAlarma1("off");
            toggleAlarma2("off");
            setEstadoToggleEmer("on")
        }
        console.log(estadoToggleEmer);
    }


    return (
        isLoading ? <Loader /> :
            <div className="graphs-container">
                <div className="graphBox">
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
                </div>
                <div className="graphBox">
                    <Line options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Datos del dispositivo 2',
                            },
                        },
                    }} data={{
                        labels: lastDates,
                        datasets: [
                            {
                                label: 'Monóxido de carbono',
                                data: [40, 50, 0, 25, 25, 100, 150, 20, 27, 200],
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            {
                                label: 'Gas licuado del petróleo',
                                data: [400, 450, 20, 250, 246, 100, 150, 20, 270, 10],
                                borderColor: 'rgb(53, 162, 235)',
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                            {
                                label: 'Humo',
                                data: [0, 500, 220, 200, 100, 200, 500, 400, 300, 200],
                                borderColor: 'rgb(120, 40, 140)',
                                backgroundColor: 'rgba(120, 40, 140, 0.7)',
                            },
                        ],
                    }} />
                </div>
                <div className="toggles-container">
                    <div>
                        <p>Alarma 1</p>
                        <input
                            onClick={() => toggleAlarma1(estadoToggle1)}
                            className="react-switch-checkbox"
                            id={`toggleAlarma1`}
                            type="checkbox"
                        />
                        <label
                            className="react-switch-label"
                            htmlFor={`toggleAlarma1`}
                        >
                            <span className={`react-switch-button`} />
                        </label>
                    </div>
                    <div>
                        <p>Alarma 2</p>
                        <input
                            onClick={() => toggleAlarma2(estadoToggle2)}
                            className="react-switch-checkbox"
                            id={`toggleAlarma2`}
                            type="checkbox"
                        />
                        <label
                            className="react-switch-label"
                            htmlFor={`toggleAlarma2`}
                        >
                            <span className={`react-switch-button`} />
                        </label>
                    </div>
                    <div>
                        <p>Emergencia</p>
                        <input
                            onClick={() => toggleEmergencia(estadoToggleEmer)}
                            className="react-switch-checkbox"
                            id={`toggleEmergencia`}
                            type="checkbox"
                        />
                        <label
                            className="react-switch-label"
                            htmlFor={`toggleEmergencia`}
                        >
                            <span className={`react-switch-button`} />
                        </label>
                    </div>


                </div>

            </div>

    )
}

export default GraphsSection