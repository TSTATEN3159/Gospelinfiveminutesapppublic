import { Component, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface FeatureBoundaryProps {
  featureName: string;
  onBackHome?: () => void;
  children: ReactNode;
}

interface FeatureBoundaryState {
  hasError: boolean;
  errorMessage?: string;
  errorStack?: string;
}

export class FeatureBoundary extends Component<FeatureBoundaryProps, FeatureBoundaryState> {
  constructor(props: FeatureBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): FeatureBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
      errorStack: error.stack,
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(`[FeatureBoundary] ${this.props.featureName} error:`, {
      error,
      errorInfo: info,
      timestamp: new Date().toISOString(),
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined, errorStack: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
          <Card className="max-w-md w-full shadow-2xl border-2 border-destructive/20">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <CardTitle className="text-xl">
                  {this.props.featureName}
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Something went wrong
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-foreground leading-relaxed">
                  This feature ran into a problem, but the rest of the app is still working fine. 
                  You can try again or return to the home page.
                </p>
              </div>

              {this.state.errorMessage && (
                <div className="bg-destructive/5 p-3 rounded-md border border-destructive/20">
                  <p className="text-xs text-destructive font-mono line-clamp-3">
                    {this.state.errorMessage}
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                {this.props.onBackHome && (
                  <Button
                    variant="outline"
                    onClick={this.props.onBackHome}
                    className="flex items-center gap-2"
                    data-testid="button-feature-error-home"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Button>
                )}
                <Button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                  data-testid="button-feature-error-retry"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  If this problem persists, please try refreshing the entire app
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
