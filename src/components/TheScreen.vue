<script setup lang="ts">
export interface Props {
  text?: string
  error?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
  error: false
})
</script>

<template>
  <div class="relative flex justify-end items-center px-5 text-white rounded-lg bg-gray-600">
    <div class="relative h-9 overflow-hidden text-right">
      <div v-if="!text" class="absolute top-0 right-0 w-1 h-full bg-gray-400 animate-pulse" />
      <span v-if="!error" class="float-right whitespace-pre pr-2">
        {{ text }}
      </span>
      <span v-else class="float-right whitespace-nowrap text-red-400 pr-5">
        Invalid expression
      </span>
    </div>
  </div>
</template>