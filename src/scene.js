/**
 * Created by Nikolaj on 25.10.2016.
 *
 * Базовый абстрактный класс для игровых сцен
 *
 * Все методы pure virtual
 *
 */

/**
 * @param _game Game ссылка экземпляр игры
 * @constructor
 * @abstract
 */
var Scene = function(_game) {

    /**
     * ссылка на объект Game
     * @type Game
     * @protected
     */
    this._gameRef = _game;

    /**
     * коллекция объектов
     * @type {Array}
     * @protected
     */
    this._objects = [];


    if( this.constructor === Scene ){
        throw new Error("GameState is abstract");
    }
};

/**
 * Выполняется при инициализации сцены
 * @abstract
 */
Scene.prototype.onInit = function() {
    throw new Error("Scene::onInit is abstract method");
};

/**
 * Выполняется каждый игровой тик
 * В данном методе реализуется обновление состояний сцены и объектов
 * @abstract
 */
Scene.prototype.onUpdate = function() {
    throw new Error("Scene::onUpdate is abstract method");
};

/**
 * Выполняется при открисовке сцены
 * @param context CanvasRenderingContext2D см. Game._context
 * @param interp см. Game._interp
 * @abstract
 */
Scene.prototype.onDraw = function(context, interp) {
    throw new Error("Scene::onDraw is abstract method");
};

/**
 * обработчик событий, поступивших от пользователя
 * @param event Event
 * @abstract
 */
Scene.prototype.onEvent = function(event) {
    throw new Error("Scene::onEvent is abstract method");
};

/**
 * вызывается при завершении текущей сцены
 * @abstract
 */
Scene.prototype.onFinish = function() {
    throw new Error("Scene::onFinish is abstract method");
};