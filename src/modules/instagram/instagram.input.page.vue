<template>
<van-nav-bar
  title="Add content"
  left-text="Back"
  left-arrow
  @click-left="onClickLeft"
/>

</template>

<script setup lang="ts">
  const onClickLeft = () => history.back();
</script>
