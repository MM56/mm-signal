import test from 'ava';

import Signal from '../src/index';

test.beforeEach(t => {
	t.context.signal = new Signal();
});

test('Signal.add() - increase the number of bindings', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	t.context.signal.add(function() {});
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.add(function() {});
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.add() - add same callback multiple times', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	const f = function() {};
	t.context.signal.add(f);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.add(f);
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.add() - add same callback in diff context', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	const f = function() {};
	t.context.signal.add(f);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.add(f, {});
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.add() - should thow an error if callback isn\'t a function', (t) => {
	t.throws(function() {
		t.context.signal.add();
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.add(123);
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.add(true);
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.add({});
	}, 'Invalid callback');
	t.is(t.context.signal.bindings.length, 0);
});
