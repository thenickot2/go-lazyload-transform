package main

import (
	"testing"
	"io/ioutil"
)

func TestImageSrc(t *testing.T) {
	clientJS, _ := ioutil.ReadFile("./client/lazyload.js")

	input := `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Test Website</title>
</head>
<body>
  <div>
    <img src="https://google.com/my-image.jpg">
  </div>
</body>
</html>
`

	output := renderString(input)

	expected := `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Test Website</title>
</head>
<body>
  <div>
    <img src="" data-src="https://google.com/my-image.jpg">
  </div>
<script type="text/javascript">`+string(clientJS)+`</script>
</body>
</html>
`

	if expected != output {
		t.Error("output is not expected:\n", output, "\n", expected)
	}
}

func TestBackgroundImageSrc(t *testing.T) {
	clientJS, _ := ioutil.ReadFile("./client/lazyload.js")

	input := `<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Test Website</title>
</head>
<body>
	<div>
		<div style="background-image:url(https://google.com/my-image.jpg);"></div>
		<div style="background-image:url('https://google.com/my-image.jpg');"></div>
		<div style='background-image:url("https://google.com/my-image.jpg");'></div>
	</div>
</body>
</html>
`

	output := renderString(input)

	expected := `<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Test Website</title>
</head>
<body>
	<div>
		<div style="background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==);" data-background-image="https://google.com/my-image.jpg"></div>
		<div style="background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');" data-background-image="https://google.com/my-image.jpg"></div>
		<div style='background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==");' data-background-image="https://google.com/my-image.jpg"></div>
	</div>
<script type="text/javascript">`+string(clientJS)+`</script>
</body>
</html>
`

	if expected != output {
		t.Error("output is not expected:\n", output, "\n", expected)
	}
}
