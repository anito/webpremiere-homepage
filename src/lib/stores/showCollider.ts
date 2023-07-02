import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, update, set } = writable(false);

	return {
		subscribe,
		update: (active: boolean) => update(() => active),
		set
	};
}

export default createStore();
