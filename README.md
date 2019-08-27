# go-lazyload-transform

**IN DEVELOPMENT**

Node package written in Go to transform html to support the lazy loading of images clientside

## Benchmark
To compare to cheerio, run `node ./benchmark/cheerio`. This benchmark's cheerio implementation is a direct implementation of the functionality written in Go, following best practices from the cheerio documentation.

On a `Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz` this library is roughly 6-7x faster at parsing and manipulating 1494 lines of html.

```
LazyLoad Completed In: 9ms
Cheerio Completed In: 70ms
```

## Development
To test the go library run `go test`.
To test the node wrapper run `npm test`. Node wrapper should always be tested after updating go library.

To generate lazyload.so / lazyload.dylib / lazyload.dll required for the node binding, run `go build -o lazyload.so -buildmode=c-shared lazyload.go`
