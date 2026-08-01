# FP-Simulation-with-Settings-Screen
This tool is designed for people in their 50s and 60s living in Japan. Based on data regarding income and assets held around the time of retirement, it calculates the resident tax exemption threshold for ages 60 to 70, social insurance premiums, the amount of assets to be drawn down, and the estimated remaining assets at age 70.
-----------------------------------------------------------------------------------------------------
※本シミュレーションは概算による試算です。利用にあたっては必ず利用規約・免責事項をご確認ください。
 
ソフトウェア仕様書：マイ資産取り崩し＆社会保険料シミュレーター 設定画面モデル(ver5.0)

1. システム概要
本ツールは、50代から60代の単身および夫婦世帯を対象とし、定年退職前後の就労収入、公的年金、退職金、企業DC（確定拠出年金）、iDeCo、ならびに保有資産（現金・株式・債券）のデータを基に、60歳〜70歳（10年間）における住民税非課税ラインの判定、推定社会保険料、年間資産取り崩し額、および70歳時点での推計残存資産を算定するWebベースのシミュレーションツールである。

2. システム構成・動作環境
2.1 構成ファイル
index.html（本ソースコード：画面レイアウト、UI制御、シミュレーションロジック）
tax_config.js（外部税制・保険料パラメータ設定ファイル）
2.2 動作環境
ブラウザ: JavaScript（ES6+）および DOM API、localStorage に対応したモダンブラウザ（Chrome, Edge, Safari, Firefox等）
依存関係: 外部ライブラリ非依存（バニラJS / CSS3）

3. UI/UX 仕様
3.1 画面レイアウト構成
画面はカード型のレスポンシブデザイン（CSS Grid / Flexbox）で構築されている。
ヘッダーエリア
タイトル表示
⚙️ 税制・保険料設定 ボタン（設定モーダルを開く）
初期値に戻す ボタン（入力値を初期化）
カード1: 基本情報 & 地域区分
世帯構成（夫婦世帯 / 単身世帯）の切替
郵便番号（級地判定用）
本人および配偶者の生年月日、年金受給開始予定年齢、65歳時点想定年金額
カード2: 世帯保有資産 & 退職金・DC・iDeCo設定
世帯共有資産（現金、株式、株式想定利回り、債券）
本人および配偶者の各種退職給付・年金資産（早期退職金、定年退職金、企業DC、iDeCo）およびその受取年齢・受取方法
カード3: 支出・就労プラン（60代前半）
世帯基本生活費、住まい維持費、自動車維持費
本人および配偶者の60代前半の働き方・年間就労収入
実行エリア
エラーメッセージ表示エリア（入力検証エラー時に表示）
シミュレーションを実行する ボタン
カード4: シミュレーション結果表示エリア（初期状態は非表示）
地域区分・非課税目安所得の表示
税制重複ルール（10年ルール／19年ルール）警告表示
推定社会保険料・介護保険料および非課税判定結果
年間資産取り崩し額（および月平均換算額）
70歳時点の推計残存資産テーブル（資産種別ごとの60歳時点 vs 70歳時点）
モーダルダイアログ: 税制・社会保険 パラメータ設定
TAX_CONFIG の各パラメータを画面上で一時変更・保存・初期化する画面
3.2 動的表示制御
単身/夫婦切り替え (toggleCoupleMode):
#isCouple で「単身世帯」が選択された場合、クラス .spouse-field を持つすべての配偶者入力項目を非表示 (display: none) にする。
働き方に応じた入力制御 (handleWorkStyleChange):
本人または配偶者の働き方で「完全リタイア」が選択された場合、対応する年間就労収入フォームの値を 0 にし、非活性化 (disabled = true) にする。

4. データ仕様 & ローカルストレージ
4.1 データ保存仕様 (STORAGE_KEY: 'sim_v5_0_couple_input_data')
ユーザーがフォーム項目（input, select）を変更するたびに、input / change イベントを検知し、id が cfg_（設定用パラメータ）以外の全入力値を JSON.stringify 形式で localStorage に保存する。
画面読み込み時（DOMContentLoaded）に自動で保存データをロードし、フォーム各項目へ値を復元する。
4.2 フォーム要素・デフォルト値一覧
要素ID
項目名
初期値
単位 / 選択肢
zip
郵便番号
100-0001
テキスト
isCouple
世帯構成
couple
couple (夫婦), single (単身)
dob
本人生年月日
1970-01-01
日付
retireAge
本人年金受給開始年齢
65
60 (24%減額), 65 (原則), 70 (42%増額)
basePension
本人65歳想定年金
180
万円/年
dobSpouse
配偶者生年月日
1972-01-01
日付
retireAgeSpouse
配偶者年金受給開始年齢
65
60, 65, 70
basePensionSpouse
配偶者65歳想定年金
100
万円/年
cash
現金預金
1000
万円
stocks
株式・投資信託評価額
1000
万円
stockYield
株式想定利回り
3.0
%
bonds
債券評価額
0
万円
earlyRetirePay
50代早期退職金
0
万円
earlyRetireAge
50代退職金受取年齢
55
歳
retirementPay
60代定年退職金
1500
万円
retirePayAge
定年退職金受取年齢
60
60, 65
corpDc
企業DC残高
300
万円
corpDcMethod
企業DC受取方法
lump
lump (一時金), annuity (10年年金)
ideco
iDeCo残高
200
万円
idecoPayAge
iDeCo受取年齢
65
60, 65, 70
idecoPayMethod
iDeCo受取方法
annuity
lump (一時金), annuity (10年年金)
monthlyLiving
世帯基本生活費
28
万円/月
workStyle60
本人60代前半働き方
reemployed
reemployed (再雇用), newjob (再就職/パート), retired (リタイア)
workIncome60
本人60代前半就労収入
180
万円/年
propertyTax
住まい維持費
15
万円/年
carCost
自動車維持費
20
万円/年


5. 計算ロジック & シミュレーション仕様 (calculate())
5.1 バリデーション（入力チェック）
生年月日チェック: 本人の生年月日が未入力の場合はエラーを表示して処理を中断する。
対象年齢チェック: 本人の現在年齢が 50歳〜64歳 の範囲外である場合、警告メッセージを表示し計算を中断する。
5.2 地域区分（級地）判定
入力された郵便番号の上3桁（zip3）を基に、TAX_CONFIG.zipClassMapping を参照して非課税ライン（合計所得金額目安）を決定する。
1級地 (大都市部): 上3桁が class1Prefixes に該当 $\rightarrow$ 判定閾値: TAX_CONFIG.taxFreeThresholds.class1
2級地 (地方中核都市): 上3桁が class2Prefixes に該当 $\rightarrow$ 判定閾値: TAX_CONFIG.taxFreeThresholds.class2
3級地 (地方・町村部): 上記以外 $\rightarrow$ 判定閾値: TAX_CONFIG.taxFreeThresholds.class3
5.3 年金および各種所得・非課税判定 (60代前半)
公的年金受給額の計算:
受給開始年齢が60歳（繰上げ）の場合：
$$\text{受給額} = \text{想定年金額} \times \text{TAX\_CONFIG.pensionRates.age60EarlyRate}$$
受給開始年齢が65歳または70歳の場合：60〜65歳期間の公的年金受給額は 0。
所得金額の計算（本人・配偶者それぞれ算出）:
給与所得: $\max(0, \text{年間就労収入} - \text{TAX\_CONFIG.deductions.employmentMin})$
雑所得（年金等）:
年金収入計 = 公的年金(60〜65歳) + 企業DC年金分（10年分割） + iDeCo年金分（10年分割）
控除額 = 年金収入計 $> 0$ の場合 TAX_CONFIG.deductions.pensionUnder65
雑所得 = $\max(0, \text{年金収入計} - \text{控除額})$
合計所得金額: 給与所得 + 雑所得
住民税非課税判定:
合計所得金額 $\le$ 級地別非課税閾値 の場合 $\rightarrow$ 非課税
5.4 社会保険料・介護保険料の推計
世帯員ごとに非課税判定を行い、それぞれの年間推定保険料を算出・合算する。
非課税世帯/個人の場合: TAX_CONFIG.socialInsurance.taxFreeBaseAmount
課税世帯/個人の場合:
$$\text{合計所得金額} \times \text{TAX\_CONFIG.socialInsurance.taxableRate} + \text{TAX\_CONFIG.socialInsurance.taxableBaseAmount}$$
5.5 税制重複ルール（控除減額）警告ロジック
19年ルール（退職金重複）: 50代早期退職金が存在し、定年退職金との受取間隔が19年未満の場合、定年退職金の手取り率を微減（95%乗算）し、警告タグを出力する。
10年ルール（iDeCo/退職金重複）: iDeCoを一時金で受け取る設定で、退職金受取年齢との差が10年未満の場合、重複調整の警告タグを出力する。
5.6 10年間のキャッシュフロー & 資産推移シミュレーション (60歳〜70歳)
支出および収入の整理
年間総支出 (60代前半):
$$\text{総支出} = (\text{月額基本生活費} \times 12) + \text{住まい維持費} + \text{自動車維持費} + \text{世帯推定社会保険料}$$
年間総収入 (60〜65歳):
就労収入 + 公的年金 + 企業DC年金 + iDeCo年金（本人・配偶者合計）
年間赤字額 (60〜65歳): $\max(0, \text{年間総支出} - \text{年間総収入 (60-65歳)})$
年間赤字額 (65〜70歳): $\max(0, \text{年間総支出} - \text{公的年金収入 (65歳以降)})$
10年間累計赤字額: $(\text{年間赤字額 (60-65)} \times 5) + (\text{年間赤字額 (65-70)} \times 5)$
資産の充当と推移算定
一時金（キャッシュ）の算入:
早期退職金、定年退職金、企業DC（一時金選択時）、iDeCo（一時金選択時）の手取り額（TAX_CONFIG.lumpSumNetRates を乗算）を現金預金に加算する。
株式資産の運用成長:
60歳時点の株式資産を、想定利回り（stockYield）で10年間複利運用する：
$$\text{70歳時点の株式} = \text{株式評価額} \times (1 + \text{stockYield})^{10}$$
取り崩し順序（現金優先 $\rightarrow$ 株式充当）:
現金預金 $\ge$ 10年間累計赤字額 の場合：
70歳時点現金 = 現金預金 - 10年間累計赤字額
70歳時点株式 = 運用成長後の株式評価額
現金預金 $<$ 10年間累計赤字額 の場合：
不足額 = 10年間累計赤字額 - 現金預金
70歳時点現金 = 0
70歳時点株式 = $\max(0, \text{運用成長後の株式評価額} - \text{不足額})$

6. 税制・社会保険設定モーダル仕様
6.1 パラメータ構造 (TAX_CONFIG)
モーダル内から以下の設定値を閲覧・変更し、再計算を実行できる。
taxFreeThresholds: 1級地・2級地・3級地の非課税ライン閾値
deductions: 給与所得控除最低額（employmentMin）、65歳未満公的年金等控除額（pensionUnder65）
socialInsurance: 非課税基本料（taxFreeBaseAmount）、課税基本料（taxableBaseAmount）、所得比例率（taxableRate）
pensionRates: 60歳繰上げ時の給付率（age60EarlyRate）
lumpSumNetRates: 各種一時金の手取り率（retirementPay, corpDc, ideco）

7. 例外処理・保守上の注意事項
コード補全に関する注意:
提供されたソースコードの最終部（document.getElementById('pensionInfo').i... 付近）で記述が中断しています。実際の運用時には、シミュレーション結果を表示するDOM操作コード（DOMエレメントへのテキスト代入および assetTableBody への行追加処理）を補完して実装する必要があります。
外部依存パラメータの管理:
税率や保険料率、控除額は法律・制度改正により変更されるため、tax_config.js 内の定数および TAX_CONFIG オブジェクトを定期的に保守・更新する構成とすることが推奨されます。

8. 免責事項・商用利用の制限
　○　免責事項: 本ツールの計算結果（税額・社会保険料等）は将来の精度を保証するものではありません。実際の正確な数値は関係官庁や専門家にご確認ください。
　○　商用利用の制限: 本ツールの無断での商用サービスへの組み込み、有料での再配布・販売等は禁止します（個人利用・自己責任でのご利用に限ります）。
　※ 改変をご希望の方は、お問い合わせください。
