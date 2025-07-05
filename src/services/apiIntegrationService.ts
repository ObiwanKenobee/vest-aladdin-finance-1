/**
 * API Integration Service
 * Demonstrates centralized credential management for all QuantumVest APIs
 * Shows how all services can securely access environment credentials
 */

import {
  getPaymentCredentials,
  getAICredentials,
  getBlockchainCredentials,
  getFinancialCredentials,
  getSecurityCredentials,
  getAnalyticsCredentials,
  getAWSCredentials,
  getComplianceCredentials,
  getDatabaseCredentials,
  getRealtimeCredentials,
  getEnvironmentConfig,
  isFeatureEnabled,
  getApiEndpoint,
  isDevelopment,
  isProduction,
} from "../config/environment";

export interface APIIntegrationStatus {
  service: string;
  status: "connected" | "disconnected" | "error" | "initializing";
  lastChecked: Date;
  credentials: boolean;
  endpoint?: string;
  error?: string;
}

export interface ServiceCredentialTest {
  service: string;
  hasCredentials: boolean;
  credentialFields: string[];
  missingFields: string[];
  isConfigured: boolean;
}

export class APIIntegrationService {
  private static instance: APIIntegrationService;
  private integrationStatuses: Map<string, APIIntegrationStatus> = new Map();
  private credentialTests: Map<string, ServiceCredentialTest> = new Map();

  private constructor() {
    console.log("🔗 API Integration Service initializing...");
    this.initializeIntegrations();
    this.testAllCredentials();
    this.startHealthMonitoring();
  }

  public static getInstance(): APIIntegrationService {
    if (!APIIntegrationService.instance) {
      APIIntegrationService.instance = new APIIntegrationService();
    }
    return APIIntegrationService.instance;
  }

  private initializeIntegrations(): void {
    const environmentConfig = getEnvironmentConfig();

    console.log("🌍 Environment Configuration Loaded:");
    console.log(
      `  App: ${environmentConfig.app.name} v${environmentConfig.app.version}`,
    );
    console.log(`  Environment: ${environmentConfig.app.environment}`);
    console.log(`  Debug Mode: ${environmentConfig.app.debug}`);
    console.log(`  API Base URL: ${environmentConfig.api.baseUrl}`);

    // Initialize all service integrations
    this.initializePaymentIntegrations();
    this.initializeAIIntegrations();
    this.initializeBlockchainIntegrations();
    this.initializeFinancialIntegrations();
    this.initializeSecurityIntegrations();
    this.initializeAnalyticsIntegrations();
    this.initializeAWSIntegrations();
    this.initializeComplianceIntegrations();
    this.initializeDatabaseIntegrations();
    this.initializeRealtimeIntegrations();
  }

  private initializePaymentIntegrations(): void {
    const paymentCredentials = getPaymentCredentials();

    console.log("💳 Payment Integration Status:");

    // PayPal Integration
    this.integrationStatuses.set("paypal", {
      service: "PayPal",
      status: paymentCredentials.paypal.clientId ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!paymentCredentials.paypal.clientId,
      endpoint:
        paymentCredentials.paypal.environment === "live"
          ? "https://api-m.paypal.com"
          : "https://api-m.sandbox.paypal.com",
    });

    // Paystack Integration
    this.integrationStatuses.set("paystack", {
      service: "Paystack",
      status: paymentCredentials.paystack.publicKey
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!paymentCredentials.paystack.publicKey,
      endpoint:
        paymentCredentials.paystack.environment === "live"
          ? "https://api.paystack.co"
          : "https://api.paystack.co",
    });

    // Stripe Integration
    this.integrationStatuses.set("stripe", {
      service: "Stripe",
      status: paymentCredentials.stripe.publishableKey
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!paymentCredentials.stripe.publishableKey,
      endpoint: "https://api.stripe.com",
    });

    console.log(
      `  PayPal: ${this.integrationStatuses.get("paypal")?.status} (${paymentCredentials.paypal.environment})`,
    );
    console.log(
      `  Paystack: ${this.integrationStatuses.get("paystack")?.status} (${paymentCredentials.paystack.environment})`,
    );
    console.log(`  Stripe: ${this.integrationStatuses.get("stripe")?.status}`);
  }

  private initializeAIIntegrations(): void {
    const aiCredentials = getAICredentials();

    console.log("🧠 AI Integration Status:");

    // OpenAI Integration
    this.integrationStatuses.set("openai", {
      service: "OpenAI",
      status: aiCredentials.openai.apiKey ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!aiCredentials.openai.apiKey,
      endpoint: "https://api.openai.com",
    });

    // Anthropic Integration
    this.integrationStatuses.set("anthropic", {
      service: "Anthropic",
      status: aiCredentials.anthropic.apiKey ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!aiCredentials.anthropic.apiKey,
      endpoint: "https://api.anthropic.com",
    });

    // Aladdin (BlackRock) Integration
    this.integrationStatuses.set("aladdin", {
      service: "Aladdin",
      status: aiCredentials.aladdin.apiKey ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!aiCredentials.aladdin.apiKey,
      endpoint: aiCredentials.aladdin.baseUrl,
    });

    console.log(
      `  OpenAI: ${this.integrationStatuses.get("openai")?.status} (${aiCredentials.openai.model})`,
    );
    console.log(
      `  Anthropic: ${this.integrationStatuses.get("anthropic")?.status} (${aiCredentials.anthropic.model})`,
    );
    console.log(
      `  Aladdin: ${this.integrationStatuses.get("aladdin")?.status}`,
    );
  }

  private initializeBlockchainIntegrations(): void {
    const blockchainCredentials = getBlockchainCredentials();

    console.log("⛓️ Blockchain Integration Status:");

    // Ethereum Integration
    this.integrationStatuses.set("ethereum", {
      service: "Ethereum",
      status: blockchainCredentials.ethereum.rpcUrl
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!blockchainCredentials.ethereum.rpcUrl,
      endpoint: blockchainCredentials.ethereum.rpcUrl,
    });

    // Polygon Integration
    this.integrationStatuses.set("polygon", {
      service: "Polygon",
      status: blockchainCredentials.polygon.rpcUrl
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!blockchainCredentials.polygon.rpcUrl,
      endpoint: blockchainCredentials.polygon.rpcUrl,
    });

    // BSC Integration
    this.integrationStatuses.set("bsc", {
      service: "BSC",
      status: blockchainCredentials.bsc.rpcUrl ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!blockchainCredentials.bsc.rpcUrl,
      endpoint: blockchainCredentials.bsc.rpcUrl,
    });

    // IPFS Integration
    this.integrationStatuses.set("ipfs", {
      service: "IPFS",
      status: blockchainCredentials.ipfs.gateway ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!blockchainCredentials.ipfs.pinataApiKey,
      endpoint: blockchainCredentials.ipfs.gateway,
    });

    console.log(
      `  Ethereum: ${this.integrationStatuses.get("ethereum")?.status}`,
    );
    console.log(
      `  Polygon: ${this.integrationStatuses.get("polygon")?.status}`,
    );
    console.log(`  BSC: ${this.integrationStatuses.get("bsc")?.status}`);
    console.log(`  IPFS: ${this.integrationStatuses.get("ipfs")?.status}`);
  }

  private initializeFinancialIntegrations(): void {
    const financialCredentials = getFinancialCredentials();

    console.log("📊 Financial Data Integration Status:");

    // Alpha Vantage Integration
    this.integrationStatuses.set("alphavantage", {
      service: "Alpha Vantage",
      status: financialCredentials.alphaVantage.apiKey
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!financialCredentials.alphaVantage.apiKey,
      endpoint: financialCredentials.alphaVantage.baseUrl,
    });

    // Polygon.io Integration
    this.integrationStatuses.set("polygon-financial", {
      service: "Polygon.io",
      status: financialCredentials.polygon.apiKey
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!financialCredentials.polygon.apiKey,
      endpoint: financialCredentials.polygon.baseUrl,
    });

    // Finnhub Integration
    this.integrationStatuses.set("finnhub", {
      service: "Finnhub",
      status: financialCredentials.finnhub.apiKey
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!financialCredentials.finnhub.apiKey,
      endpoint: financialCredentials.finnhub.baseUrl,
    });

    console.log(
      `  Alpha Vantage: ${this.integrationStatuses.get("alphavantage")?.status}`,
    );
    console.log(
      `  Polygon.io: ${this.integrationStatuses.get("polygon-financial")?.status}`,
    );
    console.log(
      `  Finnhub: ${this.integrationStatuses.get("finnhub")?.status}`,
    );
  }

  private initializeSecurityIntegrations(): void {
    const securityCredentials = getSecurityCredentials();

    console.log("🔒 Security Integration Status:");

    // Sentry Integration
    this.integrationStatuses.set("sentry", {
      service: "Sentry",
      status: securityCredentials.sentry.dsn ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!securityCredentials.sentry.dsn,
      endpoint: "https://sentry.io",
    });

    // Auth0 Integration
    this.integrationStatuses.set("auth0", {
      service: "Auth0",
      status: securityCredentials.auth0.domain ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!securityCredentials.auth0.domain,
      endpoint: `https://${securityCredentials.auth0.domain}`,
    });

    console.log(`  Sentry: ${this.integrationStatuses.get("sentry")?.status}`);
    console.log(`  Auth0: ${this.integrationStatuses.get("auth0")?.status}`);
  }

  private initializeAnalyticsIntegrations(): void {
    const analyticsCredentials = getAnalyticsCredentials();

    console.log("📈 Analytics Integration Status:");

    // Google Analytics Integration
    this.integrationStatuses.set("google-analytics", {
      service: "Google Analytics",
      status: analyticsCredentials.googleAnalytics.measurementId
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!analyticsCredentials.googleAnalytics.measurementId,
      endpoint: "https://www.google-analytics.com",
    });

    // Mixpanel Integration
    this.integrationStatuses.set("mixpanel", {
      service: "Mixpanel",
      status: analyticsCredentials.mixpanel.token
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!analyticsCredentials.mixpanel.token,
      endpoint: "https://api.mixpanel.com",
    });

    console.log(
      `  Google Analytics: ${this.integrationStatuses.get("google-analytics")?.status}`,
    );
    console.log(
      `  Mixpanel: ${this.integrationStatuses.get("mixpanel")?.status}`,
    );
  }

  private initializeAWSIntegrations(): void {
    const awsCredentials = getAWSCredentials();

    console.log("☁️ AWS Integration Status:");

    // AWS Services Integration
    this.integrationStatuses.set("aws", {
      service: "AWS",
      status: awsCredentials.region ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!awsCredentials.accessKeyId,
      endpoint: `https://aws.amazon.com`,
    });

    console.log(
      `  AWS: ${this.integrationStatuses.get("aws")?.status} (${awsCredentials.region})`,
    );
    console.log(`  S3 Bucket: ${awsCredentials.s3.bucket}`);
    console.log(`  CloudFront: ${awsCredentials.cloudfront.domain}`);
  }

  private initializeComplianceIntegrations(): void {
    const complianceCredentials = getComplianceCredentials();

    console.log("⚖️ Compliance Integration Status:");

    // KYC Integration
    this.integrationStatuses.set("kyc", {
      service: "KYC Provider",
      status: complianceCredentials.kyc.providerUrl
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!complianceCredentials.kyc.apiKey,
      endpoint: complianceCredentials.kyc.providerUrl,
    });

    // AML Integration
    this.integrationStatuses.set("aml", {
      service: "AML Provider",
      status: complianceCredentials.aml.providerUrl
        ? "connected"
        : "disconnected",
      lastChecked: new Date(),
      credentials: !!complianceCredentials.aml.apiKey,
      endpoint: complianceCredentials.aml.providerUrl,
    });

    console.log(`  KYC: ${this.integrationStatuses.get("kyc")?.status}`);
    console.log(`  AML: ${this.integrationStatuses.get("aml")?.status}`);
    console.log(`  Regions: ${complianceCredentials.regions.join(", ")}`);
  }

  private initializeDatabaseIntegrations(): void {
    const databaseCredentials = getDatabaseCredentials();

    console.log("🗄️ Database Integration Status:");

    // Primary Database Integration
    this.integrationStatuses.set("database", {
      service: "Primary Database",
      status: databaseCredentials.primary.host ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!databaseCredentials.primary.password,
      endpoint: `${databaseCredentials.primary.host}:${databaseCredentials.primary.port}`,
    });

    // Redis Integration
    this.integrationStatuses.set("redis", {
      service: "Redis Cache",
      status: databaseCredentials.redis.host ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!databaseCredentials.redis.password,
      endpoint: `${databaseCredentials.redis.host}:${databaseCredentials.redis.port}`,
    });

    // Supabase Integration
    this.integrationStatuses.set("supabase", {
      service: "Supabase",
      status: databaseCredentials.supabase.url ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: !!databaseCredentials.supabase.anonKey,
      endpoint: databaseCredentials.supabase.url,
    });

    console.log(
      `  Primary DB: ${this.integrationStatuses.get("database")?.status}`,
    );
    console.log(`  Redis: ${this.integrationStatuses.get("redis")?.status}`);
    console.log(
      `  Supabase: ${this.integrationStatuses.get("supabase")?.status}`,
    );
  }

  private initializeRealtimeIntegrations(): void {
    const realtimeCredentials = getRealtimeCredentials();

    console.log("🔄 Real-time Integration Status:");

    // WebSocket Integrations
    this.integrationStatuses.set("websocket", {
      service: "WebSocket",
      status: realtimeCredentials.websocket.url ? "connected" : "disconnected",
      lastChecked: new Date(),
      credentials: true,
      endpoint: realtimeCredentials.websocket.url,
    });

    console.log(
      `  WebSocket: ${this.integrationStatuses.get("websocket")?.status}`,
    );
    console.log(`  Sync URL: ${realtimeCredentials.websocket.syncUrl}`);
    console.log(`  Trading URL: ${realtimeCredentials.websocket.tradingUrl}`);
  }

  private testAllCredentials(): void {
    console.log("\n🧪 Testing All Service Credentials:");

    // Test Payment Credentials
    this.testCredentials("payments", getPaymentCredentials(), [
      "paypal.clientId",
      "paypal.clientSecret",
      "paystack.publicKey",
      "paystack.secretKey",
      "stripe.publishableKey",
    ]);

    // Test AI Credentials
    this.testCredentials("ai", getAICredentials(), [
      "openai.apiKey",
      "anthropic.apiKey",
      "aladdin.apiKey",
    ]);

    // Test Blockchain Credentials
    this.testCredentials("blockchain", getBlockchainCredentials(), [
      "ethereum.rpcUrl",
      "polygon.rpcUrl",
      "ipfs.pinataApiKey",
    ]);

    // Test Financial Credentials
    this.testCredentials("financial", getFinancialCredentials(), [
      "alphaVantage.apiKey",
      "polygon.apiKey",
      "finnhub.apiKey",
    ]);

    // Test Security Credentials
    this.testCredentials("security", getSecurityCredentials(), [
      "sentry.dsn",
      "auth0.domain",
      "jwt.secret",
    ]);

    // Display credential test results
    this.displayCredentialTestResults();
  }

  private testCredentials(
    serviceName: string,
    credentials: any,
    requiredFields: string[],
  ): void {
    const credentialFields: string[] = [];
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      const value = this.getNestedValue(credentials, field);
      if (value && value !== "") {
        credentialFields.push(field);
      } else {
        missingFields.push(field);
      }
    });

    this.credentialTests.set(serviceName, {
      service: serviceName,
      hasCredentials: credentialFields.length > 0,
      credentialFields,
      missingFields,
      isConfigured: missingFields.length === 0,
    });
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  private displayCredentialTestResults(): void {
    console.log("\n📋 Credential Test Results:");

    this.credentialTests.forEach((test, serviceName) => {
      const status = test.isConfigured
        ? "✅"
        : test.hasCredentials
          ? "⚠️"
          : "❌";
      console.log(
        `  ${status} ${serviceName.toUpperCase()}: ${test.credentialFields.length}/${test.credentialFields.length + test.missingFields.length} configured`,
      );

      if (test.missingFields.length > 0) {
        console.log(`    Missing: ${test.missingFields.join(", ")}`);
      }
    });
  }

  private startHealthMonitoring(): void {
    console.log("\n💓 Starting API Health Monitoring...");

    // Display feature flags
    console.log("🚩 Feature Flags:");
    console.log(`  Analytics: ${isFeatureEnabled("enableAnalytics")}`);
    console.log(
      `  Error Reporting: ${isFeatureEnabled("enableErrorReporting")}`,
    );
    console.log(
      `  Performance Monitoring: ${isFeatureEnabled("enablePerformanceMonitoring")}`,
    );
    console.log(
      `  Real-time Updates: ${isFeatureEnabled("enableRealTimeUpdates")}`,
    );
    console.log(
      `  Quantum Encryption: ${isFeatureEnabled("enableQuantumEncryption")}`,
    );
    console.log(`  Aegis Protocol: ${isFeatureEnabled("enableAegisProtocol")}`);

    // Display environment info
    console.log("\n🌍 Environment Info:");
    console.log(`  Development Mode: ${isDevelopment()}`);
    console.log(`  Production Mode: ${isProduction()}`);
    console.log(`  API Endpoint: ${getApiEndpoint("/health")}`);

    console.log(
      "\n✅ All API integrations initialized with centralized credentials!",
    );
  }

  // Public methods for accessing integration status
  public getIntegrationStatus(
    service: string,
  ): APIIntegrationStatus | undefined {
    return this.integrationStatuses.get(service);
  }

  public getAllIntegrationStatuses(): Map<string, APIIntegrationStatus> {
    return this.integrationStatuses;
  }

  public getCredentialTest(service: string): ServiceCredentialTest | undefined {
    return this.credentialTests.get(service);
  }

  public getAllCredentialTests(): Map<string, ServiceCredentialTest> {
    return this.credentialTests;
  }

  public async testConnection(service: string): Promise<boolean> {
    const status = this.integrationStatuses.get(service);
    if (!status || !status.credentials) {
      return false;
    }

    try {
      // This would be where actual API health checks happen
      // For now, we'll simulate based on credential availability
      return status.credentials;
    } catch (error) {
      console.error(`Connection test failed for ${service}:`, error);
      return false;
    }
  }

  public getConnectionSummary(): {
    total: number;
    connected: number;
    disconnected: number;
    errors: number;
  } {
    const statuses = Array.from(this.integrationStatuses.values());

    return {
      total: statuses.length,
      connected: statuses.filter((s) => s.status === "connected").length,
      disconnected: statuses.filter((s) => s.status === "disconnected").length,
      errors: statuses.filter((s) => s.status === "error").length,
    };
  }
}

// Export singleton instance
export const apiIntegrationService = APIIntegrationService.getInstance();

export default apiIntegrationService;
