# Pythonの軽量イメージを使用（ベース）
FROM python:3.13-slim AS base

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のインストール
COPY requirements.txt . 

RUN python -m venv /app/venv && \
    /app/venv/bin/python -m ensurepip && \
    /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# アプリのコードをコピー
COPY . .

# Flask 環境変数の設定
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

# ✅ `venv` を `$PATH` に追加
ENV PATH="/app/venv/bin:$PATH"



