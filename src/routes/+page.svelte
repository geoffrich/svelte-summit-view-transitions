<script lang="ts">
	import '../style.css';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintOut
	});

	// initialize array of playing cards with suits
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
	// shuffle deck
	deck.sort(() => Math.random() - 0.5);

	// select 5 random cards
	let cards = deck.slice(0, 5);

	type Card = (typeof cards)[0];
	let selected = deck.slice(5, 10);

	function shuffle() {
		const originalCardsLength = cards.length;
		cards = cards.concat(selected).sort(() => Math.random() - 0.5);
		// split cards into two arrays
		selected = cards.splice(originalCardsLength, cards.length - originalCardsLength);
		cards = cards;
		selected = selected;
	}

	function select(card: Card) {
		selected.push(card);
		cards.splice(cards.indexOf(card), 1);
		selected = selected;
		cards = cards;
	}

	function deselect(card: Card) {
		cards.push(card);
		selected.splice(selected.indexOf(card), 1);
		cards = cards;
		selected = selected;
	}
</script>

<div class="container">
	<button class="shuffle" on:click={shuffle}>Shuffle</button>

	<div class="cards">
		{#each cards as card (card)}
			<div
				animate:flip={{
					duration: 400
				}}
				class="card"
				in:send={{ key: card }}
				out:receive={{ key: card }}
			>
				{card}
				<button class="select" disabled={cards.length === 1} on:click={() => select(card)}
					>Swap</button
				>
			</div>
		{/each}
	</div>

	<div class="cards">
		{#each selected as s (s)}
			<div
				animate:flip={{
					duration: 400
				}}
				class="card"
				in:send={{ key: s }}
				out:receive={{ key: s }}
			>
				{s}
				<button class="select" disabled={selected.length === 1} on:click={() => deselect(s)}
					>Swap</button
				>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		margin-top: 3rem;
	}
	.shuffle {
		margin: 0 auto;
		display: block;
		max-width: 300px;
		width: 100%;
		height: 50px;
		text-transform: uppercase;
		background-color: red;
		border: 5px solid black;
		color: white;
		font-size: 1.5rem;
	}
	.cards {
		display: flex;
		gap: 50px;
		justify-content: center;
	}

	.card {
		max-width: 120px;
		width: 100%;
		aspect-ratio: 12 / 20;
		display: grid;
		place-items: center;
		background-color: blue;
		font-size: 2rem;
		position: relative;
	}

	.select:not(:focus) {
		opacity: 0;
	}

	.card:hover .select {
		opacity: 1;
	}

	.select::after {
		content: '';
		position: absolute;
		inset: 0;
	}
</style>
