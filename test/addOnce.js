import test from 'ava';

import Signal from '../src/index';

test.beforeEach(t => {
	t.context.signal = new Signal();
});

test('Signal.addOnce() - increase the number of bindings', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	t.context.signal.addOnce(function() {});
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.addOnce(function() {});
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.addOnce() - add same callback multiple times', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	const f = function() {};
	t.context.signal.addOnce(f);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.addOnce(f);
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.addOnce() - add same callback in diff context', (t) => {
	t.is(t.context.signal.bindings.length, 0);
	const f = function() {};
	t.context.signal.addOnce(f);
	t.is(t.context.signal.bindings.length, 1);
	t.context.signal.addOnce(f, {});
	t.is(t.context.signal.bindings.length, 2);
});

test('Signal.addOnce() - should thow an error if callback isn\'t a function', (t) => {
	t.throws(function() {
		t.context.signal.addOnce();
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.addOnce(123);
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.addOnce(true);
	}, 'Invalid callback');
	t.throws(function() {
		t.context.signal.addOnce({});
	}, 'Invalid callback');
	t.is(t.context.signal.bindings.length, 0);
});
