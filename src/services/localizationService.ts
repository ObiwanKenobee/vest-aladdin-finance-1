import {
  localizationConfig,
  getLanguageConfig,
  getCurrencyConfig,
  getRegionConfig,
} from "../config/localization";
import { formatCurrency, getCurrencyInfo } from "../utils/formatCurrency";
import { fetcher } from "../utils/fetcher";
import { globalLanguageService } from "./globalLanguageService";
import { regionalSovereigntyService } from "./regionalSovereigntyService";
import { LanguageSovereignty, RegionalConfig } from "../types/GlobalLanguage";

export class LocalizationService {
  private static instance: LocalizationService;
  private currentLanguage: string = localizationConfig.defaultLanguage;
  private currentCurrency: string = localizationConfig.defaultCurrency;
  private currentRegion: string = localizationConfig.defaultRegion;
  private translations: Map<string, Record<string, string>> = new Map();
  private exchangeRates: Map<string, { rate: number; timestamp: number }> =
    new Map();
  private readonly ratesCacheTTL = 60 * 60 * 1000; // 1 hour

  static getInstance(): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService();
    }
    return LocalizationService.instance;
  }

  /**
   * Initialize localization service with global language sovereignty
   */
  async initialize(
    language?: string,
    currency?: string,
    region?: string,
  ): Promise<void> {
    try {
      // Initialize global language service first
      const globalLanguage = globalLanguageService.getCurrentLanguage();
      const globalRegion = globalLanguageService.getCurrentRegion();

      // Use global language system if available
      const targetLanguage =
        language || globalLanguage?.code || this.detectLanguage();
      const targetRegion =
        region || globalRegion?.regionId || this.detectRegion();

      await this.setLanguage(targetLanguage);
      await this.setCurrency(currency || this.detectCurrency());
      await this.setRegion(targetRegion);

      // Load initial translations
      await this.loadTranslations(this.currentLanguage);

      // Initialize exchange rates
      await this.updateExchangeRates();

      // Sync with global language service
      await this.syncWithGlobalLanguageService();

      console.log(
        "Localization service initialized successfully with global sovereignty support",
      );
    } catch (error) {
      console.error("Error initializing localization service:", error);
      throw new Error("Failed to initialize localization service");
    }
  }

  /**
   * Sync with global language sovereignty service
   */
  private async syncWithGlobalLanguageService(): Promise<void> {
    try {
      // Listen for global language changes
      window.addEventListener("languageChanged", async (event: CustomEvent) => {
        const { language, region } = event.detail;

        if (language && language.code !== this.currentLanguage) {
          await this.setLanguage(language.code);
        }

        if (region && region.regionId !== this.currentRegion) {
          await this.setRegion(region.regionId);
        }
      });

      // Apply cultural context from global service
      await this.applyCulturalContext();
    } catch (error) {
      console.warn("Failed to sync with global language service:", error);
    }
  }

  /**
   * Apply cultural context from global language service
   */
  private async applyCulturalContext(): Promise<void> {
    const currentGlobalLanguage = globalLanguageService.getCurrentLanguage();
    if (!currentGlobalLanguage) return;

    // Apply cultural formatting preferences
    const culturalContext = await this.getCulturalAdaptation(
      currentGlobalLanguage,
    );

    // Update service settings based on cultural context
    if (culturalContext.numberFormat) {
      // Apply number formatting rules
    }

    if (culturalContext.dateFormat) {
      // Apply date formatting rules
    }

    if (culturalContext.currencyFormat) {
      // Apply currency formatting rules
      await this.setCurrency(culturalContext.currencyFormat);
    }
  }

  /**
   * Get cultural adaptation for language
   */
  private async getCulturalAdaptation(
    language: LanguageSovereignty,
  ): Promise<any> {
    try {
      return {
        numberFormat: globalLanguageService.formatNumber(1234.56),
        dateFormat: globalLanguageService.formatDate(new Date()),
        currencyFormat: globalLanguageService.getCurrencyFormat(language),
        writingDirection: language.direction,
        culturalContext: language.culturalContext,
      };
    } catch (error) {
      console.warn("Failed to get cultural adaptation:", error);
      return {};
    }
  }

  /**
   * Set current language
   */
  async setLanguage(languageCode: string): Promise<void> {
    const languageConfig = getLanguageConfig(languageCode);
    if (!languageConfig) {
      throw new Error(`Language ${languageCode} not supported`);
    }

    this.currentLanguage = languageCode;

    // Update document direction for RTL languages
    if (typeof document !== "undefined") {
      document.documentElement.dir = languageConfig.rtl ? "rtl" : "ltr";
      document.documentElement.lang = languageCode;
    }

    // Load translations for new language
    await this.loadTranslations(languageCode);

    // Store preference
    this.storePreference("language", languageCode);
  }

  /**
   * Set current currency
   */
  async setCurrency(currencyCode: string): Promise<void> {
    const currencyConfig = getCurrencyConfig(currencyCode);
    if (!currencyConfig) {
      throw new Error(`Currency ${currencyCode} not supported`);
    }

    this.currentCurrency = currencyCode;

    // Update exchange rates if needed
    await this.updateExchangeRates();

    // Store preference
    this.storePreference("currency", currencyCode);
  }

  /**
   * Set current region
   */
  async setRegion(regionCode: string): Promise<void> {
    const regionConfig = getRegionConfig(regionCode);
    if (!regionConfig) {
      throw new Error(`Region ${regionCode} not supported`);
    }

    this.currentRegion = regionCode;

    // Auto-update currency if not manually set
    if (this.currentCurrency === localizationConfig.defaultCurrency) {
      await this.setCurrency(regionConfig.currency);
    }

    // Store preference
    this.storePreference("region", regionCode);
  }

  /**
   * Get translated text
   */
  translate(
    key: string,
    namespace: string = "common",
    variables?: Record<string, string | number>,
  ): string {
    const namespaceKey = `${this.currentLanguage}:${namespace}`;
    const translations = this.translations.get(namespaceKey);

    if (!translations || !translations[key]) {
      // Fallback to default language
      const fallbackKey = `${localizationConfig.translation.fallbackLanguage}:${namespace}`;
      const fallbackTranslations = this.translations.get(fallbackKey);

      if (fallbackTranslations && fallbackTranslations[key]) {
        return this.interpolateVariables(fallbackTranslations[key], variables);
      }

      // Return key if no translation found
      console.warn(
        `Translation not found: ${key} in ${namespace} for ${this.currentLanguage}`,
      );
      return key;
    }

    return this.interpolateVariables(translations[key], variables);
  }

  /**
   * Format currency amount
   */
  formatCurrency(
    amount: number,
    options: {
      currency?: string;
      showSymbol?: boolean;
      showCode?: boolean;
      precision?: number;
    } = {},
  ): string {
    const currency = options.currency || this.currentCurrency;
    const locale = this.getLocaleString();

    return formatCurrency(amount, {
      currency,
      locale,
      showSymbol: options.showSymbol,
      showCode: options.showCode,
      minimumFractionDigits: options.precision,
      maximumFractionDigits: options.precision,
    });
  }

  /**
   * Format date
   */
  formatDate(
    date: Date,
    options: {
      dateStyle?: "full" | "long" | "medium" | "short";
      timeStyle?: "full" | "long" | "medium" | "short";
      includeTime?: boolean;
    } = {},
  ): string {
    const locale = this.getLocaleString();
    const formatOptions: Intl.DateTimeFormatOptions = {};

    if (options.dateStyle) {
      formatOptions.dateStyle = options.dateStyle;
    }

    if (options.timeStyle || options.includeTime) {
      formatOptions.timeStyle = options.timeStyle || "short";
    }

    try {
      return new Intl.DateTimeFormat(locale, formatOptions).format(date);
    } catch (error) {
      // Fallback formatting
      return date.toLocaleDateString(locale);
    }
  }

  /**
   * Format number
   */
  formatNumber(
    number: number,
    options: {
      style?: "decimal" | "percent" | "currency";
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      useGrouping?: boolean;
    } = {},
  ): string {
    const locale = this.getLocaleString();

    try {
      return new Intl.NumberFormat(locale, options).format(number);
    } catch (error) {
      return number.toString();
    }
  }

  /**
   * Format relative time (e.g., "2 hours ago")
   */
  formatRelativeTime(date: Date): string {
    const locale = this.getLocaleString();
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        try {
          return new Intl.RelativeTimeFormat(locale, {
            numeric: "auto",
          }).format(-count, interval.unit as Intl.RelativeTimeFormatUnit);
        } catch (error) {
          return `${count} ${interval.unit}${count > 1 ? "s" : ""} ago`;
        }
      }
    }

    return this.translate("just_now", "common");
  }

  /**
   * Convert currency
   */
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string = this.currentCurrency,
  ): Promise<{
    originalAmount: number;
    convertedAmount: number;
    rate: number;
    fromCurrency: string;
    toCurrency: string;
  }> {
    try {
      if (fromCurrency === toCurrency) {
        return {
          originalAmount: amount,
          convertedAmount: amount,
          rate: 1,
          fromCurrency,
          toCurrency,
        };
      }

      const rate = await this.getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * rate;

      return {
        originalAmount: amount,
        convertedAmount,
        rate,
        fromCurrency,
        toCurrency,
      };
    } catch (error) {
      console.error("Error converting currency:", error);
      throw new Error("Failed to convert currency");
    }
  }

  /**
   * Get supported languages for current region
   */
  getSupportedLanguages(): Array<{
    code: string;
    name: string;
    nativeName: string;
    flag: string;
  }> {
    return Object.values(localizationConfig.languages)
      .filter(
        (lang) =>
          !this.currentRegion || lang.regions.includes(this.currentRegion),
      )
      .map((lang) => ({
        code: lang.code,
        name: lang.name,
        nativeName: lang.nativeName,
        flag: lang.flag,
      }));
  }

  /**
   * Get supported currencies for current region
   */
  getSupportedCurrencies(): Array<{
    code: string;
    name: string;
    symbol: string;
    decimals: number;
  }> {
    const regionConfig = getRegionConfig(this.currentRegion);
    const currencies = regionConfig ? [regionConfig.currency] : [];

    // Add common global currencies
    if (!currencies.includes("USD")) currencies.push("USD");
    if (!currencies.includes("EUR")) currencies.push("EUR");

    return currencies.map((code) => {
      const config = getCurrencyInfo(code);
      return {
        code,
        name: config?.name || code,
        symbol: config?.symbol || code,
        decimals: config?.decimals || 2,
      };
    });
  }

  /**
   * Get cultural context for current settings
   */
  getCulturalContext(): {
    frameworks: string[];
    currencies: string[];
    languages: string[];
    dateFormat: string;
    numberFormat: string;
    timeZone: string;
  } {
    const regionConfig = getRegionConfig(this.currentRegion);
    const languageConfig = getLanguageConfig(this.currentLanguage);

    // Determine applicable cultural frameworks
    const frameworks = [];
    for (const [framework, config] of Object.entries(
      localizationConfig.culturalFrameworks,
    )) {
      if (
        config.languages.includes(this.currentLanguage) ||
        (config.currencies && config.currencies.includes(this.currentCurrency))
      ) {
        frameworks.push(framework);
      }
    }

    return {
      frameworks,
      currencies: this.getSupportedCurrencies().map((c) => c.code),
      languages: this.getSupportedLanguages().map((l) => l.code),
      dateFormat: regionConfig?.dateFormat || "MM/dd/yyyy",
      numberFormat: regionConfig?.numberFormat || "en-US",
      timeZone: regionConfig?.timeZone || "UTC",
    };
  }

  /**
   * Load translations for a language
   */
  private async loadTranslations(languageCode: string): Promise<void> {
    try {
      const namespaces = localizationConfig.translation.namespaces;

      await Promise.all(
        namespaces.map(async (namespace) => {
          const key = `${languageCode}:${namespace}`;

          if (!this.translations.has(key)) {
            try {
              const response = await fetcher.get(
                `/locales/${languageCode}/${namespace}.json`,
              );
              this.translations.set(key, response.data);
            } catch (error) {
              console.warn(
                `Failed to load translations for ${languageCode}:${namespace}`,
              );

              // Load fallback translations
              if (
                languageCode !== localizationConfig.translation.fallbackLanguage
              ) {
                const fallbackKey = `${localizationConfig.translation.fallbackLanguage}:${namespace}`;
                if (!this.translations.has(fallbackKey)) {
                  try {
                    const fallbackResponse = await fetcher.get(
                      `/locales/${localizationConfig.translation.fallbackLanguage}/${namespace}.json`,
                    );
                    this.translations.set(fallbackKey, fallbackResponse.data);
                  } catch (fallbackError) {
                    console.error(
                      `Failed to load fallback translations for ${namespace}`,
                    );
                  }
                }
              }
            }
          }
        }),
      );
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  }

  /**
   * Update exchange rates
   */
  private async updateExchangeRates(): Promise<void> {
    try {
      // Check if rates are still fresh
      const cacheKey = `rates:${this.currentCurrency}`;
      const cached = this.exchangeRates.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.ratesCacheTTL) {
        return;
      }

      // Fetch latest rates
      const response = await fetcher.get("/api/exchange-rates", {
        params: { base: this.currentCurrency },
      });

      const rates = response.data.rates;
      const timestamp = Date.now();

      // Cache all rates
      for (const [currency, rate] of Object.entries(rates)) {
        const key = `${this.currentCurrency}:${currency}`;
        this.exchangeRates.set(key, { rate: rate as number, timestamp });
      }
    } catch (error) {
      console.error("Error updating exchange rates:", error);
    }
  }

  /**
   * Get exchange rate between two currencies
   */
  private async getExchangeRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    if (fromCurrency === toCurrency) return 1;

    const cacheKey = `${fromCurrency}:${toCurrency}`;
    const cached = this.exchangeRates.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.ratesCacheTTL) {
      return cached.rate;
    }

    // Try reverse rate
    const reverseCacheKey = `${toCurrency}:${fromCurrency}`;
    const reverseCached = this.exchangeRates.get(reverseCacheKey);

    if (
      reverseCached &&
      Date.now() - reverseCached.timestamp < this.ratesCacheTTL
    ) {
      const rate = 1 / reverseCached.rate;
      this.exchangeRates.set(cacheKey, { rate, timestamp: Date.now() });
      return rate;
    }

    // Fetch new rate
    try {
      const response = await fetcher.get("/api/exchange-rates/convert", {
        params: { from: fromCurrency, to: toCurrency },
      });

      const rate = response.data.rate;
      this.exchangeRates.set(cacheKey, { rate, timestamp: Date.now() });
      return rate;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return 1; // Fallback to 1:1 rate
    }
  }

  /**
   * Interpolate variables in translation strings
   */
  private interpolateVariables(
    text: string,
    variables?: Record<string, string | number>,
  ): string {
    if (!variables) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key]?.toString() || match;
    });
  }

  /**
   * Get locale string for Intl APIs
   */
  private getLocaleString(): string {
    const languageConfig = getLanguageConfig(this.currentLanguage);
    const regionConfig = getRegionConfig(this.currentRegion);

    if (languageConfig && regionConfig) {
      return `${this.currentLanguage}-${this.currentRegion}`;
    }

    return this.currentLanguage;
  }

  /**
   * Auto-detect user language
   */
  private detectLanguage(): string {
    if (typeof navigator !== "undefined") {
      const browserLanguage = navigator.language || navigator.languages?.[0];
      if (browserLanguage) {
        const languageCode = browserLanguage.split("-")[0];
        if (getLanguageConfig(languageCode)) {
          return languageCode;
        }
      }
    }

    return localizationConfig.defaultLanguage;
  }

  /**
   * Auto-detect user currency
   */
  private detectCurrency(): string {
    const region = this.detectRegion();
    const regionConfig = getRegionConfig(region);
    return regionConfig?.currency || localizationConfig.defaultCurrency;
  }

  /**
   * Auto-detect user region
   */
  private detectRegion(): string {
    if (typeof navigator !== "undefined") {
      const browserLanguage = navigator.language || navigator.languages?.[0];
      if (browserLanguage && browserLanguage.includes("-")) {
        const regionCode = browserLanguage.split("-")[1];
        if (getRegionConfig(regionCode)) {
          return regionCode;
        }
      }
    }

    return localizationConfig.defaultRegion;
  }

  /**
   * Store user preference
   */
  private storePreference(key: string, value: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(`quantumvest_${key}`, value);
    }
  }

  /**
   * Get current settings
   */
  getCurrentSettings(): {
    language: string;
    currency: string;
    region: string;
    locale: string;
  } {
    return {
      language: this.currentLanguage,
      currency: this.currentCurrency,
      region: this.currentRegion,
      locale: this.getLocaleString(),
    };
  }
}

// Export singleton instance for use throughout the application
export const localizationService = LocalizationService.getInstance();

// Export the class for manual instantiation when needed
export default LocalizationService;
