import requests
import json
import os

# Configuration
URL = 'http://127.0.0.1:8000/api/upload/'
# The path to your sample CSV file
FILE_PATH = os.path.join('sample_equipment_data.csv', 'sample_equipment_data.csv')

def test_upload():
    print(f"--- Testing Chemical Equipment API ---")
    print(f"Target URL: {URL}")
    print(f"Uploading file: {FILE_PATH}")

    if not os.path.exists(FILE_PATH):
        print(f"Error: File not found at {FILE_PATH}")
        return

    try:
        with open(FILE_PATH, 'rb') as f:
            files = {'file': f}
            response = requests.post(URL, files=files)
            
            print(f"\nStatus Code: {response.status_code}")
            
            if response.status_code == 201:
                print("✅ Success! File processed correctly.")
                print("\nJSON Response:")
                print(json.dumps(response.json(), indent=4))
            else:
                print("❌ Failed.")
                print("Response:", response.text)

    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the server.")
        print("Make sure the Django server is running in a separate terminal.")
        print("Command: python manage.py runserver")

if __name__ == "__main__":
    test_upload()
