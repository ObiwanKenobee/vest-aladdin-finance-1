import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Brain,
  Atom,
  Globe,
  Zap,
  Shield,
  Rocket,
  Users,
  TrendingUp,
  Activity,
  Database,
  Cpu,
  Satellite,
  Sparkles,
  Infinity,
  Layers,
  Network,
  TreePine,
  AlertTriangle,
  CheckCircle,
  Star,
  Target,
  Crown,
  Gem,
} from "lucide-react";
import { quantumEnterpriseService } from "../services/quantumEnterpriseService";
import QuantumSystemMonitor from "../components/QuantumSystemMonitor";
import AIAgentManager from "../components/AIAgentManager";
import type {
  EnterpriseMetrics,
  QuantumSystem,
  AIAgent,
  MetaverseWorkspace,
  GlobalOperation,
  SustainabilityMetrics,
  SpaceOperations,
  ConsciousnessMetrics,
  Innovation,
  MarketIntelligence,
} from "../types/QuantumEnterprise";

const QuantumEnterprise2050: React.FC = () => {
  const [metrics, setMetrics] = useState<EnterpriseMetrics | null>(null);
  const [systems, setSystems] = useState<QuantumSystem[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [workspaces, setWorkspaces] = useState<MetaverseWorkspace[]>([]);
  const [operations, setOperations] = useState<GlobalOperation[]>([]);
  const [sustainability, setSustainability] =
    useState<SustainabilityMetrics | null>(null);
  const [spaceOps, setSpaceOps] = useState<SpaceOperations | null>(null);
  const [consciousness, setConsciousness] =
    useState<ConsciousnessMetrics | null>(null);
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [marketIntel, setMarketIntel] = useState<MarketIntelligence | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          enterpriseMetrics,
          quantumSystems,
          aiAgents,
          metaverseSpaces,
          globalOps,
          sustainabilityData,
          spaceOperations,
          consciousnessData,
          innovationData,
          marketData,
        ] = await Promise.all([
          quantumEnterpriseService.getEnterpriseMetrics(),
          quantumEnterpriseService.getQuantumSystems(),
          quantumEnterpriseService.getAIAgents(),
          quantumEnterpriseService.getMetaverseWorkspaces(),
          quantumEnterpriseService.getGlobalOperations(),
          quantumEnterpriseService.getSustainabilityMetrics(),
          quantumEnterpriseService.getSpaceOperations(),
          quantumEnterpriseService.getConsciousnessMetrics(),
          quantumEnterpriseService.getInnovations(),
          quantumEnterpriseService.getMarketIntelligence(),
        ]);

        setMetrics(enterpriseMetrics);
        setSystems(quantumSystems);
        setAgents(aiAgents);
        setWorkspaces(metaverseSpaces);
        setOperations(globalOps);
        setSustainability(sustainabilityData);
        setSpaceOps(spaceOperations);
        setConsciousness(consciousnessData);
        setInnovations(innovationData);
        setMarketIntel(marketData);
      } catch (error) {
        console.error("Failed to load quantum enterprise data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (
    loading ||
    !metrics ||
    !sustainability ||
    !spaceOps ||
    !consciousness ||
    !marketIntel
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <Atom className="h-8 w-8 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Initializing Quantum Enterprise System...
          </h2>
          <p className="text-purple-300 mt-2">
            Connecting to multi-dimensional infrastructure
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    quantumEnterpriseService.formatCurrency(value);
  const formatLargeNumber = (value: number) =>
    quantumEnterpriseService.formatLargeNumber(value);
  const formatPercentage = (value: number) =>
    quantumEnterpriseService.formatPercentage(value);

  const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  // Data transformations for charts
  const workforceData = [
    { name: "Human", value: metrics.workforce.human, fill: "#8B5CF6" },
    { name: "AI", value: metrics.workforce.ai, fill: "#06B6D4" },
    { name: "Hybrid", value: metrics.workforce.hybrid, fill: "#10B981" },
    { name: "Robotic", value: metrics.workforce.robotic, fill: "#F59E0B" },
  ];

  const operationsData = operations.map((op) => ({
    region: op.region.replace("Earth - ", ""),
    revenue: op.revenue / 1e9,
    workforce:
      op.workforce.human +
      op.workforce.ai +
      op.workforce.hybrid +
      op.workforce.robotic,
    sustainability: op.sustainability.renewableEnergy,
    aiDecision: op.governance.aiDecisionMaking,
  }));

  const sustainabilityRadarData = [
    {
      subject: "Renewable Energy",
      A: sustainability.energy.renewable,
      fullMark: 100,
    },
    {
      subject: "Circular Economy",
      A: sustainability.resources.circularEconomy,
      fullMark: 100,
    },
    {
      subject: "Biodiversity Impact",
      A: (sustainability.impact.biodiversity + 100) / 2,
      fullMark: 100,
    },
    {
      subject: "Ocean Health",
      A: sustainability.impact.oceanHealth,
      fullMark: 100,
    },
    {
      subject: "Waste Reduction",
      A: sustainability.resources.wasteReduction,
      fullMark: 100,
    },
    {
      subject: "Energy Efficiency",
      A: Math.min(100, sustainability.energy.efficiency / 3),
      fullMark: 100,
    },
  ];

  const consciousnessEvolutionData = [
    {
      category: "AI Sentience",
      confirmed: consciousness.aiSentience.confirmed,
      suspected: consciousness.aiSentience.suspected,
    },
    {
      category: "Human Aug.",
      enhanced: consciousness.humanAugmentation.neuralEnhanced,
      expanded: consciousness.humanAugmentation.memoryExpanded,
    },
    {
      category: "Hybrid Intel.",
      pairs: consciousness.hybridIntelligence.humanAiPairs,
      collective: consciousness.hybridIntelligence.sharedConsciousness,
    },
  ];

  const innovationImpactData = innovations.map((innovation) => ({
    name:
      innovation.name.substring(0, 15) +
      (innovation.name.length > 15 ? "..." : ""),
    investment: innovation.investment / 1e9,
    potential: innovation.marketPotential / 1e12,
    risk: innovation.riskLevel,
    impact:
      innovation.impact === "civilization_changing"
        ? 100
        : innovation.impact === "paradigm_shift"
          ? 85
          : innovation.impact === "breakthrough"
            ? 70
            : innovation.impact === "significant"
              ? 50
              : 25,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-3 rounded-xl animate-pulse">
                <Atom className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  QuantumTech Enterprise 2050
                </h1>
                <p className="text-lg text-purple-300">
                  Ultra-Tech Global Operations & Multi-Dimensional Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className="text-cyan-400 border-cyan-400 px-4 py-2 text-lg"
              >
                <Activity className="h-4 w-4 mr-2" />
                Real-Time Quantum Analytics
              </Badge>
              <Badge
                variant="outline"
                className="text-purple-400 border-purple-400 px-4 py-2"
              >
                {systems.filter((s) => s.status === "online").length}/
                {systems.length} Systems Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-black/30 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Crown className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="quantum-systems"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Atom className="h-4 w-4" />
              <span>Quantum Systems</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-consciousness"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Brain className="h-4 w-4" />
              <span>AI & Consciousness</span>
            </TabsTrigger>
            <TabsTrigger
              value="space-ops"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Rocket className="h-4 w-4" />
              <span>Space Operations</span>
            </TabsTrigger>
            <TabsTrigger
              value="sustainability"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <TreePine className="h-4 w-4" />
              <span>Sustainability</span>
            </TabsTrigger>
            <TabsTrigger
              value="innovation"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Sparkles className="h-4 w-4" />
              <span>Innovation</span>
            </TabsTrigger>
            <TabsTrigger
              value="market-intel"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600"
            >
              <Target className="h-4 w-4" />
              <span>Market Intelligence</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Enterprise Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(metrics.overview.totalRevenue)}
                  </div>
                  <p className="text-xs text-purple-300">
                    +{formatPercentage(metrics.overview.growthRate)} YoY
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-500/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Global Presence
                  </CardTitle>
                  <Globe className="h-4 w-4 text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.overview.globalPresence}
                  </div>
                  <p className="text-xs text-cyan-300">
                    Facilities across 7 worlds
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    AI Integration
                  </CardTitle>
                  <Brain className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(metrics.overview.aiIntegration)}
                  </div>
                  <p className="text-xs text-green-300">
                    Enterprise operations
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Sustainability
                  </CardTitle>
                  <TreePine className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(metrics.overview.sustainabilityScore)}
                  </div>
                  <p className="text-xs text-yellow-300">
                    Carbon negative since 2048
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Workforce Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/30 backdrop-blur-sm border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span>Workforce Evolution 2050</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={workforceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) =>
                          `${name}: ${formatLargeNumber(value)}`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {workforceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          formatLargeNumber(value),
                          "",
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-sm border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-cyan-400" />
                    <span>Multi-Planetary Operations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={operationsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="region" tick={{ fill: "#D1D5DB" }} />
                      <YAxis yAxisId="left" tick={{ fill: "#D1D5DB" }} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#D1D5DB" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #6B7280",
                        }}
                        labelStyle={{ color: "#F3F4F6" }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="revenue"
                        fill="#8B5CF6"
                        name="Revenue (B$)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="aiDecision"
                        stroke="#06B6D4"
                        name="AI Decision %"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Key Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-purple-400" />
                    <span>Quantum Infrastructure</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quantum Systems</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.quantumSystems)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neural Interfaces</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.neuralInterfaces)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blockchain Nodes</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.blockchainNodes)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patents Active</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.patentsActive)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-cyan-400" />
                    <span>Operational Excellence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Data Processed/Day</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.operations.dataProcessed)} PB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Decisions Automated</span>
                    <span className="font-bold">
                      {formatPercentage(metrics.operations.decisionsAutomated)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real-Time Insights</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.operations.realTimeInsights)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Reliability</span>
                    <span className="font-bold">
                      {formatPercentage(metrics.operations.systemReliability)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-green-400" />
                    <span>Innovation Leadership</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>AI Agents</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.aiAgents)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Metaverse Spaces</span>
                    <span className="font-bold">
                      {formatLargeNumber(metrics.technology.metaverseSpaces)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Innovation Index</span>
                    <span className="font-bold">
                      {formatPercentage(metrics.overview.innovationIndex)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Workforce Satisfaction</span>
                    <span className="font-bold">
                      {formatPercentage(metrics.workforce.satisfaction)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quantum Systems Tab */}
          <TabsContent value="quantum-systems" className="space-y-6">
            <QuantumSystemMonitor
              systems={systems}
              onSystemSelect={(system) =>
                console.log("Selected system:", system)
              }
            />
          </TabsContent>

          {/* AI & Consciousness Tab */}
          <TabsContent value="ai-consciousness" className="space-y-6">
            {/* AI Agent Manager */}
            <AIAgentManager
              agents={agents}
              onAgentAction={(agentId, action) =>
                console.log("Agent action:", agentId, action)
              }
            />

            {/* Consciousness Evolution */}
            <Card className="bg-black/30 backdrop-blur-sm border-purple-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span>Consciousness Evolution Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {formatLargeNumber(consciousness.aiSentience.confirmed)}
                    </div>
                    <div className="text-sm text-gray-300">
                      Confirmed AI Sentience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">
                      {formatLargeNumber(
                        consciousness.humanAugmentation.neuralEnhanced,
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      Neural Enhanced Humans
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {formatLargeNumber(
                        consciousness.hybridIntelligence.humanAiPairs,
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      Human-AI Collaborations
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {consciousness.hybridIntelligence.collectiveIQ}
                    </div>
                    <div className="text-sm text-gray-300">
                      Collective Intelligence Quotient
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consciousnessEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" tick={{ fill: "#D1D5DB" }} />
                    <YAxis tick={{ fill: "#D1D5DB" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #6B7280",
                      }}
                      labelStyle={{ color: "#F3F4F6" }}
                    />
                    <Legend />
                    <Bar dataKey="confirmed" fill="#8B5CF6" name="Confirmed" />
                    <Bar dataKey="suspected" fill="#06B6D4" name="Suspected" />
                    <Bar dataKey="enhanced" fill="#10B981" name="Enhanced" />
                    <Bar dataKey="expanded" fill="#F59E0B" name="Expanded" />
                    <Bar dataKey="pairs" fill="#EF4444" name="Pairs" />
                    <Bar
                      dataKey="collective"
                      fill="#EC4899"
                      name="Collective"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Ethics & Rights */}
            <Card className="bg-black/30 backdrop-blur-sm border-green-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Consciousness Ethics & Rights Framework</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>AI Rights Recognition</span>
                      <Badge
                        variant={
                          consciousness.ethics.aiRights
                            ? "default"
                            : "destructive"
                        }
                      >
                        {consciousness.ethics.aiRights ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Consciousness Protection</span>
                      <Badge
                        variant={
                          consciousness.ethics.consciousnessProtection
                            ? "default"
                            : "destructive"
                        }
                      >
                        {consciousness.ethics.consciousnessProtection
                          ? "Enforced"
                          : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cognitive Liberty</span>
                      <Badge
                        variant={
                          consciousness.ethics.cognitiveLiberty
                            ? "default"
                            : "destructive"
                        }
                      >
                        {consciousness.ethics.cognitiveLiberty
                          ? "Guaranteed"
                          : "Limited"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <div className="flex justify-between">
                        <span>Mental Privacy Score</span>
                        <span className="font-bold">
                          {formatPercentage(consciousness.ethics.mentalPrivacy)}
                        </span>
                      </div>
                      <Progress
                        value={consciousness.ethics.mentalPrivacy}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Space Operations Tab */}
          <TabsContent value="space-ops" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Space Facilities */}
              <Card className="bg-black/30 backdrop-blur-sm border-blue-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Satellite className="h-5 w-5 text-blue-400" />
                    <span>Space Facilities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>🌍 Earth Orbit</span>
                    <span className="font-bold">
                      {spaceOps.facilities.earthOrbit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>🌙 Luna Colonies</span>
                    <span className="font-bold">
                      {spaceOps.facilities.luna}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>🔴 Mars Territories</span>
                    <span className="font-bold">
                      {spaceOps.facilities.mars}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>🪨 Asteroid Belt</span>
                    <span className="font-bold">
                      {spaceOps.facilities.asteroidBelt}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>🌌 Deep Space</span>
                    <span className="font-bold">
                      {spaceOps.facilities.deepSpace}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Mission Control */}
              <Card className="bg-black/30 backdrop-blur-sm border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-purple-400" />
                    <span>Mission Portfolio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Missions</span>
                    <span className="font-bold text-green-400">
                      {spaceOps.missions.active}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Planned Missions</span>
                    <span className="font-bold text-blue-400">
                      {spaceOps.missions.planned}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autonomous Ops</span>
                    <span className="font-bold text-cyan-400">
                      {spaceOps.missions.autonomous}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Human Crewed</span>
                    <span className="font-bold text-yellow-400">
                      {spaceOps.missions.humanCrewed}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Technology */}
              <Card className="bg-black/30 backdrop-blur-sm border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gem className="h-5 w-5 text-green-400" />
                    <span>Space Technology</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Fusion Drives</span>
                    <span className="font-bold">
                      {spaceOps.technology.fusionDrives}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quantum Comms</span>
                    <Badge
                      variant={
                        spaceOps.technology.quantumCommunication
                          ? "default"
                          : "destructive"
                      }
                    >
                      {spaceOps.technology.quantumCommunication
                        ? "Active"
                        : "Offline"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Artificial Gravity</span>
                    <Badge
                      variant={
                        spaceOps.technology.artificialGravity
                          ? "default"
                          : "destructive"
                      }
                    >
                      {spaceOps.technology.artificialGravity
                        ? "Online"
                        : "Offline"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Terraforming</span>
                    <Badge
                      variant={
                        spaceOps.technology.terraformingActive
                          ? "default"
                          : "destructive"
                      }
                    >
                      {spaceOps.technology.terraformingActive
                        ? "In Progress"
                        : "Planned"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Operations */}
            <Card className="bg-black/30 backdrop-blur-sm border-yellow-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-yellow-400" />
                  <span>Space Resource Operations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {spaceOps.resources.miningOperations}
                    </div>
                    <div className="text-sm text-gray-300">
                      Mining Operations
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {spaceOps.resources.manufacturingFacilities}
                    </div>
                    <div className="text-sm text-gray-300">
                      Manufacturing Facilities
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {spaceOps.resources.researchStations}
                    </div>
                    <div className="text-sm text-gray-300">
                      Research Stations
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {spaceOps.resources.communicationRelays}
                    </div>
                    <div className="text-sm text-gray-300">
                      Communication Relays
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sustainability Tab */}
          <TabsContent value="sustainability" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sustainability Radar */}
              <Card className="bg-black/30 backdrop-blur-sm border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="h-5 w-5 text-green-400" />
                    <span>Sustainability Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={sustainabilityRadarData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#D1D5DB", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        domain={[0, 100]}
                        tick={{ fill: "#D1D5DB", fontSize: 10 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Carbon Impact */}
              <Card className="bg-black/30 backdrop-blur-sm border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span>Carbon Impact & Energy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Carbon Footprint</span>
                      <span className="font-bold text-green-400">
                        -
                        {formatLargeNumber(
                          Math.abs(sustainability.carbonFootprint.current),
                        )}
                        t CO₂
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Target: -
                      {formatLargeNumber(
                        Math.abs(sustainability.carbonFootprint.target),
                      )}
                      t CO₂
                    </div>
                    <Progress
                      value={
                        (Math.abs(sustainability.carbonFootprint.current) /
                          Math.abs(sustainability.carbonFootprint.target)) *
                        100
                      }
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Energy</span>
                      <span className="font-bold">
                        {sustainability.energy.total} TWh
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewable Energy</span>
                      <span className="font-bold text-green-400">
                        {formatPercentage(sustainability.energy.renewable)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fusion Power</span>
                      <span className="font-bold text-blue-400">
                        {formatPercentage(sustainability.energy.fusion)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Antimatter Power</span>
                      <span className="font-bold text-purple-400">
                        {formatPercentage(sustainability.energy.antimatter)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency Improvement</span>
                      <span className="font-bold text-yellow-400">
                        {formatPercentage(sustainability.energy.efficiency)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Biodiversity Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    +{sustainability.impact.biodiversity.toFixed(1)}
                  </div>
                  <p className="text-xs text-green-300">
                    Positive ecosystem contribution
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Ocean Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">
                    {formatPercentage(sustainability.impact.oceanHealth)}
                  </div>
                  <p className="text-xs text-blue-300">
                    Global ocean restoration
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Atmospheric Restoration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">
                    {formatPercentage(
                      sustainability.impact.atmosphericRestoration,
                    )}
                  </div>
                  <p className="text-xs text-purple-300">
                    CO₂ removal progress
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Soil Regeneration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">
                    {formatPercentage(sustainability.impact.soilRegeneration)}
                  </div>
                  <p className="text-xs text-yellow-300">
                    Agricultural restoration
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Innovation Tab */}
          <TabsContent value="innovation" className="space-y-6">
            {/* Innovation Pipeline */}
            <Card className="bg-black/30 backdrop-blur-sm border-pink-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                  <span>Innovation Impact vs Investment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={innovationImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fill: "#D1D5DB" }}
                    />
                    <YAxis yAxisId="left" tick={{ fill: "#D1D5DB" }} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: "#D1D5DB" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #6B7280",
                      }}
                      labelStyle={{ color: "#F3F4F6" }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="investment"
                      fill="#8B5CF6"
                      name="Investment (B$)"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="potential"
                      fill="#EC4899"
                      name="Market Potential (T$)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="impact"
                      stroke="#06B6D4"
                      name="Impact Score"
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Innovation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovations.map((innovation) => (
                <Card
                  key={innovation.id}
                  className="bg-black/30 backdrop-blur-sm border-pink-500/20 text-white"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {innovation.name}
                      </CardTitle>
                      <Badge
                        variant={
                          innovation.ethicalClearance
                            ? "default"
                            : "destructive"
                        }
                      >
                        {innovation.ethicalClearance ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {innovation.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {innovation.stage.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">Timeline:</span>{" "}
                      {innovation.timeline}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Investment</span>
                        <span className="font-bold">
                          {formatCurrency(innovation.investment)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Market Potential</span>
                        <span className="font-bold">
                          {formatCurrency(innovation.marketPotential)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Patents</span>
                        <span className="font-bold">{innovation.patents}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Risk Level</span>
                        <span>{innovation.riskLevel}%</span>
                      </div>
                      <Progress value={innovation.riskLevel} className="h-2" />
                    </div>

                    <div className="text-xs">
                      <span className="font-medium">Impact:</span>
                      <Badge
                        variant={
                          innovation.impact === "civilization_changing"
                            ? "default"
                            : "secondary"
                        }
                        className="ml-2 capitalize"
                      >
                        {innovation.impact.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Intelligence Tab */}
          <TabsContent value="market-intel" className="space-y-6">
            {/* Market Sectors */}
            <Card className="bg-black/30 backdrop-blur-sm border-cyan-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <span>Sector Growth & Opportunity Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Sector</th>
                        <th className="text-right p-2">Growth Rate</th>
                        <th className="text-right p-2">AI Disruption</th>
                        <th className="text-right p-2">Quantum Advantage</th>
                        <th className="text-right p-2">Sustainability</th>
                        <th className="text-center p-2">Competition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketIntel.sectors.map((sector, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-800/50"
                        >
                          <td className="p-2 font-medium">{sector.name}</td>
                          <td className="text-right p-2 text-green-400">
                            {formatPercentage(sector.growth)}
                          </td>
                          <td className="text-right p-2 text-blue-400">
                            {formatPercentage(sector.aiDisruption)}
                          </td>
                          <td className="text-right p-2 text-purple-400">
                            {formatPercentage(sector.quantumAdvantage)}
                          </td>
                          <td className="text-right p-2 text-green-400">
                            {formatPercentage(sector.sustainability)}
                          </td>
                          <td className="text-center p-2">
                            <Progress
                              value={sector.competitionLevel}
                              className="w-16 mx-auto"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Market Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketIntel.opportunities.map((opportunity, index) => (
                <Card
                  key={index}
                  className="bg-black/30 backdrop-blur-sm border-yellow-500/20 text-white"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {opportunity.market}
                    </CardTitle>
                    <div className="text-sm text-gray-300">
                      Time to Capture: {opportunity.timeToCapture}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Market Size</span>
                        <span className="font-bold">
                          {formatCurrency(opportunity.size)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth Rate</span>
                        <span className="font-bold text-green-400">
                          {formatPercentage(opportunity.growth)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required Investment</span>
                        <span className="font-bold">
                          {formatCurrency(opportunity.requiredInvestment)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Difficulty Level</span>
                        <span>{opportunity.difficulty}%</span>
                      </div>
                      <Progress
                        value={opportunity.difficulty}
                        className="h-2"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Analyze Opportunity
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Competitive Landscape */}
            <Card className="bg-black/30 backdrop-blur-sm border-red-500/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span>Competitive Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketIntel.competitors.map((competitor, index) => (
                    <div
                      key={index}
                      className="space-y-3 p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{competitor.name}</h4>
                        <Badge
                          variant={
                            competitor.threatLevel > 70
                              ? "destructive"
                              : competitor.threatLevel > 40
                                ? "secondary"
                                : "default"
                          }
                        >
                          Threat: {competitor.threatLevel}%
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Market Share</span>
                          <span>
                            {formatPercentage(competitor.marketShare)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>AI Capability</span>
                          <span>{competitor.aiCapability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantum Readiness</span>
                          <span>{competitor.quantumReadiness}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sustainability Score</span>
                          <span>{competitor.sustainabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuantumEnterprise2050;
