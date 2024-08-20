<script setup>
  const props = defineProps({
    modelValue: { type: String, default: '' },
    label: {type: String, required: true},
    inputType: {type: String, default: 'text'},
    placeholder: String,
    required: {type: Boolean, default: false},
  });

  // const emit = defineEmits(['onInput']);

  // const onInputValue = (e) => {
  //   emit('onInput', e);
  // }
</script>

<template>
  <div class='label_field_holder'>
    <label :for='label'>{{label}}</label>
    <input 
      :type='inputType' 
      :placeholder='placeholder' 
      :id='label' class='input' 
      v-bind="$attrs" 
      :value='modelValue' 
      @input='$emit("update:modelValue", $event.target.value)' 
    />
    <!-- <input :type='inputType' :placeholder='placeholder' @input='onInputValue' :id='label' class='input' v-bind="$attrs" /> -->
  </div>
</template>

<style>
  .label_field_holder{
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  label{
    margin-bottom: 5px;
    font-size: 18px;
  }
  .input{
    padding: 7px;
    border: 0px;
    border-radius: 6px;
    font-size: 16px;
  }
</style>