var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.utilities = armyc2.c2sd.renderer.utilities || {};

/**
 * 
 * @param {HTML5 Canvas} image
 * @param {SO.Point} centerPoint
 * @param {SO.Rectangle} symbolBounds
 * @param {SO.Rectangle} bounds
 * @returns {ImageInfo}
 */
armyc2.c2sd.renderer.utilities.ImageInfo = function (image, centerPoint, symbolBounds, bounds) {
    this._canvas = image;
    this._center = centerPoint;
    this._symbolBounds = symbolBounds;
    this._bounds = bounds;
};
    /**
     * 
     * @returns {String}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.toDataUrl = function(){
        return this._canvas.toDataURL();
    };
    /**
     * 
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getImage = function(){
        return this._canvas;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Point}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getCenterPoint = function(){
        return this._center;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getSymbolBounds = function (){
        return this._symbolBounds;
    };
    /**
     * 
     * @returns {armyc2.c2sd.renderer.so.Rectangle}
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getImageBounds = function(){
        return this._bounds;
    };
    
    /**
     * Returns an image icon.  It is a square image which may contain some empty
     * space but is ideal for tree node images so that the look is consistent.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getSquareIcon = function(){
        var iwidth, iheight;
        if(this._bounds.getWidth() >= this._bounds.getHeight())
        {
            iwidth = this._bounds.getWidth();
            iheight = this._bounds.getWidth();
        }
        else if(this._bounds.getWidth() < this._bounds.getHeight())
        {
            iwidth = this._bounds.getHeight();
            iheight = this._bounds.getHeight();
        }

        var width = this._bounds.getWidth();
        var height = this._bounds.getHeight();

        var x = (iwidth - width)/2;
        var y = (iheight - height)/2;

        var buffer = document.createElement('canvas');
        buffer.width = iwidth;
        buffer.height = iheight;
        
        var ctx = buffer.getContext('2d');
        
        ctx.drawImage(this.getImage(),x,y);
        
        //test
        /*ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0,0,buffer.width,buffer.height);//*/
        
        return buffer;
        
    };

    /**
     * Fits the symbol in the image such that when the image is centerd on the 
     * destination point, the symbol will be in the correct place.  
     * Will make some images larger with dead space so that the symbol is 
     * centered properly.
     * @returns {HTML5 canvas} HTML5 canvas
     */
    armyc2.c2sd.renderer.utilities.ImageInfo.prototype.getCenteredImage = function(){
        var image = this._canvas,
            bi = null,
            x = 0,
            y = 0,
            height = image.height,
            width = image.width,
            point = this._center;
        
        
        try
        {
            if(point.getY() > height - point.getY())
            {
                height = (point.getY() * 2.0);
                y=0;
            }
            else
            {
                height = ((height - point.getY()) * 2);
                y = ((height / 2) - point.getY());
            }

            if(point.getX() > width - point.getX())
            {
                width = (point.getX() * 2.0);
                x=0;
            }
            else
            {
                width = ((width - point.getX()) * 2);
                x = ((width / 2) - point.getX());
            }


            bi = document.createElement('canvas');
            bi.width = width;
            bi.height = height;
            var ctx = bi.getContext('2d');
            ctx.drawImage(image,x,y);
            
            //test
            /*ctx.lineWidth = 1;
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(0,0,bi.width,bi.height);//*/
        }
        catch(err)
        {
            armyc2.c2sd.renderer.utilities.ErrorLogger.LogException("ImageInfo","getCenteredImage",err);
        }
        
        return bi;
    };