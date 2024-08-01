import {AppBar , Toolbar} from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();

  return (
    <>
      <AppBar sx={{
        bgcolor: "#1f1f1f",
        position: "fixed",
        height: "60px",
      }}>
        <Toolbar sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Logo />

          <div>
            {auth?.isLoggedIn ? (<>
              <NavigationLink
                bg='#445ce8'
                to='/chat'
                text='Go to Chat'
                textColor='white'/> 
              <NavigationLink
                bg='#e16b96'
                to='/'
                text='logout'
                textColor='black'
                onClick={auth.logout}/> 
            </>) : (<>
              <NavigationLink
                  bg='#445ce8'
                  to='/login'
                  text='Login'
                  textColor='white'/> 
                <NavigationLink
                  bg='#e16b96'
                  to='/signup'
                  text='Signup'
                  textColor='black'/> 
            </>)}

          </div>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header