
<script lang="ts">
export default{
	name: "headerStars",
	props:{
		star: String,
    color: String
	}
}
</script>

<template>
	<svg 
    v-if="star == 'full'"
    :style = "{color: color}" 
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"/></svg>
  <svg
    v-if="star == 'half'"
    :style = "{color: color}"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4V6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"/></svg>
  <svg
    v-if="star == 'empty'" 
    :style = "{color: color}"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"/></svg>
</template>
