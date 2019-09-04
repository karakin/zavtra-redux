/**
 *
 * @param {Rect} rect
 * @constructor
 */
var CollisionManager = function(rect){
    this._tree = new qTree(rect);
    console.log( this._tree );
};

/**
 * @param {CanvasRenderingContext2D} context
 * @param {number} interp
 */
CollisionManager.prototype.draw = function(context, interp) {
    this._tree.draw(context, interp);
};



CollisionManager.prototype.update = function (objectsList) {
    this._tree.clear();
    this._tree.insertList( objectsList );
};
