import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import Notfound from "./pages/Notfound"
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();

  return(
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {auth?.isLoggedIn && auth.user && (<Route path="/chat" element={<Chat />}></Route>)}
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  )
}

export default App
