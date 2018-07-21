/**
 * @class ImageFactory
 * Used to prerender/prefetch images from a remote resource to append quickly
 */
class ImageFactory {
    availableImgs = [];
    availableImgUrls = [];

    /**
     * Allows default urls to be loaded initially
     * @param urls {Array<string>}: optional array of urls
     */
    constructor (urls = []) {
        if (urls.length > 0) {
            this.refillImgUrls(urls);
        }
        if (this.checkAvailableImgUrls() > 0) {
            this.createImgTag();
            this.createImgTag();
        }
    };

    /**
     * Used to check for available rendered img elements
     * @return {number}
     */
    checkAvailableImgs () {
        return this.availableImgs.length;
    };

    /**
     * Used to add an array of img elements (temp storage)
     * @param images {Array<HTMLElement>}
     */
    addAvailableImages (images) {
        images = images.filter(img => img.nodeName === "IMG");
        this.availableImgs.concat(images);
    };

    /**
     * Used to add a single img element to availableImages
     * @param image
     */
    addAvailableImage (image) {
        this.availableImgs.push(image);
    };

    /**
     * Fetches rendered image, or returns a message of empty factory
     * @return {HTMLElement|Object}
     */
    getImg () {
        if (this.checkAvailableImgs() > 0 && this.checkAvailableImgUrls() > 1) {
            // if there are available imgs and more than one available url
            // make a new img and return the available one

            this.createImgTag();
            return this.availableImgs.shift()
        } else if (this.checkAvailableImgs() > 0) {
            // else if there is an available image but only 1 or none available urls
            // simply return the image

            return this.availableImgs.shift();
        } else {
            // else if there are no available imgs

            if (this.checkAvailableImgUrls() > 0) {
                // create one if there is an available url

                this.createImgTag();
                return this.availableImgs.shift();
            } else {
                // else return an error if there are no urls or imgs available

                return {error: 'There are no images available!'};
            }
        }
    };

    /**
     * Check how many urls are available
     * @return {number}
     */
    checkAvailableImgUrls () {
        return this.availableImgUrls.length;
    };

    /**
     * return an array of all available urls
     * @return {Array}
     */
    getAvailableUrls () {
        return this.availableImgUrls;
    };

    /**
     * return the next queued url
     * @return {String}
     */
    getSingleAvailableUrl () {
        return this.availableImgUrls.shift();
    };

    /**
     * Add an array of urls to the pool of available images.
     * @param urls {Array<string>}
     */
    refillImgUrls (urls) {
        this.availableImgUrls.concat(urls);
    };

    /**
     * Method to create the img HTMLElement
     */
    createImgTag () {
        const img = document.createElement('img');
        img.src = this.getSingleAvailableUrl();
        this.addAvailableImage(img);
    };
}