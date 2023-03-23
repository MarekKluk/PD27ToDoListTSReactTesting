import './App.css'
import { ToDoList } from "./views/ToDoList";
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./views/Home";
import { Layout } from "./shared/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "./utils";

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path ='/' element={<Home />} />
              <Route path ='/todos' element={<ToDoList />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
