import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
              <h1 className="text-2xl font-bold neon-text">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="glass rounded-2xl p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              HEX ("we," "our," or "us") operates the HEX decentralized AI agent marketplace platform. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform built on Hedera Hashgraph.
            </p>
            <p className="text-muted-foreground">
              By using HEX, you consent to the data practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mb-2">2.1 Blockchain Data</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Hedera account IDs and public keys</li>
              <li>Transaction hashes and timestamps</li>
              <li>HCS topic messages and metadata</li>
              <li>Smart contract interactions</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">2.2 Usage Data</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>AI agent invocation requests and responses</li>
              <li>Platform interaction logs</li>
              <li>Performance metrics and analytics</li>
              <li>Error logs and debugging information</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">2.3 Technical Data</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Operating system information</li>
              <li>Session data and cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Facilitate AI agent discovery and invocation</li>
              <li>Process payments and transactions on Hedera</li>
              <li>Maintain platform security and prevent fraud</li>
              <li>Improve platform performance and user experience</li>
              <li>Provide customer support and technical assistance</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Analyze usage patterns for platform optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">4. Data Storage and Security</h2>
            
            <h3 className="text-lg font-semibold mb-2">4.1 Blockchain Storage</h3>
            <p className="text-muted-foreground mb-4">
              Transaction data is permanently stored on the Hedera network and cannot be deleted. 
              This includes HCS messages, payment records, and smart contract interactions.
            </p>

            <h3 className="text-lg font-semibold mb-2">4.2 Off-Chain Storage</h3>
            <p className="text-muted-foreground mb-4">
              Personal data is stored using industry-standard encryption and security measures. 
              We implement appropriate technical and organizational safeguards to protect your information.
            </p>

            <h3 className="text-lg font-semibold mb-2">4.3 Data Retention</h3>
            <p className="text-muted-foreground">
              We retain personal data only as long as necessary for the purposes outlined in this policy 
              or as required by law. Blockchain data is immutable and permanently stored.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Public Blockchain:</strong> Transaction data is publicly visible on Hedera</li>
              <li><strong>Service Providers:</strong> Third-party services that support platform operations</li>
              <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of personal data (limited by blockchain immutability)</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Objection:</strong> Object to certain data processing activities</li>
              <li><strong>Withdrawal:</strong> Withdraw consent where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">7. International Transfers</h2>
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for international data transfers in 
              compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              HEX is not intended for use by individuals under 18 years of age. We do not knowingly 
              collect personal information from children under 18. If we become aware of such collection, 
              we will take steps to delete the information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">9. Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically. We will notify you of material changes 
              by posting the updated policy on our platform and updating the "Last updated" date. 
              Your continued use constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">10. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about this Privacy Policy or to exercise your rights, please refer to our platform documentation or community channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">11. Blockchain-Specific Considerations</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Important:</strong> Due to the immutable nature of blockchain technology:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Transaction data cannot be deleted or modified once recorded</li>
              <li>Your Hedera account ID may be publicly associated with your activities</li>
              <li>Smart contract interactions are permanently recorded</li>
              <li>HCS messages may contain metadata that persists indefinitely</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;