# EPP Scales - オンライン心理学アンケート

複数の心理尺度（HEXACO-60 等）をオンラインで実施し、jsPsych を使用して結果をリアルタイム分析・表示するシステムです。

## 🚀 特徴

- ✅ **CORS フリー**: npm + webpack でバンドル済み（CDN 依存なし）
- ✅ **OSF (Datapipe) 統合**: 回答データを自動保存
- ✅ **リアルタイム結果表示**: Chart.js でレーダーチャート表示
- ✅ **複数スケール対応**: モノレポ構成で複数アンケートをサポート
- ✅ **GitHub Pages 公開**: 追加サーバー不要

## 📋 構成

```
epp_scales/
├── src/
│   ├── hexaco60.js              # HEXACO-60 エントリポイント
│   ├── templates/hexaco60.html  # HEXACO-60 テンプレート
│   ├── shared/
│   │   ├── datapipe.js         # OSF 保存ロジック（共通）
│   │   └── styles.css          # 共通スタイル
│   └── [other_survey.js]        # 他のアンケート
├── dist/                        # ビルド済み（GitHub Pages 公開用）
├── webpack.config.js            # ビルド設定
├── package.json
└── README.md
```

## 🔧 セットアップ

### ローカル開発

```bash
# 依存パッケージをインストール
npm install

# 開発環境（ファイル監視）
npm run dev

# 本番ビルド
npm run build

# ビルド結果は dist/ に生成されます
```

## 🌐 GitHub Pages での公開

### オプション 1: dist/ フォルダから公開（推奨）

リポジトリ Settings → Pages → Deploy from branch で以下を設定:
- Branch: `main`
- Folder: `/ (root)` または `/dist`

結果:
- https://mshrymgc.github.io/epp_scales/dist/hexaco60.html

### オプション 2: ルートフォルダから公開

dist/ の内容をリポジトリのルートにコピー:

```bash
cp -r dist/* .
git add .
git commit -m "deploy: publish built files"
git push
```

結果:
- https://mshrymgc.github.io/epp_scales/hexaco60.html

## 📊 HEXACO-60 の使用方法

1. ブラウザで以下にアクセス:
   - https://mshrymgc.github.io/epp_scales/dist/hexaco60.html

2. 全 60 項目に回答

3. 「結果を見る」をクリック

4. 結果画面で:
   - 6 因子の合計スコアを表示
   - レーダーチャート（因子・ファセット比較）
   - 日本人ノーム（性別別）との比較

5. データは OSF (Datapipe) に自動保存

## 🔗 新しいアンケートを追加する

### 例: BFI-2-S/J を追加

1. `src/bfi2sj.js` を作成:

```javascript
import 'jspsych';
// ... 他の依存
console.log('[BFI-2-S/J] Module loaded.');
```

2. `src/templates/bfi2sj.html` を作成

3. `webpack.config.js` に entry を追加:

```javascript
export default [
  { /* hexaco60 */ },
  {
    name: 'bfi2sj',
    entry: './src/bfi2sj.js',
    output: { filename: 'bfi2sj.[contenthash].js', ... },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/templates/bfi2sj.html',
        filename: 'bfi2sj.html',
      }),
    ],
  },
];
```

4. ビルド:

```bash
npm run build
# dist/bfi2sj.html が生成される
```

## 📡 OSF (Datapipe) の設定

### 現在の experiment_id

- **HEXACO-60**: `TY0B485foupj`

### データ保存フロー

1. 参加者が全項目に回答
2. 「結果を見る」クリック
3. CSV データを OSF に POST
4. 結果画面に保存ステータスを表示
5. OSF プロジェクトの File セクションに CSV が保存

### 別の experiment_id を使う場合

`src/templates/hexaco60.html` の以下の部分を編集:

```javascript
// 「結果を見る」直後のデータ保存時
experiment_id: 'YOUR_EXPERIMENT_ID_HERE'
```

## 📝 ライセンス

ISC

## 🤝 貢献

改善提案やバグ報告は Issues にお願いします。