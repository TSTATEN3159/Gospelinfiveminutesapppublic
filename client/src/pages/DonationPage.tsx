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
import { Stripe as StripeCapacitor, ApplePayEventsEnum } from '@capacitor-community/stripe';
import { useTranslations } from '@/lib/translations';

// Load Stripe with public key (only on non-iOS platforms for App Store compliance)
let stripePromise: any = null;
if (Capacitor.getPlatform() !== 'ios') {
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
  }
  stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
}

interface DonationPageProps {
  language?: string;
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
const PaymentForm = ({ amount, language = "en", onSuccess, onCancel }: { 
  amount: number,
  language?: string,
  onSuccess: () => void, 
  onCancel: () => void 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const t = useTranslations(language);

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
        setErrorMessage(error.message || t.paymentErrorOccurred);
        toast({
          title: t.paymentFailed,
          description: error.message || t.paymentErrorOccurred,
          variant: "destructive",
        });
      } else {
        toast({
          title: t.donationSuccessful,
          description: t.donationSuccessMessage,
        });
        onSuccess();
      }
    } catch (err) {
      setErrorMessage(t.unexpectedError);
      toast({
        title: t.paymentError,
        description: t.unexpectedError,
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
          {t.completeYourDonation} ${amount.toFixed(2)} {t.completeDonation}
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
              aria-label={t.cancelPaymentAction}
            >
              {t.cancelPayment}
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
                  {t.processing}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  {t.completeDonation} ${amount.toFixed(2)}
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function DonationPage({ language = "en", onNavigate }: DonationPageProps) {
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  const t = useTranslations(language);
  
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

  const handleApplePayDonate = async () => {
    if (!isValidAmount()) {
      toast({
        title: t.invalidAmount,
        description: t.invalidAmountMessage,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const amount = getDonationAmount();
      
      // Initialize Stripe for Apple Pay
      if (import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
        await StripeCapacitor.initialize({
          publishableKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        });
      }
      
      // Check if Apple Pay is available - returns void on success, rejects on failure
      try {
        await StripeCapacitor.isApplePayAvailable();
      } catch (error) {
        toast({
          title: t.applePayNotAvailable,
          description: t.applePayNotAvailableMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
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
        throw new Error(data.error || t.failedToCreatePayment);
      }

      // Create and present Apple Pay
      // Note: merchantIdentifier must match your Apple Developer Merchant ID
      // You need to register this in Apple Developer Portal and add to Xcode capabilities
      await StripeCapacitor.createApplePay({
        paymentIntentClientSecret: data.clientSecret,
        paymentSummaryItems: [{
          label: 'The Gospel in 5 Minutes Donation',
          amount: amount
        }],
        merchantIdentifier: import.meta.env.VITE_APPLE_MERCHANT_ID || 'merchant.com.thegospelin5minutes',
        countryCode: 'US',
        currency: 'USD',
      });

      const result = await StripeCapacitor.presentApplePay();
      
      // Handle payment result
      if (result.paymentResult === ApplePayEventsEnum.Completed) {
        // Verify payment with backend to ensure it was confirmed
        try {
          const paymentIntentId = data.clientSecret.split('_secret_')[0];
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentIntentId }),
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            toast({
              title: t.donationSuccessful,
              description: t.donationSuccessMessage,
            });
            // Reset form
            setSelectedAmount(null);
            setCustomAmount("");
            setIsCustom(false);
          } else {
            throw new Error(t.paymentVerificationFailed);
          }
        } catch (verifyError) {
          console.error('Payment verification error:', verifyError);
          toast({
            title: t.verificationFailed,
            description: t.verificationFailedMessage,
            variant: "destructive",
          });
        }
      } else if (result.paymentResult === ApplePayEventsEnum.Failed) {
        toast({
          title: t.paymentFailed,
          description: t.paymentProcessingFailed,
          variant: "destructive",
        });
      }
      // Canceled is handled silently - user dismissed the sheet
      
    } catch (error) {
      console.error('Apple Pay error:', error);
      toast({
        title: t.paymentSetupFailed,
        description: error instanceof Error ? error.message : t.applePaySetupFailed,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    // Use Apple Pay on iOS, regular Stripe on web/Android
    if (isIOS) {
      return handleApplePayDonate();
    }
    
    if (!isValidAmount()) {
      toast({
        title: t.invalidAmount,
        description: t.invalidAmountMessage,
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
        throw new Error(data.error || t.failedToCreatePayment);
      }

      // Set client secret and show payment form
      setClientSecret(data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: t.paymentSetupFailed,
        description: error instanceof Error ? error.message : t.paymentSetupFailedGeneric,
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
                aria-label={t.cancelPaymentAction}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">{t.completeDonation}</h1>
            </div>
          </div>
          <PaymentForm 
            amount={getDonationAmount()}
            language={language}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      </Elements>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      <div className="relative pb-20 px-4 py-6">
        {/* Light Brown Professional Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.('more')}
              className="ios-tap-target hover:bg-amber-200/60 dark:hover:bg-amber-800/50 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-back-donation"
              aria-label={t.goBackToMore}
            >
              <ArrowLeft className="w-5 h-5 text-amber-800 dark:text-amber-200" />
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-700 bg-clip-text text-transparent mb-3">
                {t.donationPageTitle}
              </h1>
              <div className="h-2 w-40 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full mx-auto shadow-lg" />
              <p className="text-amber-700 dark:text-amber-300 font-semibold mt-4 text-xl">
                {t.donationPageSubtitle}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/90 via-amber-50/95 to-orange-50/90 dark:from-gray-800/90 dark:via-amber-900/50 dark:to-orange-900/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-300/50 dark:border-amber-700/50 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <p className="text-center font-bold text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
              {t.donationMissionText}
            </p>
            <p className="text-center text-amber-700 dark:text-amber-300 mt-3 font-semibold text-lg">
              {t.donationImpactText}
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto space-y-8">
          {/* Light Brown Impact Story Card */}
          <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-amber-200/90 via-yellow-200/95 to-orange-200/90 dark:from-amber-900/70 dark:via-yellow-900/70 dark:to-orange-900/70 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Light brown decorative top border with depth */}
            <div className="h-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 shadow-xl" />
            <CardContent className="p-12 relative">
              {/* Light brown background decoration with enhanced depth */}
              <div className="absolute top-8 right-8 w-28 h-28 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-yellow-400/50 to-amber-400/50 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl" />
              
              {/* Enhanced icon with deep shadow and light brown gradient */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-12 h-12 text-white" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-full blur-xl" />
                <div className="absolute -inset-6 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-2xl" />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent mb-4" data-testid="text-total-donations">
                  ${(donationStats as any)?.success ? (donationStats as any).stats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                </div>
                <div className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-6">
                  {t.totalDonationsLabel}
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/80 via-amber-100/90 to-orange-100/80 dark:from-gray-800/80 dark:via-amber-900/40 dark:to-orange-900/40 rounded-2xl p-6 backdrop-blur-sm border-2 border-amber-400/60 dark:border-amber-600/60 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-xl font-black text-amber-900 dark:text-amber-100">
                    {t.soulsTouchedLabel}
                  </div>
                  <p className="text-lg text-amber-800 dark:text-amber-200 mt-3 font-bold">
                    {t.bibleImpactText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Light Brown Giving Form */}
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 via-amber-100/90 to-orange-100/95 dark:from-gray-800/95 dark:via-amber-900/40 dark:to-orange-900/40 backdrop-blur-sm overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
            {/* Light brown decorative header with enhanced depth */}
            <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-2 shadow-2xl">
              <div className="bg-gradient-to-br from-white dark:from-gray-800 to-amber-100/60 dark:to-amber-900/30 rounded-t-2xl">
                <CardHeader className="text-center pb-8 pt-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <Heart className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                      <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-lg" />
                    </div>
                  </div>
                  <CardTitle className="text-4xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent mb-4 text-center">
                    {t.chooseGiftTitle}
                  </CardTitle>
                  <p className="text-amber-700 dark:text-amber-300 font-bold text-xl text-center">
                    {t.chooseGiftSubtitle}
                  </p>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3 text-lg text-center">
                    {t.chooseGiftDescription}
                  </p>
                </CardHeader>
              </div>
            </div>
            
            <CardContent className="space-y-12 p-10">
              {/* Light Brown Giving Options */}
              <div>
                <Label className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-8 block text-center">
                  {t.chooseAmountLabel}
                </Label>
                <p className="text-center text-amber-700 dark:text-amber-300 mb-8 font-bold text-lg">
                  {t.chooseAmountDescription}
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset.amount}
                      variant={selectedAmount === preset.amount ? "default" : "outline"}
                      size="lg"
                      onClick={() => handlePresetClick(preset.amount)}
                      className={`relative overflow-hidden transition-all duration-500 h-20 text-xl font-black rounded-2xl shadow-lg ${
                        selectedAmount === preset.amount 
                          ? "bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 text-white shadow-2xl scale-110 border-0 transform hover:scale-115" 
                          : "border-3 border-amber-300 dark:border-amber-600 hover:border-amber-500 hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-800 dark:hover:to-orange-800 hover:scale-110 hover:shadow-2xl text-amber-800 dark:text-amber-200 bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-gray-800/90 dark:to-amber-900/30"
                      }`}
                      data-testid={`button-preset-${preset.amount}`}
                    >
                      {selectedAmount === preset.amount && (
                        <>
                          <Heart className="w-6 h-6 mr-2" aria-hidden="true" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl" />
                          <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl blur-lg" />
                        </>
                      )}
                      {preset.label}
                      {selectedAmount !== preset.amount && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Button>
                  ))}
                </div>
                <p className="text-center text-amber-600 dark:text-amber-400 mt-6 text-base font-bold">
                  {t.popularAmountsText}
                </p>
              </div>

              {/* Light Brown Custom Amount */}
              <div className="bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl p-8 border-3 border-amber-300/60 dark:border-amber-600/60 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <Label htmlFor="custom-amount" className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-6 block text-center">
                  {t.customAmountLabel}
                </Label>
                <p className="text-center text-amber-700 dark:text-amber-300 mb-8 font-bold text-lg">
                  {t.customAmountDescription}
                </p>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <Input
                    id="custom-amount"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="1"
                    max="10000"
                    placeholder={t.customAmountPlaceholder}
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={`pl-16 pr-6 h-20 text-2xl font-bold border-4 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 shadow-lg ${
                      isCustom ? "border-amber-500 focus:border-amber-600 focus:ring-amber-600 shadow-2xl scale-105" : "border-amber-300 dark:border-amber-600 focus:border-amber-500 hover:scale-105"
                    }`}
                    data-testid="input-custom-amount"
                  />
                </div>
                {customAmount && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200 dark:from-amber-800/50 dark:via-yellow-800/50 dark:to-orange-800/50 rounded-2xl border-2 border-amber-400/60 dark:border-amber-500/60 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <p className="text-amber-900 dark:text-amber-100 font-black text-center text-2xl">
                      {t.yourGiftLabel}
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 text-center mt-3 font-bold text-lg">
                      {t.thankYouGenerousHeart}
                    </p>
                  </div>
                )}
              </div>

              {/* Light Brown Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={!isValidAmount() || loading}
                className="w-full h-20 text-2xl font-black bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-700 hover:via-yellow-700 hover:to-orange-700 text-white shadow-2xl border-0 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:shadow-3xl"
                size="lg"
                data-testid="button-process-donation"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.processing}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                    {t.completeDonation} ${getDonationAmount().toFixed(2)}
                  </div>
                )}
              </Button>

              {/* Light Brown Legal Disclaimer */}
              <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-amber-300/60 dark:border-amber-600/60 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-lg font-black text-amber-900 dark:text-amber-100 mb-4">
                    {t.importantInformation}
                  </h3>
                </div>
                <div className="text-base text-amber-800 dark:text-amber-200 space-y-4">
                  <p className="font-bold text-center">
                    {t.donationDisclaimer}
                  </p>
                  <p className="text-center font-semibold">
                    {t.taxAdvisorNote}
                  </p>
                  <p className="text-center font-semibold">
                    {t.agreeToTermsPrefix}{" "}
                    <button 
                      className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100 transition-colors font-black"
                      onClick={() => onNavigate?.('terms')}
                      data-testid="link-terms"
                    >
                      {t.termsOfService}
                    </button>{" "}
                    {t.and}{" "}
                    <button 
                      className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100 transition-colors font-black"
                      onClick={() => onNavigate?.('privacy')}
                      data-testid="link-privacy"
                    >
                      {t.privacyPolicy}
                    </button>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Light Brown Bible Distribution Impact Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-900 dark:to-orange-900 transform hover:scale-[1.02] transition-all duration-500">
            <div className="relative">
              <img 
                src={bibleDistributionImage} 
                alt="People distributing Bibles to community members" 
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-orange-700/50 to-transparent"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-lg blur-lg"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="font-black text-white text-2xl mb-4 text-center">{t.yourImpactTitle}</h3>
                <p className="text-white text-lg leading-relaxed font-bold text-center">
                  {t.yourImpactDescription}
                </p>
              </div>
            </div>
          </Card>

          {/* Light Brown Mission Statement */}
          <Card className="bg-gradient-to-br from-white/80 to-amber-100/80 dark:from-gray-800/80 dark:to-amber-900/40 backdrop-blur-sm border-3 border-amber-300 dark:border-amber-600 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-lg" />
              </div>
              <h3 className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-6 text-center">{t.ourMissionTitle}</h3>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-lg font-bold text-center">
                {t.ourMissionDescription}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}