// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (fn: Function, ms: number) => {
    let timer: any = null
    const debounced = (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
        clearTimeout(timer)
      }, ms)
    }
    return debounced
  }
  
  export default debounce
  