/* eslint-disable */
// Based on https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/

if (document.readyState === "complete"  || document.readyState === "loaded" || document.readyState === "interactive") {
    // DOM Already ready - probably turbolinks initialized
    initLazyLoad();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      initLazyLoad();
    });
  }
  
  function initLazyLoad() {
    var LAZY_CLASS_NAME = 'lazyload-transform';
    var PLACEHOLDER_PIXEL =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    var lazyImages = [].slice.call(
      document.querySelectorAll('.' + LAZY_CLASS_NAME)
    );
  
    /**
     * Transform the HTML DOM Node to have the correct image source
     * @param {Node} element
     * @return {Node}
     */
    function transform(element) {
      // Check for "data-src", "data-srcset" and "data-background-image"
      if (element.dataset.src) {
        element.src = element.dataset.src;
      }
      if (element.dataset.srcset) {
        element.srcset = element.dataset.srcset;
      }
      if (element.dataset.backgroundImage) {
        var style = element.getAttribute('style');
        style = style.replace(PLACEHOLDER_PIXEL, element.dataset.backgroundImage);
        element.setAttribute('style', style);
      }
  
      element.classList.remove(LAZY_CLASS_NAME);
      return element;
    }
  
    // Check if browser supports IntersectionObserver (non IE)
    if ('IntersectionObserver' in window) {
      var lazyImageObserver = new window.IntersectionObserver(function(
        entries,
        observer
      ) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Image is in viewport - transform and unobserve
            const lazyImage = entry.target;
            transform(lazyImage);
  
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // IE fallback
      var active = false;
  
      var lazyLoad = function() {
        if (active === false) {
          active = true;
  
          // Throttle checking of viewport with "active" and timeout of 200ms
          setTimeout(function() {
            lazyImages.forEach(function(lazyImage) {
              if (
                lazyImage.getBoundingClientRect().top <= window.innerHeight &&
                lazyImage.getBoundingClientRect().bottom >= 0 &&
                window.getComputedStyle(lazyImage).display !== 'none'
              ) {
                // Image is in viewport - transform and remove class to stop tracking
                transform(lazyImage);
  
                lazyImages = lazyImages.filter(function(image) {
                  return image !== lazyImage;
                });
  
                if (lazyImages.length === 0) {
                  document.removeEventListener('scroll', lazyLoad);
                  window.removeEventListener('resize', lazyLoad);
                  window.removeEventListener('orientationchange', lazyLoad);
                }
              }
            });
  
            active = false;
          }, 200);
        }
      };
  
      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
    }
  }