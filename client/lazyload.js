// Based on https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
document.addEventListener('DOMContentLoaded', function () {
  var LAZY_CLASS_NAME = 'lazyload-transform'
  var lazyImages = [].slice.call(document.querySelectorAll('img.' + LAZY_CLASS_NAME))

  if ('IntersectionObserver' in window) {
    var lazyImageObserver = new window.IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImage.srcset = lazyImage.dataset.srcset
          lazyImage.classList.remove(LAZY_CLASS_NAME)
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage)
    })
  } else {
    // IE fallback
    var active = false

    var lazyLoad = function () {
      if (active === false) {
        active = true

        setTimeout(function () {
          lazyImages.forEach(function (lazyImage) {
            if (
              (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) &&
                window.getComputedStyle(lazyImage).display !== 'none'
            ) {
              lazyImage.src = lazyImage.dataset.src
              lazyImage.srcset = lazyImage.dataset.srcset
              lazyImage.classList.remove(LAZY_CLASS_NAME)

              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage
              })

              if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad)
                window.removeEventListener('resize', lazyLoad)
                window.removeEventListener('orientationchange', lazyLoad)
              }
            }
          })

          active = false
        }, 200)
      }
    }

    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
  }
})
