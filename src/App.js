import React, { useContext, useEffect, useState } from 'react'
import NewContext from './Context/NewContext';
import './css/App.css';
import Navbar from './components/Navbar';

import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';
import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import NoteBody from './components/NoteBody';
import Signup from './components/SignUp';


function App() {
  const Contexts = useContext(NewContext);
  const [AlertStatus, setAlertStatus] = useState({
    status: "success", msg: "successfully updated", show: false
  });

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      Contexts.FetchNotes();
    }
    // eslint-disable-next-line
  }, []);

  const showAlert = (status, msg) => {

    setAlertStatus({
      status: status,
      msg: msg,
      show: true
    })

    setInterval(() => {
      setAlertStatus({ ...AlertStatus, show: false })
    }, 10000);
  }
  return (
    <>
      <BrowserRouter>
        <UpdateModal modal={{ type: "Edit Note", btntype: "Update", id: "edit" }} showAlert={showAlert} />
        <AddModal modal={{ type: "Add Note", btntype: "Save", id: "add" }} showAlert={showAlert} />
        <Navbar title="Rapid Notes" />
        <div style={{ height: '40px' }}>
          <Alert Alert={AlertStatus} />
        </div>
        <Routes>
          <Route path='/' element={<NoteBody showAlert={showAlert} />} />
          <Route path='/Login' element={<Login showAlert={showAlert} />} />
          <Route path='/Signup' element={<Signup showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
