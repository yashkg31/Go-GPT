import { Hidden } from '@mui/material'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link to={"/"}>
      <Hidden smDown>
        <img 
          src='logo.png'
          alt='go-gpt'
          height={"60px"}>
        </img>
      </Hidden>

      <Hidden smUp>
        <img 
          src='logo-cropped.png'
          alt='go-gpt'
          height={"40px"}
          style={{
            padding: "7px 0 0 8px"
          }}>
        </img>
      </Hidden>
        
      </Link>
    </div>
  )
}

export default Logo