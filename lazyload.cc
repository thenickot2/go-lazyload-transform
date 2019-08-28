#include <node.h>
#include "lazyload.h"

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void RenderMethod (const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() < 1) {
      // Throw an Error that is passed back to JavaScript
      isolate->ThrowException(v8::Exception::TypeError(
          String::NewFromUtf8(isolate, "Wrong number of arguments")));
      return;
    }

    // Check the argument types
    if (!args[0]->IsString()) {
      isolate->ThrowException(v8::Exception::TypeError(
          String::NewFromUtf8(isolate, "Wrong arguments")));
      return;
    }

    v8::String::Utf8Value html(args[0]->ToString());
    std::string htmlStr(*html);
    char *htmlCStr = new char[htmlStr.length() + 1];
    // TODO: Remove by converting go to use const char*
    strcpy(htmlCStr, htmlStr.c_str());

    // Call exported Go function, which returns a C string
    char* result = Render(htmlCStr);

  args.GetReturnValue().Set(String::NewFromUtf8(isolate, result));
  delete result;
}

// add method to exports
void Init (Local<Object> exports) {
  NODE_SET_METHOD(exports, "render", RenderMethod);
}

// create module
NODE_MODULE(lazyload, Init)