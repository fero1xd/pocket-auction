// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	interface Error {}

	interface Locals {
		pb: import('pocketbase').default;

		user?: User;
	}
	interface PageData {}
	interface Platform {}
}
