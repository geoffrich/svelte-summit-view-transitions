<script lang="ts">
	import { tick } from 'svelte';
	import { shuffleDecks, getSpriteUrl, initCards, moveCard, type Card } from '$lib/cards';

	let { cards, selected } = initCards();

	function shuffle() {
		[cards, selected] = shuffleDecks(cards, selected);
	}

	function select(card: Card) {
		viewTransition(() => {
			[cards, selected] = moveCard(card, cards, selected);
		});
	}

	function deselect(card: Card) {
		viewTransition(() => {
			[selected, cards] = moveCard(card, selected, cards);
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

<button class="shuffle" on:click={() => viewTransition(shuffle)}>Shuffle</button>

<div class="cards">
	{#each cards as card (card)}
		<div
			class="card"
			style:--name="card-{card}"
			style:background-image="url({getSpriteUrl(card)})"
			data-card={card}
		>
			<button class="select" on:click={() => select(card)}>Swap</button>
		</div>
	{:else}
		<div class="card" />
	{/each}
</div>

<div class="cards">
	{#each selected as card (card)}
		<div
			class="card"
			style:--name="card-{card}"
			style:background-image="url({getSpriteUrl(card)})"
			data-card={card}
		>
			<button class="select" on:click={() => deselect(card)}>Swap</button>
		</div>
	{:else}
		<div class="card" />
	{/each}
</div>

<style>
	.card {
		view-transition-name: var(--name);
	}
</style>
