<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue"
import { useCalculate } from "../use/useCalculate"
import { useKeyboard } from "../use/useKeyboard"
import { DIGITS, OPERATORS, RESULT_KEYS, CLEAR_KEYS, ERASE_KEYS } from "../models/constants"
import TheScreen from '../components/TheScreen.vue'
import TheButton from '../components/TheButton.vue'

const { memory, error, addDigit, addOperator, calculateResult, eraseLast, clear } = useCalculate()
const { addListener, removeAllListeners } = useKeyboard()

onMounted(() => addListener((e) => {
    const key = e.key === "," ? "." : e.key

    if (DIGITS.includes(key)) addDigit(key)
    if (OPERATORS.includes(key)) addOperator(key)
    if (RESULT_KEYS.includes(key)) calculateResult()
    if (ERASE_KEYS.includes(key)) eraseLast()
    if (CLEAR_KEYS.includes(key)) clear()
  })
)

onBeforeUnmount(() => removeAllListeners())
</script>

<template>
  <div class="grid grid-rows-6 grid-cols-4 gap-2 w-full sm:max-w-sm h-screen sm:h-auto sm:my-10 p-3 pt-6 sm:rounded-lg bg-black shadow-xl border border-teal-500">
    <TheScreen 
      :text="memory" 
      :error="error" 
      class="col-span-4" 
    />
    <TheButton 
      type="green" 
      @click="clear"
    >
      AC
    </TheButton>
    <TheButton 
      class="col-span-2" 
      type="blue" 
      @click="eraseLast"
    >
      DEL
    </TheButton>
    <TheButton 
      type="blue" 
      @click="addOperator('/')"
    >
      /
    </TheButton>
    <TheButton 
      v-for="number in ['7', '8', '9']" 
      :key="number" 
      @click="addDigit(number)"
    >
      {{ number }}
    </TheButton>

    <TheButton 
      type="blue" 
      @click="addOperator('*')"
    >
      *
    </TheButton>
    <TheButton 
      v-for="number in ['4', '5', '6']" 
      :key="number" 
      @click="addDigit(number)"
    >
      {{ number }}
    </TheButton>
    <TheButton 
      type="blue" 
      @click="addOperator('-')"
    >
      -
    </TheButton>
    <TheButton 
      v-for="number in ['1', '2', '3']" 
      :key="number" 
      @click="addDigit(number)"
    >
      {{ number }}
    </TheButton>
    <TheButton 
      type="blue" 
      @click="addOperator('+')"
    >
      +
    </TheButton>
    <TheButton 
      class="col-span-2" 
      @click="addDigit('0')"
    >
      0
    </TheButton>
    <TheButton 
      @click="addDigit('.')"
    >
      .
    </TheButton>
    <TheButton 
      type="blue" 
      @click="calculateResult"
    >
      =
    </TheButton>
  </div>
</template>
