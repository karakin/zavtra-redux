/**
 * Created by Nikolaj on 25.10.2016.
 */

var Game = function(context, width, height) {

    this._active = false;
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
        throw new Error( "Game::start(): _context is undefined" );
    }
    if( this._width == undefined ) {
        throw new Error( "Game::start(): _width is undefined" );
    }
    if( this._height == undefined ) {
        throw new Error( "Game::start(): _height is undefined" );
    }


    console.log( "Game::start()", "width", this._width,"height", this._height );
    this._active = true;
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
    this._active = false;
    clearInterval(this.mainLoopTimer);
};


Game.prototype.restart = function() {

};

Game.prototype.init = function() {
    console.log( "Game::init()" );
    this.setScene( new IntroScene( this ) );
};



Game.prototype.onFrameUpdate = function(){

    this._context.clearRect( 0, 0, this._width, this._height );

    if( this._scene != undefined ) {
        this._scene.onDraw( this._context, this._interp );
    }

    this._context.save();
    this._context.fillStyle = "#FFFFFF";
    this._context.font = "10px Arial";
    this._context.textAlign="right";
    this._context.fillText( "Powered By Ledorub Engine", this._width - 15, 15 );
    this._context.restore();
};

Game.prototype.onUpdate = function(){
    if( this._scene != undefined ) {
        this._scene.onUpdate();
    }
};

Game.prototype.onEvent = function(event) {

    if( this._active ) {
        console.log( "Game::onEvent", event.type );

        if( this._scene != undefined ) {
            this._scene.onEvent( event );
        }
    }

};


Game.prototype.setScene = function(scene){

    if( scene == undefined ) {
        throw new Error( "Game::setScene() Scene is undefined" );
    }

    console.log( this._scene, "->", scene.constructor, scene );

    if( this._scene != undefined ) {
        this._scene.onFinish();
    }

    scene.onInit();
    this._scene = scene;
};

