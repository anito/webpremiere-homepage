<script>
	import { T } from '@threlte/core';
	import { interactivity, Grid, OrbitControls } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import Filmgrain from '$lib/components/Filmgrain.svelte';

	// interactivity();

	const scale = tweened(0.5, { duration: 1000, easing: elasticOut });
</script>

<T.OrthographicCamera left={-1} right={1} top={1} bottom={-1} near={-1} far={0}>
	<OrbitControls enabled={false} />
</T.OrthographicCamera>

<Filmgrain />
