var TestScene = function(_game) {
    Scene.apply( this, arguments );



};

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;


TestScene.prototype.onDraw = function (context, interp) {
    for( var i = 0; i < this._objects.length; i++ ) {
        this._objects[ i ].draw(context, interp);
    }
};

TestScene.prototype.onInit = function() {
    for( var i = 0; i < 1; i++ )
        this._objects.push( new Agregato() );
};

TestScene.prototype.onUpdate = function() {

    for( var i = 0; i < this._objects.length; i++ ) {
        if( this._objects[ i ]._needToDelete == true ) {
            this._objects.splice( i, 1 );
            console.log( this._objects.length );
        } else {
            this._objects[ i ].update();
        }
    }



};

TestScene.prototype.onEvent = function(event) {
    console.log( "TestScene::event()", event );

    if( event.type == "keydown" && event.keyCode == 13 ) {
        this._objects.push( new Agregato() );
    }

    if( event.type == "keydown" && event.keyCode == 8 ) {
        this._gameRef.setScene( "IntroScene" );
    }


};

TestScene.prototype.onFinish = function(event) {
};