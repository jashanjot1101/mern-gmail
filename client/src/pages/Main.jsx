import { useState, Suspense } from 'react';

import { Header, SideBar } from '../components';
import { Box, styled } from '@mui/material';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader';

const Wrapper = styled(Box)`
    display: flex;
`;

const Main = () => {

    const [openDrawer, setOpenDrawer] = useState(true);
    const navigate=useNavigate();

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }
   const handleLogout=()=>{
        localStorage.removeItem("token")
        console.log("Logging out...")
        navigate('/login')
        console.log("navigation executed")
        return <Navigate to='/login'  />;
    }
    
    return (
        <>
            <Header toggleDrawer={toggleDrawer} navigateToLogin={handleLogout}/>
            <Wrapper>
                <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
                <Suspense fallback={<SuspenseLoader />} >
                    <Outlet context={{ openDrawer }} />
                </Suspense>
            </Wrapper>
        </>
    )
}

export default Main;