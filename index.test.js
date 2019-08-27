/* eslint-disable no-undef */
const { Render } = require('./index.js')

test('Render calls go binding', () => {
  const input = `<!DOCTYPE html>
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

  const output = Render(input)

  const expected = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Test Website</title>
</head>
<body>
  <div>
    <img src="" data-src="https://google.com/my-image.jpg">
  </div>
</body>
</html>
`
  expect(output).toEqual(expected)
})
