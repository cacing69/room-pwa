<template>
<van-nav-bar
  title="Content detail"
  left-text="Back"
  left-arrow
  @click-left="onClickLeft"
/>

</template>

<script setup lang="ts">
  const onClickLeft = () => history.back();
</script>
