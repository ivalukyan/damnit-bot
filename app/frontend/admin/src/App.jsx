import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthAdmin from "./components/AuthAdmin";
import AdminPanel from "./components/AdminPanel";
import UsersTape from "./components/AdminComponents/UsersTape";
import NewsTape from "./components/AdminComponents/NewsTape";
import ApplicationForm from "./components/ApplicationForm";
import Auth from "./components/Auth";
import UserPanel from "./components/UserPanel";
import StoreTape from './components/AdminComponents/StoreTape';
import ChatsTape from './components/AdminComponents/ChatsTape';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/user/me" element={<UserPanel />} />
                <Route path="/admin/login" element={<AuthAdmin/>}/>
                <Route path="/admin/me" element={<AdminPanel />} />
                <Route path="/admin/store" element={<StoreTape />} />
                <Route path="/admin/list_users" element={<UsersTape />} />
                <Route path="/admin/news" element={<NewsTape />} />
                <Route path="/admin/chats" element={<ChatsTape />} />
                <Route path="/application_form" element={<ApplicationForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
