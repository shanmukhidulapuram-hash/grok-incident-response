#!/usr/bin/env bash
# Start Hindsight locally for the Incident Copilot demo
set -euo pipefail

if [[ -z "${OPENAI_API_KEY:-}${AZURE_OPENAI_API_KEY:-}" ]]; then
  echo "Set OPENAI_API_KEY or AZURE_OPENAI_API_KEY before running."
  exit 1
fi

KEY="${OPENAI_API_KEY:-$AZURE_OPENAI_API_KEY}"

echo "Starting Hindsight on http://localhost:8888 ..."
docker run --rm -it \
  -p 8888:8888 \
  -e HINDSIGHT_API_LLM_API_KEY="$KEY" \
  -v "$HOME/.hindsight-docker:/home/hindsight/.pg0" \
  ghcr.io/vectorize-io/hindsight:latest
