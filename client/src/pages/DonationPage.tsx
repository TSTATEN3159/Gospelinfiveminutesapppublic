import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, DollarSign, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// Load Stripe with public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface DonationPageProps {
  onNavigate?: (page: string) => void;
}

const presetAmounts = [
  { amount: 1, label: "$1" },
  { amount: 5, label: "$5" },
  { amount: 10, label: "$10" },
  { amount: 100, label: "$100" },
  { amount: 1000, label: "$1000" },
];

// Payment Form Component
const PaymentForm = ({ 
  amount, 
  onSuccess, 
  onCancel 
}: { 
  amount: number; 
  onSuccess: () => void; 
  onCancel: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '?donation=success',
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank You!",
        description: "Your donation was successful. God bless your generous heart!",
      });
      onSuccess();
    }

    setProcessing(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your ${amount.toFixed(2)} Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || processing}
              className="flex-1 bg-amber-600 hover:bg-amber-700"
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                `Donate $${amount.toFixed(2)}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function DonationPage({ onNavigate }: DonationPageProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { toast } = useToast();

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    
    setCustomAmount(numericValue);
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const getDonationAmount = () => {
    if (isCustom && customAmount) {
      const amount = parseFloat(customAmount);
      return isNaN(amount) ? 0 : amount;
    }
    return selectedAmount || 0;
  };

  const isValidAmount = () => {
    const amount = getDonationAmount();
    return amount >= 1 && amount <= 10000;
  };

  const handleDonate = async () => {
    if (!isValidAmount()) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount between $1 and $10,000.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const amount = getDonationAmount();
      
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      // Set client secret and show payment form
      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
      
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Error",
        description: "Unable to process your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setClientSecret("");
    setShowPaymentForm(false);
    setSelectedAmount(null);
    setCustomAmount("");
    setIsCustom(false);
  };

  const handlePaymentCancel = () => {
    setClientSecret("");
    setShowPaymentForm(false);
  };

  // Show payment form if we have a client secret
  if (showPaymentForm && clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="pb-20 px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePaymentCancel}
                className="ios-tap-target"
                data-testid="button-back-payment"
                aria-label="Cancel payment"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Complete Donation</h1>
            </div>
          </div>
          <PaymentForm 
            amount={getDonationAmount()}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      </Elements>
    );
  }

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="ios-tap-target"
            data-testid="button-back-donation"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Make a Donation</h1>
        </div>
        <p className="text-muted-foreground">
          Support our mission to spread God's word around the world through The Gospel in 5 Minutes™
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Mission Statement Card */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-amber-600" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Every donation helps us reach more souls with daily Bible verses, spiritual guidance, 
              and the transformative power of God's word. Your generosity makes eternal impact possible.
            </p>
          </CardContent>
        </Card>

        {/* Donation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Choose Your Donation Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Amounts */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Select a preset amount:
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset.amount}
                    variant={selectedAmount === preset.amount ? "default" : "outline"}
                    className={`h-12 ${
                      selectedAmount === preset.amount 
                        ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600" 
                        : "hover:border-amber-300"
                    }`}
                    onClick={() => handlePresetClick(preset.amount)}
                    data-testid={`button-preset-${preset.amount}`}
                  >
                    {selectedAmount === preset.amount && (
                      <Check className="w-4 h-4 mr-1" aria-hidden="true" />
                    )}
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-700 mb-2 block">
                Or enter a custom amount:
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="custom-amount"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="1"
                  max="10000"
                  placeholder="Enter amount (min $1, max $10,000)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className={`pl-8 ${
                    isCustom ? "border-amber-300 focus:border-amber-500 focus:ring-amber-500" : ""
                  }`}
                  data-testid="input-custom-amount"
                />
              </div>
              {customAmount && (
                <p className="text-xs text-gray-500 mt-1">
                  Amount: ${parseFloat(customAmount || "0").toFixed(2)}
                </p>
              )}
            </div>

            {/* Donate Button */}
            <Button
              onClick={handleDonate}
              disabled={!isValidAmount() || loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-base font-medium"
              data-testid="button-process-donation"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" aria-hidden="true" />
                  Donate ${getDonationAmount().toFixed(2)}
                </div>
              )}
            </Button>

            {/* Legal Disclaimer */}
            <div className="text-xs text-gray-500 space-y-2 pt-4 border-t">
              <p>
                <strong>Important:</strong> Donations are processed securely through Stripe. 
                No goods or services are provided in exchange for donations.
              </p>
              <p>
                Please consult your tax advisor regarding the deductibility of donations. 
                For questions about donations or refunds, please contact our support team.
              </p>
              <p>
                By donating, you agree to our{" "}
                <button 
                  className="text-blue-600 underline hover:text-blue-700"
                  onClick={() => onNavigate?.('terms')}
                  data-testid="link-terms"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button 
                  className="text-blue-600 underline hover:text-blue-700"
                  onClick={() => onNavigate?.('privacy')}
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}