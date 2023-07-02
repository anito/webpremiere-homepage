<script lang="ts">
	import {
		BufferAttribute,
		BufferGeometry,
		Camera,
		Float32BufferAttribute,
		ShaderMaterial
	} from 'three';
	import {
		EffectComposer,
		RenderPass,
		ShaderPass,
		EffectPass,
		SMAAEffect,
		SMAAPreset
	} from 'postprocessing';
	import { createNoise2D } from 'simplex-noise';
	import { T, useFrame, useRender, useThrelte } from '@threlte/core';
	import { CopyShader } from '$lib/shaders/CopyShader';
	import vertexShader from '$lib/shaders/filmgrain/vertex.glsl?raw';
	import fragmentShader from '$lib/shaders/filmgrain/fragment.glsl?raw';
	import { onMount } from 'svelte';

	let amountDelta = 0.1;

	$: setupEffectComposer($camera);

	const { renderer, scene, camera } = useThrelte();
	const composer = new EffectComposer(renderer);
	const uniforms = {
		time: { value: 0 },
		amount: { value: 0.01 },
		tDiffuse: { value: null }
	};

	const setupEffectComposer = (camera: Camera) => {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, camera));
		composer.addPass(new ShaderPass(new ShaderMaterial(CopyShader)));
		composer.addPass(
			new ShaderPass(
				new ShaderMaterial({
					uniforms,
					vertexShader,
					fragmentShader
				})
			)
		);
		// composer.addPass(
		// 	new EffectPass(
		// 		camera,
		// 		new SMAAEffect({
		// 			preset: SMAAPreset.LOW
		// 		})
		// 	)
		// );
	};

	useFrame(({ renderer }, delta) => {
		uniforms.amount.value += amountDelta;
	});

	useRender((_, delta) => {
		composer.render(delta);
	});

	onMount(() => {});
</script>
