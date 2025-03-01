import json

def lambda_handler(event, context):
    """
    AWS Lambdaのエントリポイント関数。
    :param event: AWSイベントデータ
    :param context: AWS Lambdaの実行コンテキスト
    :return: レスポンス
    """
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Hello from AWS Lambda!"
        })
    }
