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
  TreePine,
  Waves,
  Mountain,
  Bird,
  Fish,
  Bug,
  Globe,
  Shield,
  Camera,
  Satellite,
  Brain,
  AlertTriangle,
  TrendingUp,
  Heart,
  Users,
  DollarSign,
  Leaf,
  Target,
  Activity,
  Zap,
  Crown,
  MapPin,
  Eye,
  Database,
  Sparkles,
  CheckCircle,
  Clock,
} from "lucide-react";
import { wildlifeEnterpriseService } from "../services/wildlifeEnterpriseService";
import type {
  WildlifeConservationMetrics,
  BiodiversityData,
  ConservationProject,
  WildlifeMonitoring,
  SustainableFinancing,
  ThreatAssessment,
} from "../types/WildlifeEnterprise";

const WildlifeConservationEnterprise: React.FC = () => {
  const [metrics, setMetrics] = useState<WildlifeConservationMetrics | null>(
    null,
  );
  const [biodiversity, setBiodiversity] = useState<BiodiversityData | null>(
    null,
  );
  const [projects, setProjects] = useState<ConservationProject[]>([]);
  const [monitoring, setMonitoring] = useState<WildlifeMonitoring | null>(null);
  const [financing, setFinancing] = useState<SustainableFinancing | null>(null);
  const [threats, setThreats] = useState<ThreatAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          conservationMetrics,
          biodiversityData,
          conservationProjects,
          wildlifeMonitoring,
          sustainableFinancing,
          threatAssessments,
        ] = await Promise.all([
          wildlifeEnterpriseService.getConservationMetrics(),
          wildlifeEnterpriseService.getBiodiversityData(),
          wildlifeEnterpriseService.getConservationProjects(),
          wildlifeEnterpriseService.getWildlifeMonitoring(),
          wildlifeEnterpriseService.getSustainableFinancing(),
          wildlifeEnterpriseService.getThreatAssessment(),
        ]);

        setMetrics(conservationMetrics);
        setBiodiversity(biodiversityData);
        setProjects(conservationProjects);
        setMonitoring(wildlifeMonitoring);
        setFinancing(sustainableFinancing);
        setThreats(threatAssessments);
      } catch (error) {
        console.error("Failed to load wildlife conservation data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !metrics || !biodiversity || !monitoring || !financing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
            <TreePine className="h-8 w-8 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading Wildlife Conservation Platform...
          </h2>
          <p className="text-green-600 mt-2">
            Connecting to global conservation networks
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    wildlifeEnterpriseService.formatCurrency(value);
  const formatLargeNumber = (value: number) =>
    wildlifeEnterpriseService.formatLargeNumber(value);
  const formatPercentage = (value: number) =>
    wildlifeEnterpriseService.formatPercentage(value);

  const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  // Data transformations for charts
  const ecosystemData = Object.entries(metrics.ecosystems).map(
    ([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      protected: data.protectedArea / 1000000, // Convert to million hectares
      total: data.totalArea / 1000000,
      health: data.healthScore,
      carbon: data.carbonSequestration / 1000000, // Convert to million tons
      protectedPercentage: (data.protectedArea / data.totalArea) * 100,
    }),
  );

  const speciesData = Object.entries(biodiversity.globalSpeciesCount).map(
    ([group, data]) => ({
      group: group.charAt(0).toUpperCase() + group.slice(1),
      total: data.total,
      protected: data.protected,
      threatened: data.threatened,
      recovering: data.recovering,
      protectionRate: (data.protected / data.total) * 100,
    }),
  );

  const conservationStatusData = Object.entries(
    biodiversity.conservationStatus,
  ).map(([status, count]) => ({
    status: status
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    count,
    fill:
      status === "extinct"
        ? "#EF4444"
        : status === "criticallyEndangered"
          ? "#DC2626"
          : status === "endangered"
            ? "#F59E0B"
            : status === "vulnerable"
              ? "#FCD34D"
              : status === "nearThreatened"
                ? "#60A5FA"
                : status === "leastConcern"
                  ? "#10B981"
                  : "#6B7280",
  }));

  const threatLevelData = threats.map((threat) => ({
    name: threat.name.substring(0, 20) + (threat.name.length > 20 ? "..." : ""),
    severity:
      threat.severity === "Critical"
        ? 100
        : threat.severity === "High"
          ? 75
          : threat.severity === "Medium"
            ? 50
            : 25,
    probability: threat.probability,
    impact:
      threat.impact === "Very High"
        ? 100
        : threat.impact === "High"
          ? 75
          : threat.impact === "Medium"
            ? 50
            : 25,
    speciesAtRisk: threat.speciesAtRisk,
  }));

  const projectFundingData = projects.map((project) => ({
    name:
      project.name.substring(0, 15) + (project.name.length > 15 ? "..." : ""),
    budget: project.budget / 1000000,
    raised: project.funding.raised / 1000000,
    fundingRate: (project.funding.raised / project.budget) * 100,
    impact: wildlifeEnterpriseService.calculateConservationImpact(project),
  }));

  const monitoringTechData = [
    {
      technology: "Camera Traps",
      deployed: monitoring.realTimeTracking.cameraTraps,
      accuracy: monitoring.aiAnalytics.speciesIdentificationAccuracy,
    },
    {
      technology: "GPS Collars",
      deployed: monitoring.realTimeTracking.gpsCollars,
      accuracy: monitoring.aiAnalytics.behaviorPredictionAccuracy,
    },
    {
      technology: "Acoustic Sensors",
      deployed: monitoring.realTimeTracking.acousticSensors,
      accuracy: monitoring.aiAnalytics.populationEstimateAccuracy,
    },
    {
      technology: "Satellite Tracking",
      deployed: monitoring.realTimeTracking.satelliteImages,
      accuracy: monitoring.aiAnalytics.migrationPatternAccuracy,
    },
    {
      technology: "Drones",
      deployed: monitoring.realTimeTracking.droneFlights,
      accuracy: monitoring.aiAnalytics.threatDetectionSpeed,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Wildlife Conservation Enterprise
                </h1>
                <p className="text-lg text-gray-600">
                  Global conservation technology, biodiversity protection, and
                  sustainable ecosystem management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className="text-green-600 border-green-600 px-4 py-2 text-lg"
              >
                <Activity className="h-4 w-4 mr-2" />
                Real-Time Conservation Analytics
              </Badge>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-600 px-4 py-2"
              >
                {formatLargeNumber(metrics.overview.totalProtectedSpecies)}{" "}
                Species Protected
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <Crown className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="biodiversity"
              className="flex items-center space-x-2"
            >
              <Bird className="h-4 w-4" />
              <span>Biodiversity</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center space-x-2"
            >
              <Target className="h-4 w-4" />
              <span>Conservation Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Wildlife Monitoring</span>
            </TabsTrigger>
            <TabsTrigger
              value="threats"
              className="flex items-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Threat Assessment</span>
            </TabsTrigger>
            <TabsTrigger
              value="financing"
              className="flex items-center space-x-2"
            >
              <DollarSign className="h-4 w-4" />
              <span>Sustainable Financing</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Protected Species
                  </CardTitle>
                  <TreePine className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(metrics.overview.totalProtectedSpecies)}
                  </div>
                  <p className="text-xs opacity-90">
                    +
                    {formatPercentage(metrics.overview.wildlifePopulationTrend)}{" "}
                    population growth
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Protected Land Area
                  </CardTitle>
                  <Globe className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(metrics.overview.protectedLandArea)} ha
                  </div>
                  <p className="text-xs opacity-90">Across all ecosystems</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <Target className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(
                      metrics.overview.activeConservationProjects,
                    )}
                  </div>
                  <p className="text-xs opacity-90">Conservation initiatives</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Community Engagement
                  </CardTitle>
                  <Users className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(metrics.overview.communityEngagement)}
                  </div>
                  <p className="text-xs opacity-90">People actively involved</p>
                </CardContent>
              </Card>
            </div>

            {/* Ecosystem Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Ecosystem Protection Coverage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={ecosystemData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="protected"
                        fill="#10B981"
                        name="Protected (M ha)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="health"
                        stroke="#EF4444"
                        name="Health Score"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Technology Impact Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>AI Monitoring Systems</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        metrics.technologyImpact.aiMonitoringSystems,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deployed Drones</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        metrics.technologyImpact.dronesDeployed,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sensor Networks</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        metrics.technologyImpact.sensorNetworks,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Daily Data Points</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        metrics.technologyImpact.dataPointsDaily,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Predictive Accuracy</span>
                    <span className="font-bold text-green-600">
                      {formatPercentage(
                        metrics.technologyImpact.predictiveAccuracy,
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ecosystem Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(metrics.ecosystems).map(([ecosystem, data]) => {
                const icons = {
                  forests: TreePine,
                  oceans: Waves,
                  grasslands: Leaf,
                  wetlands: Waves,
                  mountains: Mountain,
                };
                const Icon = icons[ecosystem as keyof typeof icons] || TreePine;

                return (
                  <Card key={ecosystem}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-green-600" />
                        <span className="capitalize">{ecosystem}</span>
                      </CardTitle>
                      <Badge
                        variant={
                          data.threatLevel === "Low"
                            ? "default"
                            : data.threatLevel === "Moderate"
                              ? "secondary"
                              : data.threatLevel === "High"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {data.threatLevel} Threat
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health Score</span>
                          <span className="font-medium">
                            {data.healthScore.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={data.healthScore} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500">Protected Area</div>
                          <div className="font-medium">
                            {formatLargeNumber(data.protectedArea)} ha
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Carbon Storage</div>
                          <div className="font-medium">
                            {formatLargeNumber(data.carbonSequestration)}t
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Key Species
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {data.keySpecies.slice(0, 3).map((species, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {species}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Biodiversity Tab */}
          <TabsContent value="biodiversity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Species Protection Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bird className="h-5 w-5 text-blue-600" />
                    <span>Global Species Protection Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={speciesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="group" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="protected"
                        fill="#10B981"
                        name="Protected"
                      />
                      <Bar
                        dataKey="threatened"
                        fill="#EF4444"
                        name="Threatened"
                      />
                      <Bar
                        dataKey="recovering"
                        fill="#3B82F6"
                        name="Recovering"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Conservation Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span>IUCN Conservation Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={conservationStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ status, count }) =>
                          `${status}: ${formatLargeNumber(count)}`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {conservationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          formatLargeNumber(value),
                          "Species",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Biodiversity Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  <span>Key Biodiversity Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {biodiversity.keyIndicators.livingPlanetIndex}
                    </div>
                    <div className="text-sm text-gray-600">
                      Living Planet Index
                    </div>
                    <Progress
                      value={biodiversity.keyIndicators.livingPlanetIndex}
                      className="mt-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {biodiversity.keyIndicators.oceanHealthIndex}
                    </div>
                    <div className="text-sm text-gray-600">
                      Ocean Health Index
                    </div>
                    <Progress
                      value={biodiversity.keyIndicators.oceanHealthIndex}
                      className="mt-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {formatPercentage(
                        biodiversity.keyIndicators.speciesRecoveryRate,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Species Recovery Rate
                    </div>
                    <Progress
                      value={biodiversity.keyIndicators.speciesRecoveryRate}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habitat Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Habitat Trends Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Habitat Type</th>
                        <th className="text-right p-2">Total Area (ha)</th>
                        <th className="text-right p-2">Annual Trend</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {biodiversity.habitatTrends.map((habitat, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{habitat.habitat}</td>
                          <td className="text-right p-2">
                            {formatLargeNumber(habitat.area)}
                          </td>
                          <td
                            className={`text-right p-2 ${habitat.trend > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {habitat.trend > 0 ? "+" : ""}
                            {habitat.trend.toFixed(1)}%
                          </td>
                          <td className="text-center p-2">
                            <Badge
                              variant={
                                habitat.trend > 0
                                  ? "default"
                                  : habitat.trend > -5
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {habitat.trend > 0
                                ? "Improving"
                                : habitat.trend > -5
                                  ? "Stable"
                                  : "Declining"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conservation Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Project Funding Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Project Funding & Impact Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={projectFundingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="budget"
                      fill="#8B5CF6"
                      name="Budget ($M)"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="raised"
                      fill="#10B981"
                      name="Raised ($M)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="impact"
                      stroke="#EF4444"
                      name="Impact Score"
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Individual Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge
                        variant={
                          project.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Progress</span>
                        <span>
                          {formatCurrency(project.funding.raised)} /{" "}
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <Progress
                        value={(project.funding.raised / project.budget) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500">Species Protected</div>
                        <div className="font-medium">
                          {project.impact.speciesProtected.length}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Habitat Restored</div>
                        <div className="font-medium">
                          {formatLargeNumber(project.impact.habitatRestored)} ha
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Communities Engaged</div>
                        <div className="font-medium">
                          {project.impact.communitiesEngaged}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Jobs Created</div>
                        <div className="font-medium">
                          {formatLargeNumber(project.impact.jobsCreated)}
                        </div>
                      </div>
                    </div>

                    {/* Technology Used */}
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Technology Stack
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technology.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sustainability Score */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sustainability Score</span>
                        <span className="font-medium">
                          {project.sustainabilityScore.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={project.sustainabilityScore}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wildlife Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            {/* Technology Deployment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <span>Monitoring Technology Deployment & Accuracy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={monitoringTechData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="technology" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="deployed"
                      fill="#3B82F6"
                      name="Units Deployed"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#10B981"
                      name="Accuracy %"
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Real-time Monitoring Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Real-Time Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Animals</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.realTimeTracking.activeAnimals,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPS Collars</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.realTimeTracking.gpsCollars,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Camera Traps</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.realTimeTracking.cameraTraps,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acoustic Sensors</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.realTimeTracking.acousticSensors,
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>AI Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Species ID Accuracy</span>
                    <span className="font-bold text-green-600">
                      {formatPercentage(
                        monitoring.aiAnalytics.speciesIdentificationAccuracy,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Behavior Prediction</span>
                    <span className="font-bold text-blue-600">
                      {formatPercentage(
                        monitoring.aiAnalytics.behaviorPredictionAccuracy,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Threat Detection</span>
                    <span className="font-bold text-orange-600">
                      {monitoring.aiAnalytics.threatDetectionSpeed}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Population Estimates</span>
                    <span className="font-bold text-purple-600">
                      {formatPercentage(
                        monitoring.aiAnalytics.populationEstimateAccuracy,
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-cyan-600" />
                    <span>Data Collection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Daily Data Points</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.dataCollection.dailyDataPoints,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images Captured</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.dataCollection.imagesCaptured,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio Recordings</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.dataCollection.audioRecordings,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genetic Samples</span>
                    <span className="font-bold">
                      {formatLargeNumber(
                        monitoring.dataCollection.geneticSamples,
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert Systems */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Conservation Alert Systems</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Immediate Threats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Poaching Alerts</span>
                        <Badge variant="destructive">
                          {monitoring.alertSystems.poachingAlerts}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Human-Wildlife Conflicts</span>
                        <Badge variant="secondary">
                          {monitoring.alertSystems.humanWildlifeConflicts}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Habitat Threats</span>
                        <Badge variant="outline">
                          {monitoring.alertSystems.habitatThreats}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Environmental Changes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Climate Impacts</span>
                        <Badge variant="secondary">
                          {monitoring.alertSystems.climateImpacts}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Migration Changes</span>
                        <Badge variant="outline">
                          {monitoring.alertSystems.migrationChanges}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Disease Outbreaks</span>
                        <Badge
                          variant={
                            monitoring.alertSystems.diseaseOutbreaks > 20
                              ? "destructive"
                              : "default"
                          }
                        >
                          {monitoring.alertSystems.diseaseOutbreaks}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Predictive Models</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Population Forecasts</span>
                        <span className="font-bold text-green-600">
                          {formatPercentage(
                            monitoring.predictiveModels.populationForecasts,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extinction Risk</span>
                        <span className="font-bold text-blue-600">
                          {formatPercentage(
                            monitoring.predictiveModels.extinctionRiskModels,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conservation Effectiveness</span>
                        <span className="font-bold text-purple-600">
                          {formatPercentage(
                            monitoring.predictiveModels
                              .conservationEffectiveness,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Threat Assessment Tab */}
          <TabsContent value="threats" className="space-y-6">
            {/* Threat Analysis Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Global Conservation Threat Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={threatLevelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="severity"
                      fill="#EF4444"
                      name="Severity Score"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="probability"
                      fill="#F59E0B"
                      name="Probability %"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="speciesAtRisk"
                      stroke="#8B5CF6"
                      name="Species at Risk"
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Individual Threat Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {threats.map((threat) => (
                <Card key={threat.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{threat.name}</CardTitle>
                      <Badge
                        variant={
                          threat.severity === "Critical"
                            ? "destructive"
                            : threat.severity === "High"
                              ? "secondary"
                              : threat.severity === "Medium"
                                ? "outline"
                                : "default"
                        }
                      >
                        {threat.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">
                        Impact: {threat.impact}
                      </span>
                      <span className="text-gray-600">
                        Scope: {threat.geographicScope}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Threat Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-sm text-gray-500">Probability</div>
                        <div className="font-bold text-red-600">
                          {threat.probability}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Species at Risk
                        </div>
                        <div className="font-bold">
                          {formatLargeNumber(threat.speciesAtRisk)}
                        </div>
                      </div>
                    </div>

                    {/* Primary Causes */}
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Primary Causes
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {threat.primaryCauses.map((cause, index) => (
                          <Badge
                            key={index}
                            variant="destructive"
                            className="text-xs"
                          >
                            {cause}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Mitigation Strategies */}
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Mitigation Strategies
                      </div>
                      <div className="space-y-1">
                        {threat.mitigation.strategies
                          .slice(0, 3)
                          .map((strategy, index) => (
                            <div key={index} className="text-xs text-gray-600">
                              • {strategy}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Mitigation Effectiveness */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mitigation Effectiveness</span>
                        <span className="font-medium">
                          {formatPercentage(threat.mitigation.effectiveness)}
                        </span>
                      </div>
                      <Progress
                        value={threat.mitigation.effectiveness}
                        className="h-2"
                      />
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            threat.trend === "Improving"
                              ? "bg-green-500"
                              : threat.trend === "Stable"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-xs">Trend: {threat.trend}</span>
                      </div>
                      <Badge
                        variant={
                          threat.urgency === "Critical"
                            ? "destructive"
                            : threat.urgency === "High"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {threat.urgency} Urgency
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sustainable Financing Tab */}
          <TabsContent value="financing" className="space-y-6">
            {/* Funding Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Total Funding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financing.overview.totalFunding)}
                  </div>
                  <p className="text-xs opacity-90">Across all sources</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Carbon Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financing.overview.carbonCredits)}
                  </div>
                  <p className="text-xs opacity-90">
                    Revenue from carbon markets
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Impact Bonds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financing.overview.impactBonds)}
                  </div>
                  <p className="text-xs opacity-90">Outcome-based financing</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardHeader>
                  <CardTitle className="text-sm">Crowdfunding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(financing.overview.crowdfunding)}
                  </div>
                  <p className="text-xs opacity-90">Community contributions</p>
                </CardContent>
              </Card>
            </div>

            {/* Carbon & Biodiversity Markets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Carbon Credit Markets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatLargeNumber(
                          financing.carbonMarkets.creditsGenerated,
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        Credits Generated (tons CO₂)
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${financing.carbonMarkets.averagePrice}
                      </div>
                      <div className="text-sm text-gray-600">
                        Average Price per Ton
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Verification Standard</span>
                      <Badge variant="default">
                        {financing.carbonMarkets.verification}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Additionality Score</span>
                      <span className="font-bold">
                        {formatPercentage(
                          financing.carbonMarkets.additionality,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permanence Score</span>
                      <span className="font-bold">
                        {formatPercentage(financing.carbonMarkets.permanence)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bird className="h-5 w-5 text-purple-600" />
                    <span>Biodiversity Credit Markets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatLargeNumber(
                          financing.biodiversityCredits.creditsIssued,
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        Credits Issued
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ${financing.biodiversityCredits.averagePrice}
                      </div>
                      <div className="text-sm text-gray-600">
                        Average Price per Credit
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Species Benefited</span>
                      <span className="font-bold">
                        {formatLargeNumber(
                          financing.biodiversityCredits.speciesBenefited,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Habitat Restored</span>
                      <span className="font-bold">
                        {formatLargeNumber(
                          financing.biodiversityCredits.habitatRestored,
                        )}{" "}
                        ha
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verification</span>
                      <Badge variant="default">
                        {financing.biodiversityCredits.verificationStandard}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Investment Returns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Impact Investment Returns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPercentage(
                        financing.impactInvestment.returnOnInvestment,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Financial ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {formatPercentage(
                        financing.impactInvestment.socialImpactReturn,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Social Impact Return
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {formatPercentage(
                        financing.impactInvestment.environmentalImpactReturn,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Environmental Return
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {formatLargeNumber(
                        financing.impactInvestment.jobsCreated,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Jobs Created</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ecosystem Services Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span>Payment for Ecosystem Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Watershed Protection</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices
                            .watershedProtection,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbon Sequestration</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices
                            .carbonSequestration,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Biodiversity Conservation</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices
                            .biodiversityConservation,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pollination Services</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices.pollination,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Soil Conservation</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices
                            .soilConservation,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flood Protection</span>
                      <span className="font-bold">
                        {formatCurrency(
                          financing.paymentForEcosystemServices.floodProtection,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WildlifeConservationEnterprise;
