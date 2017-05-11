import test from 'ava';

import Signal from '../src/index';

test.beforeEach(t => {
	t.context.signal = new Signal();
});

test('Signal.remove() - should remove binding', (t) => {
	const f1 = function() {};
	const f2 = function() {};
	t.context.signal.add(f1);
	t.context.signal.add(f2);
	t.context.signal.remove(f1);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.remove(f2);
	t.is(t.context.signal.bindings.length, 0);
});

test('Signal.remove() - should not fail if called twice in a row', (t) => {
	const f1 = function() {};
	t.context.signal.add(f1);
	t.context.signal.remove(f1);
	t.is(t.context.signal.bindings.length, 0);
	t.context.signal.remove(f1);
	t.is(t.context.signal.bindings.length, 0);
});

test('Signal.remove() - should not remove binding with same callback', (t) => {
	const f1 = function() {};
	const scope = {};
	t.context.signal.add(f1);
	t.context.signal.add(f1, scope);
	t.context.signal.remove(f1);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.remove(f1, scope);
	t.is(t.context.signal.bindings.length, 0);
});

test('Signal.removeAll() - should remove all bindings', (t) => {
	const f1 = function() {};
	const f2 = function() {};
	const scope = {};
	t.context.signal.add(f1);
	t.context.signal.add(f2);
	t.context.signal.add(f1, scope);
	t.context.signal.removeAll();
	t.is(t.context.signal.bindings.length, 0);
});
