# Search

GET https://ydc-index.io/v1/search

This endpoint is designed to return LLM-ready web results based on a user's query. Based on a classification mechanism, it can return web results and news associated with your query. If you need to feed an LLM with the results of a query that sounds like `What are the latest geopolitical updates from India`, then this endpoint is the right one for you.

Reference: https://docs.you.com/api-reference/search/v1-search

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: search
  version: 1.0.0
paths:
  /v1/search:
    get:
      operationId: search
      summary: Returns a list of unified search results from web and news sources
      description: >-
        This endpoint is designed to return LLM-ready web results based on a
        user's query. Based on a classification mechanism, it can return web
        results and news associated with your query. If you need to feed an LLM
        with the results of a query that sounds like `What are the latest
        geopolitical updates from India`, then this endpoint is the right one
        for you.
      tags:
        - ''
      parameters:
        - name: query
          in: query
          description: >-
            The search query used to retrieve relevant results from the web. You
            can also include [search
            operators](https://docs.you.com/search/search-operators) to refine
            your search.
          required: true
          schema:
            type: string
            default: Your query
        - name: count
          in: query
          description: >-
            Specifies the maximum number of search results to return per section
            (the sections are `web` and `news`. See the JSON response to
            visualize them).
          required: false
          schema:
            type: integer
            default: 10
        - name: freshness
          in: query
          description: >-
            Specifies the freshness of the results to return. Provide either one
            of `day`, `week`, `month`, `year`, or a date range string in the
            format `YYYY-MM-DDtoYYYY-MM-DD`.


            When your search query includes a temporal keyword and you also set
            a freshness parameter, the search will use the broader (i.e., less
            restrictive) of the two timeframes. For example, if you use
            `query=news+this+week&freshness=month`, the results will use a
            freshness of month.
          required: false
          schema:
            $ref: '#/components/schemas/V1SearchGetParametersFreshness'
        - name: offset
          in: query
          description: >-
            Indicates the `offset` for pagination. The `offset` is calculated in
            multiples of `count`. For example, if `count = 5` and `offset = 1`,
            results 5–10 will be returned. Range `0 ≤ offset ≤ 9`.
          required: false
          schema:
            type: integer
        - name: country
          in: query
          description: >-
            The country code that determines the geographical focus of the web
            results.
          required: false
          schema:
            $ref: '#/components/schemas/V1SearchGetParametersCountry'
        - name: language
          in: query
          description: >-
            The language of the web results that will be returned (BCP 47
            format).
          required: false
          schema:
            $ref: '#/components/schemas/Language'
        - name: safesearch
          in: query
          description: >-
            Configures the safesearch filter for content moderation. This allows
            you to decide whether to return NSFW content or not.
          required: false
          schema:
            $ref: '#/components/schemas/V1SearchGetParametersSafesearch'
        - name: livecrawl
          in: query
          description: >-
            Indicates which section(s) of search results to livecrawl and return
            full page content.
          required: false
          schema:
            $ref: '#/components/schemas/V1SearchGetParametersLivecrawl'
        - name: livecrawl_formats
          in: query
          description: Indicates the format of the livecrawled content.
          required: false
          schema:
            $ref: '#/components/schemas/V1SearchGetParametersLivecrawlFormats'
        - name: crawl_timeout
          in: query
          description: >-
            Maximum time in seconds to wait for page content when `livecrawl` is
            enabled. Must be between 1 and 60 seconds. Default is 10 seconds.
          required: false
          schema:
            type: integer
            default: 10
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
            A JSON object containing unified search results from web and news
            sources
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/search_Response_200'
        '401':
          description: Unauthorized. Problems with API key.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchRequestUnauthorizedError'
        '403':
          description: Forbidden. API key lacks scope for this path.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchRequestForbiddenError'
        '500':
          description: >-
            Internal Server Error during authentication/authorization
            middleware.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchRequestInternalServerError'
servers:
  - url: https://ydc-index.io
components:
  schemas:
    Freshness:
      type: string
      enum:
        - day
        - week
        - month
        - year
      description: Specifies the freshness of the results to return.
      title: Freshness
    V1SearchGetParametersFreshness:
      oneOf:
        - $ref: '#/components/schemas/Freshness'
        - type: string
      title: V1SearchGetParametersFreshness
    Country:
      type: string
      enum:
        - AR
        - AU
        - AT
        - BE
        - BR
        - CA
        - CL
        - DK
        - FI
        - FR
        - DE
        - HK
        - IN
        - ID
        - IT
        - JP
        - KR
        - MY
        - MX
        - NL
        - NZ
        - 'NO'
        - CN
        - PL
        - PT
        - PH
        - RU
        - SA
        - ZA
        - ES
        - SE
        - CH
        - TW
        - TR
        - GB
        - US
      description: >-
        The country code that determines the geographical focus of the web
        results.
      title: Country
    V1SearchGetParametersCountry:
      oneOf:
        - $ref: '#/components/schemas/Country'
        - type: string
      title: V1SearchGetParametersCountry
    Language:
      type: string
      enum:
        - AR
        - EU
        - BN
        - BG
        - CA
        - ZH-HANS
        - ZH-HANT
        - HR
        - CS
        - DA
        - NL
        - EN
        - EN-GB
        - ET
        - FI
        - FR
        - GL
        - DE
        - EL
        - GU
        - HE
        - HI
        - HU
        - IS
        - IT
        - JP
        - KN
        - KO
        - LV
        - LT
        - MS
        - ML
        - MR
        - NB
        - PL
        - PT-BR
        - PT-PT
        - PA
        - RO
        - RU
        - SR
        - SK
        - SL
        - ES
        - SV
        - TA
        - TE
        - TH
        - TR
        - UK
        - VI
      default: EN
      title: Language
    SafeSearch:
      type: string
      enum:
        - 'off'
        - moderate
        - strict
      description: >-
        Configures the safesearch filter for content moderation. This allows you
        to decide whether to return NSFW content or not.
      title: SafeSearch
    V1SearchGetParametersSafesearch:
      oneOf:
        - $ref: '#/components/schemas/SafeSearch'
        - type: string
      title: V1SearchGetParametersSafesearch
    LiveCrawl:
      type: string
      enum:
        - web
        - news
        - all
      description: >-
        Indicates which section(s) of search results to livecrawl and return
        full page content.
      title: LiveCrawl
    V1SearchGetParametersLivecrawl:
      oneOf:
        - $ref: '#/components/schemas/LiveCrawl'
        - type: string
      title: V1SearchGetParametersLivecrawl
    LiveCrawlFormats:
      type: string
      enum:
        - html
        - markdown
      description: Indicates the format of the livecrawled content.
      title: LiveCrawlFormats
    V1SearchGetParametersLivecrawlFormats:
      oneOf:
        - $ref: '#/components/schemas/LiveCrawlFormats'
        - type: string
      title: V1SearchGetParametersLivecrawlFormats
    Contents:
      type: object
      properties:
        html:
          type: string
          description: The HTML content of the page.
        markdown:
          type: string
          description: The Markdown content of the page.
      description: Contents of the page if livecrawl was enabled.
      title: Contents
    V1SearchGetResponsesContentApplicationJsonSchemaResultsWebItems:
      type: object
      properties:
        url:
          type: string
          description: The URL of the specific search result.
        title:
          type: string
          description: The title or name of the search result.
        description:
          type: string
          description: A brief description of the content of the search result.
        snippets:
          type: array
          items:
            type: string
          description: >-
            An array of text snippets from the search result, providing a
            preview of the content.
        thumbnail_url:
          type: string
          description: URL of the thumbnail.
        page_age:
          type: string
          format: date-time
          description: The age of the search result.
        contents:
          $ref: '#/components/schemas/Contents'
        authors:
          type: array
          items:
            type: string
          description: An array of authors of the search result.
        favicon_url:
          type: string
          description: The URL of the favicon of the search result's domain.
      title: V1SearchGetResponsesContentApplicationJsonSchemaResultsWebItems
    V1SearchGetResponsesContentApplicationJsonSchemaResultsNewsItems:
      type: object
      properties:
        title:
          type: string
          description: The title of the news result.
        description:
          type: string
          description: A brief description of the content of the news result.
        page_age:
          type: string
          format: date-time
          description: UTC timestamp of the article's publication date.
        thumbnail_url:
          type: string
          description: URL of the thumbnail.
        url:
          type: string
          description: The URL of the news result.
        contents:
          $ref: '#/components/schemas/Contents'
      title: V1SearchGetResponsesContentApplicationJsonSchemaResultsNewsItems
    V1SearchGetResponsesContentApplicationJsonSchemaResults:
      type: object
      properties:
        web:
          type: array
          items:
            $ref: >-
              #/components/schemas/V1SearchGetResponsesContentApplicationJsonSchemaResultsWebItems
        news:
          type: array
          items:
            $ref: >-
              #/components/schemas/V1SearchGetResponsesContentApplicationJsonSchemaResultsNewsItems
      title: V1SearchGetResponsesContentApplicationJsonSchemaResults
    V1SearchGetResponsesContentApplicationJsonSchemaMetadata:
      type: object
      properties:
        search_uuid:
          type: string
          format: uuid
        query:
          type: string
          description: Returns the search query used to retrieve the results.
        latency:
          type: number
          format: double
      title: V1SearchGetResponsesContentApplicationJsonSchemaMetadata
    search_Response_200:
      type: object
      properties:
        results:
          $ref: >-
            #/components/schemas/V1SearchGetResponsesContentApplicationJsonSchemaResults
        metadata:
          $ref: >-
            #/components/schemas/V1SearchGetResponsesContentApplicationJsonSchemaMetadata
      title: search_Response_200
    SearchRequestUnauthorizedError:
      type: object
      properties:
        detail:
          type: string
          description: Error detail message.
      title: SearchRequestUnauthorizedError
    SearchRequestForbiddenError:
      type: object
      properties:
        detail:
          type: string
      title: SearchRequestForbiddenError
    SearchRequestInternalServerError:
      type: object
      properties:
        detail:
          type: string
      title: SearchRequestInternalServerError
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
# Use our official Python SDK to run a web search
from youdotcom import You

with You("api_key") as you:
  results = you.search.unified(
    query="What are the latest geopolitical updates from India",
    count=10
  )

  # Print web results with snippets
  # Snippets are query-relevant text excerpts extracted from each page,
  # highlighting the passages most relevant to your search query
  if results.results and results.results.web:
      for result in results.results.web:
          print(f"{result.title}")
          if result.snippets:
              print(f"  {result.snippets[0]}\n")

```

```typescript
// Use our official TypeScript SDK to run a web search
import { You } from "@youdotcom-oss/sdk";
import type { SearchRequest } from "@youdotcom-oss/sdk/models/operations";

const you = new You({ apiKeyAuth: "api_key" });

const request: SearchRequest = {
  query: "What are the latest geopolitical updates from India",
};

const result = await you.search(request);
console.log(result.metadata);
console.log(result.results?.web);

```

```javascript
// Use our official JavaScript SDK to run a web search
import { You } from "@youdotcom-oss/sdk";

const you = new You({ apiKeyAuth: "api_key" });

const request = {
  query: "What are the latest geopolitical updates from India",
};

const result = await you.search(request);
console.log(result.metadata);
console.log(result.results?.web);

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://ydc-index.io/v1/search?query=What+are+the+latest+geopolitical+updates+from+India&count=10"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("X-API-Key", "<apiKey>")

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

HttpResponse<String> response = Unirest.get("https://ydc-index.io/v1/search?query=What+are+the+latest+geopolitical+updates+from+India&count=10")
  .header("X-API-Key", "<apiKey>")
  .asString();
```

```csharp
using RestSharp;

var client = new RestClient("https://ydc-index.io/v1/search?query=What+are+the+latest+geopolitical+updates+from+India&count=10");
var request = new RestRequest(Method.GET);
request.AddHeader("X-API-Key", "<apiKey>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["X-API-Key": "<apiKey>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://ydc-index.io/v1/search?query=What+are+the+latest+geopolitical+updates+from+India&count=10")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

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