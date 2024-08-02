import { Box, Button, Typography } from "@mui/material"
import { IoLogIn } from "react-icons/io5";
import CustomInput from "../components/shared/CustomInput"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      toast.loading("Logging In", {
        id: "login"
      });
      await auth?.login(email, password);
      toast.success("Logged In Successfully", {
        id: "login"
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Login", {
        id: "login"
      })
      
    }
  };

  useEffect(() => {
    if(auth?.user){
      return navigate('/chat');
    }
  }, [auth])
  
  return (<Box
  pt={"60px"}
  display={"flex"}
  justifyContent={"center"}
  alignItems={"center"}
  height={"90vh"}>

    <Box
    width={{md : "420px", sm: "400px", xs : "360px"}}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    borderRadius={'20px'}
    borderColor={'white'}
    border={3}
    paddingBottom={6}
    paddingTop={2}
    className = "loginBox">

      <form onSubmit={handleSubmit}
        style={{
        width: '68%',
        borderRadius: '20px',
        borderColor: 'white'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center'
        }}>
          <Typography variant="h4"
          textAlign={"center"}
          padding={3}
          fontWeight={600}>Login</Typography>

          <CustomInput type="email" name="email" label="Email"/>
          <CustomInput type="password" name="password" label="Password"/>

          <Button type="submit" variant="outlined" size="medium" sx={{
            marginTop: "25px",
            marginLeft: "50px",
            marginRight: "50px",
            bgcolor: "#445ce8",
            fontWeight: "bold",
            color: "white",
            borderRadius: "20px",
            borderColor: 'white',
            ":hover" : {
              color: "black",
              borderRadius: "20px",
              borderColor: 'white',
              bgcolor: 'white'
            }
          }} endIcon = {<IoLogIn />}>
            Go!
          </Button>
        </Box>
      </form>

    </Box>

  </Box>
  )
}

export default Login