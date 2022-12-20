import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard'
import GraphsSection from './components/GraphsSection/GraphsSection'
import ValuesSection from './components/ValuesSection/ValuesSection'


function App() {
  return (
/*     <div className="bg-gradient-to-b from-blue-900 ">
 */    <div className="bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} >
            <Route path="/" element={<ValuesSection />} />
            <Route path="graficas" element={<GraphsSection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
