
<template>
    <van-sticky>
        <van-nav-bar
        title="Excel engine"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
        />
    </van-sticky>
    <van-row gutter="10" style="padding:3vw;">
        this is excel engine
    </van-row>
</template>
<script setup lang="ts">
    const onClickLeft = () => history.back();
</script>
