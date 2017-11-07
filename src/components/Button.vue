<template>
  <button @click="onClick">{{ helpText }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    helpText: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
button {
  font-size: 20px;
  background-color: transparent;
  padding: 10px 20px;
  color: #ffffff;
  border: 2px solid white;
  cursor: pointer;
  transition: all .2s ease-in-out;
  outline: none;
  margin: 10px auto;
}
button:hover {
    background-color: #424242;
}
</style>