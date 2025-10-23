あなたはフロントエンド開発者です。以下の入力スキーマに基づき、単一HTMLファイル（<!doctype html>〜</html>）でjsPsych認知実験を実装してください。
外部CDNは禁止（例外：Chart.js と jspsych-contrib/plugin-pipe は可）。jsPsych本体と標準プラグインは必ず ./dist/ から読み込み、コード以外の説明は出力しないでください（HTMLのみ）。タイムラインで実験を定義し、必要なプラグインを組み合わせてください。  ￼

⸻

0) 入力スキーマ（柔軟設定）

experiment_id: [例: IGT-DEMO-JP]
title_ja: [見出しH2]
subtitle_ja: [サブ見出しH3/H4]

env:
  use_fullscreen: true              # 実験開始時に全画面
  locale: "ja-JP"                   # 日付/数値フォーマット
  seed: null                        # 乱数シード（nullなら未固定）

libraries:
  chart_js_cdn: "https://cdn.jsdelivr.net/npm/chart.js@4.4.x/dist/chart.umd.min.js"
  pipe_cdn:    "https://unpkg.com/@jspsych-contrib/plugin-pipe@0.5.0/dist/index.browser.min.js"

plugins:                             # ./dist から読み込む標準プラグインの最小集合
  - "./dist/jspsych.js"
  - "./dist/plugin-html-button-response.js"
  - "./dist/plugin-html-keyboard-response.js"
  - "./dist/plugin-canvas-keyboard-response.js"
  - "./dist/plugin-preload.js"

factors:                             # 実験要因（例：条件×刺激）
  condition: ["congruent","incongruent"]
  stimulus_type: ["word","xxxx"]

stimuli:                              # 刺激定義（画像/テキスト/キャンバス描画パラメータ等）
  text:
    congruent:  ["青(青)","赤(赤)"]
    incongruent:["青(赤)","赤(青)"]
  images: []                          # ["img/face_happy.png", ...] 等
  canvas_draw: null                   # {width,height,fnName:"drawDotProbe", fnSource:"function drawDotProbe(ctx, tv){...}"}

trial_structure:                      # 試行の流れ
  practice:
    n: 16
    feedback: true
    advance_criteria:
      min_accuracy: 0.75
      max_mean_rt_ms: 1500
  test:
    blocks: 4
    trials_per_block: 48
    iti_ms: [300,700]                 # 一様分布からサンプリング
    soa_ms: 0                         # 例: プライム→ターゲットSOA
    timeout_ms: 2000
    response_keys: ["f","j"]
    correct_mapping:                  # 条件→正答キー
      congruent: "f"
      incongruent: "j"

randomization:
  unit: "trial"                       # "trial" | "block"
  counterbalance: "latin-square"      # "none" | "latin-square"
  jitter_ms: [0,200]                  # 刺激提示のジッタ

data_fields_common:                   # 収集する共通フィールド（addProperties）
  participant_id: "auto-random-10"    # 10桁ID自動生成
  browser_info: true
  start_time_jst: true

computed_columns:                     # ★各試行で算出・付与する派生列
  - name: "correct"
    expr: "resp_key === correct_key ? 1 : 0"
  - name: "rt_ms_clipped"
    expr: "rt < 100 || rt > 3000 ? null : rt"
  - name: "condition_label"
    expr: "condition"

metrics:                              # ★集計・スコア（柔軟に増減）
  aggregations:
    - name: "acc_by_condition"
      group_by: ["condition_label"]
      include: "correct !== null"
      stat: "mean(correct)"
    - name: "rt_by_condition"
      group_by: ["condition_label"]
      include: "correct === 1 && rt_ms_clipped !== null"
      stat: "mean(rt_ms_clipped)"
  signal_detection:                   # 任意（Go/No-Go / SDT課題向け）
    enabled: false
    hit_condition:   { signal: "target",  response: "go" }
    fa_condition:    { signal: "nontarget", response: "go" }
    correction: "loglinear"           # "none" | "0.5" | "loglinear"
  custom_functions: []                # 例: [{"name":"ies","source":"(mrt/acc)"}] (JS式や関数文字列)

feedback:
  charts:                             # Chart.js で描画（種類/軸レンジ/丸め）
    - type: "bar"
      title: "正答率（条件別）"
      from_metric: "acc_by_condition"
      y_min: 0
      y_max: 1
      decimals: 2
    - type: "bar"
      title: "平均反応時間ms（条件別）"
      from_metric: "rt_by_condition"
      y_min: 0
      y_max: 3000
      decimals: 0
  tables: true                        # メトリクスを表でも表示
  narrative:                          # 自動コメント（閾値に応じて）
    rules:
      - when: "acc_by_condition.congruent < 0.75"
        say:  "一致条件の正答率がやや低めです。"
      - when: "rt_by_condition.incongruent - rt_by_condition.congruent > 80"
        say:  "干渉効果（インコン > コン）がみられます。"

quality_control:                      # 失格判定
  min_trials: 50
  min_overall_accuracy: 0.6
  rt_range_ms: [150, 3000]

datapipe:
  use: true
  experiment_id: "[ダミー/本番ID]"
  filename_rule: "random-10"          # 10桁ID+.csv
  redirect_url: null


⸻

1) ライブラリ読込順（厳守）
	•	CSS：./dist/jspsych.css
	•	JS：
	1.	./dist/jspsych.js
	2.	./dist/plugin-preload.js
	3.	課題で使うプラグイン（例：html-keyboard-response, canvas-keyboard-response など）
	4.	Chart.js（CDN可）
	5.	jspsych-contrib/plugin-pipe（CDN可）
（タイムラインに並べる試行は各プラグインの trial オブジェクトで構成します。）  ￼

⸻

2) 実装要件（サマリ）
	•	タイムラインで練習→本試行（block×trial）を記述し、必要に応じてtimeline variablesで条件と刺激を差し替えます。  ￼
	•	反応取得は html-keyboard-response もしくは canvas-keyboard-response を中心に使用（刺激の提示停止・タイムアウト・キー指定を trial パラメータで設定）。  ￼
	•	各試行終了 on_finish で computed_columns を評価してデータに追加。全体集計は jsPsych のデータAPIで配列→グルーピング→統計量を求めます。  ￼
	•	SDT 指標が有効なら、ヒット率/FA率から d' = z(H) - z(FA) などを算出（連続性補正は指定に従う）。  ￼
	•	フィードバックは Chart.js で棒グラフ/レーダ等を描画。軸レンジ・目盛・凡例位置は設定から反映します。  ￼
	•	DataPipe で .csv 保存（experiment_id とランダム filename）。  ￼

⸻

3) 収集データ設計（共通）
	•	開始時 addProperties: participant_id（ランダム10桁 or 外部付与）、browser/os/user_agent、start_*。
	•	各試行：trial_index, block, condition, stimulus_id, rt, resp_key, correct_key, correct（computed）, ほか computed_columns。
	•	終了時：end_*, total_duration_ms/sec/min。
（アンケートは使わないため、逆転項目処理は実装しないこと。）

⸻

4) 出力要件
	•	HTMLのみ（説明テキスト不可）。
	•	./dist ローカル読込とプラグイン順を厳守。
	•	入力スキーマの未指定項目は妥当なデフォルト（例：練習16試行、4ブロック×48試行、キーF/J、正答率・RTの棒グラフ）。
	•	失格条件に該当した場合はQCメッセージを表示し、保存は実施（フラグ付与）。

⸻

最小の入力例（Flanker風：条件×RT/ACCのバー表示）

experiment_id: FLANKER-DEMO
title_ja: フランカー課題（デモ）
subtitle_ja: 反応時間と正答率の条件差
env: { use_fullscreen:true, locale:"ja-JP", seed:123 }
factors: { condition:["congruent","incongruent"], stimulus_type:["arrow"] }
stimuli:
  text:
    congruent:   [">>>>>>", "<<<<<<"]
    incongruent: [">>><>>", "<<><<<"]
trial_structure:
  practice: { n:16, feedback:true, advance_criteria:{min_accuracy:0.75, max_mean_rt_ms:1500} }
  test:
    blocks: 4
    trials_per_block: 48
    iti_ms: [300,700]
    timeout_ms: 2000
    response_keys: ["f","j"]
    correct_mapping: { congruent:"f", incongruent:"j" }
randomization: { unit:"trial", counterbalance:"latin-square", jitter_ms:[0,200] }
computed_columns:
  - { name:"correct", expr:"resp_key === correct_key ? 1 : 0" }
  - { name:"rt_ms_clipped", expr:"rt < 100 || rt > 3000 ? null : rt" }
  - { name:"condition_label", expr:"condition" }
metrics:
  aggregations:
    - { name:"acc_by_condition", group_by:["condition_label"], include:"correct !== null", stat:"mean(correct)" }
    - { name:"rt_by_condition",  group_by:["condition_label"], include:"correct === 1 && rt_ms_clipped !== null", stat:"mean(rt_ms_clipped)" }
feedback:
  charts:
    - { type:"bar", title:"正答率（条件別）", from_metric:"acc_by_condition", y_min:0, y_max:1, decimals:2 }
    - { type:"bar", title:"平均RT（条件別, ms）", from_metric:"rt_by_condition",  y_min:0, y_max:3000, decimals:0 }
  tables: true
quality_control: { min_trials:50, min_overall_accuracy:0.6, rt_range_ms:[150,3000] }
datapipe: { use:true, experiment_id:"YjdIQj8B8qkF", filename_rule:"random-10", redirect_url:null }