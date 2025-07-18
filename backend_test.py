#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests all backend endpoints to ensure proper functionality
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Load the backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

def test_root_endpoint(base_url):
    """Test GET /api/ endpoint"""
    print("\n=== Testing Root Endpoint (GET /api/) ===")
    try:
        url = f"{base_url}/api/"
        response = requests.get(url, timeout=10)
        
        print(f"URL: {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected message")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Root endpoint request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Root endpoint returned invalid JSON: {e}")
        return False

def test_get_status_endpoint(base_url):
    """Test GET /api/status endpoint"""
    print("\n=== Testing GET Status Endpoint (GET /api/status) ===")
    try:
        url = f"{base_url}/api/status"
        response = requests.get(url, timeout=10)
        
        print(f"URL: {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ GET status endpoint working correctly - returned {len(data)} status checks")
                return True
            else:
                print("❌ GET status endpoint returned non-list response")
                return False
        else:
            print(f"❌ GET status endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ GET status endpoint request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ GET status endpoint returned invalid JSON: {e}")
        return False

def test_post_status_endpoint(base_url):
    """Test POST /api/status endpoint"""
    print("\n=== Testing POST Status Endpoint (POST /api/status) ===")
    try:
        url = f"{base_url}/api/status"
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        }
        
        response = requests.post(url, json=test_data, timeout=10)
        
        print(f"URL: {url}")
        print(f"Request Data: {json.dumps(test_data, indent=2)}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ['id', 'client_name', 'timestamp']
            
            if all(field in data for field in required_fields):
                if data['client_name'] == test_data['client_name']:
                    print("✅ POST status endpoint working correctly")
                    return True, data
                else:
                    print("❌ POST status endpoint returned incorrect client_name")
                    return False, None
            else:
                missing_fields = [field for field in required_fields if field not in data]
                print(f"❌ POST status endpoint missing fields: {missing_fields}")
                return False, None
        else:
            print(f"❌ POST status endpoint failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ POST status endpoint request failed: {e}")
        return False, None
    except json.JSONDecodeError as e:
        print(f"❌ POST status endpoint returned invalid JSON: {e}")
        return False, None

def test_cors_configuration(base_url):
    """Test CORS configuration"""
    print("\n=== Testing CORS Configuration ===")
    try:
        url = f"{base_url}/api/"
        headers = {
            'Origin': 'https://example.com',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        # Test preflight request
        response = requests.options(url, headers=headers, timeout=10)
        
        print(f"URL: {url}")
        print(f"Preflight Status Code: {response.status_code}")
        print(f"CORS Headers: {dict(response.headers)}")
        
        cors_headers = response.headers
        if 'access-control-allow-origin' in cors_headers:
            print("✅ CORS is configured")
            return True
        else:
            print("❌ CORS headers not found")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS test request failed: {e}")
        return False

def test_mongodb_connection(base_url):
    """Test MongoDB connection by creating and retrieving data"""
    print("\n=== Testing MongoDB Connection ===")
    
    # First, create a status check
    post_success, created_data = test_post_status_endpoint(base_url)
    if not post_success:
        print("❌ MongoDB connection test failed - could not create data")
        return False
    
    # Then, retrieve all status checks to verify it was saved
    try:
        url = f"{base_url}/api/status"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            # Check if our created data is in the list
            found = any(item.get('id') == created_data.get('id') for item in data)
            if found:
                print("✅ MongoDB connection working - data persisted correctly")
                return True
            else:
                print("❌ MongoDB connection issue - created data not found in retrieval")
                return False
        else:
            print("❌ MongoDB connection test failed - could not retrieve data")
            return False
            
    except Exception as e:
        print(f"❌ MongoDB connection test failed: {e}")
        return False

def test_server_accessibility(base_url):
    """Test if server is accessible at the expected URL"""
    print("\n=== Testing Server Accessibility ===")
    try:
        # Simple connectivity test
        response = requests.get(base_url, timeout=10)
        print(f"Base URL: {base_url}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code in [200, 404]:  # 404 is fine, means server is running
            print("✅ Server is accessible")
            return True
        else:
            print(f"❌ Server accessibility issue - status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Server not accessible: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Testing Suite")
    print("=" * 50)
    
    # Get backend URL
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ Could not get backend URL from frontend/.env")
        sys.exit(1)
    
    print(f"Backend URL: {backend_url}")
    
    # Run all tests
    tests = [
        ("Server Accessibility", lambda: test_server_accessibility(backend_url)),
        ("Root Endpoint", lambda: test_root_endpoint(backend_url)),
        ("GET Status Endpoint", lambda: test_get_status_endpoint(backend_url)),
        ("POST Status Endpoint", lambda: test_post_status_endpoint(backend_url)[0]),
        ("CORS Configuration", lambda: test_cors_configuration(backend_url)),
        ("MongoDB Connection", lambda: test_mongodb_connection(backend_url))
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        try:
            results[test_name] = test_func()
        except Exception as e:
            print(f"❌ {test_name} test failed with exception: {e}")
            results[test_name] = False
    
    # Summary
    print("\n" + "=" * 50)
    print("🏁 TEST SUMMARY")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests passed!")
        return True
    else:
        print("⚠️  Some backend tests failed")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)