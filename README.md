# go-lazyload-transform

**IN DEVELOPMENT**

Node package written in Go to transform html to support the lazy loading of images clientside

## Benchmark
To compare to cheerio, run `node ./benchmark/cheerio`. This benchmark's cheerio implementation only implements moving `img.src` to `data-src` and not the other features of the Go LazyLoader.

On a `Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz` is roughly 4x faster.

```
LazyLoad Completed In: 14ms
Cheerio Completed In: 57ms
```

## Development
To test the go library run `go test`.
To test the node wrapper run `npm test`. Node wrapper should always be tested after updating go library.

To generate lazyload.so / lazyload.dylib / lazyload.dll required for the node binding, run `go build -o lazyload.so -buildmode=c-shared lazyload.go`
