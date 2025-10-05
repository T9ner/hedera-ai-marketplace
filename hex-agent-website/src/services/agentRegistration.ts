import { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';

export interface AgentRegistrationData {
  name: string;
  description: string;
  category: string;
  pricing: {
    model: string;
    amount: string;
    currency: string;
  };
  capabilities: Array<{
    name: string;
    description: string;
  }>;
  endpoint: string;
  version: string;
  tags: string[];
  documentation?: string;
  supportEmail: string;
  owner: string;
  createdAt: string;
  status: string;
}

export class AgentRegistrationService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Register a new AI agent on Hedera
   */
  async registerAgent(agentData: AgentRegistrationData): Promise<{
    success: boolean;
    agentId?: string;
    inboundTopicId?: string;
    outboundTopicId?: string;
    registryTopicId?: string;
    error?: string;
  }> {
    try {
      // 1. Create HCS topics for the agent
      const inboundTopic = await this.createTopic(`${agentData.name} - Inbound`);
      const outboundTopic = await this.createTopic(`${agentData.name} - Outbound`);
      
      // 2. Generate agent ID
      const agentId = `${inboundTopic}@${agentData.owner}`;
      
      // 3. Create agent metadata following HSC-10 standard
      const agentMetadata = {
        standard: "HSC-10",
        version: "1.0",
        agentId,
        name: agentData.name,
        description: agentData.description,
        category: agentData.category,
        owner: agentData.owner,
        version: agentData.version,
        capabilities: agentData.capabilities,
        pricing: agentData.pricing,
        topics: {
          inbound: inboundTopic,
          outbound: outboundTopic
        },
        endpoint: agentData.endpoint,
        tags: agentData.tags,
        documentation: agentData.documentation,
        supportEmail: agentData.supportEmail,
        createdAt: agentData.createdAt,
        status: agentData.status
      };

      // 4. Submit to registry topic (using a global registry topic)
      const registryTopicId = process.env.REACT_APP_REGISTRY_TOPIC_ID || '0.0.123456';
      await this.submitToRegistry(registryTopicId, agentMetadata);

      return {
        success: true,
        agentId,
        inboundTopicId: inboundTopic,
        outboundTopicId: outboundTopic,
        registryTopicId
      };

    } catch (error: any) {
      console.error('Agent registration failed:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  }

  /**
   * Create a new HCS topic
   */
  private async createTopic(memo: string): Promise<string> {
    const transaction = new TopicCreateTransaction()
      .setTopicMemo(memo);

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);
    
    if (!receipt.topicId) {
      throw new Error('Failed to create topic');
    }

    return receipt.topicId.toString();
  }

  /**
   * Submit agent metadata to registry topic
   */
  private async submitToRegistry(topicId: string, metadata: any): Promise<void> {
    const message = JSON.stringify(metadata);
    
    const transaction = new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(message);

    await transaction.execute(this.client);
  }

  /**
   * Validate agent data before registration
   */
  static validateAgentData(data: Partial<AgentRegistrationData>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!data.name?.trim()) {
      errors.push('Agent name is required');
    }

    if (!data.description?.trim()) {
      errors.push('Agent description is required');
    }

    if (!data.category) {
      errors.push('Agent category is required');
    }

    if (!data.pricing?.amount || isNaN(Number(data.pricing.amount))) {
      errors.push('Valid pricing amount is required');
    }

    if (!data.capabilities?.length || !data.capabilities.some(cap => cap.name && cap.description)) {
      errors.push('At least one capability is required');
    }

    if (!data.endpoint?.trim()) {
      errors.push('API endpoint is required');
    }

    if (!data.supportEmail?.trim() || !data.supportEmail.includes('@')) {
      errors.push('Valid support email is required');
    }

    if (!data.owner?.trim()) {
      errors.push('Owner address is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get agent registration status
   */
  async getRegistrationStatus(agentId: string): Promise<{
    status: 'pending' | 'approved' | 'rejected' | 'not_found';
    message?: string;
  }> {
    // This would typically query the registry topic or a mirror node
    // For now, return a mock status
    return {
      status: 'pending',
      message: 'Agent registration is under review'
    };
  }
}

// Helper function to create registration service
export const createAgentRegistrationService = (client: Client): AgentRegistrationService => {
  return new AgentRegistrationService(client);
};