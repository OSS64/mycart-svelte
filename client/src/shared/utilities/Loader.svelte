<script lang="ts">
  import { Spinner } from "sveltestrap";
</script>

<div class="loader-body">
  <div class="loader-message-area">
    <span class="loader-message-text">Please wait...</span>
    <Spinner color={"primary"} size={"md"} />
  </div>
</div>

<style lang="scss">
  .loader-body {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    top: 0;
    left: 0;
    z-index: 20;
    .loader-message {
      &-area {
        background-color: #fff;
        transform: translate(-50%, -50%);
        width: 12rem;
        height: 6rem;
        top: 50%;
        left: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      &-text {
        font-weight: 600;
      }
    }
  }
</style>
