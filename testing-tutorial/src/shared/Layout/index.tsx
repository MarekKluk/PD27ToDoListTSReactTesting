import {useNavigate} from "react-router-dom";
import React, {FC, PropsWithChildren} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './index.css'
export const Layout: FC<PropsWithChildren> = ({ children }) => {
const navigate = useNavigate();

  return (
    <div className="layout-container">
      <div className="nav-bar">
        <Box sx={{ flexGrow: 1, minWidth:'100%'}}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={()=> navigate('/')}>Home</Button>
              <Button color="inherit" onClick={()=> navigate('/todos')}>ToDoList</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
