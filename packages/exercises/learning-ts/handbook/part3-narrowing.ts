// 1. narrowing
{
  function padLeft(padding: number | string, input: string) {
    if (typeof padding === 'number') {
      // (parameter) padding: number
      return ' '.repeat(padding) + input;
    }
    // (parameter) padding: string
    return padding + input;
  }
}
// 2. narrowing
{
  function printAll(strs: string | string[] | null) {
    if (typeof strs === 'object') {
      for (const s of strs) {
        console.log(s);
        // 'strs' is possibly 'null'
      }
    } else if (typeof strs === 'string') {
      console.log(strs);
    } else {
      // do nothing
    }
  }
}
