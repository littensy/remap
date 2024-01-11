export as namespace Remap;

/**
 * A marker that indicates that a value should be deleted from the map.
 */
export declare const None: {
	/**
	 * @deprecated
	 */
	readonly __nominal: unique symbol;
};

export type None = typeof None;

type ValueOf<T> = Exclude<T[keyof T], undefined>;

/**
 * Sets the value at `key` to `value`.
 *
 * @param object A readonly map
 * @param key The key to set
 * @param value The value to set
 */
export function set<K, V>(object: ReadonlyMap<K, V>, key: K, value: V): ReadonlyMap<K, V>;
export function set<T>(object: T, key: keyof T, value: T[keyof T]): T;

/**
 * Deletes the entry with the given `key` from the map.
 *
 * @param object A readonly map
 * @param key The key to delete
 */
declare function deleteKey<K, V>(object: ReadonlyMap<K, V>, key: K): ReadonlyMap<K, V>;
declare function deleteKey<T>(object: T, key: keyof T): T;
export { deleteKey as delete };

/**
 * Deletes the entry with the given `value` from the map.
 *
 * @param object A readonly map
 * @param value The value to delete
 */
export function deleteValue<K, V>(object: ReadonlyMap<K, V>, value: V): ReadonlyMap<K, V>;
export function deleteValue<T>(object: T, value: ValueOf<T>): T;

/**
 * Updates the value at `key` with the result of `updater`. Returning `undefined`
 * from `updater` will delete the entry.
 *
 * @param object A readonly map
 * @param key The key to update
 * @param updater A function that returns a new value
 */
export function update<K, V>(
	object: ReadonlyMap<K, V>,
	key: K,
	updater: (value?: V) => V | undefined,
): ReadonlyMap<K, V>;
export function update<T>(object: T, key: keyof T, updater: (value: T[keyof T]) => T[keyof T] | undefined): T;

/**
 * Updates each entry in the map with the result of `updater`. Returning
 * `undefined` from `updater` will delete the entry.
 *
 * @param object A readonly map
 * @param updater A function that returns the new value for each entry
 */
export function map<K, V, R>(
	object: ReadonlyMap<K, V>,
	updater: (value: V, key: K) => R | undefined,
): ReadonlyMap<K, R>;
export function map<T, R>(
	object: T,
	updater: (value: ValueOf<T>, key: keyof T) => R | undefined,
): { [K in keyof T]: R };

/**
 * Deletes all entries from the map for which `predicate` returns `false`.
 *
 * @param object A readonly map
 * @param predicate A function that returns `true` if the entry should be kept
 */
export function filter<K, V>(object: ReadonlyMap<K, V>, predicate: (value: V, key: K) => boolean): ReadonlyMap<K, V>;
export function filter<T>(object: T, predicate: (value: ValueOf<T>, key: keyof T) => boolean): T;

/**
 * Reduces the map to a single value using `reducer`. The result of each call to
 * `reducer` is passed as the first argument to the next call.
 *
 * @param object A readonly map
 * @param reducer A function that modifies the accumulator
 * @param initialValue The initial value for the accumulator
 */
export function reduce<K, V, R>(
	object: ReadonlyMap<K, V>,
	reducer: (accumulator: R, value: V, key: K) => R,
	initialValue: R,
): R;
export function reduce<T, R>(
	object: T,
	reducer: (accumulator: R, value: ValueOf<T>, key: keyof T) => R,
	initialValue: R,
): R;

/**
 * Returns a new map with the keys and values from `sources` merged into `map`.
 * Use the `None` symbol to mark a value for deletion.
 *
 * @param object A readonly map
 * @param sources A list of objects to merge into `object`
 */
export function assign<K, V>(map: ReadonlyMap<K, V | None>, ...sources: ReadonlyMap<K, V | None>[]): ReadonlyMap<K, V>;
export function assign<K extends string | number | symbol, V>(
	map: ReadonlyMap<K, V | None>,
	...sources: (ReadonlyMap<K, V | None> | { readonly [P in K]?: V | None })[]
): ReadonlyMap<K, V>;
export function assign<T>(map: T, ...sources: { readonly [K in keyof T]?: T[K] | None }[]): T;

/**
 * Returns a writable shallow copy of the map.
 *
 * @param object A readonly map
 */
export function clone<K, V>(object: ReadonlyMap<K, V>): Map<K, V>;
export function clone<T>(object: T): Writable<T>;

/**
 * Returns an empty writable map of the same type as `object`.
 *
 * @param object A readonly map
 */
export function clear<K, V>(object: ReadonlyMap<K, V>): Map<K, V>;
export function clear<T>(object: T): Writable<T>;

/**
 * Returns a subset of the map excluding the keys specified.
 *
 * @param object A readonly map
 * @param keys The set of keys to omit
 */
export function omit<K, V>(object: ReadonlyMap<K, V>, ...keys: K[]): ReadonlyMap<K, V>;
export function omit<T, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K>;

/**
 * Returns a subset of the object with only the keys specified.
 *
 * @param object A readonly map
 * @param keys The set of keys to pick
 */
export function pick<K, V>(object: ReadonlyMap<K, V>, ...keys: K[]): ReadonlyMap<K, V>;
export function pick<T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K>;
