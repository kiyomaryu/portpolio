# きよまる ポートフォリオサイト

Technical PdM / PMO「きよまる」のポートフォリオサイトです。

公開URL: https://kiyomaruworks.com

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | プロフィール・強み・次のキャリアについて |
| `/career` | スキル・経験・職務経歴 |
| `/links` | リンク集・お問い合わせ |
| `/works` | 個人開発・プロジェクト |

Next.js 16 / App Router / TypeScript / Tailwind CSS v4 / Framer Motion。
`output: "export"` で `out/` に静的HTML・CSS・JavaScriptを生成します。
デザイン、コンテンツ、URL構成、OGPの本番URLは変更していません。

## 現在の公開状態

本番は引き続き **GitHub Pages** です。Cloudflare Workers Static Assetsへの移行準備を追加しています。
GitHub Pagesワークフロー、`CNAME`、`public/CNAME`、DNS、GitHub PagesのCustom domain設定は維持します。
Cloudflareの公開デプロイとドメイン切り替えは未実施です。

## ローカル開発・検証

CIと同じNode.js 22を推奨します（Wranglerは22以上が必要）。

```bash
npm ci
npm run dev        # Next.js開発用: http://localhost:3000
```

静的成果物の配信確認には `next start` ではなくWranglerを使います。

```bash
npm run lint
npm run build
npm run deploy:check  # 設定検証のみ。公開しない
npm run preview      # http://127.0.0.1:8787
```

別の端末で実行します。

```bash
npm run test:smoke
```

4ページ、CSS/JS/画像、favicon、OGP、RSCデータ、末尾スラッシュ・`.html`の正規化、404を検証します。
アセットとRSCはローカル `out/` とバイト単位で比較します。

## Cloudflareへのテスト公開（認証後）

Cloudflareの対象アカウントで、Worker名 `kiyomaruworks` が未使用か、このサイト専用であることを確認してください。
別用途で使用中の場合は `wrangler.jsonc` の `name` を変更します。

```bash
npx wrangler login --scopes user:read account:read workers:write workers_scripts:write offline_access
npx wrangler whoami
npm ci
npm run build
npm run deploy
```

OAuth認可は利用者本人が行います。CIでは下記のAPI Tokenを使います。
`npm run deploy` は既に作った `out/` を公開するため、必ず直前にビルドします。
`npx wrangler deploy` も同じ設定を使用します。

設定に `routes` / Custom Domainを含めていないため、初回公開先は `*.workers.dev` のみです。
初回はCloudflare側でアカウントのworkers.devサブドメイン登録が必要になる場合があります。
実際のURLは成功時の出力を記録してください。未公開のURLを動作確認済みとして扱わないでください。

```bash
# 実際のデプロイURLに置き換える。同一ビルドのout/を保持した状態で実行
npm run test:smoke -- https://kiyomaruworks.<account-subdomain>.workers.dev
```

ブラウザでも4ページ、ページ間リンク、スクロールアニメーション、PC／モバイル表示を確認します。
`public/.assetsignore` は `out/CNAME` をWorkersへのアップロードから除外します。
GitHub Pagesには従来どおり `CNAME` が残ります。

## 自動デプロイ

`.github/workflows/cloudflare.yml` がPRとmainのpushで次を実行します。

1. `npm ci` → lint → build → Wrangler dry-run
2. Wranglerのローカル配信を起動し、スモークテスト
3. mainで、公開有効化フラグが `true` の場合のみCloudflareへデプロイ

手動の `workflow_dispatch` もmainから利用できます。PRでは公開しません。
GitHubリポジトリの **Settings → Secrets and variables → Actions** に登録します。

| 種別 | 名前 | 値 |
| --- | --- | --- |
| Repository secret | `CLOUDFLARE_API_TOKEN` | 対象アカウントのWorkersデプロイ用トークン |
| Repository secret | `CLOUDFLARE_ACCOUNT_ID` | 対象CloudflareアカウントID |
| Repository variable | `CLOUDFLARE_DEPLOY_ENABLED` | 初回テスト公開成功後に `true` |

API Tokenは対象アカウントに絞り、アカウントの `Workers Scripts: Edit` を基本とする最小権限にします。
workers.devでの静的公開にDNS編集権限は不要です。全ゾーン編集権限を付けないでください。
TokenはGitHub Secretsに直接登録し、ソース、`.env`、チャットには記載しません。
Secrets・Variableは現時点では登録していません。PRのマージだけでは自動公開は有効になりません。

既存 `.github/workflows/deploy.yml` は並行稼働します。
CloudflareのWorkers Buildsを同時に接続すると二重デプロイになるため、接続しません。

## 移行・ロールバック

方式の比較、DNSの現状、承認が必要な切り替え手順、検証結果は
[Cloudflare移行手順](docs/cloudflare-migration.md) を参照してください。
