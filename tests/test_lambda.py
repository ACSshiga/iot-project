import json
import pytest
from lambda_function import handler  # Lambdaのメイン関数をインポート

def test_lambda_handler():
    event = {
        "queryStringParameters": {
            "name": "Alice"
        }
    }
    context = {}

    response = handler(event, context)

    assert response["statusCode"] == 200
    assert "Hello, Alice!" in response["body"]
