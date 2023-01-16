<script lang="ts">
	export let currentPage: string;
</script>

<div>
	<div class="text-sm breadcrumbs">
		<ul>
			<li class="opacity-60">Account</li>
			<li class="font-semibold text-primary opacity-100">
				{currentPage === 'my'
					? 'My Details'
					: currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
			</li>
		</ul>
	</div>
</div>
