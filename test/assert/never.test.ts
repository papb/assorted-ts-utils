import { tsAssertNever } from '../../source/assert';


declare const neverValue: never;
tsAssertNever<never>();
tsAssertNever(neverValue);
tsAssertNever(0 as unknown as never);


// @ts-expect-error
tsAssertNever<void>();
// @ts-expect-error
tsAssertNever<undefined>();
// @ts-expect-error
tsAssertNever<boolean>();
// @ts-expect-error
tsAssertNever<{}>();
// @ts-expect-error
tsAssertNever<unknown>();
// @ts-expect-error
tsAssertNever<any>();


// @ts-expect-error
tsAssertNever(undefined);
// @ts-expect-error
tsAssertNever(null);
// @ts-expect-error
tsAssertNever({});
