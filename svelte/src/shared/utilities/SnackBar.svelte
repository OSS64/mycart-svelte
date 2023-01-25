<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
	} from 'sveltestrap';
	import { snackbarStore } from '../../store/snackbar.store';
	let isOpen = false;
	let title = '';
	let message = '';
	onMount(() => {
		snackbarStore.subscribe((v: any) => {
			console.log('snackbarStore.subscribe', v);
			isOpen = v?.isOpen;
			title = v?.title;
			message = v?.message;
		});
	});
	const hideSnackbar = () => {
		snackbarStore.set({ isOpen: false, title: '', message: '' });
	};
</script>

<Modal
	{isOpen}
	toggle={() => {
		hideSnackbar();
	}}
>
	<ModalHeader toggle={hideSnackbar}>{title}</ModalHeader>
	<ModalBody>
		{message || 'Please wait...'}
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={hideSnackbar}>Cancel</Button>
	</ModalFooter>
</Modal>

<style>
</style>
