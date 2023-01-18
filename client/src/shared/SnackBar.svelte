<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
	} from 'sveltestrap';
	import { snackbarStore } from '../store/snackbar.store';
	let isOpen = false;
	let resStatus = '';
	let toastMessage = '';
	onMount(() => {
		snackbarStore.subscribe((v: any) => {
			console.log('snackbarStore.subscribe', v);
			isOpen = v?.isOpen;
			resStatus = v?.resStatus;
			toastMessage = v?.toastMessage;
		});
	});
	const hideSnackbar = () => {
		snackbarStore.set({ show: false, title: '', message: '' });
	};
</script>

<h1>{isOpen} isOpen</h1>
<Modal
	{isOpen}
	toggle={() => {
		hideSnackbar();
	}}
>
	<ModalHeader toggle={hideSnackbar}>{resStatus}</ModalHeader>
	<ModalBody>
		{toastMessage || 'Please wait...'}
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={hideSnackbar}>Cancel</Button>
	</ModalFooter>
</Modal>

<style>
</style>
