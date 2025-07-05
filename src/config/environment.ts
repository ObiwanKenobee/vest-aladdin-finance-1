/**
 * Environment Configuration Service
 * Centralized credential and configuration management for all QuantumVest APIs
 * Ensures secure access to environment variables across all services
 */

export interface EnvironmentConfig {
  // Application Settings
  app: {
    name: string;
    version: string;
    environment: string;
    debug: boolean;
    logLevel: string;
  };

  // API Configuration
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
    retryAttempts: number;
  };

  // Database Credentials
  database: {
    primary: {
      host: string;
      port: number;
      name: string;
      user: string;
      password: string;
      ssl: boolean;
    };
    redis: {
      host: string;
      port: number;
      password: string;
      cluster: boolean;
    };
    supabase: {
      url: string;
      anonKey: string;
      serviceRoleKey: string;
    };
  };

  // Payment Provider Credentials
  payments: {
    paypal: {
      clientId: string;
      clientSecret: string;
      environment: string;
    };
    paystack: {
      publicKey: string;
      secretKey: string;
      environment: string;
    };
    stripe: {
      publishableKey: string;
      secretKey: string;
    };
  };

  // AI & ML Service Credentials
  ai: {
    openai: {
      apiKey: string;
      model: string;
      maxTokens: number;
    };
    anthropic: {
      apiKey: string;
      model: string;
    };
    aladdin: {
      apiKey: string;
      baseUrl: string;
    };
    custom: {
      riskModelEndpoint: string;
      culturalScreeningEndpoint: string;
      marketSentimentEndpoint: string;
    };
  };

  // Blockchain & Web3 Credentials
  blockchain: {
    ethereum: {
      rpcUrl: string;
      apiKey: string;
      contracts: {
        tokenFactory: string;
        assetRegistry: string;
        governance: string;
        treasury: string;
      };
    };
    polygon: {
      rpcUrl: string;
      apiKey: string;
      contracts: {
        tokenFactory: string;
        assetRegistry: string;
        governance: string;
        treasury: string;
      };
    };
    bsc: {
      rpcUrl: string;
      apiKey: string;
      contracts: {
        tokenFactory: string;
        assetRegistry: string;
        governance: string;
        treasury: string;
      };
    };
    arbitrum: {
      rpcUrl: string;
      apiKey: string;
      contracts: {
        tokenFactory: string;
        assetRegistry: string;
        governance: string;
        treasury: string;
      };
    };
    walletConnect: {
      projectId: string;
    };
    ipfs: {
      gateway: string;
      pinataApiKey: string;
      pinataSecretKey: string;
    };
  };

  // Financial Data Provider Credentials
  financial: {
    alphaVantage: {
      apiKey: string;
      baseUrl: string;
    };
    polygon: {
      apiKey: string;
      baseUrl: string;
    };
    finnhub: {
      apiKey: string;
      baseUrl: string;
    };
    bloomberg: {
      apiKey: string;
      baseUrl: string;
    };
  };

  // Real-time & WebSocket Configuration
  realtime: {
    websocket: {
      url: string;
      syncUrl: string;
      tradingUrl: string;
      reconnectInterval: number;
      maxReconnectAttempts: number;
    };
  };

  // Security & Monitoring Credentials
  security: {
    sentry: {
      dsn: string;
      environment: string;
    };
    auth0: {
      domain: string;
      clientId: string;
      clientSecret: string;
    };
    jwt: {
      secret: string;
      expiresIn: string;
    };
  };

  // Analytics & Monitoring
  analytics: {
    googleAnalytics: {
      measurementId: string;
    };
    mixpanel: {
      token: string;
    };
    hotjar: {
      id: string;
    };
  };

  // AWS Services
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    cognito: {
      userPoolId: string;
      userPoolWebClientId: string;
    };
    s3: {
      bucket: string;
      region: string;
    };
    cloudfront: {
      domain: string;
    };
  };

  // Feature Flags
  features: {
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
    enablePerformanceMonitoring: boolean;
    enableRealTimeUpdates: boolean;
    enableQuantumEncryption: boolean;
    enableAegisProtocol: boolean;
  };

  // Compliance & Regulatory
  compliance: {
    regions: string[];
    defaultRegion: string;
    kyc: {
      providerUrl: string;
      apiKey: string;
    };
    aml: {
      providerUrl: string;
      apiKey: string;
    };
  };
}

class EnvironmentService {
  private static instance: EnvironmentService;
  private config: EnvironmentConfig;

  private constructor() {
    this.config = this.loadConfiguration();
    this.validateConfiguration();
  }

  public static getInstance(): EnvironmentService {
    if (!EnvironmentService.instance) {
      EnvironmentService.instance = new EnvironmentService();
    }
    return EnvironmentService.instance;
  }

  private loadConfiguration(): EnvironmentConfig {
    return {
      app: {
        name: import.meta.env.VITE_APP_NAME || "QuantumVest Platform",
        version: import.meta.env.VITE_APP_VERSION || "1.0.0",
        environment: import.meta.env.NODE_ENV || "development",
        debug: import.meta.env.VITE_DEBUG_MODE === "true",
        logLevel: import.meta.env.VITE_LOG_LEVEL || "info",
      },

      api: {
        baseUrl: import.meta.env.VITE_API_URL || "https://api.quantumvest.com",
        version: import.meta.env.VITE_API_VERSION || "v1",
        timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
        retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || "3"),
      },

      database: {
        primary: {
          host: import.meta.env.VITE_DB_HOST || "localhost",
          port: parseInt(import.meta.env.VITE_DB_PORT || "5432"),
          name: import.meta.env.VITE_DB_NAME || "quantumvest",
          user: import.meta.env.VITE_DB_USER || "postgres",
          password: import.meta.env.VITE_DB_PASSWORD || "",
          ssl: import.meta.env.VITE_DB_SSL === "true",
        },
        redis: {
          host: import.meta.env.VITE_REDIS_HOST || "localhost",
          port: parseInt(import.meta.env.VITE_REDIS_PORT || "6379"),
          password: import.meta.env.VITE_REDIS_PASSWORD || "",
          cluster: import.meta.env.VITE_REDIS_CLUSTER === "true",
        },
        supabase: {
          url: import.meta.env.VITE_SUPABASE_URL || "",
          anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
          serviceRoleKey: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "",
        },
      },

      payments: {
        paypal: {
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
          clientSecret: import.meta.env.VITE_PAYPAL_CLIENT_SECRET || "",
          environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || "sandbox",
        },
        paystack: {
          publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
          secretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY || "",
          environment: import.meta.env.VITE_PAYSTACK_ENVIRONMENT || "test",
        },
        stripe: {
          publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
          secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || "",
        },
      },

      ai: {
        openai: {
          apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
          model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4-turbo-preview",
          maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || "4000"),
        },
        anthropic: {
          apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || "",
          model:
            import.meta.env.VITE_ANTHROPIC_MODEL || "claude-3-opus-20240229",
        },
        aladdin: {
          apiKey: import.meta.env.VITE_ALADDIN_API_KEY || "",
          baseUrl:
            import.meta.env.VITE_ALADDIN_BASE_URL ||
            "https://api.aladdin.blackrock.com",
        },
        custom: {
          riskModelEndpoint: import.meta.env.VITE_RISK_MODEL_ENDPOINT || "",
          culturalScreeningEndpoint:
            import.meta.env.VITE_CULTURAL_SCREENING_ENDPOINT || "",
          marketSentimentEndpoint:
            import.meta.env.VITE_MARKET_SENTIMENT_ENDPOINT || "",
        },
      },

      blockchain: {
        ethereum: {
          rpcUrl: import.meta.env.VITE_ETHEREUM_RPC_URL || "",
          apiKey: import.meta.env.VITE_ETHEREUM_API_KEY || "",
          contracts: {
            tokenFactory: import.meta.env.VITE_ETHEREUM_TOKEN_FACTORY || "",
            assetRegistry: import.meta.env.VITE_ETHEREUM_ASSET_REGISTRY || "",
            governance: import.meta.env.VITE_ETHEREUM_GOVERNANCE || "",
            treasury: import.meta.env.VITE_ETHEREUM_TREASURY || "",
          },
        },
        polygon: {
          rpcUrl: import.meta.env.VITE_POLYGON_RPC_URL || "",
          apiKey: import.meta.env.VITE_POLYGON_API_KEY || "",
          contracts: {
            tokenFactory: import.meta.env.VITE_POLYGON_TOKEN_FACTORY || "",
            assetRegistry: import.meta.env.VITE_POLYGON_ASSET_REGISTRY || "",
            governance: import.meta.env.VITE_POLYGON_GOVERNANCE || "",
            treasury: import.meta.env.VITE_POLYGON_TREASURY || "",
          },
        },
        bsc: {
          rpcUrl: import.meta.env.VITE_BSC_RPC_URL || "",
          apiKey: import.meta.env.VITE_BSC_API_KEY || "",
          contracts: {
            tokenFactory: import.meta.env.VITE_BSC_TOKEN_FACTORY || "",
            assetRegistry: import.meta.env.VITE_BSC_ASSET_REGISTRY || "",
            governance: import.meta.env.VITE_BSC_GOVERNANCE || "",
            treasury: import.meta.env.VITE_BSC_TREASURY || "",
          },
        },
        arbitrum: {
          rpcUrl: import.meta.env.VITE_ARBITRUM_RPC_URL || "",
          apiKey: import.meta.env.VITE_ARBITRUM_API_KEY || "",
          contracts: {
            tokenFactory: import.meta.env.VITE_ARBITRUM_TOKEN_FACTORY || "",
            assetRegistry: import.meta.env.VITE_ARBITRUM_ASSET_REGISTRY || "",
            governance: import.meta.env.VITE_ARBITRUM_GOVERNANCE || "",
            treasury: import.meta.env.VITE_ARBITRUM_TREASURY || "",
          },
        },
        walletConnect: {
          projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "",
        },
        ipfs: {
          gateway: import.meta.env.VITE_IPFS_GATEWAY || "https://ipfs.io/ipfs/",
          pinataApiKey: import.meta.env.VITE_PINATA_API_KEY || "",
          pinataSecretKey: import.meta.env.VITE_PINATA_SECRET_KEY || "",
        },
      },

      financial: {
        alphaVantage: {
          apiKey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || "",
          baseUrl:
            import.meta.env.VITE_ALPHA_VANTAGE_BASE_URL ||
            "https://www.alphavantage.co",
        },
        polygon: {
          apiKey: import.meta.env.VITE_POLYGON_FINANCIAL_API_KEY || "",
          baseUrl:
            import.meta.env.VITE_POLYGON_FINANCIAL_BASE_URL ||
            "https://api.polygon.io",
        },
        finnhub: {
          apiKey: import.meta.env.VITE_FINNHUB_API_KEY || "",
          baseUrl:
            import.meta.env.VITE_FINNHUB_BASE_URL ||
            "https://finnhub.io/api/v1",
        },
        bloomberg: {
          apiKey: import.meta.env.VITE_BLOOMBERG_API_KEY || "",
          baseUrl:
            import.meta.env.VITE_BLOOMBERG_BASE_URL ||
            "https://api.bloomberg.com",
        },
      },

      realtime: {
        websocket: {
          url: import.meta.env.VITE_WEBSOCKET_URL || "wss://ws.quantumvest.com",
          syncUrl:
            import.meta.env.VITE_REAL_TIME_SYNC_URL ||
            "wss://sync.quantumvest.com",
          tradingUrl:
            import.meta.env.VITE_LIVE_TRADING_URL ||
            "wss://trading.quantumvest.com",
          reconnectInterval: parseInt(
            import.meta.env.VITE_WS_RECONNECT_INTERVAL || "5000",
          ),
          maxReconnectAttempts: parseInt(
            import.meta.env.VITE_WS_MAX_RECONNECT_ATTEMPTS || "10",
          ),
        },
      },

      security: {
        sentry: {
          dsn: import.meta.env.VITE_SENTRY_DSN || "",
          environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || "development",
        },
        auth0: {
          domain: import.meta.env.VITE_AUTH0_DOMAIN || "",
          clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "",
          clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET || "",
        },
        jwt: {
          secret: import.meta.env.VITE_JWT_SECRET || "",
          expiresIn: import.meta.env.VITE_JWT_EXPIRES_IN || "24h",
        },
      },

      analytics: {
        googleAnalytics: {
          measurementId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "",
        },
        mixpanel: {
          token: import.meta.env.VITE_MIXPANEL_TOKEN || "",
        },
        hotjar: {
          id: import.meta.env.VITE_HOTJAR_ID || "",
        },
      },

      aws: {
        region: import.meta.env.VITE_AWS_REGION || "us-east-1",
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
        cognito: {
          userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || "",
          userPoolWebClientId:
            import.meta.env.VITE_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID || "",
        },
        s3: {
          bucket: import.meta.env.VITE_AWS_S3_BUCKET || "",
          region: import.meta.env.VITE_AWS_S3_REGION || "us-east-1",
        },
        cloudfront: {
          domain: import.meta.env.VITE_AWS_CLOUDFRONT_DOMAIN || "",
        },
      },

      features: {
        enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
        enableErrorReporting:
          import.meta.env.VITE_ENABLE_ERROR_REPORTING === "true",
        enablePerformanceMonitoring:
          import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === "true",
        enableRealTimeUpdates:
          import.meta.env.VITE_ENABLE_REAL_TIME_UPDATES === "true",
        enableQuantumEncryption:
          import.meta.env.VITE_ENABLE_QUANTUM_ENCRYPTION === "true",
        enableAegisProtocol:
          import.meta.env.VITE_ENABLE_AEGIS_PROTOCOL === "true",
      },

      compliance: {
        regions: (
          import.meta.env.VITE_COMPLIANCE_REGIONS || "US,EU,UK,CA,AU,SG,HK,JP"
        ).split(","),
        defaultRegion: import.meta.env.VITE_DEFAULT_REGION || "US",
        kyc: {
          providerUrl: import.meta.env.VITE_KYC_PROVIDER_URL || "",
          apiKey: import.meta.env.VITE_KYC_API_KEY || "",
        },
        aml: {
          providerUrl: import.meta.env.VITE_AML_PROVIDER_URL || "",
          apiKey: import.meta.env.VITE_AML_API_KEY || "",
        },
      },
    };
  }

  private validateConfiguration(): void {
    const requiredFields = [
      "app.name",
      "api.baseUrl",
      "database.supabase.url",
      "database.supabase.anonKey",
    ];

    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      const value = this.getNestedValue(this.config, field);
      if (!value || value === "") {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      console.warn("Missing required environment variables:", missingFields);

      if (this.config.app.environment === "production") {
        throw new Error(
          `Missing required environment variables in production: ${missingFields.join(", ")}`,
        );
      }
    }

    console.log("✅ Environment configuration loaded successfully");
    console.log(`Environment: ${this.config.app.environment}`);
    console.log(`API Base URL: ${this.config.api.baseUrl}`);
    console.log(
      `Features enabled: ${Object.entries(this.config.features)
        .filter(([_, enabled]) => enabled)
        .map(([feature]) => feature)
        .join(", ")}`,
    );
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }

  public getCredentials(service: string): any {
    const serviceMap: Record<string, any> = {
      payments: this.config.payments,
      ai: this.config.ai,
      blockchain: this.config.blockchain,
      financial: this.config.financial,
      security: this.config.security,
      analytics: this.config.analytics,
      aws: this.config.aws,
      compliance: this.config.compliance,
      database: this.config.database,
      realtime: this.config.realtime,
    };

    if (!serviceMap[service]) {
      throw new Error(`Unknown service: ${service}`);
    }

    return serviceMap[service];
  }

  public isFeatureEnabled(
    feature: keyof EnvironmentConfig["features"],
  ): boolean {
    return this.config.features[feature];
  }

  public getApiEndpoint(path: string): string {
    const baseUrl = this.config.api.baseUrl.replace(/\/$/, "");
    const apiPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${apiPath}`;
  }

  public isDevelopment(): boolean {
    return this.config.app.environment === "development";
  }

  public isProduction(): boolean {
    return this.config.app.environment === "production";
  }

  public getVersion(): string {
    return this.config.app.version;
  }
}

// Export singleton instance
export const environmentService = EnvironmentService.getInstance();

// Export configuration getter for easy access
export const getEnvironmentConfig = (): EnvironmentConfig =>
  environmentService.getConfig();

// Export credential getters for specific services
export const getPaymentCredentials = () =>
  environmentService.getCredentials("payments");
export const getAICredentials = () => environmentService.getCredentials("ai");
export const getBlockchainCredentials = () =>
  environmentService.getCredentials("blockchain");
export const getFinancialCredentials = () =>
  environmentService.getCredentials("financial");
export const getSecurityCredentials = () =>
  environmentService.getCredentials("security");
export const getAnalyticsCredentials = () =>
  environmentService.getCredentials("analytics");
export const getAWSCredentials = () => environmentService.getCredentials("aws");
export const getComplianceCredentials = () =>
  environmentService.getCredentials("compliance");
export const getDatabaseCredentials = () =>
  environmentService.getCredentials("database");
export const getRealtimeCredentials = () =>
  environmentService.getCredentials("realtime");

// Export feature flag checker
export const isFeatureEnabled = (
  feature: keyof EnvironmentConfig["features"],
): boolean => environmentService.isFeatureEnabled(feature);

// Export environment helpers
export const isDevelopment = (): boolean => environmentService.isDevelopment();
export const isProduction = (): boolean => environmentService.isProduction();
export const getAppVersion = (): string => environmentService.getVersion();
export const getApiEndpoint = (path: string): string =>
  environmentService.getApiEndpoint(path);

export default environmentService;
