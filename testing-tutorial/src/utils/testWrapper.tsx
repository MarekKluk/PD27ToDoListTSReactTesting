import React, { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

export const TestWrapper: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </ThemeProvider>
);
