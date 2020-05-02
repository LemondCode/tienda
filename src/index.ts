/*
 * @Author: matias.e.fernandez@gmail.com
 * @Date:   2020-04-27 03:16:15
 * @Last Modified by: matias.e.fernandez@gmail.com
 * @Last Modified time: 2020-04-27 03:16:15
 */

/*
    TODO List:
    1) Make Selectors, Maybe, check if change the complexity.
        1.1) Make Simple
        1.2) Make with Rxjs. Maybe Promises? Vanila JS?
    2) I don like the "makeStateUnmutable" method. Why calling it every time dispatchAction is called?
*/

export type Reducer<T> = (state: T) => T;

export interface ITienda<T extends object> {
    dispatchAction(reducer: Reducer<T>): void;
    state: T;
}

export class Tienda<T extends object> implements ITienda<T> {
    private _state: T;

    constructor(state: T) {
        this._state = state;
        this.makeStateUnmutable();
    }

    public get state() { return this._state; }

    public dispatchAction(reducer: Reducer<T>): void {
        this._state = Object.assign({}, reducer(this._state));
        this.makeStateUnmutable();
    }

    private makeStateUnmutable(): void {
        Object.preventExtensions(this._state);
        Object.seal(this._state);
        Object.freeze(this._state);
    }
}