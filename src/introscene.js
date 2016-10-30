/**
 * Created by Nikolaj on 25.10.2016.
 */

var IntroScene = function(_game) {
    Scene.apply( this, arguments );

    this._y = 0;
    this._dy = 0;

    this._isLoaded = true;

    this._loadCount = 0;
    this._maxCount = -1;


    this._progressBarWidth = this._gameRef.width() - 60;
    this._progressBarLoadedWidth = 0;

};

IntroScene.prototype = Object.create(Scene.prototype);
IntroScene.prototype.constructor = IntroScene;


IntroScene.prototype.onDraw = function (context, interp) {

    context.fillStyle = "#000000";
    context.fillRect( 0, 0, this._gameRef.width(), this._gameRef.height() );
    if( this._isLoaded == true ) {

        context.textAlign = "center";

        context.fillStyle = "#FFFFFF";
        context.font = "50px Arial";

        context.fillText("The Game of #Zavtra", Math.floor( this._gameRef.width() / 2 ), Math.floor( this._gameRef.height() / 2 ));

        context.fillStyle = "#9c0000";
        context.font = "25px Arial";
        context.fillText("Redux", Math.floor( this._gameRef.width() / 2 ) + 200, Math.floor( this._gameRef.height() / 2 ) + 25 );


        context.fillStyle = "#FFFFFF";
        context.font = ( Math.abs(this._y + this._dy * interp) + 20 ) + "px Arial";
        context.fillText("Нажмите Enter для начала игры", Math.floor(this._gameRef.width() / 2), this._gameRef.height() - 50);
    } else {
        context.fillStyle = "#FFFFFF";

        context.fillRect( 30, this._gameRef.height()-10, this._progressBarWidth, 10 );
        context.fillStyle = "#FF0000";
        context.fillRect( 30, this._gameRef.height()-10, this._progressBarLoadedWidth, 10 );
        context.fillStyle = "#FFFFFF";
        context.fillText("Загрузка", Math.floor(this._gameRef.width() / 2), this._gameRef.height() - 50);
    }

};

IntroScene.prototype.onInit = function() {
    this._y = 0;
    this._dy = 0;
};

IntroScene.prototype.onUpdate = function() {
    this._dy = Math.sin( this._gameRef.getFixedTime() / 5 );
    this._y += this._dy;


    if( !this._isLoaded && this._loadCount == this._maxCount )
        this._isLoaded = true;

    this._progressBarLoadedWidth = this._progressBarWidth * ( this._loadCount / this._maxCount );


};

IntroScene.prototype.onEvent = function(event) {
    console.log( "IntoScene::event()", event.type );

    if( this._isLoaded && event.type === "keydown" && event.keyCode == 13 ) {
        this._gameRef.setScene( "TestScene" );
    }

    if( event.type === "resource" ) {
        if( event.detail.loaded ) {
            this._loadCount = event.detail.total;
            this._maxCount = event.detail.max;
        }
    }

};