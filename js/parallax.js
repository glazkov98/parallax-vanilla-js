/** Class representing a Parallax. */
class Parallax {

	/**
     * Create a Parallax instance.
     * @param {string} selector - CSS selector.
     * @param {Object} options - Object with options.
     */
	constructor(selector, options) {
		if (!selector || !options) return false;

		this.selector = selector;
		this.imageSelector = options.imageSelector || '';
		this.window = window;
		this.document = document;
	}

	/** Initialization method. */
	init() {
		this.$element = this.document.querySelector(this.selector);
		if (this.$element == null) return false;

		this.$elementImage = this.$element.querySelector(this.imageSelector);
		if (this.$elementImage == null) return false;

		this.setEventListeners();
	}

	/** Set events listeners method. */
	setEventListeners() {
		this.window.addEventListener('load', () => { this.parallax(); });
		this.window.addEventListener('scroll', () => { this.parallax(); });
		this.window.addEventListener('resize', () => { this.parallax(); });
	}

	/** Parallax method. */
	parallax() {
		let containerHeight;

		if (this.window.innerWidth < 601) {
			containerHeight = this.$element.clientHeight > 0 ? this.$element.clientHeight : this.$elementImage.clientHeight;
		} else {
			containerHeight = this.$element.clientHeight > 0 ? this.$element.clientHeight : 500;
		}

		const imageHeight = this.$elementImage.clientHeight;
		const parallaxDist = imageHeight - containerHeight;
		const bottom = (this.$element.getBoundingClientRect().top + this.window.pageYOffset) + containerHeight;
		const top = this.$element.getBoundingClientRect().top + this.window.pageYOffset;
		const scrollTop = this.window.pageYOffset;
		const windowHeight = this.window.innerHeight;
		const windowBottom = scrollTop + windowHeight;
		const percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
		const parallax = Math.round(parallaxDist * percentScrolled);

		if (bottom > scrollTop && top < scrollTop + windowHeight) {
			this.$elementImage.style.transform = `translate3D(0, ${parallax}px, 0)`;
		}
	}
}

(new Parallax('.parallax', {
	imageSelector: '.parallax-img'
})).init();