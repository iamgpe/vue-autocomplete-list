<template>
  <div class="vue-autocomplete-list-searchbar" :class="{ default: defaultstyle }">
    <input type="text" v-model="searchedValue" :placeholder="placeholder" @click="showItems()">
    <div class="items" v-if="occurrences && occurrences != 'none'">
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
    immediateDropdown: {
      type: Boolean,
      default: false
    },
    debounceTimer: {
      type: Number,
      default: 500
    },
    errorMessage: {
      type: String,
      default: 'Aucune occurrence trouvée'
    },
    defaultstyle: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Rechercher quelque chose..'
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
    occurrences: false,
    watchChanges: true
  }),
  methods: {
    showItems () {
      if (this.immediateDropdown && ['none', false].includes(this.occurrences)) {
        if (this.searchedValue != '') {
          this.setSearchedValue(this.searchedValue)
        } else {
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

<style type="css">
.vue-autocomplete-list-searchbar.default {
  width: 100%;
  box-sizing: border-box;
}

.vue-autocomplete-list-searchbar.default input {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
}

.vue-autocomplete-list-searchbar.default .items {
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  max-height: 200px;
  box-sizing: border-box;
  overflow: auto;
  flex-direction: column;
  display: flex;
  border: 1px solid #ccc;
  border-top: none;
}

.vue-autocomplete-list-searchbar.default .items > span {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
}

.vue-autocomplete-list-searchbar.default .items > span:not(:first-child) {
  border-top: 1px solid #ccc;
}
</style>