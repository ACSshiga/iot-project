# node:18-alpine をベースに使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールするために必要なファイルをコピー
COPY package.json package-lock.json ./

# npmを使って依存関係をインストール
RUN npm install
RUN npm install tailwindcss@latest postcss@latest autoprefixer@latest --save-dev
RUN npm install tailwindcss-animate class-variance-authority @radix-ui/react-slot tailwind-merge --save

# 設定ファイルをコピー
COPY next.config.js ./ 
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# ソースコードをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"] 