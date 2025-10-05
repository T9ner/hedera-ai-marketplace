// Simple agent storage service using localStorage
// In production, this would be replaced with a proper backend/database

export interface StoredAgent {
  id: string;
  name: string;
  description: string;
  agentId: string;
  inboundTopic: string;
  outboundTopic: string;
  capabilities: Array<{
    name: string;
    description: string;
  }>;
  pricing: {
    model: string;
    amount: number;
    currency: string;
  };
  category: string;
  owner: string;
  rating: number;
  invocations: number;
  version: string;
  isLive: boolean;
  tags: string[];
  documentation?: string;
  supportEmail: string;
  createdAt: string;
  status: string;
}

class AgentStorageService {
  private readonly STORAGE_KEY = 'hex_registered_agents';

  /**
   * Save a newly registered agent
   */
  saveAgent(agentData: any): StoredAgent {
    const agents = this.getAllAgents();
    
    // Generate unique ID
    const id = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create stored agent object
    const storedAgent: StoredAgent = {
      id,
      name: agentData.name,
      description: agentData.description,
      agentId: agentData.agentId || `0.0.${Math.floor(Math.random() * 1000000)}@${agentData.owner}`,
      inboundTopic: agentData.inboundTopic || `0.0.${Math.floor(Math.random() * 1000000)}`,
      outboundTopic: agentData.outboundTopic || `0.0.${Math.floor(Math.random() * 1000000)}`,
      capabilities: agentData.capabilities || [],
      pricing: {
        model: agentData.pricing.model,
        amount: parseFloat(agentData.pricing.amount),
        currency: agentData.pricing.currency
      },
      category: agentData.category,
      owner: agentData.owner,
      rating: 5.0, // New agents start with perfect rating
      invocations: 0,
      version: agentData.version || '1.0.0',
      isLive: agentData.isLive || false,
      tags: agentData.tags || [],
      documentation: agentData.documentation,
      supportEmail: agentData.supportEmail,
      createdAt: agentData.createdAt || new Date().toISOString(),
      status: agentData.status || 'active'
    };

    // Add to storage
    agents.push(storedAgent);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agents));
    
    return storedAgent;
  }

  /**
   * Get all registered agents
   */
  getAllAgents(): StoredAgent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading agents from storage:', error);
      return [];
    }
  }

  /**
   * Get agent by ID
   */
  getAgentById(id: string): StoredAgent | null {
    const agents = this.getAllAgents();
    return agents.find(agent => agent.id === id) || null;
  }

  /**
   * Update agent invocation count
   */
  incrementInvocations(agentId: string): void {
    const agents = this.getAllAgents();
    const agentIndex = agents.findIndex(agent => agent.agentId === agentId);
    
    if (agentIndex !== -1) {
      agents[agentIndex].invocations += 1;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agents));
    }
  }

  /**
   * Delete agent (for testing purposes)
   */
  deleteAgent(id: string): boolean {
    const agents = this.getAllAgents();
    const filteredAgents = agents.filter(agent => agent.id !== id);
    
    if (filteredAgents.length !== agents.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredAgents));
      return true;
    }
    
    return false;
  }

  /**
   * Clear all registered agents (for testing purposes)
   */
  clearAllAgents(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Export singleton instance
export const agentStorage = new AgentStorageService();