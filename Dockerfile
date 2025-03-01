# Pythonの軽量イメージを使用（ベース）
FROM python:3.13-slim AS base

# 環境変数を設定（コンテナ内での作業ディレクトリ）
WORKDIR /app

# 依存関係のインストール
COPY requirements.txt .
RUN python -m venv venv && \
    ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install --no-cache-dir -r requirements.txt

# アプリのコードをコピー
COPY . .

# 環境変数を設定（Flask 用）
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

# Flaskアプリを起動（デフォルト）
CMD ["./venv/bin/python", "-m", "flask", "run"]

# ==========================
# ✅ 追加: テスト用のビルドステージ
# ==========================
FROM base AS test

# `pytest` をインストール（本番環境には含めない）
RUN ./venv/bin/pip install pytest

# テスト実行
CMD ["./venv/bin/pytest", "--disable-warnings"]
