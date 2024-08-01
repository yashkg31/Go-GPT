import { Box, Link } from "@mui/material"
import Typing_ani from "../components/Typing_ani"
import { orange } from "@mui/material/colors"

const Home = () => {
  return (
    <Box 
      width={"100%"}
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>

        <Box className= "heading" sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: "20vh",
          mb: 3
        }}>
          <Box bgcolor={"black"} sx={{
            fontSize: {
              lg: "70px",
              md: "50px",
              sm: "36px",
              xs: "28px",
            },
            fontWeight: 800,
            width: "80%",
            borderRadius: 8,
            py: {
              sm: 4,
              xs: "auto"
            },
            pt: { xs: 5},
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Typing_ani/>
          </Box>
        </Box>

        <Box py={4} px={8}>
          <h1 style={{
            letterSpacing: "2px"
          }}> About Go-GPT :</h1>
          <Box fontFamily={"Zain, sans-serif"}
          fontSize={"32px"}>
            'Go-GPT' is an AI chatbot project built using the MERN stack (MongoDB, Express.js, React, and Node.js) and the OpenAI API. It features secure signup and login functionalities with full authentication. Users can interact with the chatbot in real-time, taking advantage of OpenAI's capabilities to provide intelligent and context-aware responses. This project demonstrates the effective integration of AI with modern web technologies.
          </Box>
        </Box>

        <Box display={"flex"} >
        <h2 style={{
          fontFamily: "Zain, sans-serif",
          marginLeft: 200,
          marginRight: 200
        }}>Created by <Link
            href="https://www.linkedin.com/in/yash-gupta-12511a220/"
            underline="none"
            color={"#ff8d30"}
            sx={{
        '&:hover': {
          color: '#0fa3ff',
        },
      }}
          >Yash Gupta
          </Link></h2>
          
        <h2 style={{
          fontFamily: "Zain, sans-serif",
          marginLeft: 200,
          marginRight: 200
        }}><Link
            href="https://github.com/yashkg31/"
            color={"#ff8d30"}
            sx={{
        '&:hover': {
          color: '#0fa3ff',
        },
      }}
          >GitHub Repo
          </Link></h2>
        </Box>

    </Box>
  )
}

export default Home