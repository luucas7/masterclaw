export interface OutputContent {
    message: string; 
    type: 'success' | 'info' | 'warning' | 'error';
}

export interface SnackbarContent extends OutputContent{
    open?: boolean;
    autoHideDuration?: number;
}

export interface SnackbarContextType {
    snackbar: SnackbarContent;
    openSnackbar: (content: SnackbarContent) => void;
    closeSnackbar: () => void;
}