import { Merge as UnreadableMerge, SetOptional, SetRequired } from 'type-fest';

export type AnyArray = readonly any[];
export type AnyFunction = (...args: any) => any;
export type AnyPlainObject = Record<string, unknown>;

export type Not<T extends boolean> = T extends true ? false : true;
export type Or<T extends boolean[]> = T[number] extends false ? false : true;
export type And<T extends boolean[]> = T[number] extends true ? true : false;

export type If<T extends boolean, ThenType, ElseType> = T extends true ? ThenType : ElseType;

export type IfNever<T, A, B> = [T] extends [never] ? A : B;
export type IfAny<T, A, B> = 0 extends (1 & T) ? A : B;
export type IfUnknown<T, A, B> = [unknown] extends [T] ? IfAny<T, B, A> : B;

export type StrictExtends<A, B> = [A] extends [B] ? true : false;
export type BidirectionalStrictExtends<A, B> = And<[StrictExtends<A, B>, StrictExtends<B, A>]>;

export type IfNotExtendsCoalesce<T, ShouldExtend, Fallback> =
	T extends ShouldExtend ? T : Fallback;

export type IfNotStrictExtendsCoalesce<T, ShouldExtend, Fallback> =
	[T] extends [ShouldExtend] ? T : Fallback;

export type IfPrimitive<T, A, B> = T extends number | string | boolean | symbol | bigint | null | undefined ? A : B;
export type IfStrictPrimitive<T, A, B> = [T] extends [number | string | boolean | symbol | bigint | null | undefined] ? A : B;
export type IfNotPrimitiveCoalesce<T, Fallback> = IfPrimitive<T, T, Fallback>;
export type IfNotStrictPrimitiveCoalesce<T, Fallback> = IfPrimitive<T, T, Fallback>;

export type PropOrNever<T, P> = P extends string | number | symbol ? (T extends Record<P, any> ? T[P] : never) : never;

/// -------------------------------------------------------------------------------------

export type ImproveFunctionTypeReadability<T> =
	T extends (this: infer TT, ...args: infer A) => infer R ?
		IfUnknown<TT, (...args: A) => R, T> : T;

/// -------------------------------------------------------------------------------------

declare const secretForAny: unique symbol;
type SecretForAny = typeof secretForAny;
declare const secretForFunction: unique symbol;
type SecretForFunction = typeof secretForFunction;

type DeepTransformerHelperForEquals<T> = IfAny<T, SecretForAny,
	IfNotPrimitiveCoalesce<T,
		T extends (this: infer TT, ...args: infer A) => infer R
		?
			{
				thisArg: DeepTransformerHelperForEquals<TT>;
				args: DeepTransformerHelperForEquals<A>;
				returnType: DeepTransformerHelperForEquals<R>;
				brand: SecretForFunction;
			}
		:
			{ [K in keyof T]-?: DeepTransformerHelperForEquals<T[K]> }
	>
>;

export type IfStrictEqual<A, B, ThenType, ElseType> = And<[
	BidirectionalStrictExtends<A, B>,
	BidirectionalStrictExtends<
		DeepTransformerHelperForEquals<A>,
		DeepTransformerHelperForEquals<B>
	>
]> extends true ? ThenType : ElseType;

export type StrictEqual<A, B> = IfStrictEqual<A, B, true, false>;

/// -------------------------------------------------------------------------------------

export type IfIdenticalInternalTSRepresentation<A, B, ThenType, ElseType> =
	(<T>() => [T] extends [A] ? 1 : 2) extends
	(<T>() => [T] extends [B] ? 1 : 2) ? ThenType : ElseType;

/// -------------------------------------------------------------------------------------

export type ReplaceAllTypeOccurrences<T, OldType, NewType> =
	IfStrictEqual<T, OldType, NewType,
		IfAny<T, T,
			IfNotPrimitiveCoalesce<T,
				T extends (this: infer FT, ...args: infer FA) => infer FR
				?
					IfUnknown<FT,
						(
							...args: IfNotExtendsCoalesce<
								ReplaceAllTypeOccurrences<FA, OldType, NewType>,
							AnyArray, never[]>
						) => ReplaceAllTypeOccurrences<FR, OldType, NewType>,
						(
							this: ReplaceAllTypeOccurrences<FT, OldType, NewType>,
							...args: IfNotExtendsCoalesce<
								ReplaceAllTypeOccurrences<FA, OldType, NewType>,
							AnyArray, never[]>
						) => ReplaceAllTypeOccurrences<FR, OldType, NewType>
					>
				:
					{ [K in keyof T]: ReplaceAllTypeOccurrences<T[K], OldType, NewType> }
			>
		>
	>;

/// -------------------------------------------------------------------------------------

export type ComputeShallow<T> = T extends Record<string, unknown> ? {
	[K in keyof T]: T[K];
} : T;

export type Merge<A, B> = ComputeShallow<UnreadableMerge<A, B>>;

export type ReplaceKeysIgnoringExtras<
	BaseType extends AnyPlainObject,
	Replacer extends AnyPlainObject
> = Merge<BaseType, Pick<Replacer, IfNotExtendsCoalesce<keyof BaseType, keyof Replacer, never>>>;

/// -------------------------------------------------------------------------------------

type SetKeyType_<BaseType extends AnyPlainObject, Key extends string, NewKeyType> = {
	[K in (keyof BaseType | Key)]: (
		K extends Key ? NewKeyType : BaseType[IfNotExtendsCoalesce<K, keyof BaseType, never>]
	);
};

export type SetKeyType<
	BaseType extends AnyPlainObject,
	Key extends string,
	NewKeyType,
	AsOptional extends boolean = false
> = AsOptional extends true ?
	SetOptional<SetKeyType_<BaseType, Key, NewKeyType>> :
	SetRequired<SetKeyType_<BaseType, Key, NewKeyType>>;

export type ReplaceKeyTypeIfExists<
	BaseType extends AnyPlainObject,
	Key extends string,
	NewKeyType,
	AsOptional extends boolean = false
> = Key extends keyof BaseType ?
	SetKeyType<BaseType, Key, NewKeyType, AsOptional> :
	BaseType;

export type ReplaceKeyType<
	BaseType extends AnyPlainObject,
	Key extends (string & keyof BaseType),
	NewKeyType,
	AsOptional extends boolean = false
> = ReplaceKeyTypeIfExists<BaseType, Key, NewKeyType, AsOptional>;

/// -------------------------------------------------------------------------------------

export type IfKeyIsOptional<T extends AnyPlainObject, Key extends keyof T, ThenType, ElseType> =
	IfStrictEqual<
		{ [K in Key]: T[K] },
		{ [K in Key]-?: T[K] },
		ElseType,
		ThenType
	>;

type OptionalKeysOf_<
	T extends AnyPlainObject,
	KeysToConsider extends keyof T = keyof T
> =
	KeysToConsider extends any ? IfKeyIsOptional<
		T,
		KeysToConsider,
		KeysToConsider,
		never
	> : never;

export type OptionalKeysOf<T extends AnyPlainObject> = OptionalKeysOf_<T>;

type SetUndefinable<T extends AnyPlainObject, Keys extends keyof T = keyof T> = {
	[K in keyof T]: K extends Keys ? T[K] | undefined : T[K];
};

export type SetRequiredKeepingUndef<T extends AnyPlainObject, Keys extends keyof T = keyof T> =
	SetUndefinable<
		SetRequired<T, Keys>,
		IfNotExtendsCoalesce<
			OptionalKeysOf_<T, Keys>,
			keyof SetRequired<T, Keys>,
			never
		>
	>;

/// -------------------------------------------------------------------------------------

export type DeepMutable<T> = T extends Record<string, unknown> ? {
	-readonly [K in keyof T]: DeepMutable<T[K]>;
} : T;

export type DeepValues<T> = T extends Record<string, unknown> ? DeepValues<T[keyof T]> : T;
// Before TS 4.1:
// export type DeepValues<T> = T extends Record<string, unknown> ? { [K in keyof T]: DeepValues<T[K]> }[keyof T] : T;

/// -------------------------------------------------------------------------------------

export type IfMutableArray<T extends AnyArray, ThenType, ElseType> = T extends any[] ? ThenType : ElseType;
export type IsMutableArray<T extends AnyArray> = IfMutableArray<T, true, false>;
export type AsMutableArray<T extends AnyArray> = [...T];

export type IfReadonlyArray<T extends AnyArray, ThenType, ElseType> = IfMutableArray<T, ElseType, ThenType>;
export type IsReadonlyArray<T extends AnyArray> = IfReadonlyArray<T, true, false>;
export type AsReadonlyArray<T extends AnyArray> = readonly [...T];

export type SetReadonlyArray<T extends AnyArray, Readonly extends boolean> =
	Readonly extends true ? AsReadonlyArray<T> : AsMutableArray<T>;

/// -------------------------------------------------------------------------------------

export type IfEmptyTuple<T extends AnyArray, ThenType, ElseType> =
	T['length'] extends 0 ? ThenType : ElseType;
export type IsEmptyTuple<T extends AnyArray> = IfEmptyTuple<T, true, false>;

export type IfTuple<T extends AnyArray, ThenType, ElseType> =
	number extends T['length'] ? ElseType : ThenType;
export type IsTuple<T extends AnyArray> = IfTuple<T, true, false>;

export type IfSemituple<T extends AnyArray, ThenType, ElseType> =
	IfTuple<T, ElseType, T extends readonly [infer H, ...AnyArray] ? ThenType : ElseType>;
export type IsSemituple<T extends AnyArray> = IfSemituple<T, true, false>;

export type IfNormalArray<T extends AnyArray, ThenType, ElseType> =
	IfTuple<T, ElseType, IfSemituple<T, ElseType, ThenType>>;
export type IsNormalArray<T extends AnyArray> = IfNormalArray<T, true, false>;

export type WithoutFirstElement<T extends AnyArray> =
	((...t: T) => void) extends (x: any, ...u: infer U) => void ? U : never;

type DropPrefixFromNonTuple<T /* semituple or normal array */ extends AnyArray> =
	IsSemituple<T> extends true ? DropPrefixFromNonTuple<WithoutFirstElement<T>> : T;
type SemitupleHead<T extends AnyArray> = T extends readonly [infer H, ...AnyArray] ? H : never;
type GetSemituplePrefix<T /* semituple */ extends AnyArray> =
	IsSemituple<T> extends true ? [
		SemitupleHead<T>,
		...GetSemituplePrefix<WithoutFirstElement<T>>
	] : [];

export type ArrayMinLength<T extends AnyArray> =
	IfTuple<T, T['length'], GetSemituplePrefix<T>['length']>;
export type ArrayMaxLength<T extends AnyArray> =
	IfTuple<T, T['length'], undefined>;

export type FirstElement<T extends AnyArray> =
	IsEmptyTuple<T> extends true ? undefined :
		IfNormalArray<T, T[0] | undefined, T[0]>;

type TupleLastElement<T extends AnyArray> =
	IsEmptyTuple<T> extends true ? undefined :
		T['length'] extends 1 ? T[0] :
			TupleLastElement<WithoutFirstElement<T>>;

export type LastElement<T extends AnyArray> =
	IsTuple<T> extends true ?
		TupleLastElement<T> :
		T[
			IfNotExtendsCoalesce<
				ArrayMinLength<T>,
				number,
				never
			>
		];

export type ParseArray<T extends AnyArray> = {
	isReadonly: IsReadonlyArray<T>;
	first: FirstElement<T>;
	last: LastElement<T>;
	minLength: ArrayMinLength<T>;
	maxLength: ArrayMaxLength<T>;
	tuplePrefix: SetReadonlyArray<IfTuple<T, T, GetSemituplePrefix<T>>, IsReadonlyArray<T>>;
	arrayTail: SetReadonlyArray<IfTuple<T, [], DropPrefixFromNonTuple<T>>, IsReadonlyArray<T>>;
};
