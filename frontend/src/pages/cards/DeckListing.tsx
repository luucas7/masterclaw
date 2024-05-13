import TableMUI from '../../components/TableMUI';
import { DeckPreview } from '../../ts/cards';
import useFetch from 'react-fetch-hook';
import { ENDPOINTS, SERVER_HOST } from '../../config';
import { useParams } from 'react-router-dom';
import { Named } from '../../ts/user';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { CircularProgress } from '@mui/material';

const DeckListing = () => {

    const { paramName } = useParams();
    const user = useAuthUser<Named>();

    const name = paramName ? paramName : user?.name;
    
    const { data: decks, isLoading, error} = useFetch<DeckPreview[]>(`${SERVER_HOST}${ENDPOINTS.DECKS}/${name}`);

    console.log(`decks:`,decks);
    
    return (
        <>
            {!isLoading && decks && <TableMUI rows={decks}/>}
            {error && <div>{error.message}</div>}
            {isLoading && 
                <>
                    <CircularProgress />
                </>
            }

        </>
    );
};

export default DeckListing;