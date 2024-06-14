import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />

      <Header />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
