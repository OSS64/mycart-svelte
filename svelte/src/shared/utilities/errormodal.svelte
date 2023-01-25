<script lang="ts">
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
  } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  /**
   * props received from another component.
   */
  export let header: string;
  export let message: string;
  export let open: boolean = false;
  export let timer: boolean = false;

  const toggle = () => (open = !open);

  const dispatch = createEventDispatcher();

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
        You will be redirected after ${counter} sec${
        counter === 1 ? "" : "s"
      }.`;
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
    dispatch("endTimer");
  };

  /**
   * If timer is true, then countdown message will display.
   */
  if (timer) {
    showTimerMessage(message);
  }
</script>

<Modal isOpen={open} {toggle} on:close={() => dispatch("closeModal")}>
  <ModalHeader {toggle}>{header}</ModalHeader>
  <ModalBody>
    {message}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
