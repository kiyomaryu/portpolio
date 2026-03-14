# きよまる ポートフォリオサイト

Technical PdM / PMO「きよまる」のポートフォリオサイトです。

🌐 **公開URL**: https://kiyomaruworks.com

---

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップページ（プロフィール・強み・今後の目標・次のキャリアについて） |
| `/career` | キャリアページ（スキル・経験・職務経歴） |
| `/links` | リンク集・お問い合わせ |

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **スタイリング**: Tailwind CSS v4
- **言語**: TypeScript
- **アニメーション**: Framer Motion
- **デプロイ**: GitHub Pages (GitHub Actions による自動デプロイ)
- **カスタムドメイン**: kiyomaruworks.com

## ローカル開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド・デプロイ

`main` ブランチへのプッシュで GitHub Actions が自動的にビルド・デプロイします。

```bash
# ローカルでビルドを確認する場合
npm run build
```

ビルド成果物は `out/` ディレクトリに出力されます。
