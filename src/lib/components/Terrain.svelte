<script lang="ts">
	import { BufferAttribute, PlaneGeometry, Color, Mesh, ShaderMaterial } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { createNoise2D } from 'simplex-noise';
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { showCollider } from '$lib/stores';
	import vertexShader from '$lib/shaders/terrain/vertex.glsl?raw';
	import fragmentShader from '$lib/shaders/terrain/fragment.glsl?raw';
	import { onMount } from 'svelte';

	let mesh: Mesh;
	const t = 2.7;
	let d = 0;
	let u = t;
	let f = 3.3;

	useFrame(({ renderer }, delta) => {
		if (renderer) {
			uniforms.scroll.value = t + (window.scrollY / document.body.scrollHeight) * (f - t);

			mesh.rotation.z += 0.0002;
			mesh.rotation.z += (window.scrollY - d) * 0.005;

			u += uniforms.speed.value / 6;
			u += (window.scrollY - d) * 0.0001;
			const n = (Math.PI * (u - t)) / (f - t);
			uniforms.time.value = t + (f - t) * (Math.sin(n) * Math.sin(n));
			d = window.scrollY;
		}
	});

	const uniforms = {
		time: { value: 0 },
		speed: { value: 0.002 },
		scroll: { value: 0.002 },
		waveDefinition: { value: 1.4 },
		waveAmplitude: { value: 0.9 },
		topoDefinition: { value: 10 },
		topoColor: { value: new Color(21 / 255, 36 / 255, 45 / 255) }
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

<T.Mesh bind:ref={mesh} rotation.z={Math.PI} needsUpdate>
	<T.PlaneGeometry args={[5, 5, 400, 400]} />
	<T.ShaderMaterial {vertexShader} {fragmentShader} {uniforms} />
</T.Mesh>
