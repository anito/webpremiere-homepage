import type { HandleFetch, HandleServerError } from '@sveltejs/kit';

export const handleFetch = (({ request, fetch }) => {
	return fetch(request);
}) satisfies HandleFetch;

export const handleError = (({ error, event }) => {
	console.log('ERROR (in hooks.server.ts)', error, event);
}) satisfies HandleServerError;
