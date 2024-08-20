<script setup>
  const props = defineProps({
    text: {type: String, required: true},
    btnType: {type: String, default: 'button'},
  });
</script>

<template>
  <input :type='btnType' class='btn' :value='text' v-bind="$attrs" />
</template>

<style>
  .btn{
    padding: 6px;
    border: 0px;
    border-radius: 5px;
  }
  .btn:hover{
    translate: 0px -2px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: 0.2s;
  }
  .btn:active{
    translate: 0px 0px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 0px 5px 0 rgba(0, 0, 0, 0.19);
    transition: 0.1s;
  }
</style>