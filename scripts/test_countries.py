import os
import sys
import requests
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import load_env

APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY")


def test_countries():
    url = "https://api.apollo.io/v1/organizations/search"
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": APOLLO_API_KEY
    }
    
    for country in ["United Arab Emirates", "Qatar"]:
        payload = {
            "organization_locations": [country],
            "organization_num_employees_ranges": ["1,10", "11,50"],
            "page": 1,
            "per_page": 5
        }
        r = requests.post(url, json=payload, headers=headers)
        print(f"{country} status:", r.status_code)
        if r.status_code == 200:
            orgs = r.json().get("organizations", [])
            print(f"{country} orgs count:", len(orgs))
            for org in orgs[:3]:
                print(" -", org.get("name"), "| Domain:", org.get("primary_domain"), "| Employees:", org.get("estimated_num_employees"))
        else:
            print(r.text)

if __name__ == "__main__":
    test_countries()
