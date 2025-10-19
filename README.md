# EPP Scales - オンライン心理学アンケート

複数の心理尺度（HEXACO-60, BFI-2-S/J, SD3-J など）をオンラインで実施し、jsPsych を使用して結果をリアルタイム分析・表示するシステムです。

## 🚀 特徴

- ✅ **CDN 依存なし**: jsPsych・Chart.js を dist/ でホスト
- ✅ **OSF (Datapipe) 統合**: 回答データを自動保存
- ✅ **リアルタイム結果表示**: Chart.js でレーダーチャート表示
- ✅ **複数スケール対応**: 各スケールが独立した HTML ファイル
- ✅ **GitHub Pages 公開**: 追加サーバー不要

## 📋 構成

```
epp_scales/
├── hexaco60.html        # HEXACO-60（6因子・24ファセット）
├── bfi2sj.html          # BFI-2-S/J（ビッグファイブ）
├── sd3j.html            # SD3-J（ダークトライアド）
├── index.html           # ポータルページ
├── dist/                # jsPsych・Chart.js・プラグインのホスト
│   ├── jspsych.js
│   ├── jspsych.css
│   ├── plugin-*.js      # 各プラグイン
│   ├── chart.umd.min.js
│   └── ...
├── README.md
└── .gitignore
```

## � クイックスタート

### GitHub Pages で公開

ブラウザで以下にアクセス:
- **ポータル**: https://mshrymgc.github.io/epp_scales/
- **HEXACO-60**: https://mshrymgc.github.io/epp_scales/hexaco60.html
- **BFI-2-S/J**: https://mshrymgc.github.io/epp_scales/bfi2sj.html
- **SD3-J**: https://mshrymgc.github.io/epp_scales/sd3j.html

## � 新しいアンケートを追加する

### ステップ 1: HTML ファイルを作成

`src/templates/hexaco60.html` や `hexaco60.html` を参考に、新しいスケール用の HTML ファイルを作成します。

例: `mynewscale.html`

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <title>My New Scale</title>
  <script src="./dist/jspsych.js"></script>
  <script src="./dist/plugin-survey-likert.js"></script>
  <!-- その他のプラグイン・ライブラリ -->
</head>
<body>
  <div id="jspsych-target"></div>
  <script>
    // スケール実装
  </script>
</body>
</html>
```

### ステップ 2: dist/ のファイルを確認

以下のファイルがホスト済みか確認:
- `jspsych.js`, `jspsych.css`
- `plugin-*.js`（必要なプラグイン）
- `survey.min.css`
- `chart.umd.min.js`（グラフを使う場合）
- `@jspsych-contrib/plugin-pipe` の CDN リンク（OSF 保存を使う場合）

足りない場合は dist/ に追加し、Git にコミットします。

### ステップ 3: ファイルを公開

新しい HTML ファイルをリポジトリのルートに追加:

```bash
git add mynewscale.html
git commit -m "feat: add my new scale"
git push
```

結果:
- https://mshrymgc.github.io/epp_scales/mynewscale.html

### ステップ 4: ポータルに追加（オプション）

`index.html` に新しいスケールへのリンクを追加し、ユーザーが容易にアクセスできるようにします。

## 📡 OSF (Datapipe) の設定

### 現在の experiment_id

| スケール | experiment_id |
|---------|---------------|
| **HEXACO-60** | `TY0B485foupj` |
| **BFI-2-S/J** | TBD |
| **SD3-J** | TBD |

### データ保存フロー

1. 参加者が全項目に回答
2. 「結果を見る」または「完了」をクリック
3. CSV データを OSF に POST
4. 結果画面に保存ステータスを表示
5. OSF プロジェクトの File セクションに CSV が保存

### experiment_id の設定

各 HTML ファイルの以下の部分を編集:

```javascript
// OSF Datapipe 設定
experiment_id: 'YOUR_EXPERIMENT_ID_HERE'
```

新しい experiment_id を取得するには:
1. https://osf.io/ でプロジェクトを作成
2. Datapipe 設定から experiment_id を生成
3. 上記の表を更新

## 📝 ライセンス

ISC

## 🤝 貢献

改善提案やバグ報告は Issues にお願いします。