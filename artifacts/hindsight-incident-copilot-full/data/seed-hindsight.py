#!/usr/bin/env python3
"""
Seed sample incidents into a running Hindsight instance.

Prerequisites:
  pip install hindsight-client
  Hindsight server running on http://localhost:8888
  (or set HINDSIGHT_URL / HINDSIGHT_API_KEY)

Usage:
  python seed-hindsight.py
"""

import json
import os
from pathlib import Path

try:
    from hindsight_client import Hindsight
except ImportError:
    print("Please install: pip install hindsight-client")
    raise SystemExit(1)

BANK_ID = os.getenv("HINDSIGHT_BANK_ID", "org-incidents")
BASE_URL = os.getenv("HINDSIGHT_URL", "http://localhost:8888")

def main():
    data_path = Path(__file__).parent / "sample-incidents.json"
    with open(data_path) as f:
        data = json.load(f)

    client = Hindsight(base_url=BASE_URL)
    print(f"Seeding bank '{BANK_ID}' at {BASE_URL} ...")

    for inc in data["incidents"]:
        content = f"""Incident {inc['id']} ({inc['date']}) — Service: {inc['service']}
Symptoms: {inc['symptoms']}
Root cause: {inc['root_cause']}
Resolution: {inc['resolution']}
Tags: {', '.join(inc['tags'])}
Related runbook: {inc.get('runbook', 'N/A')}
"""
        client.retain(bank_id=BANK_ID, content=content)
        print(f"  retained {inc['id']}")

    for rb in data["runbooks"]:
        steps = "\n".join(f"{i+1}. {s}" for i, s in enumerate(rb["steps"]))
        content = f"Runbook: {rb['name']}\nSteps:\n{steps}"
        client.retain(bank_id=BANK_ID, content=content)
        print(f"  retained runbook '{rb['name']}'")

    print("Done. You can now recall against bank_id =", BANK_ID)

if __name__ == "__main__":
    main()
