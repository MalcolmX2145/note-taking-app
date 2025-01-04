import {Route, Routes} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp'
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUp />} />
        
        {/* Wrap the proteccted routes */}
        <Route element={ <ProtectedRoutes/> }>
          <Route path="/" element={<MainPage />}/>  
        </Route> 
      </Routes>
    </AuthProvider>
  )
}

export default App