<script lang="ts">

export default{
  props: {
    popularTitle: String
  }
}

</script>
<template>
  <div class="mt-16 w-[95%] justify-self-end ml-[5%] h-full">
    <div class="text-2xl">{{ popularTitle }}</div>
    <div class="flex gap-4 h-full overflow-x-auto mt-12">  
      <slot></slot>
    </div>
  </div>
</template>

<style>
</style>