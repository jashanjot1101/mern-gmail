

import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'

//import { gmailLogo } from '../constants/constant';
//import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
    background: #f5F5F5;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }

`

const Header = ({ toggleDrawer,navigateToLogin }) => {
    const navigate=useNavigate();
    const handleLogoutClick = () => {
        console.log('log out btton is clicked')
        // Clear the token from local storage
        localStorage.removeItem('authToken');
        navigateToLogin();
        
    
        // Redirect to the login page or any desired route
        navigate('/login');
        console.log('navigation executed')
        
      };

    return (
        
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} style={{marginLeft:35}}/>
                <img src='../zillat.png' alt="logo" style={{ width: 110,height:50, marginLeft: 40 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase />
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" onClick={handleLogoutClick}  />
                    
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}


export default Header;