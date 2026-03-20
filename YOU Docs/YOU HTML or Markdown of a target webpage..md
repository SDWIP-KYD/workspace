# Contents

POST https://ydc-index.io/v1/contents
Content-Type: application/json

Returns the HTML or Markdown of a target webpage.

Reference: https://docs.you.com/api-reference/contents/contents

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: contents
  version: 1.0.0
paths:
  /v1/contents:
    post:
      operationId: contents
      summary: Returns the content of the web pages
      description: Returns the HTML or Markdown of a target webpage.
      tags:
        - ''
      parameters:
        - name: X-API-Key
          in: header
          description: >-
            A unique API Key is required to authorize API access. [Get your API
            Key with free credits](https://you.com/platform).
          required: true
          schema:
            type: string
      responses:
        '200':
          description: >-
            An array of JSON objects containing the page content of each web
            page
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: >-
                    #/components/schemas/V1ContentsPostResponsesContentApplicationJsonSchemaItems
        '401':
          description: Unauthorized. Problems with API key.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContentsRequestUnauthorizedError'
        '403':
          description: Forbidden. API key lacks scope for this path.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContentsRequestForbiddenError'
        '500':
          description: >-
            Internal Server Error during authentication/authorization
            middleware.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContentsRequestInternalServerError'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                urls:
                  type: array
                  items:
                    type: string
                    format: uri
                  description: Array of URLs to fetch the contents from.
                formats:
                  $ref: '#/components/schemas/ContentsFormats'
                crawl_timeout:
                  type: integer
                  default: 10
                  description: >-
                    Maximum time in seconds to wait for page content. Must be
                    between 1 and 60 seconds. Default is 10 seconds.
servers:
  - url: https://ydc-index.io
components:
  schemas:
    ContentsFormatsItems:
      type: string
      enum:
        - html
        - markdown
        - metadata
      title: ContentsFormatsItems
    ContentsFormats:
      type: array
      items:
        $ref: '#/components/schemas/ContentsFormatsItems'
      description: >-
        Array of content formats to return. All included formats are returned in
        the response. Include "metadata" to get JSON-LD and OpenGraph
        information, if available.
      title: ContentsFormats
    ContentsMetadata:
      type: object
      properties:
        site_name:
          type:
            - string
            - 'null'
          description: The OpenGraph site name of the web page.
        favicon_url:
          type: string
          description: The URL of the favicon of the web page's domain.
      description: >-
        Metadata about the web page. Only returned when 'metadata' is included
        in the formats array.
      title: ContentsMetadata
    V1ContentsPostResponsesContentApplicationJsonSchemaItems:
      type: object
      properties:
        url:
          type: string
          format: uri
          description: The webpage URL whose content has been fetched.
        title:
          type: string
          description: The title of the web page.
        html:
          type:
            - string
            - 'null'
          description: The retrieved HTML content of the web page.
        markdown:
          type:
            - string
            - 'null'
          description: The retrieved Markdown content of the web page.
        metadata:
          $ref: '#/components/schemas/ContentsMetadata'
      title: V1ContentsPostResponsesContentApplicationJsonSchemaItems
    ContentsRequestUnauthorizedError:
      type: object
      properties:
        detail:
          type: string
          description: Error detail message.
      title: ContentsRequestUnauthorizedError
    ContentsRequestForbiddenError:
      type: object
      properties:
        detail:
          type: string
      title: ContentsRequestForbiddenError
    ContentsRequestInternalServerError:
      type: object
      properties:
        detail:
          type: string
      title: ContentsRequestInternalServerError
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: >-
        A unique API Key is required to authorize API access. [Get your API Key
        with free credits](https://you.com/platform).

```

## SDK Code Examples

```python
# Use our official Python SDK to fetch the contents of a web page
from youdotcom import You
from youdotcom.models import ContentsFormats

with You("api_key") as you:
    res = you.contents.generate(
        urls=[
            "https://en.wikipedia.org/wiki/Main_Page",
        ],
        formats=[ContentsFormats.HTML],
    )

    # Print the fetched HTML content
    for page in res:
        print(f"Title: {page.title}")
        print(f"HTML: {page.html[:500]}...")  # First 500 chars

```

```typescript
// Use our official TypeScript SDK to fetch the contents of a web page
import { You } from "@youdotcom-oss/sdk";
import type { ContentsRequest } from "@youdotcom-oss/sdk/models/operations";

const you = new You({ apiKeyAuth: "api_key" });

const request: ContentsRequest = {
  urls: ["https://en.wikipedia.org/wiki/Main_Page"],
  formats: ["html", "metadata"],
};

const result = await you.contents(request);
console.log(result);

```

```javascript
// Use our official JavaScript SDK to fetch the contents of a web page
import { You } from "@youdotcom-oss/sdk";

const you = new You({ apiKeyAuth: "api_key" });

const request = {
  urls: ["https://en.wikipedia.org/wiki/Main_Page"],
  formats: ["html", "metadata"],
};

const result = await you.contents(request);
console.log(result);

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://ydc-index.io/v1/contents"

	payload := strings.NewReader("{\n  \"urls\": [\n    \"https://en.wikipedia.org/wiki/Main_Page\"\n  ],\n  \"formats\": [\n    \"html\",\n    \"metadata\"\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("X-API-Key", "<apiKey>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://ydc-index.io/v1/contents")
  .header("X-API-Key", "<apiKey>")
  .header("Content-Type", "application/json")
  .body("{\n  \"urls\": [\n    \"https://en.wikipedia.org/wiki/Main_Page\"\n  ],\n  \"formats\": [\n    \"html\",\n    \"metadata\"\n  ]\n}")
  .asString();
```

```csharp
using RestSharp;

var client = new RestClient("https://ydc-index.io/v1/contents");
var request = new RestRequest(Method.POST);
request.AddHeader("X-API-Key", "<apiKey>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"urls\": [\n    \"https://en.wikipedia.org/wiki/Main_Page\"\n  ],\n  \"formats\": [\n    \"html\",\n    \"metadata\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "X-API-Key": "<apiKey>",
  "Content-Type": "application/json"
]
let parameters = [
  "urls": ["https://en.wikipedia.org/wiki/Main_Page"],
  "formats": ["html", "metadata"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://ydc-index.io/v1/contents")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```