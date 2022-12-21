import { Outlet } from 'react-router-dom';
import Tabs from '../Tabs/Tabs'
import './Dashboard.css'


const Dashboard = () => {
    return (
        <>
            <Tabs />
            <Outlet />
        </>
    )
}

export default Dashboard