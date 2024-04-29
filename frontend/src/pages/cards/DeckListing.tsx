import TableMUI from '../../components/TableMUI';
import { DeckPreview } from '../../ts/cards';

const DeckListing = () => {

    const decks: DeckPreview[] = [
        {
            id: 1,
            name: 'Deck 1',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'Deck 2',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            name: 'Deck 3',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 4,
            name: 'Deck 4',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 5,
            name: 'Deck 5',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 6,
            name: 'Deck 6',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 7,
            name: 'Deck 7',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 8,
            name: 'Deck 8',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 9,
            name: 'Deck 9',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 10,
            name: 'Deck 10',
            description: 'This is a deck',
            image: 'https://via.placeholder.com/150'
        },
    ]

    return (
        <div>
            <TableMUI rows={decks}/>
        </div>
    );
};

export default DeckListing;