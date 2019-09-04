/**
 * Created by Nikolaj on 28.10.2016.
 */

/**
 * проверяет находится ли число в диапазоне,
 * если нет, то возвращает min или max
 * @param min
 * @param max
 * @returns {number}
 */
Number.prototype.clamp = function(min, max) {
    return Math.min( Math.max( this, min ), max );
};

/**
 *
 * @param x
 * @param y
 * @constructor
 */
var Point = function (x, y) {
    this._x = x;
    this._y = y;
};

/**
 * @param {number} x - положение по X
 * @param {number} y - положение по Y
 * @param {number} width - ширина
 * @param {number} height - высота
 * @constructor
 */
var Rect = function(/* x, y, width, height */){
    this._x1 = 0;
    this._y1 = 0;

    this._width = 0;
    this._height = 0;

    this._x2 = 0;
    this._y2 = 0;

    //так как параметров по умолчанию не завезли, приходится костылить
    if( arguments[ 0 ] !== undefined )
        this._x1 = arguments[ 0 ];

    if( arguments[ 1 ] !== undefined )
        this._y1 = arguments[ 1 ];

    if( arguments[ 2 ] !== undefined )
    {
        this._x2 = ( this._x1 + arguments[ 2 ]);
        this._width = arguments[ 2 ];
    }

    if( arguments[ 3 ] !== undefined )
    {
        this._y2 = ( this._y1 + arguments[ 3 ]);
        this._height = arguments[ 3 ];
    }
};

/**
 *
 * @returns {number} положение по X
 */
Rect.prototype.x = function(){
    return this._x;
};

/**
 *
 * @returns {number} положение по Y
 */
Rect.prototype.y = function(){
    return this._y;
};

/**
 * получить ширину прямоугольника
 * @returns {number} ширина
 */
Rect.prototype.width = function(){
    return this._width;
};

/**
 * получить высоту прямоугольника
 * @returns {number}
 */
Rect.prototype.height = function(){
    return this._height;
};

/**
 * содержит ли данный прямоугольник точку
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
Rect.prototype.contains = function(x,y){
    return ( x >= this._x1 ) && ( x <= this._x2 ) && ( y >= this._y1 ) && ( y <= this._y2 );
};

/**
 * получить пересечение двух прямоугольников
 * @param rect
 * @returns {Rect}
 */
Rect.prototype.intersected = function(rect){
    return new Rect();
};

/**
 * переместить прямоугольник на заданное смещение
 * @param {number} dx - смещение по X
 * @param {number} dy - смещение по Y
 */
Rect.prototype.translate = function(dx, dy){
    this._x1 += dx;
    this._x2 += dx;
    this._y1 += dy;
    this._y2 += dy;
};
