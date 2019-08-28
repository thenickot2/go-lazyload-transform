package main

import (
	"C"
	"github.com/jbowtie/gokogiri"
	"regexp"
	"strings"
)

// LazyLoad maintains the String representation of the page html and options to use during transformation
type LazyLoad struct {
	html string
}

// renderString is a wrapper for tests, as "testing" is incompatible with CGo and thus CStrings
func renderString(html string) string {
	return C.GoString(Render(C.CString(html)))
}

// Render transforms the HTML for LazyLoading
//export Render
func Render(html *C.char) *C.char {
	// Parse the web page
	doc, _ := gokogiri.ParseHtml([]byte(C.GoString(html)))

	// Move src to data-src for all images
	imgs, _ := doc.Search("//img")
	for i := 0; i < len(imgs); i++ {
		imgs[i].SetAttr("data-src", imgs[i].Attr("src"))
		imgs[i].SetAttr("src", "")
	}

	// Move inline styles for background images to data-background-image
	inlineStyleNodes, _ := doc.Search("//*[contains(@style, background)]")
	r, _ := regexp.Compile(`url\((?:['"]?)((?:http|https)\://.*?)(?:['"]?)\)`)
	for i := 0; i < len(inlineStyleNodes); i++ {
		match := r.FindStringSubmatch(inlineStyleNodes[i].Attr("style"))
		if len(match) == 2 {
			inlineStyleNodes[i].SetAttr("data-background-image", match[1])
			placeholderImg := strings.ReplaceAll(inlineStyleNodes[i].Attr("style"), match[1], "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==")
			inlineStyleNodes[i].SetAttr("style", placeholderImg)
		}
	}

	stringRep := C.CString(doc.String())
	doc.Free()

	return stringRep
}

func main() {}
