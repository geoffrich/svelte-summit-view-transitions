<script lang="ts">
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createDeck, type Card, getSpriteUrl } from '$lib/cards';

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintOut
	});

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
		{#each selected as s (s)}
			<div
				animate:flip={{
					duration: 400
				}}
				class="card"
				in:send|local={{ key: s }}
				out:receive|local={{ key: s }}
				style:background-image="url({getSpriteUrl(s)})"
				data-card={s}
			>
				<button class="select" disabled={selected.length === 1} on:click={() => deselect(s)}
					>Swap</button
				>
			</div>
		{/each}
	</div>
</div>
