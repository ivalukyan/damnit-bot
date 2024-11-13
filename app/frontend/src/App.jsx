
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth"
import ApplicationForm from "./components/ApplicationForm";
import "./App.css"
import Profile from "./components/Profile";
import Store from "./components/Store";



const App = () => {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/application_form" element={<ApplicationForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/store" element={<Store />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
