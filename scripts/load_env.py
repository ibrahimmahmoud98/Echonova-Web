import os

def load_env():
    # Try to load from .env.local or .env in the parent/root directory of scripts/
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for env_file in [".env.local", ".env"]:
        path = os.path.join(base_dir, env_file)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    if "=" in line:
                        key, val = line.split("=", 1)
                        # Remove potential surrounding quotes from the value
                        value = val.strip()
                        if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
                            value = value[1:-1]
                        os.environ[key.strip()] = value

# Run immediately upon import
load_env()
