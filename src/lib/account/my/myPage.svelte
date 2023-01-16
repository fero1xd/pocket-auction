<script lang="ts">
	import FormInput from '$lib/formInput.svelte';

	export let user: User;

	let email = user.email;
	let name = user.name;
</script>

<div class="flex-1 p-5">
	<h1 class="font-bold text-2xl tracking-wide">My Details</h1>
	<div class="divider" />

	<div class="flex mt-5">
		<div class="flex-1">
			<div class="mb-10">
				<FormInput
					loading={false}
					label="Email"
					type="email"
					placeholder={user.email}
					name="email"
					dispatchEvents={false}
					errors={undefined}
					required={false}
					id="email"
					bind:value={email}
				/>
				<FormInput
					loading={false}
					label="Name"
					type="name"
					placeholder={user.name}
					name="text"
					dispatchEvents={false}
					errors={undefined}
					required={false}
					id="name"
					bind:value={name}
				/>
			</div>

			<div class="flex gap-2">
				<div class="btn btn-primary normal-case w-28">Save</div>
				<div class="btn normal-case w-24">Reset</div>
			</div>
		</div>

		<div class="avatar px-16 flex items-center justify-center flex-col gap-3">
			<div
				class="w-44 h-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
			>
				<img src={user.avatarUrl} alt={user.name} />
			</div>
			<p class="prose">Avatar</p>
		</div>
	</div>
</div>
