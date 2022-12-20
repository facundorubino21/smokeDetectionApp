import { Outlet } from 'react-router-dom';
import Tabs from '../Tabs/Tabs'
import './Dashboard.css'


const Dashboard = () => {
    return (
        <div className="">
            <Outlet />
            <Tabs className="tabs-element" />
        </div>
    )
}

export default Dashboard