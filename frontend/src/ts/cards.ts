export interface DeckPreview {
    name: string;
    description: string;
    image: string;
}

export interface Card {
    name: string;
    description: string;
    image: string;
    exists: true;
}

export interface Deck {
    name: string;
    description: string;
    mainDeck: Card[];
}

export interface EmptyCardSlot {
    exists: false;
}

export interface CardSlots {
    cards: (Card | EmptyCardSlot)[];
}
