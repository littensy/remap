# 🧊 Remap

A module for transforming read-only maps in Roblox TypeScript. Intended for using `ReadonlyMap` in a state manager like [Reflex](https://github.io/littensy/reflex/).

All functions assume the map is immutable, and will return a new map if changes are made. Some functions will return the original map if a change is not necessary.

## 📦 Installation

```bash
npm install @rbxts/remap
pnpm add @rbxts/remap
yarn add @rbxts/remap
```

## 🔎 Example

```ts
import Remap from "@rbxts/remap";

let map = new ReadonlyMap<string, number>();

map = Remap.assign(map, { foo: 1, bar: 2, baz: 3 }, { baz: Remap.None });
map = Remap.delete(map, "foo");
map = Remap.set(map, "baz", 3);
```

## 📚 API

### `set(object, key, value)`

```ts
function set<K, V>(object: ReadonlyMap<K, V>, key: K, value: V): ReadonlyMap<K, V>;
```

```ts
Remap.set(map, "foo", 1); // { foo: 1 }
```

Sets the value at `key` to `value`.

### `delete(object, key)`

```ts
function delete<K, V>(object: ReadonlyMap<K, V>, key: K): ReadonlyMap<K, V>;
```

```ts
Remap.delete(map, "foo"); // deletes the entry at "foo"
```

Deletes the entry with the given `key` from the map.

### `deleteValue(object, value)`

```ts
function deleteValue<K, V>(object: ReadonlyMap<K, V>, value: V): ReadonlyMap<K, V>;
```

```ts
Remap.deleteValue(map, 1); // deletes the entry with the value 1
```

Deletes the entry with the given `value` from the map.

### `update(object, key, updater)`

```ts
function update<K, V>(object: ReadonlyMap<K, V>, key: K, updater: (value?: V) => V | undefined): ReadonlyMap<K, V>;
```

```ts
Remap.update(map, "foo", (value = 0) => value + 1); // adds 1 to the value at "foo"
```

Updates the value at `key` with the result of `updater`. Returning `undefined` from `updater` will delete the entry.

### `map(object, updater)`

```ts
function map<K, V, R>(object: ReadonlyMap<K, V>, updater: (value: V, key: K) => R | undefined): ReadonlyMap<K, R>;
```

```ts
Remap.map(map, (value, key) => value + 1); // adds 1 to each value
```

Updates each entry in the map with the result of `updater`. Returning `undefined` from `updater` will delete the entry.

### `filter(object, predicate)`

```ts
function filter<K, V>(object: ReadonlyMap<K, V>, predicate: (value: V, key: K) => boolean): ReadonlyMap<K, V>;
```

```ts
Remap.filter(map, (value, key) => value > 1); // removes values less than 1
```

Deletes all entries from the map for which `predicate` returns `false`.

### `reduce(object, reducer, initialValue)`

```ts
function reduce<K, V, R>(
	object: ReadonlyMap<K, V>,
	reducer: (accumulator: R, value: V, key: K) => R,
	initialValue: R,
): R;
```

```ts
Remap.reduce(map, (accumulator, value, key) => accumulator + value, 0); // sum of values
```

Reduces the map to a single value using `reducer`. The result of each call to `reducer` is passed as the first argument to the next call.

### `assign(object, ...sources)`

```ts
function assign<K, V>(map: ReadonlyMap<K, V | None>, ...sources: ReadonlyMap<K, V | None>[]): ReadonlyMap<K, V>;
```

```ts
Remap.assign(map, { foo: 1, bar: 2, baz: 3 }, { baz: Remap.None }); // { foo: 1, bar: 2 }
```

Returns a new map with the keys and values from `sources` merged into `map`. Use the `Remap.None` symbol to mark a value for deletion.

If the key is a string, number, or symbol, you may pass objects to `...sources` instead of maps.

### `clone(object)`

```ts
function clone<K, V>(object: ReadonlyMap<K, V>): Map<K, V>;
```

```ts
const copy = Remap.clone(map);
copy.set("foo", 1);
```

Returns a mutable shallow copy of the map.

### `clear(object)`

```ts
function clear<K, V>(object: ReadonlyMap<K, V>): Map<K, V>;
```

```ts
const empty = Remap.clear(map);
empty.set("foo", 1);
```

Returns an empty writable map of the same type as `object`.

### `omit(object, ...keys)`

```ts
function omit<K, V>(object: ReadonlyMap<K, V>, ...keys: K[]): ReadonlyMap<K, V>;
```

```ts
Remap.omit(map, "foo", "bar"); // { baz: 3 }
```

Returns a subset of the map excluding the keys specified.

### `pick(object, ...keys)`

```ts
function pick<K, V>(object: ReadonlyMap<K, V>, ...keys: K[]): ReadonlyMap<K, V>;
```

```ts
Remap.pick(map, "foo", "bar"); // { foo: 1, bar: 2 }
```

Returns a subset of the object with only the keys specified.

## 📄 License

Remap is available under the terms of the MIT license. See [LICENSE](LICENSE) for details.
