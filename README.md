# EPP Scales - 感情・人格心理学のオンライン尺度集

感情・人格心理学の授業で扱った心理尺度を、ブラウザから体験・学習できるようにまとめた静的サイトです。各尺度は jsPsych を用いて実装され、回答完了後には即時フィードバックと OSF（jsPsych Pipe）へのデータ保存が行われます。

## 主な特徴
- jsPsych 7 系と公式プラグインを `dist/` に同梱し、ビルド不要でそのまま動作
- HEXACO-60 / BFI-2-S-J / SD3-J / PANAS (JP) の 4 尺度を同一レポジトリで管理
- Chart.js 4.4.1 を用いたドメイン別チャート表示とダークテーマ切り替え（`?theme=dark`）
- OSF Datapipe（@jspsych-contrib/plugin-pipe v0.5.0）による CSV 保存フローを各尺度に搭載
- GitHub Pages などの静的ホスティングに配置するだけで公開可能

## リポジトリ構成

```
.
├── index.html           # ポータル（授業で扱った尺度一覧）
├── panas.html           # PANAS 日本語版（現在気分／1か月頻度）
├── hexaco60.html        # HEXACO-60（6領域・24ファセット）
├── bfi2sj.html          # BFI-2-S-J（ビッグファイブ短縮版）
├── sd3j.html            # SD3-J（ダークトライアド）
├── dist/                # jsPsych 本体・プラグイン・CSS（オフライン対応用）
│   ├── jspsych.js / jspsych.css
│   ├── plugin-*.js      # survey、html-button-response など公式プラグイン
│   ├── extension-*.js   # optional extension (mouse-tracking など)
│   └── survey*.css      # 調査フォーム用スタイル
└── README.md
```

## 各ファイルの役割

| ファイル | 内容 | Datapipe experiment_id | 外部依存 |
|---------|------|------------------------|----------|
| `index.html` | 各尺度へのリンクをまとめたランディングページ | なし | なし |
| `panas.html` | PANAS 日本語版 16 項目（状態＋1か月頻度） | `TZPhTMQhxHSu` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `hexaco60.html` | HEXACO-60 (ドメイン別・ファセット別スコア可視化) | `TY0B485foupj` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `bfi2sj.html` | BFI-2-S-J（15 項目 × 5 因子） | `d5cclNdXjcZX` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |
| `sd3j.html` | SD3-J（ダークトライアド 27 項目） | `GyvSHLaKTiph` | Chart.js 4.4.1 (CDN), @jspsych-contrib/plugin-pipe 0.5.0 (CDN) |

> Chart.js は CDN から読み込んでいるため、完全オフライン運用を行う場合は `dist/` にファイルを追加し、各 HTML の `<script>` パスを書き換えてください。

## ローカルでの確認手順

1. 任意のディレクトリにクローンまたはダウンロードします。
2. ルートディレクトリで簡易 HTTP サーバーを起動します。
   ```bash
   # 例: Python 3
   python3 -m http.server 8000
   ```
3. ブラウザで `http://localhost:8000/index.html` にアクセスします。
4. それぞれの尺度ページを開くと、jsPsych のタイムラインが起動し、結果表示まで一連の流れを確認できます。

ローカルファイルを直接開く（`file://` スキーム）場合、ブラウザによっては Datapipe への保存処理がブロックされることがあります。検証時は HTTP 経由でのアクセスを推奨します。

## 公開方法 (GitHub Pages 例)

1. `main` ブランチを GitHub にプッシュします（ビルド工程は不要）。
2. GitHub Pages の公開設定で「Deploy from a branch」を選択し、`main` / `/root` を指定します。
3. 数分後、`https://<ユーザー名>.github.io/epp_scales/` で `index.html` が閲覧可能になります。
4. 各尺度ページは `https://<ユーザー名>.github.io/epp_scales/<scale>.html` で参照できます。

## データ保存フロー（OSF Datapipe）

1. 参加者が全設問を完了すると、jsPsych が集計した CSV 文字列を生成します。
2. `@jspsych-contrib/plugin-pipe` が OSF Datapipe API に POST し、`experiment_id` ごとにファイルを保存します。
3. 成功時は結果画面にステータスが表示され、失敗時にはエラーと再送ボタンが表示されます。
4. 保存先は OSF プロジェクト内の Datapipe 用フォルダにまとめて配置されます。

### experiment_id を変更する場合

1. OSF で Datapipe アドオンを有効にしたプロジェクトを用意し、`experiment_id` を新規発行します。
2. 対象 HTML 内の保存トライアルを検索し、`experiment_id: '...'` を新しい値に差し替えます。（例: `rg "experiment_id" hexaco60.html`）
3. 必要に応じて上表のメモも更新してください。

## 新しい尺度を追加する手順

1. 既存ファイル（例: `panas.html`）をコピーし、タイムライン・設問・集計処理を目的の尺度に合わせて編集します。
2. 利用する jsPsych プラグインが `dist/` に含まれているか確認し、足りない場合は公式配布物を追加します。
3. Datapipe を利用する場合は OSF 側で `experiment_id` を発行し、保存トライアルに設定します。
4. `index.html` のカードリストに新しい尺度へのリンクを追記します。
5. GitHub へコミットし、Pages を利用している場合は push するだけで公開が更新されます。

## ライセンス

ISC

## コンタクト

改善提案やバグ報告は Issues へお寄せください。
