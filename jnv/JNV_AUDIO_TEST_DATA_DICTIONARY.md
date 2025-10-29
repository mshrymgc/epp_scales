# JNV 音声感情認識テスト データ辞書

## 概要
本ドキュメントは、**JNV 音声感情認識テスト**（`jnv_audio_test.html`）で収集されるデータ構造と変数について説明します。このテストは、日本語非言語音声コーパス（JNV corpus）に基づいています。

**テスト所要時間:** 3～5分  
**試行数:** 24 試行（感情認識タスク）  
**ライセンス:** CC BY-SA 4.0

---

## 変数辞書

### メタデータ・セッション情報

| 変数名 | データ型 | 説明 | 例 | 備考 |
|--------|---------|------|-----|------|
| `subject_id` | 文字型 | 参加者の一意識別子（10文字のランダム ID） | `5sobg671f9` | 自動生成 |
| `timestamp_start` | 日時型（ISO 8601） | セッション開始時刻（UTC） | `2025-10-29T02:21:03.782Z` | ISO 8601 形式（ミリ秒単位） |
| `task_name` | 文字型 | タスク・実験名 | `JNV_AUDIO_TEST` | 固定値 |
| `total_trials` | 整数型 | 本試行の総数 | `24` | 固定値 |

### 参加者属性情報

| 変数名 | データ型 | 説明 | 例 | 有効値 |
|--------|---------|------|-----|--------|
| `age` | 整数型 | 参加者の年齢（歳） | `25` | 1～150 歳；未回答の場合は空白 |
| `gender` | 文字型 | 参加者の性別 | `男性` | `男性`（男性）、`女性`（女性）、`その他`、`未回答` |

### ブラウザ・システム情報

| 変数名 | データ型 | 説明 | 例 | 備考 |
|--------|---------|------|-----|------|
| `browser` | 文字型 | ブラウザ名 | `Chrome` | `Chrome`、`Firefox`、`Safari`、`Edge`、`Opera`、`Internet Explorer` |
| `os` | 文字型 | オペレーティングシステム | `macOS` | `Windows`、`macOS`、`Linux`、`Android`、`iOS` |
| `userAgent` | 文字型 | ユーザーエージェント文字列（完全版） | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...` | ブラウザ識別文字列全体 |
| `screen_width` | 整数型 | 画面幅（ピクセル） | `3440` | ディスプレイ解像度の幅；不明な場合は null |
| `screen_height` | 整数型 | 画面高さ（ピクセル） | `1440` | ディスプレイ解像度の高さ；不明な場合は null |
| `timezone` | 文字型 | 参加者のタイムゾーン | `Asia/Tokyo` | IANA タイムゾーン識別子 |

### 試行提示・記録情報

| 変数名 | データ型 | 説明 | 例 | 備考 |
|--------|---------|------|-----|------|
| `rt` | 整数型 | 反応時間（ミリ秒） | `2887` | 刺激提示から応答までの時間；音源再生時間を含む場合あり |
| `trial_index` | 整数型 | 試行の順序番号（0 から開始） | `2` | 導入（0）、属性（1）、本試行（2～25） |
| `time_elapsed` | 整数型 | セッション開始からの経過時間（ミリ秒） | `12986` | セッション開始からの累積時間 |
| `trial_type` | 文字型 | 試行の種類 | `html-button-response` | すべての記録行で固定値 |
| `trial_type_custom` | 文字型 | カスタム試行分類 | `main` | `main` = 本試行；導入・属性では null |

### 刺激情報

| 変数名 | データ型 | 説明 | 例 | 有効値 |
|--------|---------|------|-----|---------|
| `filename` | 文字型 | 音源ファイル名 | `F2_fear_00_F.wav` | 形式：`{話者}_{感情}_{番号}_{句}.wav` |
| `speaker` | 文字型 | 話者識別子 | `F2` | `M1`、`M2`、`F1`、`F2`（男性/女性話者） |
| `correct_emotion` | 文字型 | 刺激のターゲット感情 | `fear` | `angry`（怒り）、`disgust`（嫌悪）、`fear`（恐怖）、`happy`（幸福）、`sad`（悲しみ）、`surprise`（驚き） |
| `accuracy` | 数値型 | 元の JNV コーパスにおける強制選択認識正答率 | `0.67` | 範囲：0.67～1.0（選定基準：≥ 0.67） |

### 応答データ

| 変数名 | データ型 | 説明 | 例 | 有効値 |
|--------|---------|------|-----|---------|
| `response` | 整数型 | ボタン応答のインデックス（0 から開始） | `0` | 0～5：怒り、嫌悪、恐怖、幸福、悲しみ、驚きの順序に対応 |
| `chosen_emotion` | 文字型 | 参加者が選択した感情 | `angry` | `angry`、`disgust`、`fear`、`happy`、`sad`、`surprise` |
| `is_correct` | 整数型 | 正誤判定（二値） | `1` | 1 = 正答（選択感情 = ターゲット感情）；0 = 誤答 |

### 音源再生トラッキング情報

| 変数名 | データ型 | 説明 | 例 | 備考 |
|--------|---------|------|-----|------|
| `audio_played` | 整数型 | 音源が再生されたか | `1` | 1 = 再生済；0 = 応答前に未再生 |
| `play_count` | 整数型 | 音源の再生・一時停止操作回数 | `1` | 再生ボタンクリック数；再生なしの場合は 0 |
| `play_start_time` | タイムスタンプ（ミリ秒） | 最初の音源再生開始時刻 | `1761704477556` | Unix タイムスタンプ（ミリ秒）；再生なしの場合は null |
| `play_end_time` | タイムスタンプ（ミリ秒） | 最後の音源再生終了時刻 | null | Unix タイムスタンプ（ミリ秒）；再生中・未再生の場合は null |
| `last_play_time` | タイムスタンプ（ミリ秒） | 最後の再生操作時刻 | `1761704477556` | Unix タイムスタンプ（ミリ秒）；未再生の場合は null |
| `total_play_duration` | 整数型 | 音源再生の総時間（ミリ秒） | `0` | play_start_time から play_end_time で計算；未再生の場合は 0 |
| `time_from_last_play_to_response` | 整数型 | 最後の再生から応答までの時間（ミリ秒） | `1468` | 最後の再生操作からボタン応答までのミリ秒；未再生の場合は null |

### 管理フィールド

| 変数名 | データ型 | 説明 | 例 | 備考 |
|--------|---------|------|-----|------|
| `stimulus` | 文字型 | HTML 刺激提示コード | 長い HTML 文字列 | 試行画面の完全な HTML；試行指示とボタンを含む |
| `internal_node_id` | 文字型 | jsPsych 内部ノード識別子 | `5sobg671f9` | 参加者 ID にマッピング；内部追跡用 |

---

## データ構造に関する注記

### CSV に含まれる行の種類

エクスポートされた CSV には 3 つの種類の行が含まれます：

1. **導入画面（trial_index=0）**
   - タスク紹介と説明
   - ほとんどのカスタム変数は空白

2. **属性情報画面（trial_index=1）**
   - 年齢と性別の入力画面
   - Stimulus には form HTML を含む
   - 年齢と性別はこの行に入力され、以降の行に継承される

3. **本試行（trial_index=2～25、24 試行）**
   - 感情認識刺激試行
   - 刺激、応答、トラッキング変数をすべて記録
   - trial_type_custom = `main` でフィルタリング可能

### 分析時の主要ポイント

- **総行数:** 26 行（1 導入 + 1 属性 + 24 本試行）
- **総列数:** 33 列（メタデータ + 属性 + システム + 試行 + 応答 + 音源トラッキング）
- **欠損データのパターン:**
  - `age`、`gender`：導入・本試行では空白（属性画面のみに記入）
  - `chosen_emotion`、`correct_emotion`、`is_correct`：導入・属性では空白
  - 音源トラッキング変数：`audio_played = 0` の場合は 0 または null

### R/JASP へのインポート方法

**統計分析用に本試行のみをフィルタリング:**
```r
# R の例：
main_data <- df %>% filter(trial_type_custom == "main")

# JASP の場合：Filter -> trial_type_custom equals "main"
```

**推奨されるデータ型マッピング:**

| 変数名 | R の型 | JASP の型 |
|--------|--------|----------|
| subject_id | character | テキスト |
| age | numeric | 整数型 |
| gender | factor | カテゴリー |
| browser, os | factor | カテゴリー |
| correct_emotion, chosen_emotion | factor | カテゴリー |
| speaker | factor | カテゴリー |
| is_correct | factor (0/1) | カテゴリーまたは数値 |
| audio_played | numeric (0/1) | 数値 |
| play_count | numeric | 整数型 |
| rt | numeric | 数値 |
| time_from_last_play_to_response | numeric | 数値 |
| accuracy | numeric | 数値 |

---

## 分析例

### 1. 正答率分析
```r
# 全体の正答率を計算
accuracy_rate <- mean(main_data$is_correct) * 100

# 感情別の正答率
by_emotion <- main_data %>%
  group_by(correct_emotion) %>%
  summarise(accuracy = mean(is_correct) * 100)

# 話者別の正答率
by_speaker <- main_data %>%
  group_by(speaker) %>%
  summarise(accuracy = mean(is_correct) * 100)
```

### 2. 反応時間分析
```r
# RT の記述統計
summary(main_data$rt)

# 正誤別の反応時間
rt_by_accuracy <- main_data %>%
  mutate(accuracy_label = if_else(is_correct == 1, "正答", "誤答")) %>%
  group_by(accuracy_label) %>%
  summarise(mean_rt = mean(rt), sd_rt = sd(rt))

# 音源再生有無別の反応時間
rt_by_play <- main_data %>%
  mutate(audio_status = if_else(audio_played == 1, "再生", "未再生")) %>%
  group_by(audio_status) %>%
  summarise(mean_rt = mean(rt), n = n())
```

### 3. 音源再生エンゲージメント分析
```r
# 音源再生率
engagement <- mean(main_data$audio_played) * 100

# 複数回再生（不確実性を示唆）
multiple_plays <- main_data %>%
  filter(play_count > 1) %>%
  nrow()

# 最後の再生から応答までの平均時間
mean_delay <- mean(main_data$time_from_last_play_to_response, na.rm = TRUE)
```

### 4. システム・ブラウザ効果分析（オプション）
```r
# ブラウザ別の正答率
browser_effects <- main_data %>%
  group_by(browser) %>%
  summarise(accuracy = mean(is_correct) * 100, n = n())

# 画面解像度別の反応時間
screen_effects <- main_data %>%
  group_by(screen_width, screen_height) %>%
  summarise(mean_rt = mean(rt), n = n())
```

---

## 品質保証チェックリスト

- ✅ 全 24 試行が完了
- ✅ エンゲージメント分析のための音源再生トラッキングが利用可能
- ✅ ブラウザ・OS・タイムゾーン情報が記録
- ✅ ミリ秒精度での反応時間データが収集
- ✅ 応答選択肢が正しくエンコード（0～5 が感情順序に対応）
- ✅ 正誤判定が計算・記録
- ✅ データリンク用の一意参加者 ID が存在

---

## 参考文献

**JNV コーパス:**
- Xin, Detai, Shinnosuke Takamichi, and Hiroshi Saruwatari. "JNV corpus: A corpus of Japanese nonverbal vocalizations with diverse phrases and emotions." *Speech Communication* 156 (2024): 103004.
- [論文](https://www.sciencedirect.com/science/article/pii/S0167639323001383)
- ライセンス: CC BY-SA 4.0

**jsPsych:**
- de Leeuw, J. R. (2015). jsPsych: A JavaScript library for creating behavioral experiments in a web browser. *Behavior Research Methods*, 47(1), 1-12.
- [ドキュメント](https://www.jspsych.org/)

---

## 引用方法

本テストのデータを使用する場合は、以下をご引用ください：
- JNV コーパス（上記参考文献を参照）
- 本データ辞書をエクスポートデータセットに添付
- 分析方法にブラウザ・システム情報の記載をお願いします

---

**最終更新:** 2025-10-29  
**バージョン:** 1.0
