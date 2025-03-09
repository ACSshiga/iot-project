# プロジェクト名

このプロジェクトは、[プロジェクトの簡単な説明]です。

## 必要条件

- Node.js v18.20.7
- npm v10.8.2

## インストール

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/ACSshiga/iot-project.git
   cd iot-project/frontend
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて、アプリケーションを確認できます。

## ビルド

プロジェクトをビルドするには、以下のコマンドを実行します。

```bash
npm run build
```

ビルドされたファイルは `frontend/.next` ディレクトリに出力されます。

## デプロイ

Netlifyを使用してデプロイする場合、以下の手順に従ってください。

1. Netlifyアカウントを作成し、リポジトリを接続します。
2. ビルドコマンドとして `npm run build` を設定します。
3. 公開ディレクトリとして `frontend/.next` を指定します。

## Dockerを使用したデプロイ

Dockerを使用してアプリケーションをデプロイするには、以下の手順に従います。

1. Dockerイメージをビルドします。

   ```bash
   docker build -t your-project-name .
   ```

2. コンテナを実行します。

   ```bash
   docker run -p 3000:3000 your-project-name
   ```

## 貢献

貢献を歓迎します。プルリクエストを送信する前に、まずIssueを作成してください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。