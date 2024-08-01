import { Box, Button, Typography } from "@mui/material"
import { BsFillSignIntersectionFill } from "react-icons/bs";
import CustomInput from "../components/shared/CustomInput"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const auth = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      toast.loading("Signing Up", {
        id: "signup"
      });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", {
        id: "signup"
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Signup", {
        id: "signup"
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
    width={"420px"}
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
          fontWeight={600}>SignUp</Typography>

          <CustomInput type="name" name="name" label="Name"/>
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
          }} endIcon = {<BsFillSignIntersectionFill />}>
            SignUp
          </Button>
        </Box>
      </form>

    </Box>

  </Box>
  )
}

export default Signup