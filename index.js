'use strict';

let bbComponent = require('bb-component'),
    constValues = bbComponent.constValues,
    ComponentResult = bbComponent.ComponentResult,
    Component = bbComponent.Component;

class ImageFinder extends Component {
    constructor(controllerCallBacks) {
        super(controllerCallBacks, [constValues.componentOutputTypes.keywords]);
    }

    _executeIfReady() {
        if(this._flickrProvider && this._keywords) {
            this._flickrProvider.photos.search({
                text: this._keywords[0],
                page: 1,
                per_page: 500,
                extras: ['url_c']
            }, (err, result) => {
                if (err) {
                    this._controllerCallBacks.error(err);
                    return;
                }
                this._controllerCallBacks.result(new ComponentResult(constValues.componentOutputTypes.imageURL, result.photos.photo[0].url_c));
                this._controllerCallBacks.finish();
            });
        }
    }

    setProvider(flickrProvider) {
        this._flickrProvider = flickrProvider;
        this._executeIfReady();
    }

    dataInput(keywords) {
        this._keywords = keywords;
        this._executeIfReady();
    }

    execute() {
        this._controllerCallBacks.providerRequest(constValues.providerTypes.flickr);
    }
}

module.exports = ImageFinder;
