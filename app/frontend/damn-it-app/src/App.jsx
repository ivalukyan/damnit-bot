
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth"
import ApplicationForm from "./components/ApplicationForm";
import "./App.css"


const App = () => {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/application_form" element={<ApplicationForm />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
