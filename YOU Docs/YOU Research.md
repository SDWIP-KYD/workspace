# Research

POST https://api.you.com/v1/research
Content-Type: application/json

Research goes beyond a single web search. In response to your question, it runs multiple searches, reads through the sources, and synthesizes everything into a thorough, well-cited answer. Use it when a question is too complex for a simple lookup, and when you need a response you can actually trust and verify.

Reference: https://docs.you.com/api-reference/research/v1-research

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: research
  version: 1.0.0
paths:
  /v1/research:
    post:
      operationId: research
      summary: Returns comprehensive research-grade answers with multi-step reasoning
      description: >-
        Research goes beyond a single web search. In response to your question,
        it runs multiple searches, reads through the sources, and synthesizes
        everything into a thorough, well-cited answer. Use it when a question is
        too complex for a simple lookup, and when you need a response you can
        actually trust and verify.
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
            A JSON object containing a comprehensive answer with citations and
            supporting search results
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/research_Response_200'
        '401':
          description: Unauthorized. Problems with API key.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResearchRequestUnauthorizedError'
        '403':
          description: Forbidden. API key lacks scope for this path.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResearchRequestForbiddenError'
        '422':
          description: Unprocessable Entity. Request validation failed.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResearchRequestUnprocessableEntityError'
        '500':
          description: >-
            Internal Server Error during authentication/authorization
            middleware.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResearchRequestInternalServerError'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                input:
                  type: string
                  description: >-
                    The research question or complex query requiring in-depth
                    investigation and multi-step reasoning.


                    Note: The maximum length of the input is 40,000 characters.
                research_effort:
                  $ref: >-
                    #/components/schemas/V1ResearchPostRequestBodyContentApplicationJsonSchemaResearchEffort
                  description: >-
                    Controls how much time and effort the Research API spends on
                    your question. Higher effort levels run more searches and
                    dig deeper into sources, at the cost of a longer response
                    time.


                    Available levels:

                    - `lite`: Returns answers quickly. Good for straightforward
                    questions that just need a fast, reliable answer.

                    - `standard`: The default. Balances speed and depth, a good
                    fit for most questions.

                    - `deep`: Spends more time researching and cross-referencing
                    sources. Use this when accuracy and thoroughness matter more
                    than speed.

                    - `exhaustive`: The most thorough option. Explores the topic
                    as fully as possible, best suited for complex research tasks
                    where you want the highest quality result.
              required:
                - input
servers:
  - url: https://api.you.com
components:
  schemas:
    V1ResearchPostRequestBodyContentApplicationJsonSchemaResearchEffort:
      type: string
      enum:
        - lite
        - standard
        - deep
        - exhaustive
      default: standard
      description: >-
        Controls how much time and effort the Research API spends on your
        question. Higher effort levels run more searches and dig deeper into
        sources, at the cost of a longer response time.


        Available levels:

        - `lite`: Returns answers quickly. Good for straightforward questions
        that just need a fast, reliable answer.

        - `standard`: The default. Balances speed and depth, a good fit for most
        questions.

        - `deep`: Spends more time researching and cross-referencing sources.
        Use this when accuracy and thoroughness matter more than speed.

        - `exhaustive`: The most thorough option. Explores the topic as fully as
        possible, best suited for complex research tasks where you want the
        highest quality result.
      title: V1ResearchPostRequestBodyContentApplicationJsonSchemaResearchEffort
    V1ResearchPostResponsesContentApplicationJsonSchemaOutputContentType:
      type: string
      enum:
        - text
      description: The format of the content field.
      title: V1ResearchPostResponsesContentApplicationJsonSchemaOutputContentType
    V1ResearchPostResponsesContentApplicationJsonSchemaOutputSourcesItems:
      type: object
      properties:
        url:
          type: string
          description: The URL of the source webpage.
        title:
          type: string
          description: The title of the source webpage.
        snippets:
          type: array
          items:
            type: string
          description: >-
            Relevant excerpts from the source page that were used in generating
            the answer.
      required:
        - url
      title: V1ResearchPostResponsesContentApplicationJsonSchemaOutputSourcesItems
    V1ResearchPostResponsesContentApplicationJsonSchemaOutput:
      type: object
      properties:
        content:
          type: string
          description: >-
            The comprehensive response with inline citations. The content is
            formatted in Markdown and includes numbered citations that reference
            the items in the sources array.
        content_type:
          $ref: >-
            #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaOutputContentType
          description: The format of the content field.
        sources:
          type: array
          items:
            $ref: >-
              #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaOutputSourcesItems
          description: A list of web sources used to generate the answer.
      required:
        - content
        - content_type
        - sources
      description: The research output containing the answer and sources.
      title: V1ResearchPostResponsesContentApplicationJsonSchemaOutput
    research_Response_200:
      type: object
      properties:
        output:
          $ref: >-
            #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaOutput
          description: The research output containing the answer and sources.
      required:
        - output
      title: research_Response_200
    ResearchRequestUnauthorizedError:
      type: object
      properties:
        detail:
          type: string
          description: Error detail message.
      title: ResearchRequestUnauthorizedError
    ResearchRequestForbiddenError:
      type: object
      properties:
        detail:
          type: string
      title: ResearchRequestForbiddenError
    V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsLocItems:
      oneOf:
        - type: string
        - type: integer
      title: V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsLocItems
    V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsInput:
      oneOf:
        - type: string
        - type: object
          additionalProperties:
            description: Any type
      description: The input value that caused the error.
      title: V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsInput
    V1ResearchPostResponsesContentApplicationJsonSchemaDetailItems:
      type: object
      properties:
        type:
          type: string
          description: The validation error type.
        loc:
          type: array
          items:
            $ref: >-
              #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsLocItems
          description: >-
            The location of the error as a path of segments (strings for field
            names, integers for byte offsets).
        msg:
          type: string
          description: A human-readable description of the error.
        input:
          $ref: >-
            #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaDetailItemsInput
          description: The input value that caused the error.
        ctx:
          type: object
          additionalProperties:
            description: Any type
          description: Additional context about the error.
      required:
        - type
        - loc
        - msg
        - input
      title: V1ResearchPostResponsesContentApplicationJsonSchemaDetailItems
    ResearchRequestUnprocessableEntityError:
      type: object
      properties:
        detail:
          type: array
          items:
            $ref: >-
              #/components/schemas/V1ResearchPostResponsesContentApplicationJsonSchemaDetailItems
      title: ResearchRequestUnprocessableEntityError
    ResearchRequestInternalServerError:
      type: object
      properties:
        detail:
          type: string
      title: ResearchRequestInternalServerError
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
from youdotcom import You
from youdotcom.models import ResearchEffort

you = You(api_key_auth="api_key")

res = you.research(
    input="Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?",
    research_effort=ResearchEffort.LITE,
)

print(res.output.content)

print(f"\n--- {len(res.output.sources)} sources ---")
for i, source in enumerate(res.output.sources, 1):
    print(f"[{i}] {source.title or 'Untitled'}: {source.url}")

```

```typescript
import { You } from "@youdotcom-oss/sdk";
import type { ResearchRequest } from "@youdotcom-oss/sdk/models/operations";
import { ResearchEffort } from "@youdotcom-oss/sdk/models/operations";

const you = new You({ apiKeyAuth: "api_key" });

const request: ResearchRequest = {
  input: "Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?",
  researchEffort: ResearchEffort.Lite,
};

const result = await you.research(request);

console.log(result.output.content);

console.log(`\n--- ${result.output.sources.length} sources ---`);
result.output.sources.forEach((s, i) => {
  console.log(`[${i + 1}] ${s.title ?? s.url}: ${s.url}`);
});

```

```javascript
import { You } from "@youdotcom-oss/sdk";
import { ResearchEffort } from "@youdotcom-oss/sdk/models/operations";

const you = new You({ apiKeyAuth: "api_key" });

const result = await you.research({
  input: "Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?",
  researchEffort: ResearchEffort.Lite,
});

console.log(result.output.content);

console.log(`\n--- ${result.output.sources.length} sources ---`);
result.output.sources.forEach((s, i) => {
  console.log(`[${i + 1}] ${s.title ?? s.url}: ${s.url}`);
});

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

	url := "https://api.you.com/v1/research"

	payload := strings.NewReader("{\n  \"body\": {\n    \"input\": \"Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?\",\n    \"research_effort\": \"lite\"\n  }\n}")

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

HttpResponse<String> response = Unirest.post("https://api.you.com/v1/research")
  .header("X-API-Key", "<apiKey>")
  .header("Content-Type", "application/json")
  .body("{\n  \"body\": {\n    \"input\": \"Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?\",\n    \"research_effort\": \"lite\"\n  }\n}")
  .asString();
```

```csharp
using RestSharp;

var client = new RestClient("https://api.you.com/v1/research");
var request = new RestRequest(Method.POST);
request.AddHeader("X-API-Key", "<apiKey>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"body\": {\n    \"input\": \"Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?\",\n    \"research_effort\": \"lite\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "X-API-Key": "<apiKey>",
  "Content-Type": "application/json"
]
let parameters = ["body": [
    "input": "Which global cities improved air quality the most over the past 10 years, and what measurable actions contributed?",
    "research_effort": "lite"
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.you.com/v1/research")! as URL,
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