<script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    }
  });
</script>

<template>
  <div class='loader_container' v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
  .loader_container{
    height: 100dvh;
    width: 100%;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(37,37,37,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #5c5e5f; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>