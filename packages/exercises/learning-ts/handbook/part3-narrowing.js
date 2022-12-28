"use strict";
// 1. narrowing
{
    function padLeft(padding, input) {
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
    function printAll(strs) {
        if (typeof strs === 'object') {
            for (const s of strs) {
                console.log(s);
                // 'strs' is possibly 'null'
            }
        }
        else if (typeof strs === 'string') {
            console.log(strs);
        }
        else {
            // do nothing
        }
    }
}
