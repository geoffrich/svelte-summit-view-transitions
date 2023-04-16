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
	.card {
		view-transition-name: var(--name);
	}
</style>
