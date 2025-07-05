
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { useAuth } from '@/components/auth/AuthProvider';
import type {
  InteractionSession,
  MLExperiment,
  BlockchainInnovation,
  KnowledgeNode,
  InnovationItem,
  SecurityProtocol,
  AnalyticsEngine,
  CommunicationChannel,
  BiometricAnalysisRequest,
  InsightGenerationRequest,
  CollaborationRequest,
  PredictiveAnalyticsRequest
} from '@/types/api';

// Production-level interaction hooks
export const useInteractionSessions = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['interaction-sessions', user?.id],
    queryFn: async () => {
      const response = await apiClient.callEdgeFunction('INTERACTION_ANALYTICS', { path: 'sessions' });
      return (response as any)?.sessions as InteractionSession[] || [];
    },
    enabled: !!user,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};

export const useCreateInteractionSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sessionData: {
      session_type: string;
      workspace_id?: string;
      interaction_data?: any;
      biometric_data?: any;
    }) => {
      return apiClient.createInteractionSession(sessionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interaction-sessions'] });
    }
  });
};

export const useBiometricAnalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: BiometricAnalysisRequest) => {
      return apiClient.callEdgeFunction('INTERACTION_ANALYTICS', {
        path: 'process-biometric',
        ...data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interaction-sessions'] });
    }
  });
};

// AI/ML Production Hooks
export const useMLExperiments = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['ml-experiments', user?.id],
    queryFn: async () => {
      const response = await apiClient.request('/api/ml/experiments');
      return response as MLExperiment[];
    },
    enabled: !!user,
    staleTime: 120000, // 2 minutes
  });
};

export const useCreateMLExperiment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (experimentData: {
      model_id: string;
      experiment_name: string;
      hypothesis: string;
      parameters: any;
    }) => {
      return apiClient.createMLExperiment(experimentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ml-experiments'] });
    }
  });
};

// Blockchain Production Hooks
export const useBlockchainInnovations = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['blockchain-innovations', user?.id],
    queryFn: async () => {
      const response = await apiClient.request('/api/blockchain/innovations');
      return response as BlockchainInnovation[];
    },
    enabled: !!user,
    staleTime: 180000, // 3 minutes
  });
};

export const useCreateBlockchainInnovation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (innovationData: {
      innovation_name: string;
      category: string;
      technical_specs: any;
      economic_model: any;
    }) => {
      return apiClient.createBlockchainInnovation(innovationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blockchain-innovations'] });
    }
  });
};

// Knowledge Graph Production Hooks
export const useKnowledgeInsights = () => {
  return useMutation({
    mutationFn: async (request: InsightGenerationRequest) => {
      return apiClient.callEdgeFunction('KNOWLEDGE_AI', {
        path: 'generate-insights',
        ...request
      });
    }
  });
};

export const useKnowledgeDiscovery = () => {
  return useMutation({
    mutationFn: async (nodeIds: string[]) => {
      return apiClient.callEdgeFunction('KNOWLEDGE_AI', {
        path: 'discover-connections',
        node_ids: nodeIds
      });
    }
  });
};

export const useTrendingTopics = () => {
  return useQuery({
    queryKey: ['trending-topics'],
    queryFn: async () => {
      return apiClient.callEdgeFunction('KNOWLEDGE_AI', { path: 'trending-topics' });
    },
    staleTime: 300000, // 5 minutes
    refetchInterval: 600000, // 10 minutes
  });
};

// Innovation Orchestration Hooks
export const useCollaborationOrchestration = () => {
  return useMutation({
    mutationFn: async (request: CollaborationRequest) => {
      return apiClient.callEdgeFunction('INNOVATION_ORCHESTRATOR', {
        path: 'orchestrate-collaboration',
        ...request
      });
    }
  });
};

export const useInnovationPrediction = () => {
  return useMutation({
    mutationFn: async (innovationData: any) => {
      return apiClient.callEdgeFunction('INNOVATION_ORCHESTRATOR', {
        path: 'predict-innovation-success',
        innovation_data: innovationData
      });
    }
  });
};

export const useInnovationMetrics = () => {
  return useQuery({
    queryKey: ['innovation-metrics'],
    queryFn: async () => {
      return apiClient.callEdgeFunction('INNOVATION_ORCHESTRATOR', { path: 'innovation-metrics' });
    },
    staleTime: 600000, // 10 minutes
    refetchInterval: 900000, // 15 minutes
  });
};

// Real-time Analytics Hooks
export const usePredictiveAnalytics = () => {
  return useMutation({
    mutationFn: async (request: PredictiveAnalyticsRequest) => {
      return apiClient.generatePredictiveAnalytics(request);
    }
  });
};

export const useRealtimeAnalytics = (engineId: string) => {
  return useQuery({
    queryKey: ['realtime-analytics', engineId],
    queryFn: async () => {
      return apiClient.getRealtimeAnalytics(engineId);
    },
    enabled: !!engineId,
    staleTime: 10000, // 10 seconds
    refetchInterval: 30000, // 30 seconds
  });
};

// Security & Compliance Hooks
export const useSecurityAudit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (protocolId: string) => {
      return apiClient.runSecurityAudit(protocolId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-protocols'] });
    }
  });
};

export const useSecurityIncidentReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (incidentData: {
      type: string;
      severity: string;
      description: string;
      affected_systems: string[];
    }) => {
      return apiClient.reportSecurityIncident(incidentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-incidents'] });
    }
  });
};

// Advanced Communication Hooks
export const useHolographicMeeting = () => {
  return useMutation({
    mutationFn: async (meetingData: {
      title: string;
      participants: string[];
      holographic_settings: any;
    }) => {
      return apiClient.createHolographicMeeting(meetingData);
    }
  });
};

export const useMessageTranslation = () => {
  return useMutation({
    mutationFn: async (data: {
      text: string;
      source_language: string;
      target_language: string;
    }) => {
      return apiClient.translateMessage(data);
    }
  });
};

// Voice and Gesture Controls
export const useVoiceCommand = () => {
  return useMutation({
    mutationFn: async (command: { text: string; audio_data?: string }) => {
      return apiClient.sendVoiceCommand(command);
    }
  });
};

export const useGestureControl = () => {
  return useMutation({
    mutationFn: async (gestureData: { 
      type: string; 
      coordinates: number[]; 
      confidence: number 
    }) => {
      return apiClient.processGesture(gestureData);
    }
  });
};
