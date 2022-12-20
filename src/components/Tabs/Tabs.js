import { NavLink } from 'react-router-dom'
import { GoGraph, GoInfo } from "react-icons/go"
import './Tabs.css'

const Tabs = () => {
    return (
        <div className="tabsBox">
            <NavLink to="/"><GoInfo className="valuesLink" /><p>Valores</p></NavLink>
            <NavLink to="graficas" ><GoGraph className="graphsLink" /><p>Gráficas</p></NavLink>
        </div>
    )
}

export default Tabs
