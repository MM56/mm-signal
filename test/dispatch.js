import test from 'ava';

import Signal from '../src/index';

test.beforeEach(t => {
	t.context.signal = new Signal();
});

test('Signal.add() - should execute callbacks (FIFO)', (t) => {
	let str = '';
	const f1 = function() {
		str += 'a';
	};
	const f2 = function() {
		str += 'b';
	};
	t.context.signal.add(f1);
	t.context.signal.add(f2);
	t.context.signal.dispatch();
	t.is(str, 'ab');
});

test('Signal.add() - should allow multiple dispatches', (t) => {
	let n = 0;
	const f1 = function() {
		n++;
	};
	t.context.signal.add(f1);
	t.context.signal.dispatch();
	t.is(n, 1);
	t.context.signal.dispatch();
	t.is(n, 2);
	t.context.signal.dispatch();
	t.is(n, 3);
});

test('Signal.add() - should respect callback context', (t) => {
	const scope1 = {
		n: 0,
		inc: function() {
			this.n++;
		}
	};
	const scope2 = {
		n: 0,
		inc: function() {
			this.n++;
		}
	};

	const f1 = function() {
		this.inc();
	};
	const f2 = function() {
		this.inc();
	};

	t.context.signal.add(f1, scope1);
	t.context.signal.add(f2, scope2);

	t.context.signal.dispatch();
	t.is(scope1.n, 1);
	t.is(scope2.n, 1);

	t.context.signal.dispatch();
	t.is(scope1.n, 2);
	t.is(scope2.n, 2);
});

test('Signal.addOnce() - should execute callback only once even if multiple dispatches', (t) => {
	let n = 0;
	let k = 0;
	const f1 = function() {
		n++;
	};
	const f2 = function() {
		k++;
	};

	t.context.signal.addOnce(f1);
	t.context.signal.addOnce(f2);
	t.context.signal.dispatch();
	t.context.signal.dispatch();

	t.is(n, 1);
	t.is(k, 1);
});

test('Signal.addOnce() - should respect callback context', (t) => {
	const scope1 = {
		n: 0,
		inc: function() {
			this.n++;
		}
	};
	const scope2 = {
		n: 0,
		inc: function() {
			this.n++;
		}
	};

	const f1 = function() {
		this.inc();
	};
	const f2 = function() {
		this.inc();
	};

	t.context.signal.addOnce(f1, scope1);
	t.context.signal.addOnce(f2, scope2);

	t.context.signal.dispatch();
	t.is(scope1.n, 1);
	t.is(scope2.n, 1);

	t.context.signal.dispatch();
	t.is(scope1.n, 1);
	t.is(scope2.n, 1);
});

test('Signal.remove() - should not trigger callback if it was removed', (t) => {
	let n = 0;
	const f1 = function() {
		n++;
		t.context.signal.remove(f1);
	};

	t.context.signal.add(f1);
	t.context.signal.remove(f1);
	t.context.signal.dispatch();
	t.is(n, 0);
});

test('Signal.add() - arguments should propagate single argument', (t) => {
	let n = 0;
	const f1 = function(param) {
		n += param;
	};
	const f2 = function(param) {
		n += param;
	};

	t.context.signal.add(f1);
	t.context.signal.add(f2);

	t.context.signal.dispatch(1);
	t.is(n, 2);
});

test('Signal.add() - arguments should propagate n arguments', (t) => {
	let args;
	t.context.signal.add(function() {
		args = Array.prototype.slice.call(arguments);
	});

	t.context.signal.dispatch(1, 2, 3, 4, 5);
	t.deepEqual(args, [ 1, 2, 3, 4, 5 ]);

	args = [];
	t.context.signal.dispatch(9, 8);
	t.deepEqual(args, [ 9, 8 ]);
});

test('Signal.addOnce() - arguments should propagate single argument', (t) => {
	let n = 0;
	const f1 = function(param) {
		n += param;
	};
	const f2 = function(param) {
		n += param;
	};

	t.context.signal.addOnce(f1);
	t.context.signal.addOnce(f2);

	t.context.signal.dispatch(1);
	t.is(n, 2);

	t.context.signal.dispatch(20);
	t.is(n, 2);
});

test('Signal.addOnce() - arguments should propagate n arguments', (t) => {
	let args;
	t.context.signal.addOnce(function() {
		args = Array.prototype.slice.call(arguments);
	});

	t.context.signal.dispatch(1, 2, 3, 4, 5);
	t.deepEqual(args, [ 1, 2, 3, 4, 5 ]);

	t.context.signal.dispatch(9, 8);
	t.deepEqual(args, [ 1, 2, 3, 4, 5 ]);
});
