# Pythonの軽量イメージを使用
FROM python:3.13-slim

# 環境変数を設定（コンテナ内での作業ディレクトリ）
WORKDIR /app

# 依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir pytest boto3  # `pytest` を追加

# アプリのコードをコピー
COPY . .

# デフォルトの起動コマンドを変更（pytestの実行を可能にする）
CMD ["python", "main.py"]


