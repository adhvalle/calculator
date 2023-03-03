const EVENT_NAME = "keydown"

export const useKeyboard = () => {
  const listeners = [] as ((e: KeyboardEvent) => void)[]

  const addListener = (listener: (e: KeyboardEvent) => void) => {
    const listenerIndex = listeners.length
    listeners.push(listener)
    window.addEventListener(EVENT_NAME, listener)
    return listenerIndex
  }

  const removeAllListeners = () => {
    listeners.forEach((listener) => {
      window.removeEventListener(EVENT_NAME, listener)
    })
  }

  return { addListener, removeAllListeners }
}
