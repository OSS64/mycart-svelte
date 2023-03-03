<script lang="ts">
  export let height: number;
  export let margin: string;
  export let width: string = 'auto';
  export let fontsize: string = 'x-large';
</script>

<span
  class="noimage-wrapper"
  style="height: {height}px; margin:{margin}; width:{width}"
>
  <span class="noimage-text" style="font-size: {fontsize};">No Image</span>
</span>

<style lang="scss">
  .noimage-wrapper {
    background-color: #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .noimage-text {
      color: #9c9c9c;
      text-decoration: none;
      font-size: 1.5rem;
    }
  }
</style>
