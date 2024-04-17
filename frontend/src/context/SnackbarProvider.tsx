
import React from 'react';
import { SnackbarContent, SnackbarContextType } from '../ts/output';

const baseSnackbarContent: SnackbarContent = {
    open: false,
    message: '',
    type: 'info',
    autoHideDuration: 3000,
};

export const SnackbarContext = React.createContext<SnackbarContextType>({
    snackbar: baseSnackbarContent,
    openSnackbar: () => {},
    closeSnackbar: () => {}
});

export const SnackbarProvider = ({ children }:
    { children: React.ReactNode }) => {

    const [snackbar, setSnackbar] = React.useState<SnackbarContent>(baseSnackbarContent);

    const openSnackbar = (content: SnackbarContent) => {
        setSnackbar({ ...content, open: true});
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false});
    };

    return (
        <SnackbarContext.Provider value={{ snackbar, openSnackbar, closeSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};