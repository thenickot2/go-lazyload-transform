package main

import (
	"fmt"
	"github.com/jbowtie/gokogiri"
	"io/ioutil"
	"net/http"
)

func main() {
	// Fetch and read a web page
	resp, _ := http.Get("https://luxuryhomeconsultants.com/")
	page, _ := ioutil.ReadAll(resp.Body)

	// Parse the web page
	doc, _ := gokogiri.ParseHtml(page)

	// Move src to data-src for all images
	imgs, _ := doc.Search("//img")
	for i := 0; i < len(imgs); i++ {
		imgs[i].SetAttr("data-src", imgs[i].Attr("src"))
		imgs[i].SetAttr("src", "")
	}
	inlineStyleNodes, _ := doc.Search("//@style")
	fmt.Println(inlineStyleNodes)

	doc.Free()
}
