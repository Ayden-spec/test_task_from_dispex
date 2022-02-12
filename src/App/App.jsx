import './app.css'
import React from "react";
import HomePage from '../components/HomePage/HomePage';
import { useState } from 'react';
import Modals from '../components/Modals/Modals';


function App() {
  const [Client_Modal, Set_Modal_Client] = useState(false);
  const [Client, SetClient] = useState({});
  return (
    <div>
      {Client_Modal && <Modals window_id={Client_Modal} SetWindow_id={Set_Modal_Client} Client={Client} SetClient={SetClient}/>}
      <HomePage SetWindow_id={Set_Modal_Client} SetClient={SetClient}/>
    </div>
  );
}

export default App;
