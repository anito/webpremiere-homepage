<script lang="ts">
	import { BufferAttribute, PlaneGeometry, Color } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { createNoise2D } from 'simplex-noise';
	import { T, useFrame } from '@threlte/core';
	import { showCollider } from '$lib/stores';
	import vertexShader from '$lib/shaders/terrain/vertex.glsl?raw';
	import fragmentShader from '$lib/shaders/terrain/fragment.glsl?raw';
	import { onMount } from 'svelte';

	useFrame(({ renderer }, delta) => {
		if (renderer) {
			uniforms.time.value += delta;
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

	const geometry = new PlaneGeometry(10, 10, 300, 300);

	const noise = createNoise2D();
	const verticies = geometry.getAttribute('position').array;
	const newVerticies = new Float32Array(verticies.length);

	for (let i = 0; i < verticies.length; i += 3) {
		const x = verticies[i];
		const y = verticies[i + 1];

		newVerticies[i] = x;
		newVerticies[i + 1] = y;
		newVerticies[i + 2] = noise(x / 4, y / 4);
	}
	const bufferAttr = new BufferAttribute(newVerticies, 3);
	// geometry.setAttribute('position', bufferAttr);

	// needed for lighting
	geometry.computeVertexNormals();
</script>

<T.Mesh {geometry} rotation.z={Math.PI} needsUpdate>
	<T.ShaderMaterial {vertexShader} {fragmentShader} {uniforms} />
</T.Mesh>
