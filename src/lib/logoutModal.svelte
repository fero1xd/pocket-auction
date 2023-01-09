<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex justify-between items-center">
		<h3 class="font-semibold text-md">Are you sure you want to logout?</h3>

		<form action="/logout" method="POST" class="flex gap-2">
			<button class="btn btn-ghost btn-sm normal-case" type="submit"> Yes </button>
			<label for="my-modal" class="btn btn-primary btn-sm normal-case">No</label>
		</form>
	</div>
</div>
