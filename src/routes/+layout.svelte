<script>
	import '../style.css';
	import '98.css/dist/98.css';
	import { page } from '$app/stores';
	import { draggable } from '@neodrag/svelte';
</script>

<div class="container window" use:draggable>
	<div class="title-bar">
		<div class="title-bar-text">Solitaire</div>
	</div>

	<ul class="menu">
		<li class:selected={$page.url.pathname === '/'}>
			<a href="/">animate:flip and crossfade</a>
		</li>
		<li class:selected={$page.url.pathname === '/view-transitions'}>
			<a href="/view-transitions">View Transitions</a>
		</li>
	</ul>
	<div class="window">
		<div class="window-body main-content">
			<slot />
		</div>
	</div>
	<p>
		Styling courtesy of <a href="https://jdan.github.io/98.css/">98.css</a>. Card sprites are from
		<a href="https://www.spriters-resource.com/pc_computer/solitaire/sheet/107016/"
			>The Spriter's Resource</a
		>.
	</p>
</div>

<style>
	.container {
		max-width: 1080px;
		margin: 0 auto;
		resize: both;
	}

	.main-content {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		padding: 2rem;
		overflow: auto;
	}

	/* copied from 98.css, but rewritten to not use <menu> */
	.menu {
		position: relative;
		margin: 0 0 -2px 0;
		text-indent: 0;
		list-style-type: none;
		display: flex;
		padding-left: 3px;
	}

	.menu > li {
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		box-shadow: inset -1px 0 #0a0a0a, inset 1px 1px #dfdfdf, inset -2px 0 grey, inset 2px 2px #fff;
		z-index: 1;
	}

	.menu > li.selected {
		padding-bottom: 2px;
		margin-top: -2px;
		background-color: silver;
		position: relative;
		z-index: 8;
		margin-left: -3px;
	}

	.menu a {
		display: block;
		color: #222;
		margin: 6px;
		text-decoration: none;
	}
	.menu a:focus {
		outline: 1px dotted #222;
	}
</style>
