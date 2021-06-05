# @papb/assorted-ts-utils ![Build Status](https://github.com/papb/assorted-ts-utils/workflows/CI/badge.svg)

> Personal collection of assorted TypeScript utility types


## Highlights

* `StrictEqual<A, B>`
* `IfAny<T, ThenType, ElseType>`
* `IfUnknown<T, ThenType, ElseType>`
* `IfNever<T, ThenType, ElseType>`
* `ParseArray<A, B>`
* `SetKeyType<BaseType, Key, NewType, AsOptional>`
* `ReplaceKeyType<BaseType, Key, NewType, AsOptional>`


## Install

```
$ npm install @papb/assorted-ts-utils
```


## Usage

```ts
import {
	StrictEqual,
	ReplaceKeyType,
	ParseArray,
	ReplaceAllTypeOccurrences,
	IfAny,
	IfNever
} from '@papb/assorted-ts-utils';

import {
	tsAssertTrue,
	tsAssertTypeAcceptsValue,
	tsAssertTypesExactlyEqual,
	tsAssertExtends
} from '@papb/assorted-ts-utils/assert';

type T1 = StrictEqual<{ a: 1 }, { a: 1 }>;
//=> type T1 = true

type T2 = StrictEqual<{ a: 1 }, { a: 1; b: undefined }>;
//=> type T2 = false

type T3 = ReplaceKeyType<
	{ foo: string; bar: number },
	'bar',
	Date,
	true
>;
//=> type T3 = { foo: string; bar?: Date }

type T4 = StrictEqual<
	ParseArray<readonly [string, Date, number, null, ...boolean[]]>,
	{
		isReadonly: true;
		first: string;
		last: boolean;
		minLength: 4;
		maxLength: undefined;
		tuplePrefix: readonly [string, Date, number, null];
		arrayTail: readonly boolean[];
	}
>;
//=> type T4 = true

tsAssertTrue<T4>(); // Compiles without error
tsAssertTrue<T2>(); // Does not compile

type T5 = ReplaceAllTypeOccurrences<
	{ foo: string; bar: () => string },
	string,
	number
>;
//=> type T5 = { foo: number; bar: () => number }

type T6 = IfAny<any, 'hello', 'world'>;
//=> type T6 = 'hello';

type T7 = IfAny<unknown, 'hello', 'world'>;
//=> type T7 = 'world';

type T8 = IfNever<1 & 2, 'hello', 'world'>;
//=> type T8 = 'hello';

type T9 = { a: string; b: string | number };
const someValue =
	tsAssertTypeAcceptsValue()<T9>()(
		// Autocomplete for `a` and `b` available on the object below
		{ a: 'hello', b: 123 } as const
	);
tsAssertTypesExactlyEqual()<typeof someValue>()<{ a: 'hello'; b: 123 }>();
tsAssertExtends()<typeof someValue>()<T9>();
```


## Documentation

TODO


## License

MIT © [Pedro Augusto de Paula Barbosa](https://github.com/papb)
