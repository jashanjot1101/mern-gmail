import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { routes } from "./routes/routes";
import SuspenseLoader from './components/common/SuspenseLoader';
import DataProvider from './context/DataProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Header } from './components';


const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
 // const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Token exists, set the authentication state
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    setAuthenticated(true);
   // navigate('/emails/inbox')
  };

  const handleSignup = (token) => {
    setIsLoggedIn(true);
    setAuthenticated(true);
    localStorage.setItem('authToken', token);
  };
   const handleLogout=()=>{
    console.log('Logout button is clicked');
    setIsLoggedIn(false);
    setAuthenticated(false);
    localStorage.removeItem("authToken");
    
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseLoader />}>
        <DataProvider>
          <Routes>
            {authenticated ? (
              <>
             
                <Route>
                <Route path={routes.login.path} element={ <Header navigateToLogin={handleLogout}/>} />
                <Route path={routes.login.path} element={ <Navigate to= {`${routes.login.path}/login`}/>} />
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      
      <Route path={routes.main.path} element={<routes.main.element />} >
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>

      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
        
      
    </Route>
              </>
            ) : (
              <>
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                
                <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
              </>
            )}
          </Routes>

          
          
        </DataProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
