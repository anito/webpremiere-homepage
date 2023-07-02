<script>
	import { T } from '@threlte/core';
	import { interactivity, Grid, OrbitControls } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import Terrain from '$lib/components/Terrain.svelte';

	// interactivity();

	const scale = tweened(0.5, { duration: 1000, easing: elasticOut });
</script>

<T.OrthographicCamera near={0.001} far={10} position={[-Math.sqrt(2), Math.sqrt(2), -Math.sqrt(2)]}>
	<OrbitControls enabled={true} />
</T.OrthographicCamera>

<T.DirectionalLight position={[3, 2, 1]} intensity={0.875} />
<T.HemisphereLight color="#00bfff" groundColor="pink" />

<Terrain />
