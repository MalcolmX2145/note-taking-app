import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/" element={<MainPage />}/>  
    </Routes>
  )
}

export default App