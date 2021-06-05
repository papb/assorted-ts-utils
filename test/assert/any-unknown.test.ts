import { tsAssertAny, tsAssertUnknown } from '../../source/assert';


tsAssertAny<any>();
tsAssertUnknown<unknown>();


// @ts-expect-error
tsAssertAny();
// @ts-expect-error
tsAssertAny<never>();
// @ts-expect-error
tsAssertAny<void>();
// @ts-expect-error
tsAssertAny<undefined>();
// @ts-expect-error
tsAssertAny<boolean>();
// @ts-expect-error
tsAssertAny<{}>();
// @ts-expect-error
tsAssertAny<unknown>();


// @ts-expect-error
tsAssertAny(0 as any); // eslint-disable-line @typescript-eslint/no-unsafe-argument


// @ts-expect-error
tsAssertUnknown();
// @ts-expect-error
tsAssertUnknown<never>();
// @ts-expect-error
tsAssertUnknown<void>();
// @ts-expect-error
tsAssertUnknown<undefined>();
// @ts-expect-error
tsAssertUnknown<boolean>();
// @ts-expect-error
tsAssertUnknown<{}>();
// @ts-expect-error
tsAssertUnknown<any>();


// @ts-expect-error
tsAssertUnknown(0 as unknown);
