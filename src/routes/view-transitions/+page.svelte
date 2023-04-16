<script lang="ts">
	import { tick } from 'svelte';
	import { createDeck, type Card } from '$lib/cards';

	const deck = createDeck().sort(() => Math.random() - 0.5);
	let cards = deck.slice(0, 5);
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
		viewTransition(() => {
			selected = selected;
			cards = cards;
		});
	}

	function deselect(card: Card) {
		cards.push(card);
		selected.splice(selected.indexOf(card), 1);
		viewTransition(() => {
			selected = selected;
			cards = cards;
		});
	}

	function viewTransition(cb: () => void) {
		if (!document.startViewTransition) {
			cb();
			return;
		}
		document.startViewTransition(() => {
			cb();
			return tick();
		});
	}
</script>

<div class="container">
	<button class="shuffle" on:click={() => viewTransition(shuffle)}>Shuffle</button>

	<div class="cards">
		{#each cards as card (card)}
			<div class="card" style:--name="card-{card}">
				{card}
				<button class="select" disabled={cards.length === 1} on:click={() => select(card)}
					>Swap</button
				>
			</div>
		{/each}
	</div>

	<div class="cards">
		{#each selected as s (s)}
			<div class="card" style:--name="card-{s}">
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
		view-transition-name: var(--name);
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
