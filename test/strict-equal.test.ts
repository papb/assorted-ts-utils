import { tsAssertTrue, tsAssertFalse } from '../source/assert';
import { StrictEqual } from '../source';

tsAssertTrue<StrictEqual<any, any>>();
tsAssertTrue<StrictEqual<unknown, unknown>>();
tsAssertTrue<StrictEqual<never, never>>();
tsAssertTrue<StrictEqual<() => number, (this: unknown) => number>>();
tsAssertTrue<StrictEqual<{ a: 1; b: 2 }, { a: 1 } & { b: 2 }>>();

tsAssertFalse<StrictEqual<number, any>>();
tsAssertFalse<StrictEqual<unknown, any>>();
tsAssertFalse<StrictEqual<never, any>>();

tsAssertFalse<StrictEqual<() => any, () => void>>();
tsAssertFalse<StrictEqual<{ a: string; bar?: undefined }, { a: string }>>();
tsAssertFalse<StrictEqual<() => void, (this: Date) => void>>();
tsAssertFalse<StrictEqual<() => number, (this: any) => number>>();
tsAssertFalse<StrictEqual<(this: unknown) => number, (this: any) => number>>();

tsAssertFalse<
	StrictEqual<
		() => { a?: () => { a: [{ b: [string, { c: string }] }] } },
		() => { a?: () => { a: [{ b: [string, { c: string; d?: number }] }] } }
	>
>();
