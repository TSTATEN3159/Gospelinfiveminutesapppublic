import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, DollarSign, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import bibleDistributionImage from '@assets/stock_images/people_distributing__56bd3f84.jpg';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Capacitor } from '@capacitor/core';

// Load Stripe with public key (only on non-iOS platforms for App Store compliance)
let stripePromise: any = null;
if (Capacitor.getPlatform() !== 'ios') {
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
  }
  stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
}

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
  const queryClient = useQueryClient();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded! Verify and record the donation
      try {
        await apiRequest('/api/verify-payment', 'POST', {
          paymentIntentId: paymentIntent.id
        });

        // Refresh donation stats immediately after recording
        await queryClient.invalidateQueries({ queryKey: ['/api/donation-stats'] });

        toast({
          title: "Thank You!",
          description: "Your donation was successful. God bless your generous heart!",
        });
      } catch (verifyError) {
        console.warn('Failed to verify donation, but payment succeeded:', verifyError);
        
        // Still show success since payment went through
        toast({
          title: "Thank You!",
          description: "Your donation was successful. God bless your generous heart!",
        });
        
        // Refresh stats anyway in case verification worked
        queryClient.invalidateQueries({ queryKey: ['/api/donation-stats'] });
      }
      onSuccess();
    } else {
      // Payment is processing or requires additional action
      // Webhook will handle recording when the payment eventually succeeds
      toast({
        title: "Payment Processing",
        description: "Your payment is being processed. Thank you!",
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
              data-testid="button-cancel-payment"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || processing}
              className="flex-1"
              variant="default"
              data-testid="button-submit-payment"
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
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  // Redirect iOS users away from donation page for App Store compliance
  if (isIOS) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-3">Thank You for Your Heart to Give</h2>
            <p className="text-muted-foreground mb-4">
              Donation features are currently not available on iOS. 
              Please visit our website to support our ministry.
            </p>
            <Button onClick={() => onNavigate?.('more')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to More Features
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { toast } = useToast();

  // Fetch donation statistics
  const { data: donationStats } = useQuery({
    queryKey: ["/api/donation-stats"],
    staleTime: 30000, // Refetch every 30 seconds
  });

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
        {/* Total Donations Impact */}
        <Card className="text-center shadow-lg border-2">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2" data-testid="text-total-donations">
              ${(donationStats as any)?.success ? (donationStats as any).stats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Donations Received
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {(donationStats as any)?.success ? (donationStats as any).stats.biblesPurchased.toLocaleString() : '0'} Bibles funded for those in need
            </div>
          </CardContent>
        </Card>

        {/* Donation Form */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="text-center">
              Choose Your $ Donation Amount
            </CardTitle>
            <div className="flex justify-center mt-2">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Amounts */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Select a preset amount:
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset.amount}
                    variant={selectedAmount === preset.amount ? "default" : "outline"}
                    size="lg"
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
              <Label htmlFor="custom-amount" className="text-sm font-medium text-foreground mb-2 block">
                Or enter a custom amount:
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                    isCustom ? "border-primary focus:border-primary focus:ring-primary" : ""
                  }`}
                  data-testid="input-custom-amount"
                />
              </div>
              {customAmount && (
                <p className="text-xs text-muted-foreground mt-1">
                  Amount: ${parseFloat(customAmount || "0").toFixed(2)}
                </p>
              )}
            </div>

            {/* Donate Button */}
            <Button
              onClick={handleDonate}
              disabled={!isValidAmount() || loading}
              className="w-full"
              variant="default"
              size="lg"
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
            <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
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
                  className="text-primary underline hover:text-foreground transition-colors"
                  onClick={() => onNavigate?.('terms')}
                  data-testid="link-terms"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button 
                  className="text-primary underline hover:text-foreground transition-colors"
                  onClick={() => onNavigate?.('privacy')}
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bible Distribution Impact Card */}
        <Card className="overflow-hidden shadow-lg border-2">
          <div className="relative">
            <img 
              src={bibleDistributionImage} 
              alt="People distributing Bibles to community members" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="font-bold text-white text-lg mb-1">Your Impact</h3>
              <p className="text-white text-sm leading-relaxed">
                Every donation helps us distribute Bibles and share God's word with those who need it most. 
                Together, we're bringing hope and salvation to communities worldwide.
              </p>
            </div>
          </div>
        </Card>

        {/* Our Mission Statement */}
        <Card className="bg-muted/30 border-border shadow-lg border-2">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-foreground mb-2 text-center">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              Every donation helps us reach more souls with daily Bible verses, spiritual guidance, 
              and the transformative power of God's word. Your generosity makes eternal impact possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}