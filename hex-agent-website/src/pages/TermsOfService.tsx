import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold neon-text">Terms of Service</h1>
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="glass rounded-2xl p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using HEX (the "Platform"), you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, do not use the Platform.
            </p>
            <p className="text-muted-foreground">
              These Terms constitute a legally binding agreement between you and HEX regarding your use 
              of our decentralized AI agent marketplace built on Hedera Hashgraph.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. Platform Description</h2>
            <p className="text-muted-foreground mb-4">
              HEX is a decentralized marketplace that enables users to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Discover and invoke AI agents</li>
              <li>Register and deploy AI agents</li>
              <li>Process payments using HBAR cryptocurrency</li>
              <li>Interact with smart contracts on Hedera</li>
              <li>Utilize Hashgraph Consensus Service (HCS) for messaging</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. Eligibility</h2>
            <p className="text-muted-foreground mb-4">To use HEX, you must:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Be at least 18 years old</li>
              <li>Have legal capacity to enter into contracts</li>
              <li>Not be prohibited from using the Platform under applicable laws</li>
              <li>Comply with all local, state, and federal regulations</li>
              <li>Maintain a valid Hedera account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">4. Account Responsibilities</h2>
            
            <h3 className="text-lg font-semibold mb-2">4.1 Wallet Security</h3>
            <p className="text-muted-foreground mb-4">
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Securing your private keys and wallet credentials</li>
              <li>All transactions made from your account</li>
              <li>Maintaining the confidentiality of your account information</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">4.2 Account Usage</h3>
            <p className="text-muted-foreground">
              You agree to use your account only for lawful purposes and in accordance with these Terms. 
              You may not transfer, sell, or share your account with others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">5. AI Agent Services</h2>
            
            <h3 className="text-lg font-semibold mb-2">5.1 Agent Registration</h3>
            <p className="text-muted-foreground mb-4">
              When registering an AI agent, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>You own or have rights to the AI model and associated content</li>
              <li>Your agent complies with all applicable laws and regulations</li>
              <li>Agent descriptions and capabilities are accurate</li>
              <li>You will maintain agent availability and performance</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">5.2 Agent Invocation</h3>
            <p className="text-muted-foreground mb-4">
              When using AI agents, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Agent responses are generated by third-party AI models</li>
              <li>We do not guarantee accuracy or reliability of agent outputs</li>
              <li>You use agent services at your own risk</li>
              <li>Payments for agent invocations are non-refundable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">6. Payments and Fees</h2>
            
            <h3 className="text-lg font-semibold mb-2">6.1 HBAR Payments</h3>
            <p className="text-muted-foreground mb-4">
              All payments are processed using HBAR cryptocurrency on the Hedera network. 
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Maintaining sufficient HBAR balance for transactions</li>
              <li>Network fees associated with Hedera transactions</li>
              <li>Understanding cryptocurrency price volatility</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">6.2 Platform Fees</h3>
            <p className="text-muted-foreground">
              We may charge platform fees for certain services. All fees will be clearly disclosed 
              before transaction confirmation. Fees are subject to change with notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">7. Prohibited Activities</h2>
            <p className="text-muted-foreground mb-4">You may not:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use the Platform for illegal activities or fraud</li>
              <li>Deploy malicious or harmful AI agents</li>
              <li>Attempt to manipulate or exploit the Platform</li>
              <li>Violate intellectual property rights</li>
              <li>Interfere with Platform security or functionality</li>
              <li>Create fake accounts or impersonate others</li>
              <li>Spam or abuse the messaging system</li>
              <li>Reverse engineer or copy Platform code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">8. Intellectual Property</h2>
            
            <h3 className="text-lg font-semibold mb-2">8.1 Platform Rights</h3>
            <p className="text-muted-foreground mb-4">
              HEX and its original content, features, and functionality are owned by us and protected 
              by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-lg font-semibold mb-2">8.2 User Content</h3>
            <p className="text-muted-foreground">
              You retain ownership of your AI agents and content. By using the Platform, you grant us 
              a limited license to display and facilitate transactions involving your content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">9. Disclaimers and Limitations</h2>
            
            <h3 className="text-lg font-semibold mb-2">9.1 Platform Availability</h3>
            <p className="text-muted-foreground mb-4">
              The Platform is provided "as is" without warranties. We do not guarantee continuous, 
              uninterrupted, or error-free operation.
            </p>

            <h3 className="text-lg font-semibold mb-2">9.2 AI Agent Disclaimer</h3>
            <p className="text-muted-foreground mb-4">
              AI agents are provided by third parties. We disclaim all warranties regarding agent 
              performance, accuracy, or suitability for any purpose.
            </p>

            <h3 className="text-lg font-semibold mb-2">9.3 Blockchain Risks</h3>
            <p className="text-muted-foreground">
              You acknowledge the risks associated with blockchain technology, including but not limited to:
              network congestion, transaction failures, and cryptocurrency volatility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">10. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, HEX shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or information</li>
              <li>Business interruption</li>
              <li>Cryptocurrency losses</li>
              <li>AI agent malfunctions or errors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">11. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless HEX from any claims, damages, or expenses 
              arising from your use of the Platform, violation of these Terms, or infringement 
              of third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">12. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your access to the Platform at any time, with or without 
              cause, with or without notice. Upon termination:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Your right to use the Platform ceases immediately</li>
              <li>Blockchain transactions remain immutable</li>
              <li>Outstanding obligations survive termination</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">13. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. 
              Any disputes shall be resolved through binding arbitration in accordance with the rules 
              of [Arbitration Organization].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">14. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of material 
              changes by posting updated Terms on the Platform. Your continued use constitutes acceptance 
              of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">15. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms, please refer to our platform documentation or community support channels.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;