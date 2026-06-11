import os
import sys
import requests
import json
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import load_env

APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY")



url = "https://api.apollo.io/v1/organizations/search"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": APOLLO_API_KEY
}
payload = {
    "organization_locations": ["Saudi Arabia"],
    "organization_num_employees_ranges": ["1,10", "11,50"],
    "page": 1,
    "per_page": 5
}

r = requests.post(url, json=payload, headers=headers)
print("Status:", r.status_code)
if r.status_code == 200:
    data = r.json()
    orgs = data.get("organizations", [])
    for idx, org in enumerate(orgs):
        print(f"Org {idx}: {org.get('name')} | Domain: {org.get('primary_domain')} | Employees: {org.get('estimated_num_employees')} | Industry: {org.get('industry')}")
else:
    print(r.text)
