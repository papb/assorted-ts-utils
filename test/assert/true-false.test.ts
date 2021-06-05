import { tsAssertTrue, tsAssertFalse } from '../../source/assert';


tsAssertTrue<true>();
tsAssertFalse<false>();


// @ts-expect-error
tsAssertTrue();
// @ts-expect-error
tsAssertTrue<never>();
// @ts-expect-error
tsAssertTrue<void>();
// @ts-expect-error
tsAssertTrue<undefined>();
// @ts-expect-error
tsAssertTrue<boolean>();
// @ts-expect-error
tsAssertTrue<{}>();
// @ts-expect-error
tsAssertTrue<unknown>();
// @ts-expect-error
tsAssertTrue<any>();


// @ts-expect-error
tsAssertTrue(true);
// @ts-expect-error
tsAssertTrue(true as const);


// @ts-expect-error
tsAssertFalse();
// @ts-expect-error
tsAssertFalse<never>();
// @ts-expect-error
tsAssertFalse<void>();
// @ts-expect-error
tsAssertFalse<undefined>();
// @ts-expect-error
tsAssertFalse<boolean>();
// @ts-expect-error
tsAssertFalse<{}>();
// @ts-expect-error
tsAssertFalse<unknown>();
// @ts-expect-error
tsAssertFalse<any>();


// @ts-expect-error
tsAssertFalse(false);
// @ts-expect-error
tsAssertFalse(false as const);
