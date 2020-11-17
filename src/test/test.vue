<template>
  <div>
    <h1>Vue Autocomplete List</h1>
    <h2>Without dropdown</h2>
    <vue-autocomplete-list
      :items="fakeItems"
      :searchKey="'name'"
    ></vue-autocomplete-list>
    <h2>With immediate dropdown</h2>
    <vue-autocomplete-list
      :items="fakeItems"
      :searchKey="'name'"
      :immediateDropdown="true"
    ></vue-autocomplete-list>
  </div>
</template>

<script>
import vueAutocompleteList from '../vue-autocomplete-list.vue'
import fakeItems from './fakeItems.json'

export default {
  components: {
    'vue-autocomplete-list': vueAutocompleteList
  },
  data: () => ({
    fakeItems: fakeItems
  })
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>