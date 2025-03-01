# Pythonの軽量イメージを使用
FROM python:3.13-slim

# 環境変数を設定（コンテナ内での作業ディレクトリ）
WORKDIR /app

# 必要なファイルをコンテナにコピー
COPY requirements-docker.txt requirements.txt

# 必要なパッケージをインストール
RUN pip install --no-cache-dir -r requirements-docker.txt

# アプリのコードをコピー
COPY . .

# コンテナ起動時のデフォルトコマンド
CMD ["python", "main.py"]

