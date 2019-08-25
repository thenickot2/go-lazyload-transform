# go-lazyload-transform
Node package written in Go to transform html to support the lazy loading of images clientside

## Development
To test the go library run `go test`.
To test the node wrapper run `npm test`. Node wrapper should always be tested after updating go library.

To generate lazyload.so for the shared node binding, run `go build -o lazyload.so -buildmode=c-shared lazyload.go`
