<script setup lang="ts">
import { computed, type PropType } from 'vue';
export type Type = 'green' | 'grey' | 'blue'

export interface Props {
  type: Type
}

const props = defineProps({ 
  type: {
    type: String as PropType<Type>,
    default: 'gray'
  }
})

const bgClasses = computed(() => {
  if (props.type === 'blue') return 'bg-sky-600 hover:bg-sky-500'
  return props.type === 'green' ? 'bg-teal-600 hover:bg-teal-500' : 'bg-gray-600 hover:bg-gray-500'
}
)

</script>

<template>
  <button
    class="sm:h-24 px-4 py-2 text-gray-200 font-bold rounded-lg focus:outline-none transition-colors"
    :class="bgClasses"
    @keydown.enter.prevent
    @keydown.space.prevent
  >
    <slot></slot>
  </button>
</template>
