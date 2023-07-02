<script lang="ts">
	import { T } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { generateUUID, randInt } from 'three/src/math/MathUtils';

	const bodies = Array(25)
		.fill('')
		.map((_) => {
			return {
				id: generateUUID(),
				position: [randInt(-2, 2), randInt(10, 25), randInt(-2, 2)],
				rotation: [Math.random(), Math.random(), Math.random()]
			} as {
				id: string;
				position: [x: number, y: number, z: number];
				rotation: [x: number, y: number, z: number];
			};
		});
</script>

{#each bodies as body (body.id)}
	<T.Group position={body.position} rotation={body.rotation}>
		<RigidBody>
			<Collider shape="ball" args={[0.25]} />
			<T.Mesh>
				<T.SphereGeometry args={[0.25]} />
				<T.MeshStandardMaterial />
			</T.Mesh>
		</RigidBody>
	</T.Group>
{/each}
