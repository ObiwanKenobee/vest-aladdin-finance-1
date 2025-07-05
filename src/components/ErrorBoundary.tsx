import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home, Bug, Shield } from "lucide-react";
import { userInteractionService } from "../services/userInteractionService";
import CiscoXDRService from "../services/ciscoXDRService";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = this.generateErrorId();

    this.setState({
      error,
      errorInfo,
      errorId,
    });

    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Track error with user interaction service
    this.trackError(error, errorInfo, errorId);

    // Report to security service
    this.reportSecurityIncident(error, errorInfo, errorId);
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async trackError(
    error: Error,
    errorInfo: ErrorInfo,
    errorId: string,
  ) {
    try {
      // Track error as user interaction
      await userInteractionService.trackInteraction({
        type: "view",
        element: "error-boundary",
        position: { x: 0, y: 0 },
        duration: 0,
        metadata: {
          errorId,
          errorMessage: error.message,
          errorStack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        },
      });

      // Generate negative sentiment for error
      await userInteractionService.trackUserSentiment(
        "anonymous",
        -0.8,
        "error_boundary",
      );

      // Analyze error sentiment
      const sentimentAnalysis = await userInteractionService.analyzeSentiment(
        error.message,
        "error_boundary",
      );

      console.log("Error sentiment analysis:", sentimentAnalysis);
    } catch (trackingError) {
      console.error("Failed to track error:", trackingError);
    }
  }

  private async reportSecurityIncident(
    error: Error,
    errorInfo: ErrorInfo,
    errorId: string,
  ) {
    try {
      // Report as potential security incident
      await CiscoXDRService.getInstance().logSecurityEvent({
        type: "application_error",
        severity: this.determineErrorSeverity(error),
        details: {
          errorId,
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
        timestamp: new Date(),
      });
    } catch (reportingError) {
      console.error("Failed to report security incident:", reportingError);
    }
  }

  private determineErrorSeverity(
    error: Error,
  ): "low" | "medium" | "high" | "critical" {
    const errorMessage = error.message.toLowerCase();

    if (
      errorMessage.includes("security") ||
      errorMessage.includes("auth") ||
      errorMessage.includes("token")
    ) {
      return "critical";
    }

    if (
      errorMessage.includes("network") ||
      errorMessage.includes("payment") ||
      errorMessage.includes("api")
    ) {
      return "high";
    }

    if (errorMessage.includes("render") || errorMessage.includes("component")) {
      return "medium";
    }

    return "low";
  }

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        retryCount: prevState.retryCount + 1,
      }));

      // Track retry attempt
      userInteractionService.trackInteraction({
        type: "click",
        element: "error-retry-button",
        position: { x: 0, y: 0 },
        duration: 0,
        metadata: {
          retryCount: this.state.retryCount + 1,
          errorId: this.state.errorId,
        },
      });
    }
  };

  private handleReload = () => {
    // Track reload attempt
    userInteractionService.trackInteraction({
      type: "click",
      element: "error-reload-button",
      position: { x: 0, y: 0 },
      duration: 0,
      metadata: {
        errorId: this.state.errorId,
        action: "page_reload",
      },
    });

    window.location.reload();
  };

  private handleGoHome = () => {
    // Track navigation to home
    userInteractionService.trackInteraction({
      type: "click",
      element: "error-home-button",
      position: { x: 0, y: 0 },
      duration: 0,
      metadata: {
        errorId: this.state.errorId,
        action: "navigate_home",
      },
    });

    window.location.href = "/";
  };

  private sendErrorReport = async () => {
    try {
      // Prepare error report
      const errorReport = {
        errorId: this.state.errorId,
        message: this.state.error?.message,
        stack: this.state.error?.stack,
        componentStack: this.state.errorInfo?.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        retryCount: this.state.retryCount,
      };

      // In a real app, this would send to your error reporting service
      console.log("Error report sent:", errorReport);

      // Track error report submission
      await userInteractionService.trackInteraction({
        type: "click",
        element: "error-report-button",
        position: { x: 0, y: 0 },
        duration: 0,
        metadata: {
          errorId: this.state.errorId,
          action: "error_report_sent",
        },
      });

      alert(
        "Error report sent successfully. Thank you for helping us improve!",
      );
    } catch (reportError) {
      console.error("Failed to send error report:", reportError);
      alert("Failed to send error report. Please try again later.");
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-lg">
                We encountered an unexpected error. Our security team has been
                notified.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error ID for reference */}
              <Alert>
                <Bug className="h-4 w-4" />
                <AlertDescription>
                  <strong>Error ID:</strong> {this.state.errorId}
                  <br />
                  <span className="text-xs text-gray-500">
                    Please include this ID when reporting the issue
                  </span>
                </AlertDescription>
              </Alert>

              {/* Security notice */}
              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Security Notice:</strong> This error has been
                  automatically reported to our Cisco XDR security system for
                  analysis and monitoring.
                </AlertDescription>
              </Alert>

              {/* Error details (only in development) */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertDescription className="text-yellow-800">
                    <strong>Development Details:</strong>
                    <pre className="mt-2 text-xs overflow-auto max-h-32 bg-white p-2 rounded border">
                      {this.state.error.message}
                      {"\n\n"}
                      {this.state.error.stack}
                    </pre>
                  </AlertDescription>
                </Alert>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {this.state.retryCount < this.maxRetries && (
                  <Button onClick={this.handleRetry} className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again ({this.maxRetries - this.state.retryCount}{" "}
                    attempts left)
                  </Button>
                )}

                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Additional help */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  If this problem persists, please contact our support team.
                </p>
                <Button
                  onClick={this.sendErrorReport}
                  variant="ghost"
                  size="sm"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Send Error Report
                </Button>
              </div>

              {/* Performance tip */}
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800 text-sm">
                  <strong>Tip:</strong> Try refreshing the page or clearing your
                  browser cache. Most issues are resolved with a simple page
                  reload.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
