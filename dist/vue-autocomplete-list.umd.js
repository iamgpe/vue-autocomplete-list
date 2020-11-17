(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueAutocompleteList = {}, global.vue));
}(this, (function (exports, vue) { 'use strict';

  var script = {
    name: 'vue-autocomplete-list',
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
      list: function list () {
        return this.items.map(function (item) {
          item.fakeItemName = item.name;

          return item
        })
      }
    },
    data: function () { return ({
      searchedValue: '',
      timer: null,
      occurrences: false,
      watchChanges: true
    }); },
    methods: {
      showItems: function showItems () {
        if (this.immediateDropdown && ['none', false].includes(this.occurrences)) {
          if (this.searchedValue != '') {
            this.setSearchedValue(this.searchedValue);
          } else {
            this.occurrences = this.list;
          }
        }
      },
      setSearchedValue: function setSearchedValue (value) {
        this.searchedValue = value;
        this.occurrences = false;
        this.watchChanges = false;
      }
    },
    watch: {
      'searchedValue': {
        handler: function handler (searchedValue) {
          var this$1 = this;

          clearTimeout(this.timer);

          if (!this.watchChanges) {
            this.watchChanges = true;
          } else {
            searchedValue = searchedValue.toLowerCase().trim();

            if (searchedValue == '') {
              this.occurrences = false;
            } else {
              this.timer = setTimeout(function () {
                var occurrences = this$1.list.filter(function (item) { return item[this$1.searchKey].toLowerCase().includes(searchedValue); });

                this$1.occurrences = occurrences.length > 0 ? occurrences.map(function (item) {
                  item.fakeItemName = item[this$1.searchKey].replace(new RegExp(searchedValue, 'ig'), '<b>$&</b>');

                  return item
                }) : 'none';

              }, this.debounceTimer);
            }
          }
        }
      }
    }
  };

  var _hoisted_1 = {
    key: 0,
    class: "items"
  };
  var _hoisted_2 = {
    key: 1,
    class: "items"
  };
  var _hoisted_3 = { class: "none" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", {
      class: ["vue-autocomplete-list-searchbar", { 'default': $props.defaultstyle }]
    }, [
      vue.withDirectives(vue.createVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (_ctx.searchedValue = $event); }),
        placeholder: $props.placeholder,
        onClick: _cache[2] || (_cache[2] = function ($event) { return ($options.showItems()); })
      }, null, 8 /* PROPS */, ["placeholder"]), [
        [vue.vModelText, _ctx.searchedValue]
      ]),
      (_ctx.occurrences && _ctx.occurrences != 'none')
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.occurrences, function (item, i) {
              return (vue.openBlock(), vue.createBlock("span", {
                key: i,
                onClick: function ($event) { return ($options.setSearchedValue(item[$props.searchKey])); },
                innerHTML: item.fakeItemName
              }, null, 8 /* PROPS */, ["onClick", "innerHTML"]))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : vue.createCommentVNode("v-if", true),
      (_ctx.occurrences == 'none')
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
            vue.createVNode("span", _hoisted_3, vue.toDisplayString($props.errorMessage), 1 /* TEXT */)
          ]))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */))
  }

  script.render = render;
  script.__file = "src/vue-autocomplete-list.vue";

  function install(Vue) {
    if (install.installed) { return; }

    install.installed = true;

    Vue.component('vue-autocomplete-list', script);
  }

  var plugin = { install: install };
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = script;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
