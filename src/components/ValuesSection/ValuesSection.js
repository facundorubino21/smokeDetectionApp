import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import './ValuesSection.css';
import { onValue, ref, set } from "firebase/database";
import "react-circular-progressbar/dist/styles.css";
import { GiSiren } from "react-icons/gi";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import '../Toggle/Toggle.css'


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";


const ValuesSection = () => {
    const [dbData, setDbData] = useState([]);
    const [lastResult1, setLastResult1] = useState({});
    const [estado1, setEstado1] = useState("");
    const [estadoToggle1, setEstadoToggle1] = useState("on")
    const [estadoToggle2, setEstadoToggle2] = useState("on")
    const [estadoToggleEmer, setEstadoToggleEmer] = useState("on")


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

    useEffect(() => {
        if (estadoToggleEmer === "on") {
            setEstadoToggle1("on")
            setEstadoToggle2("on")
        } else if (estadoToggleEmer === "off") {
            setEstadoToggle1("off")
            setEstadoToggle2("off")
        }
    }, [estadoToggleEmer])



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

        <div className="container">
            <p className="title">Dispositivo 1</p>
            <Swiper pagination={true} navigation={true} modules={[Navigation, Pagination]} className="mySwiper">
                <SwiperSlide>
                    <CircularProgressbarWithChildren
                        maxValue={200}
                        value={lastResult1.co}
                    >
                        <p className="deviceData">CO: {lastResult1.co} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
                <SwiperSlide>
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.lpg}>
                        <p className="deviceData">LPG: {lastResult1.lpg} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
                <SwiperSlide>
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.smoke}>
                        <p className="deviceData">Humo: {lastResult1.smoke} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
            </Swiper>
            <p className="estado">Estado: {estado1}</p>

            <p className="title">Dispositivo 2</p>
            <Swiper pagination={true} navigation={true} modules={[Navigation, Pagination]} className="mySwiper">
                <SwiperSlide>
                    <CircularProgressbarWithChildren
                        maxValue={200}
                        value={lastResult1.co}
                    >
                        <p className="deviceData">CO: {lastResult1.co} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
                <SwiperSlide>
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.lpg}>
                        <p className="deviceData">LPG: {lastResult1.lpg} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
                <SwiperSlide>
                    <CircularProgressbarWithChildren maxValue={200} value={lastResult1.smoke}>
                        <p className="deviceData">Humo: {lastResult1.smoke} {lastResult1.unit}</p>
                    </CircularProgressbarWithChildren>
                </SwiperSlide>
            </Swiper>
            <div className="estado">
                <p>Estado: {estado1}</p>
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
        </div >
    );
};

export default ValuesSection;