import { useSnackbar } from "../hooks/useSnackbar"



const Test = () => {




    const { openSnackbar} = useSnackbar();


    return (
        <>
            <button onClick={() => openSnackbar({ message: 'Hello', type: 'info' })}>Open Snackbar</button>
        </>
    )

}

export default Test;