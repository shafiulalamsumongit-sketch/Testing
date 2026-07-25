# TheCatAPI — `GET /images/search` QA Test Suite (Postman)

This collection provides automated Postman tests for the endpoint:

```
GET https://api.thecatapi.com/v1/images/search?limit=2&mime_types=jpg
```

It covers **1 positive test case** and **12 negative / edge-case / security / performance test cases**, matching the SQA test case design documented for this endpoint.

---

## Files

| File | Purpose |
|---|---|
| `CatAPI_Images_Search_QA_Suite.postman_collection.json` | Postman collection — import this into Postman. Contains all 13 requests with `pm.test()` validation scripts in the **Tests** tab of each request. |
| `README.md` | This file. |

---

## Setup Instructions

1. **Install Postman** (desktop app or web) if not already installed: https://www.postman.com/downloads/
2. **Import the collection:**
   - Open Postman → click **Import** (top-left) → select `CatAPI_Images_Search_QA_Suite.postman_collection.json`.
3. **Verify collection variables:**
   - Click the collection name → **Variables** tab.
   - `baseUrl` is pre-set to `https://api.thecatapi.com/v1`.
   - `apiKey` is pre-set to the provided live key. Replace it with your own key if needed (Settings → get a free key at https://thecatapi.com/).
4. **Run individual requests:**
   - Select any request → click **Send** → check the **Test Results** tab to see pass/fail for each assertion.
5. **Run the full suite (Collection Runner):**
   - Click the collection → **Run** (or **Runner** button) → select all 13 requests → **Run TheCatAPI - Images Search - QA Test Suite**.
   - Review the summary report showing pass/fail counts per request.

---

## Test Cases Included

| # | Request Name | Focus | Expected Status |
|---|---|---|---|
| 1 | TC_CATAPI_IMG_001 | Valid `limit=2`, `mime_types=jpg` (positive) | 200 |
| 2 | TC_CATAPI_IMG_002 | Invalid API key | 401 / 403 |
| 3 | TC_CATAPI_IMG_003 | Missing API key | 200 (anon) / 401 |
| 4 | TC_CATAPI_IMG_004 | `limit=0` | 200 |
| 5 | TC_CATAPI_IMG_005 | `limit=1000` (exceeds max) | 200 (capped) / 400 |
| 6 | TC_CATAPI_IMG_006 | `limit=-1` (negative) | 400 / 200 |
| 7 | TC_CATAPI_IMG_007 | `limit=abc` (non-numeric) | 400 |
| 8 | TC_CATAPI_IMG_008 | `mime_types=exe` (unsupported) | 200 (empty) / 400 |
| 9 | TC_CATAPI_IMG_009 | `mime_types=jpg,png` (multiple) | 200 |
| 10 | TC_CATAPI_IMG_010 | `mime_types=` (empty) | 200 / 400 |
| 11 | TC_CATAPI_IMG_011 | SQL/script injection attempt | 200 / 400 (no leak) |
| 12 | TC_CATAPI_IMG_012 | Unsupported HTTP method (`POST`) | 404 / 405 |
| 13 | TC_CATAPI_IMG_013 | Response time / SLA check | 200, <1000ms |

---

## Validation Logic Implemented (per request)

Each request's **Tests** script (JavaScript, using `pm.test()` and Chai assertions) checks one or more of:

- **Status code** — exact match or acceptable range (`pm.response.to.have.status()` / `pm.expect(...).to.be.oneOf([...])`)
- **Response body type** — is a JSON array (`Array.isArray(body)`)
- **Result count** — matches requested `limit` or documented cap
- **Schema/field validation** — `id`, `url`, `width`, `height` present and correctly typed
- **MIME type / file extension check** — `url` ends with expected extension(s) via regex
- **Header validation** — `Content-Type: application/json`, rate-limit headers on anonymous calls
- **Error handling safety** — no `5xx` errors, no leaked stack traces or SQL error text on malformed/malicious input
- **Response time** — under an agreed SLA threshold (ms)

---

## Notes & Assumptions

- Some expected results (e.g., behavior on **invalid API key**, **empty `mime_types`**, **limit exceeding max**) are written as **acceptable ranges** (e.g., `200 or 400`) because TheCatAPI's exact validation behavior for these edge cases was not confirmed against live responses at design time. When running this suite:
  - If a request consistently returns a status **outside** the expected range in the script, treat it as a **potential defect** and update the assertion once actual behavior is confirmed and documented.
- The API key included in `baseUrl`/`apiKey` variables is a **live key** — treat it as a secret. Do not commit it to public repositories. Rotate it if it has been shared elsewhere.
- TC_CATAPI_IMG_011 (injection test) sends special characters in the query string; some HTTP clients/environments may URL-encode these automatically. This is expected and does not invalidate the test.
- Response time thresholds (1000ms, 2000ms) are placeholders — adjust to match your team's actual agreed SLA.

---

## Next Steps (Optional Enhancements)

- Add a **Postman environment file** to separate `dev`/`staging`/`prod` values instead of collection-level variables.
- Integrate with **Newman** (Postman's CLI runner) for CI/CD pipeline execution:
  ```bash
  npm install -g newman
  newman run CatAPI_Images_Search_QA_Suite.postman_collection.json
  ```
- Export results in JUnit/HTML format via Newman reporters for test reporting dashboards.
