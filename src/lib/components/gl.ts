import vertexShader from '$lib/shaders/terrain/vertex.glsl?raw';
import fragmentShader from '$lib/shaders/terrain/fragment.glsl?raw';
import * as THREE from 'three';

let mesh: THREE.Mesh, material: THREE.ShaderMaterial, geometry: THREE.PlaneGeometry;

let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.OrthographicCamera;

function resize() {
	const { innerWidth, innerHeight } = window;
	// camera.aspect = n / c
	camera.updateProjectionMatrix();
	renderer.setSize(innerWidth, innerHeight);
}

function init() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera(
		-Math.sqrt(2),
		Math.sqrt(2),
		Math.sqrt(2),
		-Math.sqrt(2),
		0.001,
		10
  );
  start();
}

function start() {
  if ('undefined' == typeof window) return;

	const x = document.querySelector('#bg-canvas');
	const { innerWidth: innerWidth, innerHeight: innerHeight } = window;

	renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0, 0);
  
  const parent = document.querySelector('canvas')?.parentElement
	parent?.appendChild(renderer.domElement);

	window.addEventListener('resize', resize);

	geometry = new THREE.PlaneGeometry(5, 5, 400, 400);
	material = new THREE.ShaderMaterial({
		side: 1,
		transparent: true,
		uniforms: {
			time: { value: t },
			speed: { value: 0.002 },
			scroll: { value: 0.002 },
			waveDefinition: { value: 1.4 },
			waveAmplitude: { value: 0.5 },
			topoDefinition: { value: 80 },
			topoColor: { value: new THREE.Color(29 / 255, 36 / 255, 45 / 255) }
		},
		vertexShader,
		fragmentShader
	});

	material.extensions.derivatives = true;

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.z = Math.PI;
	(camera.position.z += 2), camera.lookAt(mesh.position);
	scene.add(mesh);
	animate();
}

const t = 2.7;
let d = 0;
let u = t;
let f = 3.3;

function animate() {
	// i || o(0,i=true)
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
	mesh.rotation.z += 0.0002;
	mesh.rotation.z += (window.scrollY - d) / 5e3;
	material.uniforms.scroll.value = t + (window.scrollY / document.body.scrollHeight) * (f - t);
	u += material.uniforms.speed.value / 6;
	u += (window.scrollY - d) / 1e4;
	const n = (Math.PI * (u - t)) / (f - t);
	(material.uniforms.time.value = t + (f - t) * (Math.sin(n) * Math.sin(n))), (d = window.scrollY);
}

export default init;
