import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppContextProvider } from './context/CreateContext.jsx';
import { SnackbarProvider } from 'notistack'
ReactDOM.createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <SnackbarProvider>
        <App />
        </SnackbarProvider>
    </AppContextProvider>
)
