<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Terrain from '$lib/components/scenes/SceneTerrain.svelte';
	import Filmgrain from '$lib/components/scenes/SceneFilmgrain.svelte';
	import { Pane } from 'tweakpane';
	import { onMount } from 'svelte';
	import { showCollider, autoRotate, autoRotateSpeed } from '$lib/stores';

	function addPane(node: HTMLDivElement) {
		const PARAMS = {
			speed: $autoRotateSpeed,
			autoRotate: $autoRotate,
			'show collider': $showCollider
		};

		const pane = new Pane();
		const f = pane.addFolder({
			title: 'Params'
		});

		const speed = f.addInput(PARAMS, 'speed');
		speed.on('change', ({ value }) => ($autoRotateSpeed = value));
		const autoRotation = f.addInput(PARAMS, 'autoRotate');
		autoRotation.on('change', ({ value }) => ($autoRotate = value));
		const collider = f.addInput(PARAMS, 'show collider');
		collider.on('change', ({ value }) => ($showCollider = value));
	}

	onMount(() => {});
</script>

<div use:addPane />

<div class="canvas">
	<Canvas>
		<Terrain />
	</Canvas>
	<Canvas>
		<Filmgrain />
	</Canvas>
</div>

<style lang="scss">
	.canvas,
	.canvas :global(canvas) {
		--color-primary: rgb(20 20 20);
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
</style>
