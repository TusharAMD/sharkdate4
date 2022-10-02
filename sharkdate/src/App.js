import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import AuthenticatedPage from './components/AuthenticatedPage';
import Profile from './components/Profile';
import Search from './components/Search';


function App() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedPage />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
  
}

export default App;
