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

// Preset donation amounts
const presetAmounts = [
  { amount: 5, label: "$5" },
  { amount: 10, label: "$10" },
  { amount: 25, label: "$25" },
  { amount: 50, label: "$50" },
  { amount: 100, label: "$100" },
  { amount: 250, label: "$250" },
];

// Stripe Payment Form Component
const PaymentForm = ({ amount, onSuccess, onCancel }: { 
  amount: number, 
  onSuccess: () => void, 
  onCancel: () => void 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred while processing your payment.');
        toast({
          title: "Payment Failed",
          description: error.message || 'An error occurred while processing your payment.',
          variant: "destructive",
        });
      } else {
        toast({
          title: "Donation Successful!",
          description: `Thank you for your $${amount.toFixed(2)} donation to spread God's word.`,
        });
        onSuccess();
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      toast({
        title: "Payment Error",
        description: 'An unexpected error occurred.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader>
        <CardTitle className="text-center">
          Complete Your ${amount.toFixed(2)} Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          
          {errorMessage && (
            <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 ios-tap-target"
              data-testid="button-cancel-payment"
              aria-label="Cancel payment"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || loading}
              className="flex-1"
              data-testid="button-submit-payment"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  Donate ${amount.toFixed(2)}
                </div>
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
      console.error('Error creating payment intent:', error);
      toast({
        title: "Payment Setup Failed",
        description: error instanceof Error ? error.message : 'Failed to setup payment. Please try again.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setClientSecret("");
    setSelectedAmount(null);
    setCustomAmount("");
    setIsCustom(false);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setClientSecret("");
  };

  // Show payment form when client secret is available
  if (showPaymentForm && clientSecret && stripePromise) {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
      {/* Warm Beige Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-orange-100/20 to-yellow-100/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none" />
      
      <div className="relative pb-20 px-4 py-6">
        {/* Warm Professional Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.('more')}
              className="ios-tap-target hover:bg-amber-100/80 dark:hover:bg-amber-900/50 transition-all duration-300 rounded-full"
              data-testid="button-back-donation"
              aria-label="Go back to More page"
            >
              <ArrowLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                Make a Donation
              </h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full mx-auto shadow-sm" />
              <p className="text-amber-600 dark:text-amber-400 font-medium mt-3 text-lg">
                Share God's Love Through Your Generosity
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-white/80 via-amber-50/90 to-white/80 dark:from-gray-800/80 dark:via-amber-900/40 dark:to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/60 dark:border-amber-800/60 shadow-lg">
            <p className="text-center font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
              🙏 Support our mission to spread God's word around the world through{' '}
              <span className="text-amber-700 dark:text-amber-300 font-bold">The Gospel in 5 Minutes™</span>
            </p>
            <p className="text-center text-amber-600 dark:text-amber-400 mt-2 font-medium">
              Every donation brings hope and salvation to someone in need
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto space-y-8">
          {/* Warm Impact Story Card */}
          <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-amber-100/80 via-orange-50/90 to-yellow-100/80 dark:from-amber-900/60 dark:via-orange-900/60 dark:to-yellow-900/60 overflow-hidden">
            {/* Warm decorative top border */}
            <div className="h-3 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 shadow-sm" />
            <CardContent className="p-10 relative">
              {/* Warm background decoration */}
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-2xl" />
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-yellow-300/40 to-amber-300/40 rounded-full blur-2xl" />
              
              {/* Warm icon with loving design */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Heart className="w-10 h-10 text-white" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-lg" />
              </div>
              
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4" data-testid="text-total-donations">
                ${(donationStats as any)?.success ? (donationStats as any).stats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
              </div>
              <div className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">
                💝 Total Love Shared Through Donations
              </div>
              <div className="bg-gradient-to-r from-white/70 via-amber-50/80 to-white/70 dark:from-gray-800/70 dark:via-amber-900/30 dark:to-gray-800/70 rounded-xl p-4 backdrop-blur-sm border border-amber-300/50 dark:border-amber-700/50 shadow-lg">
                <div className="text-base font-semibold text-amber-700 dark:text-amber-300">
                  🙏 {(donationStats as any)?.success ? (donationStats as any).stats.biblesPurchased.toLocaleString() : '0'} Souls Touched with God's Word
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-medium">
                  Every Bible brings hope, healing, and eternal transformation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Warm Giving Form */}
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/90 via-amber-50/80 to-white/90 dark:from-gray-800/90 dark:via-amber-900/30 dark:to-gray-800/90 backdrop-blur-sm overflow-hidden">
            {/* Warm decorative header */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 p-1.5 shadow-lg">
              <div className="bg-gradient-to-br from-white dark:from-gray-800 to-amber-50/50 dark:to-amber-900/20 rounded-t-lg">
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                      <Heart className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                    Choose Your Gift of Love
                  </CardTitle>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold text-lg">
                    💝 Every gift plants seeds of eternal hope
                  </p>
                  <p className="text-amber-500 dark:text-amber-500 font-medium mt-2">
                    Join thousands spreading God's love worldwide
                  </p>
                </CardHeader>
              </div>
            </div>
            
            <CardContent className="space-y-10 p-8">
              {/* Warm Giving Options */}
              <div>
                <Label className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-6 block text-center">
                  💝 Choose Your Gift Amount
                </Label>
                <p className="text-center text-amber-600 dark:text-amber-400 mb-6 font-medium">
                  Select the amount that speaks to your heart
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset.amount}
                      variant={selectedAmount === preset.amount ? "default" : "outline"}
                      size="lg"
                      onClick={() => handlePresetClick(preset.amount)}
                      className={`relative overflow-hidden transition-all duration-500 h-16 text-lg font-bold rounded-xl ${
                        selectedAmount === preset.amount 
                          ? "bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 text-white shadow-2xl scale-110 border-0" 
                          : "border-2 border-amber-200 dark:border-amber-700 hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900 dark:hover:to-orange-900 hover:scale-105 hover:shadow-lg text-amber-700 dark:text-amber-300"
                      }`}
                      data-testid={`button-preset-${preset.amount}`}
                    >
                      {selectedAmount === preset.amount && (
                        <>
                          <Heart className="w-5 h-5 mr-2" aria-hidden="true" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                        </>
                      )}
                      {preset.label}
                      {selectedAmount !== preset.amount && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-orange-100/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Button>
                  ))}
                </div>
                <p className="text-center text-amber-500 dark:text-amber-500 mt-4 text-sm font-medium">
                  ✨ Popular amounts chosen by our loving community
                </p>
              </div>

              {/* Warm Custom Amount */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/60 dark:border-amber-700/60">
                <Label htmlFor="custom-amount" className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 block text-center">
                  💖 Or Enter Your Heart's Desire
                </Label>
                <p className="text-center text-amber-600 dark:text-amber-400 mb-6 font-medium">
                  Every amount, no matter the size, makes a difference
                </p>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <Input
                    id="custom-amount"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="1"
                    max="10000"
                    placeholder="Enter your loving gift amount..."
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={`pl-14 pr-4 h-16 text-xl font-semibold border-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 ${
                      isCustom ? "border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-lg" : "border-amber-200 dark:border-amber-700 focus:border-amber-400"
                    }`}
                    data-testid="input-custom-amount"
                  />
                </div>
                {customAmount && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-yellow-900/40 rounded-xl border border-amber-300/60 dark:border-amber-600/60 shadow-lg">
                    <p className="text-amber-800 dark:text-amber-200 font-bold text-center text-lg">
                      🙏 Your Gift: ${parseFloat(customAmount || "0").toFixed(2)}
                    </p>
                    <p className="text-amber-600 dark:text-amber-400 text-center mt-2 font-medium">
                      Thank you for your generous heart!
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={!isValidAmount() || loading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-stone-500 via-neutral-500 to-amber-500 hover:from-stone-600 hover:via-neutral-600 hover:to-amber-600 text-white shadow-xl border-0 rounded-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
                data-testid="button-process-donation"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                    Donate ${getDonationAmount().toFixed(2)}
                  </div>
                )}
              </Button>

              {/* Enhanced Legal Disclaimer */}
              <div className="bg-stone-50/50 dark:bg-stone-900/20 rounded-lg p-4 border border-stone-200 dark:border-stone-700">
                <div className="text-sm text-stone-800 dark:text-stone-200 space-y-3">
                  <p className="font-medium">
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
                      className="text-stone-600 dark:text-stone-400 underline hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium"
                      onClick={() => onNavigate?.('terms')}
                      data-testid="link-terms"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button 
                      className="text-stone-600 dark:text-stone-400 underline hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium"
                      onClick={() => onNavigate?.('privacy')}
                      data-testid="link-privacy"
                    >
                      Privacy Policy
                    </button>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Bible Distribution Impact Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-stone-100 to-neutral-100 dark:from-stone-900 dark:to-neutral-900">
            <div className="relative">
              <img 
                src={bibleDistributionImage} 
                alt="People distributing Bibles to community members" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-600/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="font-bold text-white text-xl mb-3">Your Impact</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every donation helps us distribute Bibles and share God's word with those who need it most. 
                  Together, we're bringing hope and salvation to communities worldwide.
                </p>
              </div>
            </div>
          </Card>

          {/* Enhanced Mission Statement */}
          <Card className="bg-gradient-to-br from-white/70 to-stone-50/70 dark:from-gray-800/70 dark:to-stone-900/30 backdrop-blur-sm border border-stone-200 dark:border-stone-700 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-stone-500 to-neutral-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-4">Our Mission</h3>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                Every donation helps us reach more souls with daily Bible verses, spiritual guidance, 
                and the transformative power of God's word. Your generosity makes eternal impact possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}