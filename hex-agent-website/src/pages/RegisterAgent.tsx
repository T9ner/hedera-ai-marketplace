import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, X, AlertCircle, CheckCircle, Upload, Code, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";
import DecryptedText from "@/components/ui/DecryptedTextSimple";
import { agentStorage } from "@/services/agentStorage";

const RegisterAgent = () => {
    const navigate = useNavigate();
    const { wallet, isConnected } = useWallet();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        pricing: {
            model: "per-call",
            amount: "",
            currency: "HBAR"
        },
        capabilities: [],
        endpoint: "",
        version: "1.0.0",
        tags: [],
        documentation: "",
        supportEmail: "",
        isLive: false
    });

    const [capabilities, setCapabilities] = useState([{ name: "", description: "" }]);
    const [tags, setTags] = useState([""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const categories = [
        "NLP",
        "Computer Vision",
        "Audio Processing",
        "Data Analysis",
        "Code Generation",
        "Translation",
        "Recommendation",
        "Other"
    ];

    const handleInputChange = (field: string, value: any) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => {
                const parentValue = prev[parent as keyof typeof prev];
                // Ensure parentValue is an object before spreading
                if (typeof parentValue === 'object' && parentValue !== null) {
                    return {
                        ...prev,
                        [parent]: {
                            ...parentValue,
                            [child]: value
                        }
                    };
                }
                // Fallback if parentValue is not an object
                return {
                    ...prev,
                    [parent]: {
                        [child]: value
                    }
                };
            });
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const addCapability = () => {
        setCapabilities([...capabilities, { name: "", description: "" }]);
    };

    const removeCapability = (index: number) => {
        setCapabilities(capabilities.filter((_, i) => i !== index));
    };

    const updateCapability = (index: number, field: string, value: string) => {
        const updated = capabilities.map((cap, i) =>
            i === index ? { ...cap, [field]: value } : cap
        );
        setCapabilities(updated);
    };

    const addTag = () => {
        setTags([...tags, ""]);
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const updateTag = (index: number, value: string) => {
        const updated = tags.map((tag, i) => i === index ? value : tag);
        setTags(updated);
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                return formData.name && formData.description && formData.category;
            case 2:
                return formData.pricing.amount && capabilities.some(cap => cap.name && cap.description);
            case 3:
                return formData.endpoint && formData.supportEmail;
            case 4:
                return agreedToTerms;
            default:
                return true;
        }
    };

    const handleSubmit = async () => {
        if (!isConnected || !wallet) {
            toast.error("Please connect your wallet first");
            return;
        }

        if (!agreedToTerms) {
            toast.error("Please agree to the Terms of Service and Privacy Policy");
            return;
        }

        // Final validation
        const filteredCapabilities = capabilities.filter(cap => cap.name && cap.description);
        const filteredTags = tags.filter(tag => tag.trim());

        if (!formData.name || !formData.description || !formData.category) {
            toast.error("Please fill in all required basic information");
            return;
        }

        if (!formData.pricing.amount || !filteredCapabilities.length) {
            toast.error("Please provide pricing and at least one capability");
            return;
        }

        if (!formData.endpoint || !formData.supportEmail) {
            toast.error("Please provide API endpoint and support email");
            return;
        }

        setIsSubmitting(true);
        toast.info("Registering your AI agent on Hedera...");

        try {
            // Prepare agent data
            const agentData = {
                ...formData,
                capabilities: filteredCapabilities,
                tags: filteredTags,
                owner: wallet.address,
                createdAt: new Date().toISOString(),
                status: "active"
            };

            // Simulate HCS topic creation and agent registration
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Generate mock topic IDs
            const mockInboundTopic = `0.0.${Math.floor(Math.random() * 1000000)}`;
            const mockOutboundTopic = `0.0.${Math.floor(Math.random() * 1000000)}`;
            const mockAgentId = `${mockInboundTopic}@${wallet.address}`;

            // Save agent to storage with topic IDs
            const savedAgent = agentStorage.saveAgent({
                ...agentData,
                agentId: mockAgentId,
                inboundTopic: mockInboundTopic,
                outboundTopic: mockOutboundTopic,
                isLive: true // Make newly registered agents live by default
            });

            toast.success("🎉 Agent registered successfully!");
            toast.info(`Agent ID: ${mockAgentId}`, { duration: 8000 });
            toast.info(`Inbound Topic: ${mockInboundTopic} | Outbound Topic: ${mockOutboundTopic}`, { duration: 8000 });

            // Reset form
            setFormData({
                name: "",
                description: "",
                category: "",
                pricing: { model: "per-call", amount: "", currency: "HBAR" },
                capabilities: [],
                endpoint: "",
                version: "1.0.0",
                tags: [],
                documentation: "",
                supportEmail: "",
                isLive: false
            });
            setCapabilities([{ name: "", description: "" }]);
            setTags([""]);
            setAgreedToTerms(false);
            setCurrentStep(1);

            // Show success message and redirect
            toast.success("🎉 Agent successfully registered and LIVE on HEX!", { duration: 6000 });
            toast.info("Redirecting to marketplace to view your agent...", { duration: 4000 });

            // Redirect to marketplace immediately to show the newly registered agent
            setTimeout(() => {
                navigate("/marketplace");
            }, 2000);

        } catch (error) {
            toast.error("Failed to register agent. Please try again.");
            console.error("Registration error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        } else {
            toast.warning("Please fill in all required fields");
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="glass border-b border-border/50 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/marketplace")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Marketplace
                            </Button>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold neon-text">
                                        <DecryptedText
                                            text="Register AI Agent"
                                            className="neon-text"
                                            encryptedClassName="text-primary/30"
                                            animateOn="hover"
                                            sequential={true}
                                            speed={80}
                                            maxIterations={10}
                                            revealDirection="start"
                                        />
                                    </h1>
                                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-semibold text-white">
                                        ⚡ Powered by Hedera
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    <DecryptedText
                                        text="List your AI agent on HEX • Everything is FREE on Testnet!"
                                        className="text-muted-foreground"
                                        encryptedClassName="text-muted-foreground/20"
                                        animateOn="hover"
                                        sequential={true}
                                        speed={60}
                                        maxIterations={8}
                                        revealDirection="start"
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">Step {currentStep} of 4</Badge>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">

                {/* Wallet Connection Check */}
                {!isConnected && (
                    <Alert className="mb-8">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            You need to connect your Hedera wallet to register an AI agent.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step <= currentStep
                                ? 'bg-primary border-primary text-primary-foreground'
                                : 'border-border text-muted-foreground'
                                }`}>
                                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                            </div>
                            {step < 4 && (
                                <div className={`w-16 h-0.5 ${step < currentStep ? 'bg-primary' : 'bg-border'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <Card className="glass p-8">

                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                                <p className="text-muted-foreground">Tell us about your AI agent</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Agent Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Advanced Sentiment Analyzer"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what your AI agent does, its capabilities, and use cases..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="version">Version</Label>
                                <Input
                                    id="version"
                                    placeholder="1.0.0"
                                    value={formData.version}
                                    onChange={(e) => handleInputChange('version', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Capabilities & Pricing */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2">Capabilities & Pricing</h2>
                                <p className="text-muted-foreground">Define what your agent can do and how much it costs</p>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Pricing</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Pricing Model</Label>
                                        <Select value={formData.pricing.model} onValueChange={(value) => handleInputChange('pricing.model', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="per-call">Per Call</SelectItem>
                                                <SelectItem value="subscription">Subscription</SelectItem>
                                                <SelectItem value="free">Free</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Amount *</Label>
                                        <Input
                                            type="number"
                                            step="0.001"
                                            placeholder="0.001"
                                            value={formData.pricing.amount}
                                            onChange={(e) => handleInputChange('pricing.amount', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Currency</Label>
                                        <Select value={formData.pricing.currency} onValueChange={(value) => handleInputChange('pricing.currency', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="HBAR">HBAR</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Capabilities */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Capabilities *</h3>
                                    <Button variant="outline" size="sm" onClick={addCapability}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Capability
                                    </Button>
                                </div>

                                {capabilities.map((capability, index) => (
                                    <div key={index} className="flex gap-4 items-start">
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="Capability name (e.g., sentiment-analysis)"
                                                value={capability.name}
                                                onChange={(e) => updateCapability(index, 'name', e.target.value)}
                                            />
                                            <Input
                                                placeholder="Description (e.g., Analyze sentiment in text)"
                                                value={capability.description}
                                                onChange={(e) => updateCapability(index, 'description', e.target.value)}
                                            />
                                        </div>
                                        {capabilities.length > 1 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeCapability(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Technical Details */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2">Technical Details</h2>
                                <p className="text-muted-foreground">Configure your agent's technical settings</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="endpoint">API Endpoint *</Label>
                                    <Input
                                        id="endpoint"
                                        placeholder="https://your-agent-api.com/invoke"
                                        value={formData.endpoint}
                                        onChange={(e) => handleInputChange('endpoint', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Your agent's API endpoint that will receive invocation requests
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email *</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        placeholder="support@yourcompany.com"
                                        value={formData.supportEmail}
                                        onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="documentation">Documentation URL</Label>
                                    <Input
                                        id="documentation"
                                        placeholder="https://docs.yourcompany.com/agent-api"
                                        value={formData.documentation}
                                        onChange={(e) => handleInputChange('documentation', e.target.value)}
                                    />
                                </div>

                                {/* Tags */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Tags</Label>
                                        <Button variant="outline" size="sm" onClick={addTag}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Tag
                                        </Button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {tags.map((tag, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    placeholder="e.g., machine-learning, nlp"
                                                    value={tag}
                                                    onChange={(e) => updateTag(index, e.target.value)}
                                                />
                                                {tags.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeTag(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                                <p className="text-muted-foreground">Review your agent details before submission</p>
                            </div>

                            <div className="space-y-6">
                                {/* Agent Preview */}
                                <Card className="glass p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{formData.name}</h3>
                                            <p className="text-muted-foreground">{formData.description}</p>
                                        </div>
                                        <Badge variant="secondary">{formData.category}</Badge>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground">Price:</span>
                                            <span className="ml-2 font-semibold text-primary">
                                                {formData.pricing.amount} {formData.pricing.currency}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Version:</span>
                                            <span className="ml-2">{formData.version}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-sm text-muted-foreground">Capabilities:</span>
                                        <div className="mt-2 space-y-1">
                                            {capabilities.filter(cap => cap.name).map((cap, index) => (
                                                <div key={index} className="text-sm">
                                                    <strong>{cap.name}:</strong> {cap.description}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-sm text-muted-foreground">Tags:</span>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {tags.filter(tag => tag.trim()).map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                {/* Terms Agreement */}
                                <div className="space-y-4">
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Your agent will be instantly deployed to HEX marketplace after registration.
                                            Start earning from agent invocations immediately!
                                        </AlertDescription>
                                    </Alert>

                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <h4 className="font-semibold text-green-400 mb-2">🎉 Free Registration</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Registration Fee:</span>
                                                <span className="font-semibold text-green-400">FREE</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Platform Commission:</span>
                                                <span className="font-semibold">2.5% per transaction</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Register your AI agent for free! We only take a small commission (2.5%)
                                                on successful transactions to support platform development and infrastructure.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                                        <Checkbox
                                            id="terms-agreement"
                                            checked={agreedToTerms}
                                            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                                            className="mt-1"
                                        />
                                        <div className="space-y-1">
                                            <Label
                                                htmlFor="terms-agreement"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                I agree to the Terms of Service and Privacy Policy *
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                By checking this box, you agree to our{" "}
                                                <a
                                                    href="/terms-of-service"
                                                    target="_blank"
                                                    className="text-primary hover:underline"
                                                >
                                                    Terms of Service
                                                </a>{" "}
                                                and{" "}
                                                <a
                                                    href="/privacy-policy"
                                                    target="_blank"
                                                    className="text-primary hover:underline"
                                                >
                                                    Privacy Policy
                                                </a>
                                                . You confirm that you have the right to register this agent and that all information provided is accurate.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </Button>

                        {currentStep < 4 ? (
                            <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={!isConnected || isSubmitting || !agreedToTerms}
                                className="min-w-32"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Registering...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Register Agent
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    {/* Terms Agreement Warning */}
                    {currentStep === 4 && !agreedToTerms && (
                        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <p className="text-sm text-orange-400 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Please agree to the Terms of Service and Privacy Policy to register your agent.
                            </p>
                        </div>
                    )}

                    {/* Wallet Connection Warning */}
                    {currentStep === 4 && !isConnected && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-400 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Please connect your Hedera wallet to register your agent.
                            </p>
                        </div>
                    )}

                </Card>

                {/* Help Section */}
                <Card className="glass p-6 mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Need Help?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">Developer Resources</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• <a href="/documentation#developers" className="hover:text-primary">Agent Development Guide</a></li>
                                <li>• <a href="/documentation#hedera" className="hover:text-primary">Hedera Integration</a></li>
                                <li>• <a href="/documentation#reference" className="hover:text-primary">API Reference</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Support</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• Community support available</li>
                                <li>• Review process: 3-5 business days</li>
                                <li>• Registration: FREE + 2.5% commission</li>
                            </ul>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default RegisterAgent;