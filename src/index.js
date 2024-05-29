import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import './index.css';
import Ev from './content/Ev';
import Oyun from './content/Oyun'
import Son from './content/Son';
import { OyunProvider } from './context/OyunContext';

export default function App() {
  return (

    //React router ile componentlerimize path verdik.
    <OyunProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Ev />} />

          <Route path="/oyun" element={<Oyun />} />

          <Route path="/son" element={<Son />} />
        </Routes>
      </Router>
    </OyunProvider>
  );
}
//Yukarıdaki fonksiyonu renderlar.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);