/**
 * @class qTreeNode
 * @constructor
 * @param {Rect} bounds
 * @param depth
 * @param maxDepth
 * @param maxObjects
 */
var qTreeNode = function (bounds, depth, maxDepth, maxObjects) {
    this._bounds = bounds;
    this._depth = depth;
    this._maxDepth = maxDepth;
    this._maxChildren = maxObjects;

    this._objects = [];
    this._nodes = [];
};

/**
 * индекс элемента левого верхнего квадранта
 * @type {number}
 * @constant
 */
qTreeNode.TOP_LEFT = 0;

/**
 * индекс элемента правого верхнего квадранта
 * @type {number}
 * @constant
 */
qTreeNode.TOP_RIGHT = 1;

/**
 * индекс элемента левого нижнего квадранта
 * @type {number}
 * @constant
 */
qTreeNode.BOTTOM_LEFT = 2;

/**
 * индекс элемента правого нижнего квадранта
 * @type {number}
 * @constant
 */
qTreeNode.BOTTOM_RIGHT = 3;

/**
 * очистить
 * @method clear
 */
qTreeNode.prototype.clear = function () {
    this._objects.length = 0;
    for( var i = 0; i < this._nodes.length; i++ ) {
        this._nodes[ i ].clear();
    }
    this._nodes.length = 0;
};

/**
 * добавить объект
 * @param {GameObject} object
 */
qTreeNode.prototype.insert = function(object){
    if(this._nodes.length) {

    }
};

/**
 * получить индекс по положению объекта
 * @param {GameObject} object - объект GameObject
 * @returns {number}
 * @private
 */
qTreeNode.prototype._findIndex = function (object) {
    var isLeft = (object.transform().x() <= this._bounds.x() + this._bounds.width() / 2);
    var isTop = (object.transform().y() <= this._bounds.y() + this._bounds.height() / 2);

    if( isLeft && isTop )
        return qTreeNode.TOP_LEFT;

    if( isLeft && !isTop )
        return qTreeNode.BOTTOM_LEFT;

    if( !isLeft && isTop )
        return qTreeNode.TOP_RIGHT;

    return qTreeNode.BOTTOM_RIGHT;
};

/**
 * @method subdivide
 */
qTreeNode.prototype.subdivide = function () {

};

/**
 * @param {CanvasRenderingContext2D} context
 * @param {number} interp
 */
qTreeNode.prototype.draw = function(context, interp) {
    context.rect(this._bounds.x(), this._bounds.y(), this._bounds.width(), this._bounds.height());
    for( var i = 0; i < this._nodes.length; i++ ) {
        this._nodes[ i ].draw(context, interp);
    }
};

/**
 * реализация дерева квадрантов (quadtree)
 * для быстрого нахождения пересечений объектов
 * @class qTree
 * @constructor
 */
var qTree = function(bounds){
    this._maxObjects = 10;
    this._maxDepth = 5;

    this._level = 0;

    this._root = new qTreeNode(bounds, 0, this._maxDepth, this._maxObjects);
};

/**
 * Очистить дерево
 * @method clear
 */
qTree.prototype.clear = function () {
    this._root.clear();
};


/**
 * добавить объект
 * @param {GameObject} object - объект сцены
 */
qTree.prototype.insert = function(object){
    this._root.insert( object );
};

/**
 * добавить массив объектов (хелпер)
 * @method insertList
 * @param {Array} objectList - массив объектов GameObject
 */
qTree.prototype.insertList = function(objectList){
    for( var i = 0; i < objectList.length; i++) {
        this.insert( objectList[ i ] );
    }
};

qTree.prototype.draw = function (context, interp) {
    if(this._root !== undefined) {
        this._root.draw(context, interp);
    }
};
