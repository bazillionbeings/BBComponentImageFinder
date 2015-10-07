'use strict';

let bbComponent = require('bb-component'),
    constValues = bbComponent.constValues,
    ComponentResult = bbComponent.ComponentResult,
    Component = bbComponent.Component;

ImageFinder.prototype.execute = function () {
    this._controllerCallBacks.providerRequest(constValues.providerTypes.flickr);
};

class ImageFinder extends Component {
    constructor(controllerCallBacks) {
        super(controllerCallBacks, [constValues.componentOutputTypes.keywords]);
    }

    _executeIfReady() {
        if(this._flickrProvider && this._keywords) {
            flickrProvider.photos.search({
                text: this._keywords[0],
                page: 1,
                per_page: 500,
                extras: ['url_c']
            }, (err, result) => {
                if (err) {
                    this._controllerCallBacks.error(err);
                    return;
                }
                this._controllerCallBacks.finish(new ComponentResult(constValues.componentOutputTypes.imageURL, result.photos.photo[0].url_c));
            });
        }
    }

    setProvider(flickrProvider) {
        this._flickrProvider = flickrProvider;
        _executeIfReady();
    }

    dataInput(keywords) {
        this._keywords = keywords;
        _executeIfReady();
    }

    execute() {
        this._controllerCallBacks.providerRequest(constValues.providerTypes.flickr);
    }
}

module.exports = ImageFinder;
