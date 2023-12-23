<script>
  import { T } from '@threlte/core';
  import { interactivity, Grid, OrbitControls } from '@threlte/extras';
  import { tweened } from 'svelte/motion';
  import { elasticOut } from 'svelte/easing';
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import Terrain from '$lib/components/Terrain.svelte';

  interactivity();

  const scale = tweened(0.5, { duration: 1000, easing: elasticOut });
</script>

<T.OrthographicCamera
  near={0.001}
  far={1000}
  position={[-Math.sqrt(2), Math.sqrt(2), -Math.sqrt(9)]}
  makeDefault
>
  <OrbitControls enabled={false} />
</T.OrthographicCamera>

<Terrain />
