var TestScene = function(_game) {
    Scene.apply( this, arguments );
};

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;


TestScene.prototype.onInit = function() {
    for( var i = 0; i < 10; i++ )
        this.addObject( new Agregato() );
};

TestScene.prototype.onEvent = function(event) {
    console.log( "TestScene::event()", event );

    if( event.type === "keydown" && event.keyCode === 13 ) {
        this._objects.push( new Agregato() );
    }

    if( event.type === "keydown" && event.keyCode === 8 ) {
        this._gameRef.setScene( "IntroScene" );
    }


};