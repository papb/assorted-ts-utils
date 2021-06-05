import { IfStrictEqual, IfStrictExtends } from '.';

const noop = (() => {});
const identity = ((value: any) => value);

type Pass = [];
type Fail = [never, never];

function tsCreateExactAsserter<Type>(): (<T extends Type = never>(...mismatch: IfStrictEqual<T, Type, Pass, Fail>) => void) {
	return noop;
}

export const tsAssertTypesExactlyEqual = () => tsCreateExactAsserter;
export const tsAssertExtends = () => <A>() => <B>(...mismatch: A extends B ? Pass : Fail) => undefined;
export const tsAssertStrictExtends = () => <A>() => <B>(...mismatch: IfStrictExtends<A, B, Pass, Fail>) => undefined;
export const tsAssertIsAssignable = tsAssertExtends;

export function tsAssertNever<T extends never>(): void;
export function tsAssertNever(never: never): void;
export function tsAssertNever(never?: any): void {}

export const tsAssertTrue = tsCreateExactAsserter<true>();
export const tsAssertFalse = tsCreateExactAsserter<false>();
export const tsAssertAny = tsCreateExactAsserter<any>();
export const tsAssertUnknown = tsCreateExactAsserter<unknown>();

function tsCreateExactInferAsserter<Type>(): (<T extends Type = never>(value: T, ...mismatch: IfStrictEqual<T, Type, Pass, Fail>) => T) {
	return identity as any;
}

function tsCreateAssignableInferAsserter<Type>(): (<T extends Type = never>(value: T) => T) {
	return identity as any;
}

export const tsAssertTypeExactlyDescribesValue = () => tsCreateExactInferAsserter;
export const tsAssertTypeAcceptsValue = () => tsCreateAssignableInferAsserter;
