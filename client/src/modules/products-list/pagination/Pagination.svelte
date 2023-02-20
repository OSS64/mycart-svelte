<script lang="ts">
  import { LightPaginationNav } from "svelte-paginate";
  import { createEventDispatcher } from "svelte";

  let currentPage = 1;
  let pageSize = 5;
  export let total: number;
  const optionList: number[] = [0, 2, 4, 5, 10];
  const dispatch = createEventDispatcher();

  function changePage(e: { detail: { page: string } }) {
    currentPage = parseInt(e.detail.page);
    dispatch("setPage", { currentPage, pageSize });
  }
  function changePageSize(e) {
    pageSize = parseInt(e.target.value);
    dispatch("setPage", { currentPage, pageSize });
  }
</script>

<div class="pagination">
  <div class="pagesize">
    <p class="m-0">PageSize:</p>
    <select class="m-0" bind:value={pageSize} on:change={changePageSize}>
      {#each optionList as option}
        <option value={option} selected={option === pageSize}
          >{option === 0 ? "All" : option}</option
        >
      {/each}
    </select>
  </div>
  {#if total > pageSize && pageSize != 0}
    <LightPaginationNav
      totalItems={total}
      limit="1"
      {pageSize}
      showStepOptions={true}
      {currentPage}
      on:setPage={changePage}
    />
  {/if}
</div>

<style lang="scss">
  .pagination {
    column-gap: 10px;
    align-items: center;
    margin-bottom: 10px;
  }

  .pagesize {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
</style>
