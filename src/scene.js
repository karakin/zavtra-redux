/**
 * Created by Nikolaj on 25.10.2016.
 */
var Scene = function(_game) {
    this._gameRef = _game;

    if( this.constructor === Scene ){
        throw new Error("GameState is abstract");
    }
};

Scene.prototype.onInit = function() {
    throw new Error("Scene::onInit is abstract method");
};

Scene.prototype.onUpdate = function() {
    throw new Error("Scene::onUpdate is abstract method");
};

Scene.prototype.onDraw = function(context, interp) {
    throw new Error("Scene::onDraw is abstract method");
};

Scene.prototype.onEvent = function(event) {
    throw new Error("Scene::onEvent is abstract method");
};

Scene.prototype.onFinish = function(event) {
    throw new Error("Scene::onFinish is abstract method");
};