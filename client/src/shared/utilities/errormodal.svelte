<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from 'sveltestrap';
  import { ErrorStore } from '../../store/errormodal.store';
  /**
   * props received from another component.
   */
  let header: string;
  let message: string;
  let open: boolean = false;
  let timer: boolean = false;
  let endTimerRedirectUrl: string = '';
  const toggle = () => (open = !open);
  onMount(() => {
    ErrorStore.subscribe((v: any) => {
      console.log('ErrorStore.subscribe', v);
      open = v?.isOpen;
      if (v?.title) {
        header = v?.title;
      } else {
        header = 'Check your connection';
      }

      message = v?.message;
      timer = v?.timer;
      endTimerRedirectUrl = v?.endTimerRedirectUrl;
      if (timer) {
        showTimerMessage(message);
      }
    });
  });
  const hideerrormodal = () => {
    ErrorStore.set({ isOpen: false, title: '', message: '' });
  };
  /**
   * used for timer counter, to display message.
   */
  let counter: number = 0;
  let interval: string | number | NodeJS.Timer;
  /**
   * Concat timer in message until timer reaches to 0.
   * At 0 sec, timer get stopped.
   */
  const startTimer = (msg: string) => {
    if (!counter) {
      stopTimer();
    } else {
      message = `${msg}.
		  You will be redirected after ${counter} sec${counter === 1 ? '' : 's'}.`;
      counter -= 1;
    }
  };
  /**
   * Trigger timer at an interval of 1 sec.
   */
  const showTimerMessage = (msg: string) => {
    if (!interval) {
      counter = 5;
      interval = setInterval(startTimer, 1000, msg);
    }
  };
  /**
   * Clear interval, to stop memory leak.
   * Then dispatch endTimer.
   */
  const stopTimer = () => {
    clearInterval(interval);
    interval = null;
    if (endTimerRedirectUrl) {
      navigate(endTimerRedirectUrl);
    }
    hideerrormodal();
  };
  /**
   * If timer is true, then countdown message will display.
   */
</script>

<Modal isOpen="{open}" toggle="{toggle}" on:close="{hideerrormodal}">
  <ModalHeader toggle="{toggle}">{header}</ModalHeader>
  <ModalBody>
    {message}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click="{toggle}">Cancel</Button>
  </ModalFooter>
</Modal>
