import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, update, set } = writable(2);

	return {
		subscribe,
		update: (n: number) => update(() => n),
		set
	};
}

export default createStore();
