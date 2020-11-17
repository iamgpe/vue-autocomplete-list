<template>
  <div>
    <h1>Vue Autocomplete List</h1>
    <vue-autocomplete-list
      :items="fakeItems"
      :searchKey="'name'"
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

</style>