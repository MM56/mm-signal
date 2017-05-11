/**
 * Signal class
 *
 * @class
 *
 * @license {@link https://opensource.org/licenses/MIT|MIT}
 *
 * @example
 * const cb = function() {console.log("callback");};
 * const signal = new Signal();
 * signal.add(cb);
 * signal.dispatch();
 */
class Signal {

	/**
	 * Creates an instance of Signal
	 *
	 * @constructor
	 */
	constructor() {
		this.add = this.add.bind(this);
		this.addOnce = this.addOnce.bind(this);
		this.dispatch = this.dispatch.bind(this);
		this.remove = this.remove.bind(this);
		this.removeAll = this.removeAll.bind(this);

		this.removeAll();
	}

	/**
	 * Add a callback for signal
	 * 
	 * @param {function} callback 
	 * @param {object} scope 
	 * @param {boolean} [addOnce=false] 
	 * 
	 * @memberof Signal
	 */
	add(callback, scope, addOnce = false) {
		if (typeof callback !== `function`) {
			throw new Error(`Invalid callback`);
		}
		this.bindings.unshift({
			callback: callback,
			scope: scope,
			addOnce: addOnce,
		});
	}

	/**
	 * Add a callback for signal and will be trigerred only once
	 * 
	 * @param {function} callback 
	 * @param {object} scope 
	 * 
	 * @memberof Signal
	 */
	addOnce(callback, scope) {
		this.add(callback, scope, true);
	}

	/**
	 * Triggers callbacks attached to signal
	 * 
	 * @memberof Signal
	 */
	dispatch() {
		const args = Array.prototype.slice.call(arguments);
		let i = this.bindings.length - 1;
		for (; i >= 0; i--) {
			const binding = this.bindings[ i ];
			binding.callback.apply(binding.scope, args);
			if (binding.addOnce) {
				this.bindings.splice(i, 1);
			}
		}
	}

	/**
	 * Removes a callback for signal
	 * 
	 * @param {function} callback 
	 * @param {object} scope 
	 * 
	 * @memberof Signal
	 */
	remove(callback, scope) {
		if (typeof callback !== `function`) {
			throw new Error(`Invalid callback`);
		}
		let i = this.bindings.length - 1;
		for (; i >= 0; i--) {
			const binding = this.bindings[ i ];
			if (binding.callback === callback && binding.scope === scope) {
				this.bindings.splice(i, 1);
			}
		}
	}

	removeAll() {
		this.bindings = [];
	}

}

export default Signal;
