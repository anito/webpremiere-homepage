<script lang="ts">
  import { Color, Mesh } from 'three';
  import { T, useFrame, useRender, useThrelte } from '@threlte/core';
  import vertexShader from '$lib/shaders/terrain.vert?raw';
  import fragmentShader from '$lib/shaders/terrain.frag?raw';
  import { onMount } from 'svelte';

  let mesh: Mesh;
  let rotationZ = 0.9;
  const t = 2.7;
  let d = 0;
  let u = t;
  let f = 3.3;

  useFrame(({ renderer }, delta) => {
    // mesh.rotation.z += 0.0002;
    // mesh.rotation.z += (window.scrollY - d) * 0.0002;
    // uniforms.scroll.value = t + window.scrollY / document.body.scrollHeight * (f - t);
    // u += uniforms.speed.value * 0.16666;
    // u += (window.scrollY - d) * 0.0001;
    // const n = Math.PI * (u - t) / (f - t);
    // uniforms.time.value = t + (f - t) * (Math.sin(n) * Math.sin(n));
    // d = window.scrollY;

    rotationZ += 0.0002;
    rotationZ += (window.scrollY - d) * 0.0002;
    uniforms.scroll.value = t + (window.scrollY / document.body.scrollHeight) * (f - t);
    u += uniforms.speed.value * 0.1666;
    u += (window.scrollY - d) * 0.0001;
    const n = (Math.PI * (u - t)) / (f - t);
    uniforms.time.value = t + (f - t) * Math.sin(n);
    d = window.scrollY;
  });

  const uniforms = {
    time: { value: t },
    speed: { value: 0.002 },
    scroll: { value: 0.002 },
    waveDefinition: { value: 1.4 },
    waveAmplitude: { value: 0.5 },
    topoDefinition: { value: 70 },
    topoColor: { value: new Color(38 / 255, 38 / 255, 38 / 255) }
  };

  onMount(() => {});

  // const noise = createNoise2D();
  // const verticies = geometry.getAttribute('position').array;
  // const newVerticies = new Float32Array(verticies.length);

  // for (let i = 0; i < verticies.length; i += 3) {
  // 	const x = verticies[i];
  // 	const y = verticies[i + 1];

  // 	newVerticies[i] = x;
  // 	newVerticies[i + 1] = y;
  // 	newVerticies[i + 2] = noise(x / 4, y / 4);
  // }
  // const bufferAttr = new BufferAttribute(newVerticies, 3);
  // geometry.setAttribute('position', bufferAttr);
</script>

<T.Mesh bind:ref={mesh} scale={600} position={[-600, 40, 200]} rotation={[0, 0, rotationZ]} needsUpdate>
  <T.PlaneGeometry args={[5, 5, 400, 400]} />
  <T.ShaderMaterial
    transparent
    side={2}
    {vertexShader}
    {fragmentShader}
    {uniforms}
  />
</T.Mesh>
