<script lang="ts">

export default{
  props: {
    popularTitle: String
  }
}

</script>
<template>
  <div class="mt-16 w-full justify-self-end h-full">
    <div class="text-2xl pl-12">{{ popularTitle }}</div>
    <div class="flex gap-4 pl-12 h-full overflow-x-auto py-12 overflow-y-hidden">  
      <slot></slot>
    </div>
  </div>
</template>

<style>
</style>