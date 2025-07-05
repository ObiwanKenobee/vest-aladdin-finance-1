import React, { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./components/auth/AuthProvider";
import { EnterpriseSecurityProvider } from "./components/EnterpriseSecurityProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import PageErrorBoundary from "./components/PageErrorBoundary";
import PageLoadingFallback from "./components/PageLoadingFallback";
import ProtectedRoute from "./components/ProtectedRoute";
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";
import { appHealthMonitor } from "./utils/appHealthMonitor";
import EnhancedUserInteractionService from "./services/enhancedUserInteractionService";
import { databaseSeedingService } from "./services/databaseSeedingService";

// Lazy load pages for better performance and error isolation
const Index = lazy(() => import("./pages/Index"));
const ExecutivePage = lazy(() => import("./pages/executive"));
const DeveloperPage = lazy(() => import("./pages/developer"));
const AnalyticsPage = lazy(() => import("./pages/analytics"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load archetype pages (now protected)
const InstitutionalInvestor = lazy(
  () => import("./pages/institutional-investor"),
);
const RetailInvestor = lazy(() => import("./pages/retail-investor"));
const EmergingMarketCitizen = lazy(
  () => import("./pages/emerging-market-citizen"),
);
const CulturalInvestor = lazy(() => import("./pages/cultural-investor"));
const DeveloperIntegrator = lazy(() => import("./pages/developer-integrator"));
const AfricanMarketEnterprise = lazy(
  () => import("./pages/african-market-enterprise"),
);
const DiasporaInvestor = lazy(() => import("./pages/diaspora-investor"));
const FinancialAdvisor = lazy(() => import("./pages/financial-advisor"));
const QuantDataDrivenInvestor = lazy(
  () => import("./pages/quant-data-driven-investor"),
);
const PublicSectorNGO = lazy(() => import("./pages/public-sector-ngo"));
const StudentEarlyCareer = lazy(() => import("./pages/student-early-career"));
const WildlifeConservationEnterprise = lazy(
  () => import("./pages/wildlife-conservation-enterprise"),
);
const QuantumEnterprise2050 = lazy(
  () => import("./pages/quantum-enterprise-2050"),
);
const SuperAdminPage = lazy(() => import("./pages/super-admin"));
const EnterpriseInnovationDashboard = lazy(
  () => import("./components/EnterpriseInnovationDashboard"),
);
const PricingPage = lazy(() => import("./pages/pricing"));
const QuantumArchitectureVisualization = lazy(
  () => import("./components/QuantumArchitectureVisualization"),
);
const PlatformNavigation = lazy(
  () => import("./components/PlatformNavigation"),
);
const QuantumVestDashboard = lazy(
  () => import("./components/QuantumVestDashboard"),
);
const NeonatalCareProtocol = lazy(
  () => import("./components/NeonatalCareProtocol"),
);
const AdaptiveShell = lazy(() => import("./components/AdaptiveShell"));
const ArchitectureMonitor = lazy(
  () => import("./components/ArchitectureMonitor"),
);

// Lazy load components
const ArchetypeSelector = lazy(() => import("./components/ArchetypeSelector"));

// Enhanced Query Client with error recovery
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except for 408, 429
        if (error instanceof Error && "status" in error) {
          const status = (error as { status: number }).status;
          if (
            status >= 400 &&
            status < 500 &&
            status !== 408 &&
            status !== 429
          ) {
            return false;
          }
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error: Error) => {
      console.error("Query Error:", error);
      // Track query errors for analytics
      if (typeof window !== "undefined") {
        EnhancedUserInteractionService.getInstance().trackInteraction({
          type: "view",
          element: "query_error",
          metadata: {
            error: error.message,
            stack: error.stack,
          },
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: Error) => {
      console.error("Mutation Error:", error);
    },
  }),
});

// Safe route wrapper component
const SafeRoute: React.FC<{
  children: React.ReactNode;
  pageName: string;
}> = ({ children, pageName }) => (
  <PageErrorBoundary pageName={pageName} enableDiagnostics={true}>
    <Suspense
      fallback={
        <PageLoadingFallback
          pageName={pageName}
          timeout={30000}
          showProgressBar={true}
          onTimeout={() => {
            console.warn(`Page ${pageName} loading timeout`);
            // Track loading timeouts
            EnhancedUserInteractionService.getInstance().trackInteraction({
              type: "view",
              element: "page_timeout",
              metadata: { pageName },
            });
          }}
        >
          Loading {pageName}...
        </PageLoadingFallback>
      }
    >
      {children}
    </Suspense>
  </PageErrorBoundary>
);

// Protected archetype route wrapper
const ProtectedArchetypeRoute: React.FC<{
  children: React.ReactNode;
  archetypeId: string;
  pageName: string;
}> = ({ children, archetypeId, pageName }) => {
  // Generate a demo user ID based on browser session
  const userId = React.useMemo(() => {
    let id = localStorage.getItem("demo-user-id");
    if (!id) {
      id = `demo-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("demo-user-id", id);
    }
    return id;
  }, []);

  return (
    <SafeRoute pageName={pageName}>
      <ProtectedRoute archetypeId={archetypeId} userId={userId}>
        {children}
      </ProtectedRoute>
    </SafeRoute>
  );
};

const AppContent = () => {
  const { trackPageView } = usePerformanceMonitoring();

  useEffect(() => {
    // Initialize enhanced user interaction tracking
    const interactionService = EnhancedUserInteractionService.getInstance();

    // Track initial page load
    interactionService.trackInteraction({
      type: "view",
      element: "app_initialization",
      page: window.location.pathname,
      metadata: {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
      },
    });

    // Track route changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
      interactionService.trackInteraction({
        type: "navigation",
        element: "route_change",
        page: window.location.pathname,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      });
    };

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [trackPageView]);

  return (
    <Routes>
      {/* Main platform routes - Free Access */}
      <Route
        path="/"
        element={
          <SafeRoute pageName="Platform Navigation">
            <PlatformNavigation />
          </SafeRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <SafeRoute pageName="Home">
            <Index />
          </SafeRoute>
        }
      />

      <Route
        path="/archetypes"
        element={
          <SafeRoute pageName="Archetype Selector">
            <ArchetypeSelector />
          </SafeRoute>
        }
      />

      <Route
        path="/executive"
        element={
          <SafeRoute pageName="Executive Dashboard">
            <ExecutivePage />
          </SafeRoute>
        }
      />

      <Route
        path="/developer"
        element={
          <SafeRoute pageName="Developer Hub">
            <DeveloperPage />
          </SafeRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <SafeRoute pageName="Analytics Dashboard">
            <AnalyticsPage />
          </SafeRoute>
        }
      />

      {/* Pricing Page - Free Access */}
      <Route
        path="/pricing"
        element={
          <SafeRoute pageName="Pricing">
            <PricingPage />
          </SafeRoute>
        }
      />

      {/* Architecture Visualization - Free Access */}
      <Route
        path="/architecture"
        element={
          <SafeRoute pageName="Quantum Architecture Visualization">
            <QuantumArchitectureVisualization />
          </SafeRoute>
        }
      />

      {/* Enterprise Innovation Dashboard - Free Access */}
      <Route
        path="/enterprise-innovations"
        element={
          <SafeRoute pageName="Enterprise Innovation Dashboard">
            <EnterpriseInnovationDashboard />
          </SafeRoute>
        }
      />

      {/* QuantumVest Next-Generation Platform - Free Access */}
      <Route
        path="/quantumvest"
        element={
          <SafeRoute pageName="QuantumVest Platform">
            <QuantumVestDashboard />
          </SafeRoute>
        }
      />

      {/* Neonatal Care Protocol Case Study - Free Access */}
      <Route
        path="/neonatal-care-protocol"
        element={
          <SafeRoute pageName="Neonatal Care Protocol">
            <NeonatalCareProtocol />
          </SafeRoute>
        }
      />

      {/* Adaptive Shell Interface - Free Access */}
      <Route
        path="/adaptive-shell"
        element={
          <SafeRoute pageName="Adaptive Shell">
            <AdaptiveShell />
          </SafeRoute>
        }
      />

      {/* Architecture Monitor - Free Access */}
      <Route
        path="/architecture-monitor"
        element={
          <SafeRoute pageName="Architecture Monitor">
            <ArchitectureMonitor />
          </SafeRoute>
        }
      />

      {/* PROTECTED INVESTMENT ARCHETYPE ROUTES */}
      {/* Free Tier - Limited Access */}
      <Route
        path="/emerging-market-citizen"
        element={
          <ProtectedArchetypeRoute
            archetypeId="emerging-market-citizen"
            pageName="Emerging Market Citizen"
          >
            <EmergingMarketCitizen />
          </ProtectedArchetypeRoute>
        }
      />

      {/* Starter Tier and Above */}
      <Route
        path="/retail-investor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="retail-investor"
            pageName="Retail Investor"
          >
            <RetailInvestor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/student-early-career"
        element={
          <ProtectedArchetypeRoute
            archetypeId="student-early-career"
            pageName="Student Early Career"
          >
            <StudentEarlyCareer />
          </ProtectedArchetypeRoute>
        }
      />

      {/* Professional Tier and Above */}
      <Route
        path="/cultural-investor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="cultural-investor"
            pageName="Cultural Investor"
          >
            <CulturalInvestor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/developer-integrator"
        element={
          <ProtectedArchetypeRoute
            archetypeId="developer-integrator"
            pageName="Developer Integrator"
          >
            <DeveloperIntegrator />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/diaspora-investor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="diaspora-investor"
            pageName="Diaspora Investor"
          >
            <DiasporaInvestor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/financial-advisor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="financial-advisor"
            pageName="Financial Advisor"
          >
            <FinancialAdvisor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/public-sector-ngo"
        element={
          <ProtectedArchetypeRoute
            archetypeId="public-sector-ngo"
            pageName="Public Sector NGO"
          >
            <PublicSectorNGO />
          </ProtectedArchetypeRoute>
        }
      />

      {/* Enterprise Tier Only */}
      <Route
        path="/institutional-investor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="institutional-investor"
            pageName="Institutional Investor"
          >
            <InstitutionalInvestor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/african-market-enterprise"
        element={
          <ProtectedArchetypeRoute
            archetypeId="african-market-enterprise"
            pageName="African Market Enterprise"
          >
            <AfricanMarketEnterprise />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/quant-data-driven-investor"
        element={
          <ProtectedArchetypeRoute
            archetypeId="quant-data-driven-investor"
            pageName="Quant Data Driven Investor"
          >
            <QuantDataDrivenInvestor />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/wildlife-conservation-enterprise"
        element={
          <ProtectedArchetypeRoute
            archetypeId="wildlife-conservation-enterprise"
            pageName="Wildlife Conservation Enterprise"
          >
            <WildlifeConservationEnterprise />
          </ProtectedArchetypeRoute>
        }
      />

      <Route
        path="/quantum-enterprise-2050"
        element={
          <ProtectedArchetypeRoute
            archetypeId="quantum-enterprise-2050"
            pageName="Quantum Enterprise 2050"
          >
            <QuantumEnterprise2050 />
          </ProtectedArchetypeRoute>
        }
      />

      {/* Super Admin Route - Secure Access */}
      <Route path="/super-admin" element={<SuperAdminPage />} />

      {/* Catch-all route for 404 - MUST BE LAST */}
      <Route
        path="*"
        element={
          <SafeRoute pageName="Not Found">
            <NotFound />
          </SafeRoute>
        }
      />
    </Routes>
  );
};

// Health check API endpoint simulation
const HealthCheck: React.FC = () => {
  useEffect(() => {
    // Initialize database seeding
    const initializeDatabase = async () => {
      try {
        const result = await databaseSeedingService.seedDatabase();
        console.log("Database initialization:", result.message);
        if (result.details) {
          result.details.forEach((detail) => console.log(detail));
        }
      } catch (error) {
        console.error("Database initialization failed:", error);
      }
    };

    // Run database seeding on startup
    initializeDatabase();

    // Expose health check endpoint for monitoring
    if (typeof window !== "undefined") {
      (
        window as typeof window & {
          __APP_HEALTH_CHECK?: () => Promise<unknown>;
        }
      ).__APP_HEALTH_CHECK = async () => {
        try {
          const health = await appHealthMonitor.checkHealth();
          return {
            status: health.overall,
            timestamp: new Date().toISOString(),
            details: health,
          };
        } catch (error) {
          return {
            status: "error",
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      };
    }

    return () => {
      window.removeEventListener("error", handleUnhandledError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return null;
};

const App = () => {
  useEffect(() => {
    // Global error handlers for unhandled errors
    const handleUnhandledError = (event: ErrorEvent) => {
      console.error("Unhandled Error:", event.error);

      // Track unhandled errors
      if (typeof window !== "undefined") {
        EnhancedUserInteractionService.getInstance().trackInteraction({
          type: "view",
          element: "unhandled_error",
          metadata: {
            error: event.error?.message || "Unknown error",
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
          },
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason);

      // Track unhandled promise rejections
      if (typeof window !== "undefined") {
        EnhancedUserInteractionService.getInstance().trackInteraction({
          type: "view",
          element: "unhandled_promise_rejection",
          metadata: {
            reason:
              event.reason?.message || event.reason || "Unknown rejection",
          },
        });
      }
    };

    window.addEventListener("error", handleUnhandledError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Performance monitoring
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const nav = entry as PerformanceNavigationTiming;
            console.log("Page Load Performance:", {
              loadTime: nav.loadEventEnd - nav.loadEventStart,
              domContentLoaded:
                nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
              ttfb: nav.responseStart - nav.requestStart,
            });
          }
        }
      });

      try {
        observer.observe({ entryTypes: ["navigation", "paint"] });
      } catch (error) {
        console.warn("Performance Observer not supported:", error);
      }
    }

    return () => {
      window.removeEventListener("error", handleUnhandledError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={
            <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-800 mb-4">
                  Critical Application Error
                </h1>
                <p className="text-red-600 mb-4">
                  The application has encountered a critical error and cannot
                  continue.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reload Application
                </button>
              </div>
            </div>
          }
        >
          <EnterpriseSecurityProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <PageErrorBoundary
                    pageName="Application Root"
                    enableDiagnostics={true}
                  >
                    <Suspense
                      fallback={
                        <PageLoadingFallback
                          pageName="Application"
                          timeout={15000}
                          showProgressBar={true}
                        >
                          Initializing platform...
                        </PageLoadingFallback>
                      }
                    >
                      <AppContent />
                      <HealthCheck />
                    </Suspense>
                  </PageErrorBoundary>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </EnterpriseSecurityProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
