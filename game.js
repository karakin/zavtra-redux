/**
 * Created by Nikolaj on 25.10.2016.
 */

var Game = function(context, width, height) {

    this._scene = null;

    this._tps = 50;

    this._loops = 0;
    this._skipTicks = 1000 / this._tps;
    this._maxFrameSkip = 10;
    this._nextGameTick = 0;
    this._interp = 0.0;


    this._context = context;
    this._width = width;
    this._height = height;

};

Game.prototype.start = function(){

    if( this._context == undefined ) {
        throw new Error( "_context is undefined" );
    }
    if( this._width == undefined ) {
        throw new Error( "_width is undefined" );
    }
    if( this._height == undefined ) {
        throw new Error( "_height is undefined" );
    }


    console.log( "Game::start()", "width", this._width,"height", this._height );

    this._nextGameTick = (new Date()).getTime();

    this.mainLoopTimer = setInterval( function(_game){
        _game._loops = 0;
        while( (new Date()).getTime() > _game._nextGameTick && _game._loops < _game._maxFrameSkip ) {
            updateStats.update();
            _game.onUpdate();

            _game._nextGameTick += _game._skipTicks;
            _game._loops++;
        }

        _game._interp = ( (new Date()).getTime() + _game._skipTicks - _game._nextGameTick ) / _game._skipTicks;

        renderStats.update();
        _game.onFrameUpdate();

    }, 0, this);
};

Game.prototype.stop = function(){
    console.log( "Game::stop()" );
    this.active = false;
    clearInterval(this.mainLoopTimer);
};


Game.prototype.restart = function() {

};

Game.prototype.init = function() {
    console.log( "Game::init()" );
    this.setScene( new IntroScene( this ) );
};



Game.prototype.onFrameUpdate = function(){
    if( this._scene != undefined ) {
        this._scene.onDraw( this._context, this._interp );
    }
};

Game.prototype.onUpdate = function(){
    if( this._scene != undefined ) {
        this._scene.onUpdate();
    }
};

Game.prototype.onEvent = function(event) {

    console.log( "Game::onEvent", event.type );

    if( this._scene != undefined ) {
        this._scene.onEvent( event );
    }
};


Game.prototype.setScene = function(scene){
    console.log( this._scene, "->", scene.constructor, scene );
    this._scene = scene;
};

