import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoSend } from "react-icons/io5";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { deleteUserChats, getUserChats, sendChatReq } from '../api-communicators';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message ={
  role: "user" | "assistant",
  content: string
}

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }

    const newMessage = {
      role: "user",
      content: content
    } as Message
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatReq(content);
    setChatMessages([...chatData.chats])
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", {
        id: "deletechats"
      })
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted successfully!", {
        id: "deletechats"
      })
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chats", {
        id: "deletechats"
      })
    }
  }

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading Chats", {
        id: "loadchats"
      });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chats are loaded successfully", {
            id: "loadchats"
          })
        }).catch(err => {
          console.log(err);
          toast.error("Failed to load the chats", {
            id: "loadchats"
          })
        })
    }
  }, [auth])

  useEffect(() => {
    if(!auth?.user){
      return navigate("/login");
    }
  }, [auth])

  return ( 
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 12,
      gap: 3
    }}>
      <Box sx={{
        display: {
          md: "flex",
          xs: "none",
          sm: "none"
        }
      }}>
        <Box sx={{
          display: "flex",
          height: "80%",
          width: "80vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
          mt: 5
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: 'black',
            fontWeight: 900,
            wordSpacing: -4
          }}>
            {auth?.user?.name && auth?.user?.name.split(" ").length > 1 ? (
              <>
                {auth.user.name.split(" ")[0][0]}
                {auth.user.name.split(" ")[1][0]}
              </>
            ) : (
              auth?.user?.name[0]
            )}
          </Avatar>

          <Typography sx={{
            mx: "auto",
            fontFamily: "Zain",
            fontSize: 25,
          }}>
            <b>Welcome {auth?.user?.name} !</b>
          </Typography>

          <Typography sx={{
            mx: "auto",
            fontFamily: "Zain",
            my: 3,
            py: 1,
            px: 3,
            fontSize: 22
          }}>
            With this AI assistant, you can ask any question you like! Whether you need <b>a function for calculating factorial in C++</b>, <b>a recipe for pav bhaji</b>, or <b>information about Robert Downey Jr.</b>, this assistant is here to help. Just type in your query, and you'll get the answers you need in no time.
          </Typography>

          <Button onClick={handleDeleteChats} sx={{
            width: "200px",
            my: "auto",
            color: 'white',
            bgcolor: "#ba100d",
            fontWeight: 700,
            borderRadius: "20px",
            mx: "auto",
            ":hover" : {
              color: "black",
              borderRadius: "20px",
              borderColor: 'black',
              bgcolor: 'white'
            }
          }}> Clear Conversation </Button>

        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        flex: {
          md: 0.8,
          sm: 1,
          xs: 1
        },
        flexDirection: "column",
        marginLeft: 5,
      }}>
        <Typography sx={{
          textAlign: "center",
          fontSize: "55px",
          color: '#85f3ff',
          mb: "4px",
          mx: "auto",
          fontFamily: "Zain, sans-serif",
          fontWeight: 700
        }}>GPT 3.5 Turbo</Typography>
        <Box sx={{
          width: "100%",
          height: "60vh",
          p: 2,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}>
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content = {chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div style={{
          padding: '5px',
          width: "100%",
          marginTop: "8px",
          marginBottom: "15px",
          borderRadius: "20px",
          backgroundColor: "#000",
          display: 'flex',
          marginLeft: "10px",
          border: "2px solid white"
        }}>
          <input ref={inputRef} type='text' style={{
          width: "100%",
          backgroundColor: "black",
          padding: '20px',
          border: "none",
          outline: "none",
          fontSize: "16px",
          color: 'white'
        }} onKeyDown={handleKeyPress}></input>

        <IconButton onClick={handleSubmit} sx={{
          ml: "auto",
          color: 'white'
        }}><IoSend/></IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat