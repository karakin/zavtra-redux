/**
 * Created by Nikolaj on 28.10.2016.
 */
/**
 * 
 * @param gameRef
 * @constructor
 */
var ResourceManager = function(gameRef){

    /**
     * ссылка на игру
     */
    this._gameRef = gameRef;
    this._resources = [];


};

/**
 * добавить изображение в список ресурсов игры
 * @param resourceName
 * @param resourceUrl
 */
ResourceManager.prototype.addImage = function(resourceName, resourceUrl) {
};

/**
 * добавить звук в список ресурсов игры
 * @param resourceName
 * @param resourceUrl
 */
ResourceManager.prototype.addSound = function(resourceName, resourceUrl) {
};

/**
 *
 * @param resource
 * @private
 */
ResourceManager.prototype._add = function(resource){
    this._resources.push( resource );
};

/**
 *
 * @param name
 */
ResourceManager.prototype.get = function(name){
};

/**
 *
 */
ResourceManager.prototype.load = function(){
    for( var i = 0; i < this._resources.length; i++ ) {
    }
};

/**
 *
 */
ResourceManager.prototype.loaded = function(){
};

