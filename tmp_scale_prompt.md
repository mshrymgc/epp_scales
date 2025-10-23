あなたはフロントエンド開発者です。下記の入力スキーマを用いて、単一HTMLファイル（<!doctype html>〜</html>）のjsPsychアンケートを生成してください。jsPsych本体と標準プラグインはすべてローカル./dist/から読み込み、コード以外の説明は出力しないでください（HTMLのみ）。
※アンケート、データ項目、逆転処理はテンプレ（sd3j.html）互換の命名・ロジックを維持します。

0) 入力スキーマ（柔軟設定）

scale_id: [例: RRQ-J]
title_ja: [見出しH2]
subtitle_ja: [サブ見出しH3/H4]

demographics:
  use_default: true            # 年齢(number)/性別(select)の既定UIを使うか
  extra_fields: []             # 追加設問（Surveyで実装）※任意

domains:                       # ドメイン配列（順序は可視化順）
  - code: "R"
    label: "反芻"
    items: ["...", "...", "..."]

item_numbering: "global-1based"   # 全設問通し番号(1始まり)。固定。

randomization:
  shuffle_all_items: true
  items_per_page:  [9]         # 1ページあたり件数（任意）

choices:                       # ★選択肢仕様（柔軟）
  mode: "uniform"              # "uniform"=全項目共通, "per_item"=項目別
  uniform:
    values: [1,2,3,4,5]        # 得点の実値（1〜N）※保存用
    labels: ["全く…ない","…ない","どちらとも言えない","…ある","非常に…ある"]  # 表示ラベル
    tooltips: ["1の説明","2の説明","3…","4…","5…"]                           # 任意
  per_item:                     # modeが"per_item"のときのみ使用
    # キー=グローバル項目番号(1始まり)、値= {values: [...], labels: [...], tooltips:[...] }
    "2": { values:[1,2,3,4], labels:["…","…","…","…"] }

reverse_scoring:               # ★逆転項目（柔軟）
  type: "indices"              # "indices"=番号指定 / "none"=なし
  indices: [2, 5, 9]           # グローバル項目番号(1始まり)
  # 逆転式は choices数に依存して raw_rev = (maxVal + 1) - raw を使用
  # ※per_itemでchoices数が異なる場合もこの一般式を適用

scoring:                       # ★集計仕様（柔軟）
  metric: "mean"               # "mean" | "sum" | "z" | "percentile"
  z_baseline: null             # {R: μσ, ...} 例: {"R": {"mean":3.1,"sd":0.5}, ...}
  percentile_table: null       # {R: [[raw, p], ...], ...} 任意
  weights: null                # { "R1":1, "R2":1, ... } 任意（デフォルト=1）

comparison_series:             # ★比較系列（任意で複数）
  - key: "paper_means"         # キー名
    label: "論文平均"          # 凡例ラベル
    type: "static"             # "static"（配列/オブジェクトを与える）
    values: {"R":3.10, "O":2.75}
  # - key: "cohort_means"      # 学期平均など静的入力で可。未指定なら描画省略。

chart:                         # ★グラフ仕様（柔軟）
  type: "radar"                # "radar" | "bar"
  order: "domains"             # "domains"固定（ドメイン順で描画）
  y_min: 1                     # 軸最小（Chart.js: scales.r.min / scales.y.min）
  y_max: 5                     # 軸最大（同上）
  y_step: 1
  legend_position: "bottom"    # "top"|"right"|"bottom"|"left"
  rounding_digits: 2           # 表示丸め
  show_table: true             # 数値表を併記するか

datapipe:
  use: true
  experiment_id: "[YjdIQj8B8qkF など]"   # ダミー可
  filename_rule: "random-10"            # 10桁ID+.csv
  redirect_url: null                    # 終了後に遷移(任意)

1) ライブラリと読み込み順（テンプレ互換｜必須）
	•	CSS: ./dist/jspsych.css, ./dist/survey.min.css
	•	JS（この順）
	1.	./dist/jspsych.js
	2.	./dist/plugin-html-button-response.js
	3.	./dist/plugin-survey.js
	4.	./dist/plugin-survey-likert.js   ￼
	5.	https://cdn.jsdelivr.net/npm/chart.js@4.4.x/dist/chart.umd.min.js（Chart.jsのみCDN）  ￼
	6.	https://unpkg.com/@jspsych-contrib/plugin-pipe@0.5.0/dist/index.browser.min.js（DataPipe）  ￼

2) フロー（テンプレ互換・柔軟拡張）
	1.	イントロ（HtmlButtonResponse）：「開始」で進む。
	2.	デモグラ（Survey）：use_defaultがtrueなら年齢/性別、extra_fieldsはSurveyで同ページに追加。on_finishで age/gender を jsPsych.data.addProperties。  ￼
	3.	質問（SurveyLikert）：
	•	グローバル1始まり番号を付与 → shuffle_all_itemsで全体シャッフル → items_per_pageで分割。
	•	choices.modeに応じて、各項目の表示ラベルと**保存値（1..N）**を決定。
	•	on_finish でページ情報と各回答をテンプレ互換のキーで保存：
	•	page_number, page_items
	•	各項目に対し ${DOMAIN}${k}_raw（選択値1..N）, ${DOMAIN}${k}_scored（逆転後）, ${DOMAIN}${k}_item_number（グローバル番号）。
	4.	DataPipe保存（jsPsychPipe）：experiment_id、filename=randomID(10)+'.csv'、data_string: jsPsych.data.get().csv()。  ￼
	5.	結果：
	•	収集データからraw=1..Nを復元。
	•	逆転：該当項目は一般式 raw_rev = (maxVal + 1) - raw を適用（項目ごとにchoices数が異なる場合でも可）。
	•	集計：scoring.metricに応じてドメインスコアを算出（mean/sum/z/percentile/weights対応）。
	•	可視化（Chart.js）：chart.typeに合わせて**「あなた」**＋comparison_series[]を描画。
	•	レーダーは scales.r.min/max/…、棒は scales.y.min/max/… を設定。凡例位置は plugins.legend.position。  ￼
	•	数値表：show_tableがtrueなら「特性 / あなた / 比較系列…」をrounding_digits桁で表示。
	•	「終了」押下で終了情報付与→redirect_urlがあれば遷移。

3) データ設計（テンプレ互換｜必須）
	•	開始時 addProperties: browser, os, user_agent, start_time_jst, start_timestamp。
	•	終了時：end_time_jst, end_timestamp, total_duration_ms/sec/min。
	•	ページ：page_number, page_items。
	•	項目：${DOMAIN}${k}_raw, ${DOMAIN}${k}_scored, ${DOMAIN}${k}_item_number。
（jsPsychのデータAPIで集計・保存。必要に応じてon_data_updateも利用可。）  ￼

4) バリデーション & 仕様厳守
	•	**jsPsychは必ず./dist/**から読み込み（CDN禁止）。
	•	survey-likert/surveyの使い分けは上記仕様に準拠。必須設問、進捗表示、ページ分割を実装。  ￼
	•	逆転式は一般式（maxValは該当項目のchoices最大値）を用い、テンプレ互換のキー名で保存。
	•	Chart.jsは固定スケール（y_min/y_max等）を指定し、凡例位置はオプションから設定。  ￼
	•	DataPipeは実験IDとユニークfilenameで保存。ホスティング（例：GitHub Pages）＋OSFトークンが必要。  ￼

5) 出力要件
	•	HTMLのみ（説明文なし）。
	•	本スキーマの内容を忠実に反映し、未指定のオプションは妥当なデフォルト（例：5件法、mean、レーダー、比較なし）。
	•	テンプレと同名・同ロジックの処理・フィールド名・保存形式を維持。

⸻

最小の入力例（5件法→4件法に一部変更／比較系列を追加／棒グラフに変更）

scale_id: SAMPLE-FLEX
title_ja: サンプル柔軟アンケート
subtitle_ja: 授業デモ用
domains:
  - code: "A"
    label: "情動"
    items: ["最近よく落ち込む", "不安を感じやすい", "気分が安定している"]
  - code: "B"
    label: "省察"
    items: ["自分の感情を振り返る", "経験から学ぶ"]
item_numbering: "global-1based"
randomization: { shuffle_all_items: true, items_per_page: 8 }
choices:
  mode: "per_item"
  uniform:
    values: [1,2,3,4,5]
    labels: ["全くない","ない","どちらとも言えない","ある","非常にある"]
  per_item:
    "2": { values:[1,2,3,4], labels:["まったくない","ややない","ややある","とてもある"] }
reverse_scoring: { type:"indices", indices:[3] }
scoring: { metric:"mean", weights:null }
comparison_series:
  - key:"paper_means"
    label:"論文平均"
    type:"static"
    values: {"A":3.0,"B":3.2}
chart: { type:"bar", y_min:1, y_max:5, y_step:1, legend_position:"bottom", rounding_digits:2, show_table:true }
datapipe: { use:true, experiment_id:"YjdIQj8B8qkF", filename_rule:"random-10", redirect_url:null }