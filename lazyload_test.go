package main

import "testing"

func TestImageSrc(t *testing.T) {
	input := `
	<html>
	<head>
		<title>Test Website</title>
	</head>
	<body>
		<div>
			<img src="https://google.com/my-image.jpg" />
		</div>
	</body>
	</html>
	`

	lazyLoad := LazyLoad{html: input}
	output := Render(lazyLoad)

	expected := `
	<html>
	<head>
		<title>Test Website</title>
	</head>
	<body>
		<div>
			<img data-src="https://google.com/my-image.jpg" src="" />
		</div>
	</body>
	</html>
	`

	if expected != output {
		t.Error("output is not expected:\n", output, "\n", expected)
	}
}
