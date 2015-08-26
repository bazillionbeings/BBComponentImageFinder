'use strict';

var Component = require('./Component');
var constValues = require('./constValues.json');
var ComponentResult = require('./ComponentResult.js');

function ImageFinder(controllerCallBacks, dataStore) {
	Component.call(this, controllerCallBacks, dataStore, [constValues.componentOutputTypes.keywords]);
	this._controllerCallBacks = controllerCallBacks;
}

ImageFinder.prototype = Object.create(Component.prototype);

ImageFinder.prototype.setProvider = function(flickrProvider) {
	var self = this;
	flickrProvider.photos.search({
		text : this._inputs[constValues.componentOutputTypes.keywords][0],
		page : 1,
		per_page : 500,
		extras : [ 'url_c' ]
	}, function(err, result) {
		if (err) {
			self._controllerCallBacks.error(err);
			return;
		}
		self._controllerCallBacks.finish(new ComponentResult(constValues.componentOutputTypes.imageURL, result.photos.photo[0].url_c));
	});
};

ImageFinder.prototype.execute = function() {
	this._controllerCallBacks.providerRequest(constValues.providerTypes.flickr);
};

module.exports = ImageFinder;
