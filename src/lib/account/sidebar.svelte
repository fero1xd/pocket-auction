<script lang="ts">
	export let currentPage: string = 'my';

	const onClick = (name: string) => (currentPage = name);
</script>

<div class="flex flex-col w-36 gap-3">
	<button
		on:click={() => onClick('my')}
		class="btn {currentPage !== 'my'
			? 'btn-ghost'
			: ''} normal-case gap-2 items-center justify-center"
	>
		<img src="/my.png" alt="my" class="w-5 h-5" />
		My Details</button
	>
	<button
		on:click={() => onClick('password')}
		class="btn {currentPage !== 'password'
			? 'btn-ghost'
			: ''} normal-case gap-2 items-center justify-center"
	>
		<img src="/password.png" alt="password" class="w-5 h-5" />
		Password</button
	>
	<button
		on:click={() => onClick('payment')}
		class="btn {currentPage !== 'payment'
			? 'btn-ghost'
			: ''} normal-case gap-2 items-center justify-center"
	>
		<img src="/invoice.png" alt="invoice" class="w-5 h-5" />
		Payment
	</button>
</div>
