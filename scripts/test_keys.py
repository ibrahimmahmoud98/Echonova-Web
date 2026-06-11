import os
import sys
import requests
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import load_env

APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY")
EXA_API_KEY = os.environ.get("EXA_API_KEY")
HUNTER_API_KEY = os.environ.get("HUNTER_API_KEY")


def test_apollo():
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
    try:
        r = requests.post(url, json=payload, headers=headers, timeout=10)
        print("Apollo Status:", r.status_code)
        if r.status_code == 200:
            orgs = r.json().get("organizations", [])
            print("Apollo Orgs count:", len(orgs))
            if orgs:
                print("First org:", orgs[0].get("name"), "-", orgs[0].get("primary_domain"))
        else:
            print("Apollo response:", r.text)
    except Exception as e:
        print("Apollo error:", e)

def test_exa():
    url = "https://api.exa.ai/search"
    headers = {
        "x-api-key": EXA_API_KEY,
        "content-type": "application/json"
    }
    payload = {
        "query": "Small startup company Riyadh Saudi Arabia website",
        "numResults": 2
    }
    try:
        r = requests.post(url, json=payload, headers=headers, timeout=10)
        print("Exa Status:", r.status_code)
        if r.status_code == 200:
            print("Exa results count:", len(r.json().get("results", [])))
        else:
            print("Exa response:", r.text)
    except Exception as e:
        print("Exa error:", e)

def test_hunter():
    url = f"https://api.hunter.io/v2/email-verifier?email=info@google.com&api_key={HUNTER_API_KEY}"
    try:
        r = requests.get(url, timeout=10)
        print("Hunter Status:", r.status_code)
        if r.status_code == 200:
            print("Hunter response:", r.json().get("data", {}).get("result"))
        else:
            print("Hunter response:", r.text)
    except Exception as e:
        print("Hunter error:", e)

if __name__ == "__main__":
    test_apollo()
    test_exa()
    test_hunter()
