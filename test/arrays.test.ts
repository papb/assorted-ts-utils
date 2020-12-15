import { tsAssertTrue } from '../source/assert';
import { ParseArray, StrictEqual } from '../source';

tsAssertTrue<
	StrictEqual<
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
	>
>();

tsAssertTrue<
	StrictEqual<
		ParseArray<[Date, string, number, null]>,
		{
			isReadonly: false;
			first: Date;
			last: null;
			minLength: 4;
			maxLength: 4;
			tuplePrefix: [Date, string, number, null];
			arrayTail: [];
		}
	>
>();

tsAssertTrue<
	StrictEqual<
		ParseArray<readonly boolean[]>,
		{
			isReadonly: true;
			first: boolean | undefined;
			last: boolean;
			minLength: 0;
			maxLength: undefined;
			tuplePrefix: readonly [];
			arrayTail: readonly boolean[];
		}
	>
>();

tsAssertTrue<
	StrictEqual<
		ParseArray<[]>,
		{
			isReadonly: false;
			first: undefined;
			last: undefined;
			minLength: 0;
			maxLength: 0;
			tuplePrefix: [];
			arrayTail: [];
		}
	>
>();
