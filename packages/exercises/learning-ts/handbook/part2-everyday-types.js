"use strict";
// 1. any 类型
{
    let obj = { x: 0 };
    obj.foo();
    obj();
    obj.bar = 100;
    obj = 'hello';
    const n = obj;
}
// 2. 函数参数类型注释
{
    function greet(name) {
        console.log('Hello, ' + name.toUpperCase() + '!!');
    }
    greet(42);
    // Argument of type 'number' is not assignable to parameter of type 'string'.
}
// 3. 函数返回值类型注释
{
    function getFavoriteNumber() {
        return 26;
    }
}
// 4. 自动推测匿名函数参数类型，即上下文类型推断
{
    const names = ['Alice', 'Bob', 'Eve'];
    names.forEach(function (s) {
        console.log(s.toUppercase());
    });
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
    names.forEach((s) => {
        console.log(s.toUppercase());
    });
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
}
// 5. 对象类型
{
    function printCoord(pt) {
        console.log(`The coordinate's x value is ${pt.x}`);
        console.log(`The coordinate's y value is ${pt.y}`);
    }
    printCoord({ x: 3, y: 7 });
}
// 6. 可选属性
{
    function printName(obj) {
        var _a, _b;
        console.log(obj.last.toUpperCase());
        // 'obj.last' is possibly 'undefined'.
        console.log((_b = (_a = obj.last) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a));
    }
    printName({ first: 'Bob' });
    printName({ first: 'Alice', last: 'Alisson' });
}
// 7. 联合类型
{
    function printId(id) {
        console.log('Your ID is: ', id);
        console.log('Your ID is: ', id.toUpperCase());
        /*
          Property 'toUpperCase' does not exist on type 'string | number'.
          Property 'toUpperCase' does not exist on type 'number'.
        */
    }
    printId(101);
    printId('202');
    printId({ myID: 22342 });
    // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.s
}
// 8. 收窄类型
{
    function printId(id) {
        if (typeof id === 'string') {
            console.log(id.toUpperCase());
            // (parameter) id: string
        }
        else {
            console.log(id);
            // (parameter) id: number
        }
    }
    function welcomePeople(x) {
        if (Array.isArray(x)) {
            console.log(`Hello, ${x.join(' and ')}`);
            // (parameter) x: string[]
        }
        else {
            console.log(`Welcome lone traveler ${x}`);
            // (parameter) x: string
        }
    }
    function gerFirstThree(x) {
        return x.slice(0, 3);
        // (parameter) x: string | number[]
    }
}
// 9. 类型别名
{
    function sanitizeInput(str) {
        return str;
    }
    let userInput = sanitizeInput('input');
    // UserInputSanitizedString 只是 type 类型的别名
    userInput = 'new input';
}
// 10. 接口
{
    function printCoord(pt) {
        console.log(`The coordinate's x value is ${pt.x}`);
        console.log(`The coordinate's y value is ${pt.y}`);
    }
    printCoord({ x: 100, y: 100 });
}
// 11. 接口可以扩展或修改，类型不能直接扩展也不可以修改
// 扩展接口
{
    const bear = {
        name: '',
        honey: true,
    };
}
// 使用并集扩展类型
{
    const bear = {
        name: '',
        honey: true,
    };
}
// 修改接口
{
    const animal = {
        name: '',
        honey: true,
    };
}
// 修改类型
{
    // Duplicate identifier 'Animal'.
}
// 12. 类型断言
{
    const myCanvas = document.getElementById('main_canvas');
}
// 尖括号语法不能在 .tsx 中使用
{
    const myCanvas = document.getElementById('main_canvas');
}
// 禁止不可能的断言（断言类型与推测类型没有交集）
{
    const x = 'hello';
    // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
}
// 可以使用两次断言绕过上述规则
{
    const x = 'hello';
}
// 13. 字面量类型
{
    let changingString = 'Hello World';
    changingString = 'new String';
    // let changingString: string
    const constantString = 'Hello World';
    // const constantString: "Hello World"
    let num = 1;
    num = 2;
    // Type '2' is not assignable to type '1'.
    function printText(s, alignment) { }
    printText('Hello World', 'left');
    printText('Hello World', 'centre');
    function configure(x) { }
    configure({ width: 100 });
    configure('auto');
    configure('automatic');
    // Argument of type '"automatic"' is not assignable to parameter of type '"auto" | Option'.
}
// 14. 对象的字面量类型
{
    function handleRequest(url, method) { }
    const req = { url: 'https://example.com', method: 'GET' };
    handleRequest(req.url, req.method);
}