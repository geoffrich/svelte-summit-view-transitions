const sprites = import.meta.glob('$lib/sprites/*.png', { eager: true, as: 'url' });
const spriteUrls = naturalSort(Object.values(sprites));

// take numbers in the string into account
function naturalSort(items: string[]) {
	return items.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function createDeck(): Card[] {
	const suits = ['♠', '♥', '♣', '♦'];
	const deck = suits.flatMap((suit) => {
		return Array.from({ length: 13 }, (_, i) => {
			const value = i + 1;
			if (value === 1) return `A${suit}`;
			if (value === 11) return `J${suit}`;
			if (value === 12) return `Q${suit}`;
			if (value === 13) return `K${suit}`;
			return `${value}${suit}`;
		});
	});
	return deck;
}

export type Card = string;

const deck = createDeck();

export function getSpriteUrl(card: Card): string {
	const cardIndex = deck.indexOf(card);
	const sprite = spriteUrls[cardIndex];

	return sprite as string;
}

const DECK_SIZE = 5;

export function initCards() {
	const deck = createDeck().sort(() => Math.random() - 0.5);
	let cards = deck.slice(0, DECK_SIZE);
	let selected: Card[] = [];
	return { cards, selected };
}

export function shuffleDecks(deck1: Card[], deck2: Card[]) {
	const originalCardsLength = deck1.length;
	deck1 = deck1.concat(deck2).sort(() => Math.random() - 0.5);
	// split cards into two arrays
	deck2 = deck1.splice(originalCardsLength, deck1.length - originalCardsLength);
	return [deck1, deck2];
}

export function moveCard(card: Card, originDeck: Card[], targetDeck: Card[]) {
	targetDeck.push(card);
	originDeck.splice(originDeck.indexOf(card), 1);
	return [originDeck, targetDeck];
}
