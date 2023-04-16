<script>
	import '../style.css';
	import { page } from '$app/stores';
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : null}
		>animate:flip and crossfade</a
	>
	<a
		href="/view-transitions"
		aria-current={$page.url.pathname === '/view-transitions' ? 'page' : null}>View Transitions</a
	>
</nav>
<slot />

<style>
	nav {
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}
	a {
		font-size: 1.2rem;
		color: white;
		text-decoration: none;
	}

	a[aria-current]::before {
		content: '👉 ';
	}
</style>
