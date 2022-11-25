"use strict";
// 1. 在运行代码前发现错误
{
    const message = 'Hello World!';
    message();
    /*
      This expression is not callable.
      Type 'String' has no call signatures.
    */
}
// 2. 合法的 js 代码也会引发 ts 报错，比 js 更严格
{
    const user = {
        name: 'Tad',
        age: 25,
    };
    user.location;
    // Property 'location' does not exist on type '{ name: string; age: number; }'.
}
// 3. 帮助检查拼写错误
{
    const announcement = 'Hello World!';
    // How quickly can you spot the typos?
    announcement.toLocaleLowercase();
    // Property 'toLocaleLowercase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?
    announcement.toLocalLowerCase();
    // Property 'toLocalLowerCase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?
    // We probably meant to write this...
    announcement.toLocaleLowerCase();
    function flipCoin() {
        // Meant to be Math.random()
        return Math.random < 0.5;
        // Operator '<' cannot be applied to types '() => number' and 'number'.
    }
}
// 4. 帮助检查逻辑错误
{
    const value = Math.random() < 0.5 ? 'a' : 'b';
    if (value !== 'a') {
        // ...
    }
    else if (value === 'b') {
        // This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.
    }
}
// 5. 帮助检查传参错误
{
    function greet(person, date) {
        console.log(`Hello ${person}, today is ${date}!`);
    }
    greet('Brendan');
    /*
      Expected 2 arguments, but got 1.
      An argument for 'date' was not provided.
    */
}
// 6. 明确指定参数类型，避免不合法的参数误传
{
    const greet = function (person, date) {
        console.log(`Hello ${person}, today is ${date.toDateString()}!`);
    };
    greet('Tad', Date());
    // Argument of type 'string' is not assignable to parameter of type 'Date'
    greet('Tad', new Date());
}
