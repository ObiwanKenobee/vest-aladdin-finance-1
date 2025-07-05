import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Users,
  Building2,
  Globe,
  GraduationCap,
  Target,
  Heart,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Crown,
  Lock,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  Smartphone,
  Brain,
  Wallet,
  TreePine,
  Atom,
  Info,
  DollarSign,
  PieChart,
  Activity,
  Clock,
  Award,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { paywallProtectionService } from "../services/paywallProtectionService";
import { themeService } from "../services/themeService";
import EnterpriseDashboardFramework from "./EnterpriseDashboardFramework";

interface ArchetypeInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "individual" | "professional" | "enterprise";
  tier: "free" | "starter" | "professional" | "enterprise";
  features: string[];
  userCount: number;
  avgReturn: number;
  demoMetrics: {
    portfolioValue: string;
    growth: number;
    riskLevel: "Low" | "Medium" | "High";
  };
}

const PlatformNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(
    null,
  );
  const [showDashboard, setShowDashboard] = useState(false);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Generate demo user ID
  const userId = React.useMemo(() => {
    let id = localStorage.getItem("demo-user-id");
    if (!id) {
      id = `demo-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("demo-user-id", id);
    }
    return id;
  }, []);

  useEffect(() => {
    const subscription = paywallProtectionService.getUserSubscription(userId);
    setUserSubscription(subscription);
  }, [userId]);

  const archetypes: ArchetypeInfo[] = [
    {
      id: "emerging-market-citizen",
      name: "Emerging Market Citizen",
      description:
        "AI-powered financial dashboard for first-time investors in emerging markets",
      icon: <Globe className="h-6 w-6" />,
      category: "individual",
      tier: "free",
      features: [
        "Multilingual AI",
        "Healthcare Tokens",
        "Mobile-First",
        "Risk Education",
      ],
      userCount: 15420,
      avgReturn: 12.4,
      demoMetrics: {
        portfolioValue: "$2,450",
        growth: 12.4,
        riskLevel: "Low",
      },
    },
    {
      id: "retail-investor",
      name: "Retail Investor",
      description:
        "Comprehensive investment platform for individual retail investors",
      icon: <PieChart className="h-6 w-6" />,
      category: "individual",
      tier: "starter",
      features: [
        "Smart Portfolio",
        "Goal Planning",
        "Tax Optimization",
        "Research Tools",
      ],
      userCount: 23180,
      avgReturn: 15.2,
      demoMetrics: {
        portfolioValue: "$45,680",
        growth: 15.2,
        riskLevel: "Medium",
      },
    },
    {
      id: "student-early-career",
      name: "Student & Early Career",
      description:
        "Investment education and micro-investing for young professionals",
      icon: <GraduationCap className="h-6 w-6" />,
      category: "individual",
      tier: "starter",
      features: [
        "Micro Investing",
        "Education Hub",
        "Goal Setting",
        "Career Planning",
      ],
      userCount: 8960,
      avgReturn: 18.7,
      demoMetrics: {
        portfolioValue: "$1,250",
        growth: 18.7,
        riskLevel: "Medium",
      },
    },
    {
      id: "cultural-investor",
      name: "Cultural Investor",
      description:
        "Investment opportunities aligned with cultural values and heritage",
      icon: <Heart className="h-6 w-6" />,
      category: "professional",
      tier: "professional",
      features: [
        "Cultural Assets",
        "Impact Metrics",
        "Community Pools",
        "Heritage Funds",
      ],
      userCount: 4320,
      avgReturn: 11.8,
      demoMetrics: {
        portfolioValue: "$28,900",
        growth: 11.8,
        riskLevel: "Medium",
      },
    },
    {
      id: "diaspora-investor",
      name: "Diaspora Investor",
      description:
        "Cross-border investment solutions for global diaspora communities",
      icon: <Globe className="h-6 w-6" />,
      category: "professional",
      tier: "professional",
      features: [
        "Cross-Border",
        "Remittance Integration",
        "Home Country Investing",
        "Currency Hedging",
      ],
      userCount: 6750,
      avgReturn: 14.3,
      demoMetrics: {
        portfolioValue: "$52,100",
        growth: 14.3,
        riskLevel: "Medium",
      },
    },
    {
      id: "financial-advisor",
      name: "Financial Advisor",
      description:
        "Complete platform for financial advisors to manage client portfolios",
      icon: <Users className="h-6 w-6" />,
      category: "professional",
      tier: "professional",
      features: [
        "Client Portal",
        "Proposal Tools",
        "Compliance",
        "Performance Analytics",
      ],
      userCount: 2180,
      avgReturn: 22.1,
      demoMetrics: {
        portfolioValue: "$8.2M",
        growth: 22.1,
        riskLevel: "Low",
      },
    },
    {
      id: "developer-integrator",
      name: "Developer Integrator",
      description:
        "APIs and tools for developers building financial applications",
      icon: <Zap className="h-6 w-6" />,
      category: "professional",
      tier: "professional",
      features: ["REST APIs", "SDKs", "Webhooks", "Developer Portal"],
      userCount: 1840,
      avgReturn: 16.9,
      demoMetrics: {
        portfolioValue: "API Credits",
        growth: 16.9,
        riskLevel: "Low",
      },
    },
    {
      id: "public-sector-ngo",
      name: "Public Sector & NGO",
      description:
        "Specialized solutions for governmental and non-profit organizations",
      icon: <Building2 className="h-6 w-6" />,
      category: "professional",
      tier: "professional",
      features: [
        "Grant Management",
        "Impact Reporting",
        "Compliance Tools",
        "Transparency",
      ],
      userCount: 890,
      avgReturn: 9.4,
      demoMetrics: {
        portfolioValue: "$850K",
        growth: 9.4,
        riskLevel: "Low",
      },
    },
    {
      id: "institutional-investor",
      name: "Institutional Investor",
      description:
        "Enterprise-grade portfolio management for institutional investors",
      icon: <Building2 className="h-6 w-6" />,
      category: "enterprise",
      tier: "enterprise",
      features: [
        "Advanced Analytics",
        "Compliance Monitoring",
        "Multi-Asset Trading",
        "Custom Reporting",
      ],
      userCount: 320,
      avgReturn: 8.2,
      demoMetrics: {
        portfolioValue: "$125.8M",
        growth: 8.2,
        riskLevel: "Low",
      },
    },
    {
      id: "african-market-enterprise",
      name: "African Market Enterprise",
      description:
        "Comprehensive solutions for African market investment and development",
      icon: <Globe className="h-6 w-6" />,
      category: "enterprise",
      tier: "enterprise",
      features: [
        "Market Intelligence",
        "Local Partnerships",
        "Currency Management",
        "Regulatory Compliance",
      ],
      userCount: 150,
      avgReturn: 19.8,
      demoMetrics: {
        portfolioValue: "$45.2M",
        growth: 19.8,
        riskLevel: "High",
      },
    },
    {
      id: "quant-data-driven-investor",
      name: "Quantitative Investor",
      description:
        "Advanced quantitative analysis and algorithmic trading capabilities",
      icon: <BarChart3 className="h-6 w-6" />,
      category: "enterprise",
      tier: "enterprise",
      features: [
        "Quant Models",
        "Backtesting",
        "Algorithm Trading",
        "Data Analytics",
      ],
      userCount: 280,
      avgReturn: 26.7,
      demoMetrics: {
        portfolioValue: "$78.9M",
        growth: 26.7,
        riskLevel: "High",
      },
    },
    {
      id: "wildlife-conservation-enterprise",
      name: "Wildlife Conservation",
      description:
        "Investment solutions focused on wildlife conservation and environmental impact",
      icon: <TreePine className="h-6 w-6" />,
      category: "enterprise",
      tier: "enterprise",
      features: [
        "Conservation Funds",
        "Impact Tracking",
        "Carbon Credits",
        "Biodiversity Metrics",
      ],
      userCount: 95,
      avgReturn: 13.2,
      demoMetrics: {
        portfolioValue: "$32.1M",
        growth: 13.2,
        riskLevel: "Medium",
      },
    },
    {
      id: "quantum-enterprise-2050",
      name: "Quantum Enterprise 2050",
      description:
        "Next-generation quantum computing and AI-powered investment strategies",
      icon: <Atom className="h-6 w-6" />,
      category: "enterprise",
      tier: "enterprise",
      features: [
        "Quantum Analytics",
        "AI Prediction",
        "Future Tech",
        "Advanced Algorithms",
      ],
      userCount: 45,
      avgReturn: 34.5,
      demoMetrics: {
        portfolioValue: "$156.7M",
        growth: 34.5,
        riskLevel: "High",
      },
    },
  ];

  const handleArchetypeClick = (archetypeId: string) => {
    const hasAccess = paywallProtectionService.hasAccessToArchetype(
      userId,
      archetypeId,
    );

    if (hasAccess) {
      navigate(`/${archetypeId}`);
    } else {
      setSelectedArchetype(archetypeId);
      setShowDashboard(true);
    }
  };

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "individual":
        return <Users className="h-4 w-4" />;
      case "professional":
        return <Target className="h-4 w-4" />;
      case "enterprise":
        return <Building2 className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTierBadge = (tier: string, hasAccess: boolean) => {
    if (hasAccess) {
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Access
        </Badge>
      );
    }

    const colors = {
      free: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      starter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      professional:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      enterprise:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    };

    return (
      <Badge variant="outline" className={colors[tier as keyof typeof colors]}>
        {tier === "free" ? (
          <Star className="h-3 w-3 mr-1" />
        ) : (
          <Lock className="h-3 w-3 mr-1" />
        )}
        {tier}
      </Badge>
    );
  };

  const groupedArchetypes = {
    individual: archetypes.filter((a) => a.category === "individual"),
    professional: archetypes.filter((a) => a.category === "professional"),
    enterprise: archetypes.filter((a) => a.category === "enterprise"),
  };

  if (showDashboard && selectedArchetype) {
    const hasAccess = paywallProtectionService.hasAccessToArchetype(
      userId,
      selectedArchetype,
    );
    return (
      <div>
        <div className="bg-white dark:bg-slate-900 border-b p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setShowDashboard(false);
                setSelectedArchetype(null);
              }}
            >
              ← Back to Platform
            </Button>
            <h1 className="text-xl font-semibold">Dashboard Preview</h1>
            <Button onClick={handleUpgrade}>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          </div>
        </div>
        <EnterpriseDashboardFramework
          archetypeId={selectedArchetype}
          userId={userId}
          hasAccess={hasAccess}
          onUpgrade={handleUpgrade}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-slate-900 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QuantumVest
                </h1>
              </div>

              {/* Main Navigation Links */}
              <nav className="hidden md:flex space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-sm font-medium"
                >
                  Platform Home
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/quantumvest")}
                  className="text-sm font-medium"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  QuantumVest Platform
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/neonatal-care-protocol")}
                  className="text-sm font-medium"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Neonatal Care Protocol
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/adaptive-shell")}
                  className="text-sm font-medium"
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Adaptive Shell
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/architecture-monitor")}
                  className="text-sm font-medium"
                >
                  <Activity className="h-4 w-4 mr-1" />
                  Architecture Monitor
                </Button>
              </nav>
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/architecture")}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Architecture
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/pricing")}
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Pricing
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/analytics")}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
              </div>

              <Button
                size="sm"
                onClick={() => navigate("/pricing")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Crown className="h-4 w-4 mr-1" />
                Upgrade
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t">
            <div className="px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/quantumvest");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Brain className="h-4 w-4 mr-2" />
                QuantumVest Platform
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/neonatal-care-protocol");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Heart className="h-4 w-4 mr-2" />
                Neonatal Care Protocol
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/adaptive-shell");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Adaptive Shell
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/architecture-monitor");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Activity className="h-4 w-4 mr-2" />
                Architecture Monitor
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/architecture");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Zap className="h-4 w-4 mr-2" />
                Architecture
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/pricing");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate("/analytics");
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise Investment Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Choose your investment archetype to access specialized tools and
              insights
            </p>

            {/* Current Plan Status */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <span className="font-medium">
                  Current Plan:{" "}
                  {userSubscription?.tier?.charAt(0).toUpperCase() +
                    userSubscription?.tier?.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>
                  {userSubscription?.features?.maxArchetypes} of 13 archetypes
                </span>
              </div>
              <Button size="sm" onClick={() => navigate("/pricing")}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">13</div>
                <div className="text-sm text-muted-foreground">
                  Investment Archetypes
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">$2.8B</div>
                <div className="text-sm text-muted-foreground">
                  Assets Under Management
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">15.4%</div>
                <div className="text-sm text-muted-foreground">
                  Average Annual Return
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* QuantumVest Architecture Showcase */}
            <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 border-2 border-dashed border-blue-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                    <Atom className="h-3 w-3 mr-1" />
                    Next-Generation Architecture
                  </Badge>
                  <Badge variant="outline">
                    <Zap className="h-3 w-3 mr-1" />
                    Live Demo
                  </Badge>
                </div>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Brain className="h-10 w-10 text-purple-600" />
                  QuantumVest: Beyond Frontend → API → Backend
                </CardTitle>
                <CardDescription className="text-lg">
                  Experience the revolutionary Agent Layer → Shared Memory Graph
                  → On-Chain Logic → AI Fabric architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <Users className="h-4 w-4" />
                        Agent Swarm
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                        Autonomous agents replace traditional backend logic
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate("/quantumvest")}
                      >
                        <Brain className="h-3 w-3 mr-1" />
                        Explore
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <Globe className="h-4 w-4" />
                        Memory Graph
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-purple-600 dark:text-purple-400 mb-3">
                        Decentralized state fabric replacing databases
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate("/architecture-monitor")}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-700 dark:text-orange-300">
                        <Zap className="h-4 w-4" />
                        On-Chain Logic
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-orange-600 dark:text-orange-400 mb-3">
                        Smart contract automation and deployment
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => navigate("/neonatal-care-protocol")}
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Case Study
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Smartphone className="h-4 w-4" />
                        AI Fabric
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-green-600 dark:text-green-400 mb-3">
                        Coordinated intelligence across all systems
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => navigate("/adaptive-shell")}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Experience
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/quantumvest")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Experience QuantumVest Platform
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/neonatal-care-protocol")}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    View Neonatal Care Case Study
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Featured Archetype - Emerging Market Citizen */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <Star className="h-3 w-3 mr-1" />
                    Free Access
                  </Badge>
                  <Badge variant="outline">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Featured Case Study
                  </Badge>
                </div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Globe className="h-8 w-8 text-blue-600" />
                  Emerging Market Citizen
                </CardTitle>
                <CardDescription className="text-lg">
                  Multilingual, AI-powered financial dashboard for first-time
                  investors in emerging markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>AI explanations in 8+ languages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Real-time healthcare asset ROI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Mobile-optimized with offline mode</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>First-time investor education</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Demo Metrics:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Portfolio Value:</span>
                        <span className="font-bold">$2,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>30-day Growth:</span>
                        <span className="font-bold text-green-600">+12.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Users:</span>
                        <span className="font-bold">15,420</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          Low
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() =>
                      handleArchetypeClick("emerging-market-citizen")
                    }
                    className="flex-1"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Try Healthcare Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedArchetype("emerging-market-citizen");
                      setShowDashboard(true);
                    }}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Preview Mode
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archetypes.slice(0, 6).map((archetype) => {
                const hasAccess = paywallProtectionService.hasAccessToArchetype(
                  userId,
                  archetype.id,
                );
                return (
                  <Card
                    key={archetype.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      !hasAccess ? "opacity-75" : ""
                    }`}
                    onClick={() => handleArchetypeClick(archetype.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-primary">{archetype.icon}</div>
                          {getCategoryIcon(archetype.category)}
                        </div>
                        {getTierBadge(archetype.tier, hasAccess)}
                      </div>
                      <CardTitle className="text-lg">
                        {archetype.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {archetype.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span className="font-medium">
                            {archetype.userCount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg Return:</span>
                          <span className="font-medium text-green-600">
                            +{archetype.avgReturn}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Portfolio:</span>
                          <span className="font-medium">
                            {archetype.demoMetrics.portfolioValue}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Individual Tab */}
          <TabsContent value="individual" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Individual Investors</h2>
              <p className="text-muted-foreground">
                Personal investment solutions for individual investors and
                beginners
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedArchetypes.individual.map((archetype) => {
                const hasAccess = paywallProtectionService.hasAccessToArchetype(
                  userId,
                  archetype.id,
                );
                return (
                  <Card
                    key={archetype.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      !hasAccess ? "opacity-75" : ""
                    }`}
                    onClick={() => handleArchetypeClick(archetype.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-primary">{archetype.icon}</div>
                        {getTierBadge(archetype.tier, hasAccess)}
                      </div>
                      <CardTitle>{archetype.name}</CardTitle>
                      <CardDescription>{archetype.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            Users: {archetype.userCount.toLocaleString()}
                          </div>
                          <div className="text-green-600">
                            +{archetype.avgReturn}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          {archetype.features
                            .slice(0, 2)
                            .map((feature, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-muted-foreground"
                              >
                                • {feature}
                              </div>
                            ))}
                        </div>
                        {hasAccess ? (
                          <Button size="sm" className="w-full">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Access Dashboard
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Preview Mode
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Professional Solutions
              </h2>
              <p className="text-muted-foreground">
                Advanced tools for financial professionals, advisors, and
                specialized investors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedArchetypes.professional.map((archetype) => {
                const hasAccess = paywallProtectionService.hasAccessToArchetype(
                  userId,
                  archetype.id,
                );
                return (
                  <Card
                    key={archetype.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      !hasAccess ? "opacity-75" : ""
                    }`}
                    onClick={() => handleArchetypeClick(archetype.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-primary">{archetype.icon}</div>
                        {getTierBadge(archetype.tier, hasAccess)}
                      </div>
                      <CardTitle>{archetype.name}</CardTitle>
                      <CardDescription>{archetype.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            Users: {archetype.userCount.toLocaleString()}
                          </div>
                          <div className="text-green-600">
                            +{archetype.avgReturn}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          {archetype.features
                            .slice(0, 2)
                            .map((feature, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-muted-foreground"
                              >
                                • {feature}
                              </div>
                            ))}
                        </div>
                        {hasAccess ? (
                          <Button size="sm" className="w-full">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Access Dashboard
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade Required
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Enterprise Tab */}
          <TabsContent value="enterprise" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Enterprise Solutions</h2>
              <p className="text-muted-foreground">
                Enterprise-grade platforms for institutional investors and large
                organizations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedArchetypes.enterprise.map((archetype) => {
                const hasAccess = paywallProtectionService.hasAccessToArchetype(
                  userId,
                  archetype.id,
                );
                return (
                  <Card
                    key={archetype.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      !hasAccess ? "opacity-75" : ""
                    }`}
                    onClick={() => handleArchetypeClick(archetype.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-primary">{archetype.icon}</div>
                        {getTierBadge(archetype.tier, hasAccess)}
                      </div>
                      <CardTitle>{archetype.name}</CardTitle>
                      <CardDescription>{archetype.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            Users: {archetype.userCount.toLocaleString()}
                          </div>
                          <div className="text-green-600">
                            +{archetype.avgReturn}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          {archetype.features
                            .slice(0, 2)
                            .map((feature, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-muted-foreground"
                              >
                                • {feature}
                              </div>
                            ))}
                        </div>
                        {hasAccess ? (
                          <Button size="sm" className="w-full">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Access Dashboard
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Building2 className="h-4 w-4 mr-2" />
                            Enterprise Only
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Platform Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced analytics and business intelligence tools
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/analytics")}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Enterprise Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Enterprise innovation and operational insights
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/enterprise-innovations")}
              >
                Enterprise Tools
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Archetype Selector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your investment archetype and access specialized tools
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/archetypes")}
              >
                Select Archetype
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Executive Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                High-level executive insights and strategic overview
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/executive")}
              >
                Executive View
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-600" />
                Developer Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Developer tools, APIs, and integration resources
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/developer")}
              >
                Developer Tools
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Architecture Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive visualization of system architecture
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/architecture")}
              >
                View Architecture
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
          <CardContent className="text-center py-12">
            <Crown className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h2 className="text-2xl font-bold mb-4">
              Ready to unlock all archetypes?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to all 13 investment archetypes, advanced analytics,
              and enterprise-grade features with our subscription plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/pricing")} size="lg">
                <DollarSign className="h-5 w-5 mr-2" />
                View Pricing Plans
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/quantumvest")}
              >
                <Brain className="h-5 w-5 mr-2" />
                Experience QuantumVest
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/architecture-monitor")}
              >
                <Activity className="h-5 w-5 mr-2" />
                System Monitor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformNavigation;
