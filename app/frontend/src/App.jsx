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
import Profile from './components/UserComponents/Profile';
import Chat from "./components/UserComponents/Chat";
import AddStoreForm from "./components/AdminComponents/AddStoreForm";
import UpdateStoreForm from "./components/AdminComponents/UpdStoreForm";
import UserStore from "./components/UserComponents/Store";
import AddNewsForm from "./components/AdminComponents/AddNewsForm";
import UpdNewsForm from "./components/AdminComponents/UpdNewsForm";
import AddUsersForm from "./components/AdminComponents/AddUsersForm";
import UpdateUserForm from "./components/AdminComponents/UpdUserForm";
import AdminChat from "./components/AdminComponents/AdminChat";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/user/me" element={<UserPanel/>}/>
                <Route path="/user/profile" element={<Profile/>}/>
                <Route path="/user/chat" element={<Chat/>}/>
                <Route path="/user/store" element={<UserStore />}/>
                <Route path="/admin/login" element={<AuthAdmin/>}/>
                <Route path="/admin/me" element={<AdminPanel/>}/>
                <Route path="/admin/store" element={<StoreTape/>}/>
                <Route path="/admin/store/add" element={<AddStoreForm/>}/>
                <Route path="/admin/store/update" element={<UpdateStoreForm/>}/>
                <Route path="/admin/list_users" element={<UsersTape/>}/>
                <Route path="/admin/list_users/update" element={<UpdateUserForm/>}/>
                <Route path="/admin/list_users/add" element={<AddUsersForm />} />
                <Route path="/admin/news" element={<NewsTape/>}/>
                <Route path="/admin/news/add" element={<AddNewsForm/>} />
                <Route path="/admin/news/update" element={<UpdNewsForm/>} />
                <Route path="/admin/chats" element={<ChatsTape/>}/>
                <Route path="/admin/chat" element={<AdminChat/>}/>
                <Route path="/application_form" element={<ApplicationForm/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
