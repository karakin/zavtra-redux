/**
 * Created by Nikolaj on 28.10.2016.
 * Базовый класс для всех объектов, расположенных на сцене
 */

var Component = function(object){
    /**
     * ссылка на родительский объект
     * @protected
     */
    this._objectRef = object;


};

var TransformComponent = function(object){
    Component.apply(this, arguments);

    this._x = 0;
    this._y = 0;

    this._width = 0;
    this._height = 0;
};

TransformComponent.prototype = Object.create(Component.prototype);
TransformComponent.prototype.constructor = TransformComponent;

TransformComponent.prototype.x = function(){
    return this._x;
};

TransformComponent.prototype.y = function(){
    return this._y;
};

TransformComponent.prototype.width = function(){
    return this._width;
};

TransformComponent.prototype.height = function(){
    return this._height;
};

/**
 * получить положение объекта
 * @returns {Point}
 */
TransformComponent.prototype.position = function(){
    return new Point( this._x, this._y );
};

/**
 * 
 * @returns {Rect}
 */
TransformComponent.prototype.rect = function () {
    return new Rect( this._x, this._y, this._width, this._height );
};



TransformComponent.prototype.setX = function(x){
    this._x = x;
};

TransformComponent.prototype.setY = function(y){
    this._y = y;
};

var Collider = function(object){
    Component.apply(this, arguments);
};

Collider.prototype = Object.create(Component.prototype);
Collider.prototype.constructor = Collider;

Collider.prototype.draw = function(context, interp){
    context.fillStyle = "#FF0000";
    context.rect( this._objectRef.transform().x(), this._objectRef.transform().y(), 10, 10 );
    context.stroke();
};






var GameObject = function(){

    /**
     * имя объекта
     * @type {string}
     * @private
     */
    this._objectName = "";

    this._transform = new TransformComponent( this );
    this._components = [ this._transform ];

    this._transform.setX( Math.floor(Math.random() * (800 + 1) ) );
    this._transform.setY( Math.floor(Math.random() * (600 + 1) )  );

    this._speed = ( Math.random() * 5 ) + 1;

    this._dx = this._speed;
    this._dy = this._speed;

    this._needToDelete = false;

};

/**
 * получить компонент трансформации
 * @returns {TransformComponent}
 */
GameObject.prototype.transform = function(){
    return this._transform;
};

/**
 *
 * @param type
 * @returns {*}
 */
GameObject.prototype.getComponent = function(type){
    for( var i = 0; i < this._components.length; i++ ) {
        if( this._components[ i ] instanceof type )
            return this._components[ i ];
    }
    return undefined;
};

/**
 * проверить наличие компонента у объекта
 * @param type
 * @returns {boolean}
 */
GameObject.hasComponent = function(type){
    for( var i = 0; i < this._components.length; i++ ) {
        if( this._components[ i ] instanceof type )
            return true;
    }
    return false;
};

/**
 *
 * @param component
 */
GameObject.prototype.addComponent = function(component){
   this._components.push( component );
};

/**
 * получить имя объекта
 * @returns {string}
 */
GameObject.prototype.name = function(){
    return this._objectName;
};

/**
 * установить имя объекта
 * @param {string} name - новое имя объекта
 */
GameObject.prototype.setName = function (name) {
    this._objectName = name;
};

GameObject.prototype.update = function(){



    if( this._transform.x() - this._dx < 0 ) {
        this._transform.setX( 3 );
        this._dx *= -1;
    }

    if( this._transform.x() + this._dx > 1000 ) {
        this._dx *= -1;
    }

    this._transform.setX( Math.floor( this._transform.x() + this._dx ));


    if( this._transform.y() - this._dy < 0 ){
        this._transform.setY( 3 );
        this._dy *= -1;
    }

    if( ( this._transform.y() + this._dy > 650 ) ) {
        this._dy *= -1;
    }


    this._transform.setY( Math.floor( this._transform.y() + this._dy ));

};

GameObject.prototype.deleteLater = function(){
    this._needToDelete = true;
};

GameObject.prototype.draw = function(context, interp){
    context.fillStyle = "#000000";
    context.fillText( this._objectName + "\n" + this._transform.x() + ":" + this._transform.y(), this._transform.x() + this._dx * interp, this._transform.y() + this._dy * interp );

};



var Agregato = function(){
    GameObject.apply(this, arguments);

    this._objectName = "agregato";



};
Agregato.prototype = Object.create(GameObject.prototype);
Agregato.prototype.constructor = Agregato;

Agregato.prototype.draw = function(context, interp){
    GameObject.prototype.draw.call(this, context, interp);
    //context.drawImage(window["resource_1"], this._transform.x() + this._dx * interp, this._transform.y() + this._dy * interp, 50, 50);


};


var IceAxe = function(){
    GameObject.apply(this, arguments);
};
IceAxe.prototype = Object.create(GameObject.prototype);
IceAxe.prototype.constructor = IceAxe;

IceAxe.prototype.draw = function(context, interp){

    //context.drawImage(window["resource_2"], this._transform.x() + this._dx * interp, this._transform.y() + this._dy * interp, 50, 50);

};