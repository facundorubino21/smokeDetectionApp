import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import './ValuesSection.css';
import { onValue, ref } from "firebase/database";
import "react-circular-progressbar/dist/styles.css";
import { GiSiren } from "react-icons/gi";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const ValuesSection = () => {
    const [dbData, setDbData] = useState([]);
    const [lastResult1, setLastResult1] = useState({});
    const [estado1, setEstado1] = useState("");

    useEffect(() => {
        const query = ref(db, "Dispositivo1");
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data.Historico);
                setEstado1(data.Estado);
                setDbData(dataArray);
                setLastResult1(dataArray[dataArray.length - 1]);
            }
        });
    }, []);


    console.log(dbData);
    return (

        <div className="">
            <p className="">Dispositivo 1</p>
            <div className="circles-wrapper">
                <div className="circle">
                    <CircularProgressbarWithChildren
                        maxValue={200}
                        value={lastResult1.co}
                        styles={buildStyles({
                            height: '500px',
                            width: '300px',
                            display: 'block',
                            textSize: '50px',
                        })}
                    >
                        <p className="">CO: {lastResult1.co} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="circle">
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.lpg}>
                        <p className="">LPG: {lastResult1.lpg} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="circle">
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.smoke}>
                        <p className="">Humo: {lastResult1.smoke} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
            </div>

            <p className="">Dispositivo 2</p>
            <div className="circles-wrapper">
                <div className="circle">
                    <CircularProgressbarWithChildren
                        maxValue={200}
                        value={lastResult1.co}
                        styles={buildStyles({
                            height: '500px',
                            width: '300px',
                            display: 'block',
                            textSize: '50px',
                        })}
                    >
                        <p className="">CO: {lastResult1.co} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="circle">
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.lpg}>
                        <p className="">LPG: {lastResult1.lpg} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="circle">
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.smoke}>
                        <p className="">Humo: {lastResult1.smoke} {lastResult1.unit}</p>
                        <p className="">Estado: {estado1}</p>
                    </CircularProgressbarWithChildren>
                </div>
            </div>


            <div className="alarm-btn">
                <div className="alarm-btn-items">
                    <GiSiren className="alarm" /> <p className="text-2xl ">Forzar alarma</p>
                </div>
            </div>
        </div >
    );
};

export default ValuesSection;