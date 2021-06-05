import { tsAssertTypeAcceptsValue, tsAssertTypesExactlyEqual, tsAssertExtends, tsAssertStrictExtends } from '../../source/assert';

type T1 = { a: string; b: string | number };

const x = tsAssertTypeAcceptsValue()<T1>()(
	{ a: 'adfasdf', b: 123 } as const
);

tsAssertTypesExactlyEqual()<typeof x>()<{ a: 'adfasdf'; b: 123 }>();
tsAssertExtends()<typeof x>()<T1>();
tsAssertStrictExtends()<typeof x>()<T1>();

// @ts-expect-error
tsAssertTypesExactlyEqual()<typeof x>()<T1>();
// @ts-expect-error
tsAssertExtends()<T1>()<typeof x>();
// @ts-expect-error
tsAssertStrictExtends()<T1>()<typeof x>();

const y = tsAssertTypeAcceptsValue()<T1>()(
	{ a: 'adfasdf', b: 123 }
);

tsAssertTypesExactlyEqual()<typeof y>()<{ a: string; b: number }>();
tsAssertExtends()<typeof y>()<T1>();
tsAssertStrictExtends()<typeof y>()<T1>();

// @ts-expect-error
tsAssertTypesExactlyEqual()<typeof y>()<T1>();
// @ts-expect-error
tsAssertExtends()<T1>()<typeof y>();
// @ts-expect-error
tsAssertStrictExtends()<T1>()<typeof y>();
