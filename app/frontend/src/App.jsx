import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from "./components/Auth"
import ApplicationForm from "./components/ApplicationForm";
import "./App.css"
import Profile from "./components/Profile";
import Store from "./components/Store";
import Chat from "./components/Chat";
import Admin from "./components/Admin";
import ListUsers from "./components/Admin/ListUsers";
import NewsTape from "./components/Admin/NewsTape";
import StoreTape from "./components/Admin/StoreTape";


const App = () => {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/application_form" element={<ApplicationForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/store" element={<Store />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/list_users" element={<ListUsers />} />
                <Route path="/admin_news" element={<NewsTape />} />
                <Route path="/admin_store" element={<StoreTape />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
