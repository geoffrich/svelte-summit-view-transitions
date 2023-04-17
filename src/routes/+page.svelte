<script lang="ts">
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { shuffleDecks, getSpriteUrl, initCards, moveCard, type Card } from '$lib/cards';

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintOut
	});

	let { cards, selected } = initCards();

	function shuffle() {
		[cards, selected] = shuffleDecks(cards, selected);
	}

	function select(card: Card) {
		[cards, selected] = moveCard(card, cards, selected);
	}

	function deselect(card: Card) {
		[selected, cards] = moveCard(card, selected, cards);
	}
</script>

<button class="shuffle" on:click={shuffle}>Shuffle</button>

<div class="cards">
	{#each cards as card (card)}
		<div
			animate:flip={{
				duration: 400
			}}
			class="card"
			style:background-image="url({getSpriteUrl(card)})"
			data-card={card}
			in:send|local={{ key: card }}
			out:receive|local={{ key: card }}
		>
			<button class="select" disabled={cards.length === 1} on:click={() => select(card)}
				>Swap</button
			>
		</div>
	{/each}
</div>

<div class="cards">
	{#each selected as card (card)}
		<div
			animate:flip={{
				duration: 400
			}}
			class="card"
			in:send|local={{ key: card }}
			out:receive|local={{ key: card }}
			style:background-image="url({getSpriteUrl(card)})"
			data-card={card}
		>
			<button class="select" disabled={selected.length === 1} on:click={() => deselect(card)}
				>Swap</button
			>
		</div>
	{/each}
</div>
