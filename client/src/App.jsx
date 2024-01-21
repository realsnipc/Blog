import "./App.css";
import { UserContextProvider } from "./UserContext";
import Header from "./components/Header";
import Login from "./pages/Login";
import Post from "./components/PostCard";
import { Outlet, Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import IndexPage from "./pages/IndexPage";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import STT from "../src/script/STT";
import Footer from "./components/Footer";
import UserPage from "./pages/UserPage";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <>
      <NextUIProvider>
        <UserContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <main className="animated tdFadeIn">
                  <STT />
                  <Header />
                  <Outlet />
                  <Footer />
                </main>
              }
            >
              <Route path="/" element={<IndexPage />}></Route>

              <Route path="/login" element={<Login />}></Route>

              <Route path="/create" element={<CreatePost />}></Route>

              <Route path="/post/:id" element={<PostPage />}></Route>

              <Route path="/edit/:id" element={<EditPage />}></Route>

              <Route path="/user" element={<UserPage />}></Route>
            </Route>
          </Routes>
        </UserContextProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
