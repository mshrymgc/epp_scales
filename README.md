# EPP Scales - 感情・人格心理学のオンライン尺度集

感情・人格心理学の授業で扱った心理尺度を、ブラウザから体験・学習できるようにまとめた静的サイトです。各尺度は jsPsych を用いて実装され、回答完了後には即時フィードバックと OSF（jsPsych Pipe）へのデータ保存が行われます。

## 主な特徴
- jsPsych 7 系と公式プラグインを `dist/` に同梱し、ビルド不要でそのまま動作
- 複数の心理尺度（PANAS、HEXACO-60、BFI-2-S-J、SD3-J）と認知タスク（Dot Probe、Eyes Test など）を同一レポジトリで管理
- **各尺度ごとに `CSV_DATA_DICTIONARY.md` を配置**し、データ形式・スコアリング手順・解釈方法を完全にドキュメント化
- Chart.js 4.4.1 を用いたドメイン別・因子別チャート表示とダークテーマ切り替え（`?theme=dark`）
- OSF Datapipe（@jspsych-contrib/plugin-pipe v0.5.0）による CSV 保存フローを各尺度に搭載
- GitHub Pages などの静的ホスティングに配置するだけで公開可能

## リポジトリ構成

```
.
├── index.html                      # ポータル（授業で扱った尺度一覧）
├── dist/                           # jsPsych 本体・プラグイン・CSS（オフライン対応用）
│   ├── jspsych.js / jspsych.css
│   ├── plugin-*.js                 # survey、html-button-response など公式プラグイン
│   ├── extension-*.js              # optional extension (mouse-tracking など)
│   └── survey*.css                 # 調査フォーム用スタイル
├── panas/                          # PANAS 日本語版（現在気分／1か月頻度）
│   ├── panas.html
│   └── CSV_DATA_DICTIONARY.md      # データ辞書（変数説明、スコアリング、解釈）
├── hexaco60/                       # HEXACO-60（6領域・24ファセット）
│   ├── hexaco60.html
│   └── CSV_DATA_DICTIONARY.md      # データ辞書
├── bfi2sj/                         # BFI-2-S-J（ビッグファイブ短縮版）
│   ├── bfi2sj.html
│   └── CSV_DATA_DICTIONARY.md      # データ辞書
├── sd3j/                           # SD3-J（ダークトライアド）
│   ├── sd3j.html
│   └── CSV_DATA_DICTIONARY.md      # データ辞書
├── dot_probe/                      # Dot Probe Task（注意バイアス測定）
│   └── dot_probe.html
├── ecsj/                           # ECSJ（社会文化的適応）
│   └── ecsj.html
├── eyestest/                       # Eyes Test（心の理論測定）
│   ├── eyestest.html
│   └── eyes_pngs/                  # 画像リソース
├── rrq/                            # RRQ（黙想/心配反すうスタイル）
│   └── rrq.html
├── ops/                            # OPS（操作的性格スタイル）
│   └── ops.html
├── IGT/                            # IGT（Iowa Gambling Task）
│   └── IGT.html
├── README.md                       # 本ファイル
└── .git/                           # Git リポジトリ管理ファイル
```

## 各ファイルの役割

### メイン尺度（CSV_DATA_DICTIONARY.md 付属）

| ファイル | 内容 | Datapipe experiment_id | 外部依存 |
|---------|------|------------------------|----------|
| `panas/panas.html` | PANAS 日本語版 16 項目（現在の気分 × 過去1か月の頻度） | `TZPhTMQhxHSu` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `hexaco60/hexaco60.html` | HEXACO-60 60項目（6領域・24ファセット別スコア可視化） | `TY0B485foupj` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `bfi2sj/bfi2sj.html` | BFI-2-S-J 15 項目（5因子別スコア） | `d5cclNdXjcZX` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `sd3j/sd3j.html` | SD3-J 27 項目（ダークトライアド・ナルシシズム/マキャヴェリズム/サイコパシー） | `GyvSHLaKTiph` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |

### その他の測定ツール（参考資料）

| ファイル | 内容 | 説明 |
|---------|------|------|
| `dot_probe/dot_probe.html` | Dot Probe Task | 視覚的注意のバイアスを測定 |
| `ecsj/ecsj.html` | ECSJ | 社会文化的適応の評価 |
| `eyestest/eyestest.html` | Eyes Test | 心の理論（Theory of Mind）測定 |
| `rrq/rrq.html` | RRQ | 黙想スタイル vs 心配反すうスタイルの測定 |
| `ops/ops.html` | OPS | 操作的性格スタイルの測定 |
| `IGT/IGT.html` | Iowa Gambling Task | 意思決定と危険回避行動の測定 |

> Chart.js は CDN から読み込んでいるため、完全オフライン運用を行う場合は `dist/` にファイルを追加し、各 HTML の `<script>` パスを書き換えてください。

## ローカルでの確認手順

1. 任意のディレクトリにクローンまたはダウンロードします。
2. ルートディレクトリで簡易 HTTP サーバーを起動します。
   ```bash
   # 例: Python 3
   python3 -m http.server 8000
   ```
3. ブラウザで `http://localhost:8000/index.html` にアクセスします。
4. 各尺度へのリンクから以下のページにアクセスできます：
   - `http://localhost:8000/panas/panas.html`
   - `http://localhost:8000/hexaco60/hexaco60.html`
   - `http://localhost:8000/bfi2sj/bfi2sj.html`
   - `http://localhost:8000/sd3j/sd3j.html`
5. それぞれのページを開くと、jsPsych のタイムラインが起動し、結果表示まで一連の流れを確認できます。

**注意:** ローカルファイルを直接開く（`file://` スキーム）場合、ブラウザによっては Datapipe への保存処理がブロックされることがあります。検証時は HTTP 経由でのアクセスを推奨します。

## 公開方法 (GitHub Pages 例)

1. `main` ブランチを GitHub にプッシュします（ビルド工程は不要）。
2. GitHub Pages の公開設定で「Deploy from a branch」を選択し、`main` / `/root` を指定します。
3. 数分後、`https://<ユーザー名>.github.io/epp_scales/` で `index.html` が閲覧可能になります。
4. 各尺度ページは以下のURLで参照できます：
   - `https://<ユーザー名>.github.io/epp_scales/panas/panas.html`
   - `https://<ユーザー名>.github.io/epp_scales/hexaco60/hexaco60.html`
   - `https://<ユーザー名>.github.io/epp_scales/bfi2sj/bfi2sj.html`
   - `https://<ユーザー名>.github.io/epp_scales/sd3j/sd3j.html`

## データ保存フロー（OSF Datapipe）

1. 参加者が全設問を完了すると、jsPsych が集計した CSV 文字列を生成します。
2. `@jspsych-contrib/plugin-pipe` が OSF Datapipe API に POST し、`experiment_id` ごとにファイルを保存します。
3. 成功時は結果画面にステータスが表示され、失敗時にはエラーと再送ボタンが表示されます。
4. 保存先は OSF プロジェクト内の Datapipe 用フォルダにまとめて配置されます。

### データ形式

各尺度は以下の形式で CSV を生成し、OSF に保存します：

- **PANAS**: メタデータ（被験者ID、年齢、性別、ブラウザ情報など）+ State測定16項目 + Month測定16項目
- **HEXACO-60**: メタデータ + 60項目（raw/scored/reversed/item_number各4列 = 240列）
- **BFI-2-S-J**: メタデータ + 15項目（同様に4列 = 60列）
- **SD3-J**: メタデータ + 27項目（同様に4列 = 108列）

詳細は各ディレクトリの `CSV_DATA_DICTIONARY.md` を参照してください。

### experiment_id を変更する場合

1. OSF で Datapipe アドオンを有効にしたプロジェクトを用意し、`experiment_id` を新規発行します。
2. 対象 HTML 内の保存トライアルを検索し、`experiment_id: '...'` を新しい値に差し替えます。
   - 例: `grep -r "experiment_id" panas/panas.html` で該当行を特定
3. 必要に応じて上表のメモも更新してください。

## 新しい尺度を追加する手順

1. 既存ファイル（例: `panas/panas.html`）をコピーし、タイムライン・設問・集計処理を目的の尺度に合わせて編集します。
2. 利用する jsPsych プラグインが `dist/` に含まれているか確認し、足りない場合は公式配布物を追加します。
3. 新しい尺度のディレクトリを作成し（例: `new_scale/`）、HTML ファイルを配置します。
4. データの仕様を整理し、`CSV_DATA_DICTIONARY.md` を同じディレクトリに作成します。
5. Datapipe を利用する場合は OSF 側で `experiment_id` を発行し、保存トライアルに設定します。
6. `index.html` のカードリストに新しい尺度へのリンク（相対パス）を追記します。
   - 例: `<a href="new_scale/new_scale.html">新しい尺度</a>`
7. GitHub へコミットし、Pages を利用している場合は push するだけで公開が更新されます。

## ライセンス

ISC

## コンタクト

改善提案やバグ報告は Issues へお寄せください。
