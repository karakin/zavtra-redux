/**
 * Created by Nikolaj on 25.10.2016.
 */

var IntroScene = function(_game) {
    Scene.apply( this, arguments );

    this._internalTimer = 0;

};

IntroScene.prototype = Object.create(Scene.prototype);
IntroScene.prototype.constructor = IntroScene;


IntroScene.prototype.onDraw = function (context, interp) {

    context.save();
    context.fillStyle = "#000000";
    context.fillRect( 0, 0, this._gameRef.width(), this._gameRef.height() );

    context.textAlign = "center";

    context.fillStyle = "#FFFFFF";
    context.font = "50px Arial";

    context.fillText("The Game of #Zavtra", Math.floor( this._gameRef.width() / 2 ), Math.floor( this._gameRef.height() / 2 ));

    context.fillStyle = "#9c0000";
    context.font = "25px Arial";
    context.fillText("Redux", Math.floor( this._gameRef.width() / 2 ) + 200, Math.floor( this._gameRef.height() / 2 ) + 25 );

    context.fillStyle = "#FFFFFF";
    context.font = ( Math.floor( Math.cos( this._internalTimer * 0.2 ) * 5 ) + 25 ) + "px Arial";
    context.fillText("Нажмите Enter для начала игры", Math.floor( this._gameRef.width() / 2 ), this._gameRef.height() - 35 );



    context.restore();
};

IntroScene.prototype.onInit = function() {
};

IntroScene.prototype.onUpdate = function() {
    if( this._internalTimer + 1 > 10000 ) {
        this._internalTimer = 0;
    }
    this._internalTimer++;
};

IntroScene.prototype.onEvent = function(event) {
    console.log( "IntoScene::event()", event );

    if( event.type === "keydown" && event.keyCode == 13 ) {
        //this._gameRef.setScene( null );
    }

};

IntroScene.prototype.onFinish = function(event) {
};