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

<T.PerspectiveCamera aspect={window.innerWidth/window.innerHeight} near={0.1} far={1000} fov={75}>
  <OrbitControls enabled={false} />
</T.PerspectiveCamera>

<Filmgrain />
