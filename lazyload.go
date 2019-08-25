package main

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/jbowtie/gokogiri"
	"regexp"
)

func main() {
	js.Global.Set("lazyload", map[string]interface{}{
		"New": New,
	})
}

type LazyLoad struct {
	html string
}

func New(html string) *js.Object {
	return js.MakeWrapper(&LazyLoad{html})
}

func (lazyLoad *LazyLoad) Render() string {
	// Parse the web page
	doc, _ := gokogiri.ParseHtml([]byte(lazyLoad.html))

	// Move src to data-src for all images
	imgs, _ := doc.Search("//img")
	for i := 0; i < len(imgs); i++ {
		imgs[i].SetAttr("data-src", imgs[i].Attr("src"))
		imgs[i].SetAttr("src", "")
	}

	// Move inline styles for background images to data-background-image
	inlineStyleNodes, _ := doc.Search("//*[@style]")
	r, _ := regexp.Compile(`url\((?:['\"]?)((?:http|https)\://.*?)(?:['\"]?)\)`)
	for i := 0; i < len(inlineStyleNodes); i++ {
		match := r.FindStringSubmatch(inlineStyleNodes[i].Attr("style"))
		if len(match) == 2 {
			inlineStyleNodes[i].SetAttr("data-background-image", match[1])
			imgs[i].SetAttr("style", r.ReplaceAllString(inlineStyleNodes[i].Attr("style"), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="))
		}
	}

	return doc.String()
}
