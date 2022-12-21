import { useState } from "react";
import "./Tabs.css";
import { NavLink } from "react-router-dom";
import { GoGraph, GoInfo } from "react-icons/go"


function Tabs() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <>
            <div className="bloc-tabs">
                <NavLink to="/"
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    <GoInfo /><p>Info</p>
                </NavLink>
                <NavLink to="/graficas"
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    <GoGraph /><p>Gráficas</p>
                </NavLink>

            </div>

        </>
    );
}

export default Tabs;
