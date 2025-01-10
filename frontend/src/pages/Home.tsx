import { Box, Link } from "@mui/material"
import Typing_ani from "../components/Typing_ani"

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
          mt: {
            lg: "20vh",
            xs: "15vh"
          },
          mb: 3
        }}>
          <Box bgcolor={"black"} sx={{
            fontSize: {
              lg: "70px",
              md: "50px",
              sm: "36px",
              xs: "22px",
            },
            fontWeight: 800,
            width: "80%",
            borderRadius: 8,
            py: {
              sm: 4,
              xs: "auto"
            },
            pt: { xs: 5},
            pb: {
              sm: 5,
              xs: 5
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Typing_ani/>
          </Box>
        </Box>

        <Box py={4} sx={{ px: {lg : 8, xs: 4, sm: 4}}}>
          <h1 style={{
            letterSpacing: "2px"
          }}> About Go-GPT :</h1>
          <Box fontFamily={"Zain, sans-serif"} mb={5}
          fontSize={{ md: "32px", lg: "32px", xs: "24px"}}>
            'Go-GPT' is an AI chatbot project built using the MERN stack (MongoDB, Express.js, React, and Node.js) and the OpenAI API. It features secure signup and login functionalities with full authentication. Users can interact with the chatbot in real-time, taking advantage of OpenAI's capabilities to provide intelligent and context-aware responses. This project demonstrates the effective integration of AI with modern web technologies.
          </Box>

          <Box display={"flex"} justifyContent={"space-around"}>

            <h2 style={{
              fontFamily: "Zain, sans-serif",
              marginRight: "30px"
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
              marginLeft: "30px"
            }}><Link
              href="https://github.com/yashkg31/Go-GPT"
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
    </Box>
  )
}

export default Home
