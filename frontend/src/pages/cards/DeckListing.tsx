import TableMUI from '../../components/TableMUI';
import { DeckPreview } from '../../ts/cards';
import useFetch from 'react-fetch-hook';
import { ENDPOINTS } from '../../config';
import { useParams } from 'react-router-dom';

const DeckListing = () => {

    const { name } = useParams();

    const { data: decks, isLoading, error} = useFetch<DeckPreview[]>(`${ENDPOINTS.DECKS}/${name}`);

    return (
        <div>
            {!isLoading && decks && <TableMUI rows={decks}/>}
        </div>
    );
};

export default DeckListing;