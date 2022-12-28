// 1. any 类型
{
  let obj: any = { x: 0 };
  obj.foo();
  obj();
  obj.bar = 100;
  obj = 'hello';
  const n: number = obj;
}

// 2. 函数参数类型注释
{
  function greet(name: string) {
    console.log('Hello, ' + name.toUpperCase() + '!!');
  }
  greet(42);
  // Argument of type 'number' is not assignable to parameter of type 'string'.
}

// 3. 函数返回值类型注释
{
  function getFavoriteNumber(): number {
    return 26;
  }
}

// 4. 自动推测匿名函数参数类型，即上下文类型推断
{
  const names = ['Alice', 'Bob', 'Eve'];

  names.forEach((s) => {
    console.log(s.toUppercase());
  });
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
}

// 5. 对象类型
{
  function printCoord(pt: { x: number; y: number }) {
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
  }
  printCoord({ x: 3, y: 7 });
}

// 6. 可选属性
{
  function printName(obj: { first: string; last?: string }) {
    console.log(obj.last.toUpperCase());
    // 'obj.last' is possibly 'undefined'.
    console.log(obj.last?.toUpperCase?.());
  }

  printName({ first: 'Bob' });
  printName({ first: 'Alice', last: 'Alisson' });
}

// 7. 联合类型
{
  function printId(id: number | string) {
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
  // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
}

// 8. 收窄类型
{
  function printId(id: number | string) {
    if (typeof id === 'string') {
      console.log(id.toUpperCase());
      // (parameter) id: string
    } else {
      console.log(id);
      // (parameter) id: number
    }
  }

  function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      console.log(`Hello, ${x.join(' and ')}`);
      // (parameter) x: string[]
    } else {
      console.log(`Welcome lone traveler ${x}`);
      // (parameter) x: string
    }
  }

  function gerFirstThree(x: number[] | string) {
    return x.slice(0, 3);
    // (parameter) x: string | number[]
  }
}

// 9. 类型别名
{
  type UserInputSanitizedString = string;

  function sanitizeInput(str: string): UserInputSanitizedString {
    return str;
  }

  let userInput = sanitizeInput('input');
  // let userInput: string

  // UserInputSanitizedString 只是 string 类型的别名
  userInput = 'new input';
}

// 10. 接口
{
  interface Point {
    x: number;
    y: number;
  }

  function printCoord(pt: Point) {
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
  }

  printCoord({ x: 100, y: 100 });
}

// 11. 接口可以扩展或修改，类型不能直接扩展也不可以修改
// 扩展接口
{
  interface Animal {
    name: string;
  }

  interface Bear extends Animal {
    honey: boolean;
  }

  const bear: Bear = {
    name: '',
    honey: true,
  };
}
// 使用并集扩展类型
{
  type Animal = {
    name: string;
  };

  type Bear = Animal & {
    honey: boolean;
  };

  const bear: Bear = {
    name: '',
    honey: true,
  };
}
// 修改接口
{
  interface Animal {
    name: string;
  }
  interface Animal {
    honey: boolean;
  }
  const animal: Animal = {
    name: '',
    honey: true,
  };
}
// 不能修改类型
{
  type Animal = {
    name: string;
  };
  type Animal = {
    honey: boolean;
  };
  // Duplicate identifier 'Animal'.
}

// 12. 类型断言
{
  const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
}
// 尖括号语法不能在 .tsx 中使用
{
  const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
}
// 禁止不可能的断言（断言类型与推测类型没有交集）
{
  const x = 'hello' as number;
  // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
}
// 可以使用两次断言绕过上述规则
{
  const x = 'hello' as any as number;
}

// 13. 字面量类型
{
  let changingString = 'Hello World';
  changingString = 'new String';
  // let changingString: string

  const constantString = 'Hello World';
  // const constantString: "Hello World"

  let num: 1 = 1;
  num = 2;
  // Type '2' is not assignable to type '1'.

  function printText(s: string, alignment: 'left' | 'right' | 'center') {}
  printText('Hello World', 'left');
  printText('Hello World', 'centre');
  // Argument of type '"centre"' is not assignable to parameter of type '"center" | "left" | "right"'.

  interface Option {
    width: number;
  }

  function configure(x: Option | 'auto') {}

  configure({ width: 100 });
  configure('auto');
  configure('automatic');
  // Argument of type '"automatic"' is not assignable to parameter of type '"auto" | Option'.
}

// 14. 对象属性默认不会被认为是字面量类型
{
  function handleRequest(url: string, method: 'GET' | 'POST') {}

  const req = { url: 'https://example.com', method: 'GET' };
  /*
    const req: {
        url: string;
        method: string;
    }
  */

  handleRequest(req.url, req.method);
  // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
}
// 将变量类型固化为字面量类型
{
  function handleRequest(url: string, method: 'GET' | 'POST') {}

  const req = { url: 'https://example.com', method: 'GET' as const };
  /*
    const req: {
        readonly url: "https://example.com";
        readonly method: "GET";
    }
  */

  handleRequest(req.url, req.method);
}

// 15. 空值检查（开启 strictNullChecks 时）
{
  function doSomeThing(x: string | null) {
    if (x === null) {
      // 收窄
    } else {
      console.log(`Hello ${x.toUpperCase()}`);
    }
  }
}

// 16. 非空断言
{
  function liveDangerously(x?: number | null) {
    console.log(x.toFixed());
    // 'x' is possibly 'null' or 'undefined'.

    console.log(x!.toFixed());
  }
}

// 17. 枚举
{
  enum UserResponse {
    No = 0,
    Yes = 1,
  }

  function respond(recipient: string, message: UserResponse): void {}

  respond('Princess Caroline', UserResponse.Yes);
}

// 18. bigint
{
  const oneHundred: bigint = BigInt(100);

  const anotherHundred: bigint = 100n;
}

// 19. symbol
{
  const firstName = Symbol('name');
  // unique symbol
  const secondName = Symbol('name');
  // unique symbol
  if (firstName === secondName) {
    // This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
  }
}
