// 税制・社会保険等の外部パラメータ設定ファイル (ver 5.0)

const CONFIG_STORAGE_KEY = 'sim_tax_config_v5_0';

// デフォルト設定値
const DEFAULT_TAX_CONFIG = {
  // 1. 級地判定（郵便番号上3桁）
  zipClassMapping: {
    class1Prefixes: ["100", "101", "102", "103", "104", "105", "106", "107", "108", "150", "160", "530", "540", "460"],
    class2Prefixes: ["220", "230", "600", "601", "730", "810"]
  },

  // 2. 住民税非課税ライン（合計所得金額・単位：万円）
  taxFreeThresholds: {
    class1: 45, // 1級地（大都市部）
    class2: 41.5, // 2級地（中核都市）
    class3: 38  // 3級地（地方・町村部）
  },

  // 3. 所得控除関連（単位：万円）
  deductions: {
    employmentMin: 55,     // 給与所得控除（最低額）
    pensionUnder65: 60,    // 公的年金等控除（65歳未満・最低額）
    pensionOver65: 110     // 公的年金等控除（65歳以上・最低額）
  },

  // 4. 社会保険料概算算出用パラメータ
  socialInsurance: {
    taxFreeBaseAmount: 5,  // 均等割等の基本保険料（非課税時・年間万円）
    taxableBaseAmount: 10, // 課税時の基本保険料（年間万円）
    taxableRate: 0.14      // 所得に対する保険料率 (14%)
  },

  // 5. 繰上げ・繰下げ年金給付率（65歳対比）
  pensionRates: {
    age60EarlyRate: 0.76   // 60歳繰上げ (24%減額 = 76%)
  },

  // 6. 退職金・DC手取り換算率（概算）
  lumpSumNetRates: {
    retirementPay: 0.85,   // 退職金標準手取り率 (85%)
    corpDc: 0.85,          // 企業DC一時金手取り率 (85%)
    ideco: 0.85            // iDeCo一時金手取り率 (85%)
  }
};

// 現在アクティブな設定（初期化）
let TAX_CONFIG = JSON.parse(JSON.stringify(DEFAULT_TAX_CONFIG));

// ローカルストレージからの読み込み
function loadTaxConfig() {
  const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
  if (saved) {
    try {
      TAX_CONFIG = JSON.parse(saved);
    } catch (e) {
      console.error('設定値の読み込みに失敗しました', e);
      TAX_CONFIG = JSON.parse(JSON.stringify(DEFAULT_TAX_CONFIG));
    }
  }
}

// ローカルストレージへの保存
function saveTaxConfig(newConfig) {
  TAX_CONFIG = newConfig;
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(TAX_CONFIG));
}

// デフォルトへのリセット
function resetTaxConfigToDefault() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  TAX_CONFIG = JSON.parse(JSON.stringify(DEFAULT_TAX_CONFIG));
}

// 初期ロード実行
loadTaxConfig();