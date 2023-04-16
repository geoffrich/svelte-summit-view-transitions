export function createDeck(): Card[] {
	const suits = ['♠', '♣', '♥', '♦'];
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
