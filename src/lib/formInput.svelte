<script lang="ts">
	export let loading: boolean;
	export let label: string;
	export let placeholder: string;
	export let name: string;
	export let type: string;
	export let align: 'start' | 'end' | 'center' = 'start';
</script>

<div class="form-control self-start w-full mb-5">
	<div class="label justify-start md:justify-{align} lg:justify-{align}">
		<label for={name} class="label-text">{label}</label>
	</div>

	<input {name} {type} class="input input-bordered shadow-md" disabled={loading} {placeholder} />
</div>
