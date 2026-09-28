# Backend Stub

Minimal FastAPI service that shows how the Incident Copilot talks to Hindsight.

## Run

```bash
pip install -r requirements.txt

# Optional: point at your Hindsight instance
export HINDSIGHT_URL=http://localhost:8888
export HINDSIGHT_BANK_ID=org-incidents

uvicorn main:app --reload --port 8000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health + whether Hindsight client is available |
| POST | `/incident` | Send `{ "description": "..." }` → recommendation + evidence |
| POST | `/retain` | Push a post-mortem text into the Hindsight bank |

When Hindsight is not reachable the `/incident` endpoint falls back to the same simulated responses used by the website demo.
