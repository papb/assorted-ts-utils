import { tsAssertTrue } from '../source/assert';
import { StrictEqual, ReplaceAllTypeOccurrences } from '../source';

tsAssertTrue<
	StrictEqual<
		ReplaceAllTypeOccurrences<{ foo: string; bar: () => string }, string, number>,
		{ foo: number; bar: () => number }
	>
>();
