import { ref, readonly } from "vue"
import { OPERATORS, DIGITS } from "../models/constants"

export const useCalculate = () => {
  const memory = ref("")
  const error = ref(false)
  const clearOnNextDigit = ref(false)

  const isOperator = (string: string) => OPERATORS.includes(string)

  const isDigit = (string: string) => DIGITS.includes(string)

  const lastCharIsOperator = (string: string) => {
    const stringNormalized = string.replace(/\s/g, "")
    return isOperator(stringNormalized[stringNormalized.length - 1])
  }

  const addDigit = (digit: string) => {
    if (!isDigit(digit)) {
      throw new Error("Invalid param, is not a valid digit")
    }

    const lastDigit = memory.value[memory.value.length - 1]

    if (lastDigit === "." && digit === ".") return
    if (lastDigit === "0" && memory.value.length === 1) clear()
    if (clearOnNextDigit.value) clear()
    if ((!memory.value || lastCharIsOperator(memory.value)) && digit === ".") memory.value += "0"

    clearOnNextDigit.value = false
    memory.value += `${digit}`
  }

  const addOperator = (operator: string) => {
    if (!isOperator(operator)) {
      throw new Error("Invalid param, is not a valid operator")
    }

    if (!memory.value && operator !== "-") return
    if (lastCharIsOperator(memory.value)) eraseLast()

    clearOnNextDigit.value = false
    memory.value += `${operator}`
  }

  const calculateResult = () => {
    if (!memory.value) return

    if (lastCharIsOperator(memory.value)) {
      memory.value = memory.value.slice(0, memory.value.length - 1)
    }

    try {
      const mathExpression = memory.value.replace(/\b0*((\d+\.\d+|\d+))\b/g, "$1")
      memory.value = `${eval(mathExpression)}`
    } catch (_) {
      error.value = true
      memory.value = ""
    } finally {
      clearOnNextDigit.value = true
    }
  }

  const eraseLast = () => {
    if (!memory.value.length) return

    memory.value = memory.value.slice(0, memory.value.length - 1)
    clearOnNextDigit.value = false
  }

  const clear = () => {
    memory.value = ""
    error.value = false
  }

  return {
    memory: readonly(memory),
    error: readonly(error),
    addDigit,
    addOperator,
    calculateResult,
    eraseLast,
    clear
  }
}
