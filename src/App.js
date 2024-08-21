import './App.css';
import Page from './pages/Page1/Page'
import '@/pages/Page1/Page/index.css'
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Loginfo from "@@/Login"
import Checklogin from '@@/Checklogin'
import AdminUser from "@@/AdminUser"
import Fonction from "@@/Fonction"
function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login"element={<Loginfo />} />
        <Route path="/page"element={  
        <Checklogin>
         <Page />
          </Checklogin>}/>
          <Route path="/admin/usermanagement" element={
             <Checklogin><AdminUser /></Checklogin>} />
      </Routes>
    </Router>
  );
}

export default App;
