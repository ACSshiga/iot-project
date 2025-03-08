# node:18-alpine をベースに使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールするために必要なファイルをコピー
COPY package.json package-lock.json ./

# npmを使って依存関係をインストール
RUN npm install

# Next.js の設定ファイルをコンテナにコピー
COPY next.config.js ./ 

# ソースコードをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]

