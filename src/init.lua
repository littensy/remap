local Remap = {}

Remap.None = setmetatable({}, {
	__tostring = function()
		return "None"
	end,
})

function Remap.set(object, key, value)
	if object[key] == value then
		return object
	end

	local copy = table.clone(object)
	copy[key] = value
	return copy
end

function Remap.delete(object, key)
	if object[key] == nil then
		return object
	end

	local copy = table.clone(object)
	copy[key] = nil
	return copy
end

Remap.deleteKey = Remap.delete

function Remap.deleteValue(object, valueToDelete)
	for key, value in object do
		if value == valueToDelete then
			return Remap.delete(object, key)
		end
	end

	return object
end

function Remap.update(object, key, updater)
	local copy = table.clone(object)
	copy[key] = updater(copy[key])
	return if copy[key] == object[key] then object else copy
end

function Remap.change(object, key, updater)
	if object[key] == nil then
		return object
	end

	local copy = table.clone(object)
	copy[key] = updater(copy[key])
	return if copy[key] == object[key] then object else copy
end

function Remap.map(object, updater)
	local copy = table.clone(object)

	for key, value in copy do
		copy[key] = updater(value, key)
	end

	return copy
end

function Remap.filter(object, predicate)
	local copy = table.clone(object)

	for key, value in copy do
		if not predicate(value, key) then
			copy[key] = nil
		end
	end

	return copy
end

function Remap.reduce(object, reducer, initialValue)
	local accumulator = initialValue

	for key, value in object do
		accumulator = reducer(accumulator, value, key)
	end

	return accumulator
end

function Remap.assign(object, ...)
	local copy = table.clone(object)

	for _, source in { ... } do
		for key, value in source do
			copy[key] = if value ~= Remap.None then value else nil
		end
	end

	return copy
end

function Remap.clone(object)
	return table.clone(object)
end

function Remap.clear()
	return {}
end

function Remap.omit(object, ...)
	local copy = table.clone(object)

	for _, key in { ... } do
		copy[key] = nil
	end

	return copy
end

function Remap.pick(object, ...)
	local copy = {}

	for _, key in { ... } do
		copy[key] = object[key]
	end

	return copy
end

return Remap
