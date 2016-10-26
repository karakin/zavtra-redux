/**
 * Created by Nikolaj on 25.10.2016.
 *
 * Главный класс игры. Реализует игровой цикл с постоянной скоростью обновления игровых состояний,
 * которая не зависит от переменного FPS.
 */

/**
 * конструктор класса Game
 * @param context CanvasRenderingContext2D - ссылка на текущий контекст отрисовки
 * @param width integer - ширина игрового экрана
 * @param height integer - высота игрового экрана
 * @constructor
 */
var Game = function(context, width, height) {

    /**
     *
     * @type {boolean}
     * @private
     */
    this._active = false;

    /**
     * текущая сцена
     * @type Scene
     * @private
     */
    this._scene = null;

    /**
     * количество тиков в секунду (постоянная скорость обновления)
     * @type {number}
     * @private
     */
    this._tps = 50;

    this._loops = 0;
    this._skipTicks = 1000 / this._tps;
    this._maxFrameSkip = 10;
    this._nextGameTick = 0;

    /**
     * относительная позиция во времени между текущи    м и следующим кадрами
     * @type {number}
     * @private
     */
    this._interp = 0.0;


    /**
     * текущий контекст отрисовки
     * @type CanvasRenderingContext2D
     * @private
     */
    this._context = context;

    /**
     * ширина игрового экрана
     * @type {number}
     * @private
     */
    this._width = width;

    /**
     * высота игрового экрана
     * @type {number}
     * @private
     */
    this._height = height;




};

/**
 * получить ширину игрового экрана
 * @returns {number}
 */
Game.prototype.width = function () {
    return this._width;
};

/**
 * получить высоту игрового экрана
 * @returns {number}
 */
Game.prototype.height = function() {
    return this._height;
};


/**
 * запуск игрового цикла
 */
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
            debug.updateStatsWidget().update();
            _game.onUpdate();

            _game._nextGameTick += _game._skipTicks;
            _game._loops++;
        }

        _game._interp = ( (new Date()).getTime() + _game._skipTicks - _game._nextGameTick ) / _game._skipTicks;

        debug.renderStatsWidget().update();
        _game.onFrameUpdate();

    }, 0, this);
};

/**
 * остановка игрового цикла
 */
Game.prototype.stop = function(){
    console.log( "Game::stop()" );
    this._active = false;
    clearInterval(this.mainLoopTimer);
};

/**
 * перезапуск игры
 */
Game.prototype.restart = function() {
    this.stop();
    this.init();
    this.start();
};

/**
 * инициализация игры перед запуском
 */
Game.prototype.init = function() {
    console.log( "Game::init()" );
    this.setScene( "IntroScene" );
};


/**
 * Метод отрисовки игры
 * Выполняется настолько быстро, насколько это возможно
 */
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

/**
 * Метод обновления состояний игры
 * Выполняется this._tps раз в секунду
 */
Game.prototype.onUpdate = function(){
    if( this._scene != undefined ) {
        this._scene.onUpdate();
    }
};

/**
 * обработчик событий
 * @param event Event
 */
Game.prototype.onEvent = function(event) {

    if( this._active ) {
        console.log( "Game::onEvent()", event.type );

        if( this._scene != undefined ) {
            this._scene.onEvent( event );
        }
    }

};

/**
 * устанавливает текущую сцену по имени класса сцены
 * @param scene string имя класса сцены
 */
Game.prototype.setScene = function(scene){

    console.log( "Game::setScene()", scene );

    if( window[scene] == undefined )
        throw new Error( "Game::setScene() " + scene + " does not name a type" );

    var sceneToInstantiate = new window[ scene ](this);

    if( sceneToInstantiate == undefined ) {
        throw new Error( "Game::setScene() Scene is undefined" );
    }

    if( this._scene != undefined ) {
        this._scene.onFinish();
    }

    sceneToInstantiate.onInit();
    this._scene = sceneToInstantiate;
};

/**
 * получить текущую сцену
 * @returns {Scene|*}
 */
Game.prototype.scene = function () {
    return this._scene;
};

