<script lang="ts">
export default{
  props: {
    headerTitle: String,
    headerRating: String,
    headerReviews: String,
    headerYear: String,
    headerDuration: String,
    headerDesc: String,
  }
}

</script>
<template>
  <header class="w-full py-64 relative overflow-hidden">
    <img class="absolute top-0 right-0 " src="../../assets/18TSJF1WLA4CkymvVUcKDBwUJ9F.webp" alt="#">
    <div class="absolute z-10 w-full h-full bg-gradient-to-r from-black via-black via-20% top-0 left-0 "></div>
    <div class="px-[80px] relative z-20">
      <h1 class="text-4xl">{{ headerTitle }}</h1>
      <ol class="flex justify-between list-disc max-w-sm">
        <li class="flex"> <slot></slot> </li>
        <li class="">{{ headerReviews }}</li>
        <li class="">{{ headerYear }}</li>
        <li class="">{{ headerDuration }}</li>
      </ol>
      <div class="">{{ headerDesc }}</div>
    </div>
  </header>
</template>
