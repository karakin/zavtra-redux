/**
 * Created by Nikolaj on 25.10.2016.
 */

var IntroScene = function(_game) {
    Scene.apply( this, arguments );
};

IntroScene.prototype = Object.create(Scene.prototype);
IntroScene.prototype.constructor = IntroScene;

IntroScene.prototype.onDraw = function (context, interp) {
    context.fillStyle = "#FF00FF";
    context.fillRect( 0, 0, 10, 100 );
};

IntroScene.prototype.onInit = function() {
};

IntroScene.prototype.onUpdate = function() {
};

IntroScene.prototype.onEvent = function(event) {
};

IntroScene.prototype.onFinish = function(event) {
};