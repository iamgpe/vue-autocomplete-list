<template>
  <div class="vue-autocomplete-list-searchbar">
    <input type="text" v-model="searchedValue"/>
    <div class="items" ref="items" v-if="occurrences && occurrences != 'none'">
      <span v-for="(item, i) in occurrences" :key="i" @click="setSearchedValue(item[searchKey])" v-html="item.fakeItemName"></span>
    </div>
    <div class="items" v-if="occurrences == 'none'">
      <span class="none">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    searchKey: {
      type: String,
      default: 'name'
    },
    type: {
      type: String,
      default: 'dropdown'
    },
    debounceTimer: {
      type: Number,
      default: 500
    },
    errorMessage: {
      type: String,
      default: 'Aucune occurrence trouvée'
    }
  },
  computed: {
    list () {
      return this.items.map(item => {
        item.fakeItemName = item.name

        return item
      })
    }
  },
  data: () => ({
    searchedValue: '',
    timer: null,
    occurrences: [],
    watchChanges: true
  }),
  methods: {
    showItems () {
      if (this.type == 'dropdown') {
        if (['none', false].includes(this.occurrences)) {
          this.occurrences = this.list
        }
      }
    },
    setSearchedValue (value) {
      this.searchedValue = value
      this.occurrences = false
      this.watchChanges = false
    }
  },
  watch: {
    'searchedValue': {
      handler (searchedValue) {
        clearTimeout(this.timer)

        if (!this.watchChanges) {
          this.watchChanges = true
        } else {
          searchedValue = searchedValue.toLowerCase().trim()

          if (searchedValue == '') {
            this.occurrences = false
          } else {
            this.timer = setTimeout(() => {
              let occurrences = this.list.filter(item => item[this.searchKey].toLowerCase().includes(searchedValue))

              this.occurrences = occurrences.length > 0 ? occurrences.map(item => {
                item.fakeItemName = item[this.searchKey].replace(new RegExp(searchedValue, 'ig'), '<b>$&</b>')

                return item
              }) : 'none'

            }, this.debounceTimer)
          }
        }
      }
    }
  }
}
</script>

<style>

</style>