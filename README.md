# go-lazyload-transform

**IN DEVELOPMENT**

Node package written in Go to transform html to support the lazy loading of images clientside

## Benchmark
To compare to cheerio, run `node ./benchmark/cheerio`. This benchmark's cheerio implementation is a direct implementation of the functionality written in Go, following best practices from the cheerio documentation.

On a `Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz` this library is roughly 9-10x faster at parsing and manipulating 1494 lines of html.

```
LazyLoad Completed In: 7ms
Cheerio Completed In: 70ms
```

## Development
To test the go library run `go test lazyload.go lazyload_test.go`.
To test the node wrapper run `npm test`. Node wrapper should always be tested after updating go library.

To generate `lazyload.h` and `lazyload.a` required for the node binding, run `go build -buildmode=c-archive -o lazyload.a lazyload.go` followed by `node-gyp build` to update the bindings.
