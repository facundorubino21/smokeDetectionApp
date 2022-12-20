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
    const [last5Results, setLast5Results] = useState({});
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        const query = ref(db, "Dispositivo1");
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data.Historico);
                console.log(data.Historico);
                setDbData(dataArray);

                let last5 = {
                    dato1: dataArray[dataArray.length - 5],
                    dato2: dataArray[dataArray.length - 4],
                    dato3: dataArray[dataArray.length - 3],
                    dato4: dataArray[dataArray.length - 2],
                    dato5: dataArray[dataArray.length - 1],

                }
                setLast5Results(last5);
/*                 console.log(new Date(last5Results.dato1.date));
 */                setIsLoading(false)

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
                    labels: [formattedDate(last5Results.dato1.date), formattedDate(last5Results.dato2.date), formattedDate(last5Results.dato3.date), formattedDate(last5Results.dato4.date), formattedDate(last5Results.dato5.date)],
                    datasets: [
                        {
                            label: 'Monóxido de carbono',
                            data: [last5Results.dato1.co, last5Results.dato2.co, last5Results.dato3.co, last5Results.dato4.co, last5Results.dato5.co],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Gas licuado del petróleo',
                            data: [last5Results.dato1.lpg, last5Results.dato2.lpg, last5Results.dato3.lpg, last5Results.dato4.lpg, last5Results.dato5.lpg],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Humo',
                            data: [last5Results.dato1.smoke, last5Results.dato2.smoke, last5Results.dato3.smoke, last5Results.dato4.smoke, last5Results.dato5.smoke],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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