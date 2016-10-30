/**
 * Created by Nikolaj on 25.10.2016.
 *
 * Базовый абстрактный класс для игровых сцен
 *
 * Методы draw(context, interp), update(), init(), finish() вызываются
 * только объектом Game (что-то наподобие friend-класса)
 *
 * Методы onDraw(context, interp), onUpdate(), onInit(), onFinish()
 * теперь просто виртуальные.
 *
 */

/**
 * @param {Game} _game - ссылка экземпляр игры
 * @constructor
 * @abstract
 */
var Scene = function(_game) {

    /**
     * ссылка на объект Game
     * @type {Game}
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
 * добавить объект на сцену
 * @param {GameObject} object - добавляемый объект
 */
Scene.prototype.addObject = function(object){
    this._objects.push( object );
};

/**
 *
 * @param {string} objectName - имя объекта
 */
Scene.prototype.removeObject = function(objectName){
};

/**
 * получить список всех объектов на сцене
 * @returns {Array}
 */
Scene.prototype.objects = function(){
    return this._objects;
};

/**
 * обновить состояние объектов на сцене
 * и вызвать метод onUpdate()
 *
 * может быть вызван только из метода onUpdate класса Game
 */
Scene.prototype.update = function () {
    if( this.update.caller != Game.prototype.onUpdate )
        throw new Error( "Cant invoke method Scene::update() outside Game::onUpdate" );

    for( var i = 0; i < this._objects.length; i++ ) {
        if( this._objects[ i ]._needToDelete == true ) {
            this._objects.splice( i, 1 );
            console.log( this._objects.length );
        } else {
            this._objects[ i ].update();
        }
    }

    this.onUpdate();
};

/**
 * отобразить объекты на сцене и вызвать метод onDraw
 * @param {CanvasRenderingContext2D} context
 * @param {number} interp
 *
 * может быть вызван только из метода onFrameUpdate класса Game
 */
Scene.prototype.draw = function (context, interp) {
    if( this.draw.caller != Game.prototype.onFrameUpdate )
        throw new Error( "Cant invoke method Scene::draw() outside Game::onFrameUpdate" );

    for( var i = 0; i < this._objects.length; i++ ) {
        this._objects[ i ].draw(context, interp);
    }

    this.onDraw(context, interp);
};

/**
 * инициализация сцены
 * может быть вызван только из метода setScene класса Game
 */
Scene.prototype.init = function(){
    if( this.init.caller != Game.prototype.setScene )
        throw new Error( "Cant invoke method Scene::init() outside Game::setScene" );

    this.onInit();
};

/**
 * "деструктор"
 * может быть вызван только из метода setScene класса Game
 */
Scene.prototype.finish = function(){
    if( this.finish.caller != Game.prototype.setScene )
        throw new Error( "Cant invoke method Scene::finish() outside Game::setScene" );

    this.onFinish();


};

/**
 * Выполняется при инициализации сцены
 * @abstract
 */
Scene.prototype.onInit = function() {
};

/**
 * Выполняется каждый игровой тик
 * В данном методе реализуется обновление состояний сцены и объектов
 * @abstract
 */
Scene.prototype.onUpdate = function() {
};

/**
 * Выполняется при открисовке сцены
 * @param {CanvasRenderingContext2D} context - см. Game._context
 * @param {number} interp - см. Game._interp
 * @abstract
 */
Scene.prototype.onDraw = function(context, interp) {
};

/**
 * обработчик событий, поступивших от пользователя
 * @param {Event} event - событие
 * @abstract
 */
Scene.prototype.onEvent = function(event) {
};

/**
 * вызывается при завершении текущей сцены
 * @abstract
 */
Scene.prototype.onFinish = function() {
};