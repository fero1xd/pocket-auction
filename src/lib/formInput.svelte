<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InputDispatchEvent } from './interfaces';

	const dispatch = createEventDispatcher<InputDispatchEvent>();

	export let loading: boolean;
	export let label: string;
	export let placeholder: string;
	export let name: string;
	export let type: string;
	export let align: 'start' | 'end' | 'center' = 'start';
	export let value: string = '';
	export let dispatchEvents: boolean = true;
	export let errors: string[] | undefined = undefined;
	export let required: boolean = true;
	export let showRequiredIndicator: boolean = true;
	export let id: string;

	const handleInput = (e: any) => {
		if (!dispatchEvents) return;
		dispatch('change', {
			name: e.target.name,
			value: e.target.value
		});
	};
</script>

<div class="form-control self-start w-full mb-5">
	<div class="label justify-start md:justify-{align} lg:justify-{align}">
		<label for={name} class="label-text">
			{label}
			{#if required || showRequiredIndicator}
				<span class="text-red-400">*</span>
			{/if}
		</label>
	</div>

	<input
		{name}
		{type}
		{id}
		class="input input-bordered shadow-md"
		disabled={loading}
		{placeholder}
		on:input={handleInput}
		{value}
		{required}
	/>

	<label for="password" class="label py-0 pt-1 justify-between">
		<span class="label-text-alt text-error">{errors ? errors.length && errors[0] : ''}</span>

		<slot />
	</label>
</div>
