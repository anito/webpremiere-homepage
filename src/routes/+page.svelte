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

<div class="bg-canvas">
	<Canvas>
		<Terrain />
	</Canvas>
</div>
<div class="fg-canvas">
	<Canvas>
		<Filmgrain />
	</Canvas>
</div>

<style lang="scss">
	.bg-canvas, .fg-canvas {
		height: 100vh;
    inset: 0;
    position: fixed;
    width: 100vw;
	}
</style>
