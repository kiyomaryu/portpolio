# Cloudflare移行の調査・検証・切り替え手順

調査日: 2026-10-04（JST）。調査元main: `1032bd6`。
作業ブランチ: `chore/cloudflare-migration`。
利用者の指定により、今回はローカル検証とPRまで。公開・DNS変更・Pages停止は行わない。

## 調査結果

- Next.js 16.1.6 / React 19.2.3 / App Router。4ページすべて静的生成可能。
- `next.config.ts`: `output: "export"`, `images.unoptimized: true`。basePath、assetPrefix指定なし。
- `npm run build` は `out/` を生成。サーバー起動、SSR、API Route、Server Actions、Cookie、動的リダイレクトに依存しない。
- Next Imageは `/avatar.jpg` を直接参照。画像最適化サーバー不要。
- Framer Motionはブラウザで動作。Tailwind CSSはビルド済みCSSとして配信。
- `public/` の画像・SVG、App Routerのfavicon・icon・apple-icon、OGP画像を保持。
- OGPは既存の `https://kiyomaruworks.com/og-image.jpg` のまま。テスト公開中もSNSメタデータは本番を指す。
- `/works` は直接アクセス可能だがヘッダーナビにはない。既存仕様として維持。
- GitHub Pages固有なのは既存workflow、ルートとpublicのCNAME、およびGitHub Settings → Pages。

## 採用構成と比較

| 方法 | このリポジトリでの判断 |
| --- | --- |
| Workers Static Assets + GitHub Actions | 採用。Nextの静的成果物をそのまま配信し、ビルドとテストを既存CIと同じ場所で管理できる |
| Workers Static Assets + Workers Builds | 現行の有効な選択肢。Git連携・ビルド設定をCloudflare側でも管理する必要があり、今回は追加しない |
| Cloudflare PagesのStatic Export | 配信可能だが、新規移行先をWorkers Static Assetsへ統一する方針のため採用しない |
| Next.js向けサーバーアダプター／別ビルド基盤 | 静的サイトには不要。アプリ変更と依存関係を増やさない |

Worker名は `kiyomaruworks`、配信元は `./out`、Workerサーバーコードなし。
`html_handling: drop-trailing-slash` で `/career.html` を `/career` として配信。
`not_found_handling: 404-page` で存在しないURLは `out/404.html` とHTTP 404を返す。
SPAフォールバックで存在しないURLを200にしない。RSCの `.txt` と分割データもそのまま配信する。
Wrangler 4.147.0を固定しlockfileを更新。Next/Reactなどアプリの直接依存バージョンは変更しない。

参照したCloudflare公式仕様（2026-10-04確認）:

- [Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [SSGと404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [assetsignore](https://developers.cloudflare.com/workers/static-assets/binding/)
- [GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

## ローカル検証結果

- 変更前 `npm ci` / `npm run build`: 成功。
- 変更後 `npm ci` / lint / build / Wrangler dry-run: 成功。
- `wrangler dev --local` の実際の配信に対するHTTPテスト: 4ページ200、CSS/JS/画像のMIME型とバイト一致、RSC、404、URL正規化、CNAME除外を確認。
- ブラウザ: Home → Career → Links → Homeのクライアント遷移成功。スクロールでFadeInのopacityが0から1に変化。
- 現行GitHub PagesとローカルWorkersを1440×1000、390×844で比較。4ページの本文・リンク先・見出し座標が一致し、横のはみ出しなし。
- avatar表示、PC／モバイル表示を確認。OGP画像とfaviconはHTTPでも確認。
- ローカル検証は公開Cloudflare上のTLS・キャッシュ・アカウント設定を保証するものではない。

保存済みCloudflare OAuthはPages権限のみでWorkers書き込み権限が不足。
利用者が今回はローカル検証とPRまでを選択したため、公開テストは未実施、テストURLは未発行。
Node.js 26のローカル環境で検証。GitHub CIは既存Pagesと同じNode.js 22で検証する。

既存の課題（今回の移行とは別）:

- `npm audit`: 17件（low 1 / moderate 2 / high 13 / critical 1）。Next.js等の既存依存に起因。強制更新・メジャーダウングレードを避け、今回のPRではアプリ依存の更新を含めない。静的配信ではNextサーバーを実行しないが、開発・ビルド環境も含め別途更新を検討する。
- `https://www.kiyomaruworks.com` は証明書ホスト名不一致。apexの本番URLは正常。www対応は切り替え時に承認範囲へ含める。

## DNSとPagesの現状（読み取りのみ）

| 名前 | 種別 | 現在値 | TTL |
| --- | --- | --- | --- |
| `kiyomaruworks.com` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | 3600 |
| `kiyomaruworks.com` | AAAA | 今回の問い合わせでは応答なし | — |
| `kiyomaruworks.com` | NS | `01.dnsv.jp` ～ `04.dnsv.jp` | 21600 |
| `www.kiyomaruworks.com` | CNAME | `kiyomaruworks.com` | 3600 |

CAA / DSは今回の公開問い合わせでは応答なし。DNS全体のバックアップではない。
GitHub Pagesは `build_type=workflow`、`cname=kiyomaruworks.com`、HTTPS強制有効、証明書approved。
証明書期限は取得時 `2026-12-08`。切り替え時には再確認する。

## 次回: 公開テストと自動デプロイの有効化

1. 対象CloudflareアカウントとWorker名の衝突がないことを確認する。
2. READMEの手順でWorkers認証、build、deploy。DNS・Custom Domainは設定しない。
3. 発行されたworkers.dev URLとデプロイversion IDを記録する。
4. 同じout/で `npm run test:smoke -- <実URL>`。さらにブラウザの4ページ・アニメーション・リンク・PC／モバイルを確認する。
5. GitHub Secretsに `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`、Variablesに `CLOUDFLARE_DEPLOY_ENABLED=true` を登録する。
6. PRをマージ後、mainのworkflow成功とworkers.devへの更新を確認する。Pagesは継続する。

## 本番切り替え前の承認提示

次の値が揃うまで本番の承認を依頼しない。DNS・Custom Domain・Pages停止は必ず実行直前に承認を得る。

- 実在するCloudflareテストURL、デプロイversion ID、公開環境での全テスト結果
- DNS管理画面の全レコードバックアップ、対象Cloudflare zoneと実際に割り当てられたNS
- 下記の変更差分、証明書状態、wwwの扱い、ロールバック手順
- Pages設定の削除時期（切り替えと同時に削除しない）

## 承認後の切り替え順序

### A. DNS管理を移す（配信先はまだGitHub Pages）

Workers Custom DomainsにはactiveなCloudflare zoneが必要。現状のdnsv.jpのままapexをworkers.devへCNAME設定する方法は採用しない。

1. お名前.comから全DNSレコードを保存する。MX/TXT、メール認証、検証レコード、サブドメインを含め、Cloudflare自動スキャンだけに依存しない。
2. Cloudflare zoneへ同じレコードを用意する。既存A/CNAMEはまずDNS onlyでGitHub Pagesを指し続ける。
3. DNSSEC/DS/CAAを再確認する。有効なDSがある場合はプロバイダーのDNSSEC移行手順を別途準備し、承認なしに変更しない。
4. **承認後**、レジストラのNSを実際に割り当てられたCloudflare NSへ変更する。現時点では未割り当てのため具体名を推測しない。
5. 旧DNSゾーンを保持し、複数リゾルバーで反映とzone Activeを確認。旧NS TTLの21600秒と伝播状況を考慮し、目安24～48時間以上は旧ゾーンを削除しない。
6. この間、旧・新のDNSどちらも同じGitHub Pagesを返す。サイト・メール等の既存サービスを確認する。

### B. 配信先をWorkersへ変更する

1. GitHub Pagesの最新成果物とWorkersの内容を揃える。Pagesの設定・証明書・最新成功runを保存する。
2. Cloudflareのapexをカバーする証明書がActiveであることを確認する。CAAによる発行制限などを解決できなければ進めない。workers.devテスト成功だけでは本番TLSの検証にならない。
3. **変更直前に承認後**、WorkerへCustom Domain `kiyomaruworks.com` を追加する。この操作はCloudflareがDNSを生成・置換する本番変更である。
4. 変更予定: apexのGitHub用A×4をWorkerの管理DNSに置換する。競合時は画面の差分を確認してから実行し、旧Aを事前削除して空白期間を作らない。実際のCloudflare管理レコード値は生成時に記録する。
5. wwwも対応する場合は追加承認範囲に含める。`www` の既存CNAMEを保持してプロキシ化し、Cloudflare Redirect Ruleでapexへ301リダイレクト（path/query保持）する。www証明書Activeを確認してから有効化する。apexのCustom Domainだけでwwwが自動対応するとは考えない。
6. HTTPS、4ページ、画像、favicon、OGP、リンク、404を本番で確認する。旧Aをキャッシュした閲覧者向けにGitHub Pagesを残す。
7. 安定後の別PRで、承認済みCustom DomainをWranglerのroutesへコード化する。CI Tokenに必要なゾーン権限を対象zoneだけ追加する。認証・権限不足のまま自動デプロイしない。

DNSと証明書の実状態を確認するまでは無停止を保証しない。両ホストを並行維持し、切り替え前に証明書を準備することで停止リスクを抑える。

### C. GitHub Pagesの後片付け（別承認）

切り替え成功後、AレコードTTLの3600秒を十分超える期間（目安48時間以上）と本番監視を経てから行う。即時復旧が必要な期間はPagesのdomain設定と証明書を残す。

1. Cloudflareへのmain自動デプロイ成功とロールバック方針を再確認する。
2. **承認後**、`.github/workflows/deploy.yml` の削除／無効化、`CNAME` と `public/CNAME` の削除を別PRで行う。
3. GitHub Settings → PagesのCustom domainを解除し、Pagesを停止する。無効化するのはPages用workflowだけ。
4. 不要になった `public/.assetsignore` のCNAME行も削除可能。

## ロールバック

- **切り替え前**: 変更不要。本番はGitHub Pagesのまま。Cloudflare workflowの有効化フラグをfalseにして公開を止められる。
- **NS移行中**: 新旧DNSに同じレコードを維持する。NSを戻す場合も承認を得る。伝播遅延があるためNS差し戻しを即時復旧と考えない。
- **Workers公開内容のみの不具合**: Cloudflareの直前の正常versionへrollbackし、自動デプロイフラグをfalseにする。旧versionがない初回はPagesへ戻す。
- **Custom Domain切り替え後、Pages保持中**: 承認後にCustom Domainを解除し、Cloudflare DNSで保存したGitHub A×4を復元する（DNS only、TTL 3600を基本）。必要ならwwwプロキシ・Redirect Ruleも切り替え前の状態に戻す。apexのPages domain、HTTPS証明書、直前の正常成果物が有効であることを確認する。Cloudflare NSを維持すればNS再移行は不要。DNSキャッシュによる遅延はあり得る。
- **Pages停止後**: CNAMEとPages workflowを復元して再デプロイし、GitHub Pagesのdomain・証明書を再設定する。その準備完了後にDNSを戻す。証明書再発行待ちがあり得るため即時復旧できない。Pages停止はこの制約を了承してから行う。

DNSバックアップ、GitHub成功run/commit、Cloudflare正常version IDを作業時に必ず記録する。
