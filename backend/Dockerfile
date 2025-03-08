# ✅ Pythonの軽量イメージを使用
FROM python:3.13-slim

WORKDIR /app

# ✅ 必要なパッケージをインストール
RUN apt-get update && apt-get install -y python3-venv curl && rm -rf /var/lib/apt/lists/*

# ✅ `venv` を作成し、仮想環境をセットアップ
RUN python3 -m venv /app/venv && \
    /app/venv/bin/python -m ensurepip && \
    /app/venv/bin/python -m pip install --upgrade pip

# ✅ `venv` を正しく使用するための環境変数
ENV VIRTUAL_ENV="/app/venv"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# ✅ 依存関係をインストール
COPY requirements.txt .
RUN /app/venv/bin/python -m pip install --no-cache-dir -r requirements.txt

# ✅ アプリのコードをコピー
COPY . .

# ✅ ポート5000を公開
EXPOSE 5000

# ✅ `FLASK_APP=main.py` を環境変数に追加
ENV FLASK_APP=main.py

# ✅ `CMD` を修正して仮想環境の Python を確実に実行
CMD ["sh", "-c", "/app/venv/bin/python -m flask run --host=0.0.0.0 --port=5000"]

