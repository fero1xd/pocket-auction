<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex-1 w-full flex items-center justify-center">
	<div class="card w-96 bg-neutral shadow-lg text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{data?.success ? 'Success' : 'Error'}</h2>
			<p>{data?.success ? 'Successfully Verified Email' : data?.error}</p>
			<div class="card-actions justify-end mt-3">
				<a href="/home" class="btn btn-primary normal-case">Home</a>
			</div>
		</div>
	</div>
</div>
