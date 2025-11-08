import { useState } from 'react';
import { usePurchase } from '@/contexts/PurchaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Sparkles, BookOpen, Heart, MessageCircle, Video, Calendar, TestTube } from 'lucide-react';

export default function PaywallPage() {
  const { products, purchaseProduct, restorePurchases, isTestFlight } = usePurchase();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const { toast } = useToast();

  const features = [
    { icon: BookOpen, text: 'Daily Scripture & Devotionals' },
    { icon: MessageCircle, text: 'AI Pastor Chat Support' },
    { icon: Heart, text: 'Emotion-Based Scripture Guidance' },
    { icon: Calendar, text: 'Bible Reading Plans' },
    { icon: Video, text: 'Faith Videos & Studies' },
    { icon: Sparkles, text: 'Scripture Memory Helper' },
  ];

  async function handlePurchase() {
    setIsPurchasing(true);
    try {
      if (!products || products.length === 0) {
        toast({
          title: 'Products not loaded',
          description: 'This feature is only available in the iOS app. Download from the App Store to purchase.',
          variant: 'destructive',
        });
        return;
      }

      const status = await purchaseProduct(products[0].id);
      
      if (status === 'success') {
        toast({
          title: 'Welcome to Premium! 🎉',
          description: 'Thank you for your support. Enjoy full access to all features.',
        });
      } else if (status === 'cancelled') {
        toast({
          title: 'Purchase cancelled',
          description: 'No worries! You can upgrade anytime.',
        });
      } else if (status === 'pending') {
        toast({
          title: 'Purchase pending',
          description: 'Your purchase is being processed. Please check back soon.',
        });
      }
    } catch (error: any) {
      console.error('[Paywall] Purchase error:', error);
      toast({
        title: 'Purchase Unavailable',
        description: error?.message || 'Purchases are only available in the iOS app.',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  }

  async function handleRestore() {
    setIsRestoring(true);
    try {
      const result = await restorePurchases();
      
      if (result.success) {
        toast({
          title: 'Purchases restored',
          description: result.message,
        });
      } else {
        toast({
          title: 'Unable to restore',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[Paywall] Restore error:', error);
      toast({
        title: 'Restore failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRestoring(false);
    }
  }

  const product = products?.[0];
  const price = product?.price || '$3.99';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden border-amber-200/50 dark:border-amber-900/30 shadow-2xl">
          {isTestFlight && (
            <div className="bg-blue-500/10 border-b border-blue-500/20 p-3 flex items-center gap-2" data-testid="testflight-banner">
              <TestTube className="w-4 h-4 text-blue-500" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <strong>TestFlight Sandbox:</strong> Purchases use Apple's sandbox—no real charges.
              </div>
            </div>
          )}
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-8 text-center border-b border-amber-200/50 dark:border-amber-900/30">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-2">
              The Gospel in 5 Minutes
            </h1>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Unlock lifetime access to all premium features
            </p>
          </div>
          
          <CardContent className="p-6 space-y-6">
            {/* Features Grid */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 hover-elevate transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <feature.icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Display */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 dark:bg-amber-600/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/20 dark:bg-orange-600/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
              
              <div className="relative text-center">
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">One-time payment</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-500 dark:to-amber-400 bg-clip-text text-transparent mb-2">
                  {price}
                </div>
                <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {isTestFlight ? 'TestFlight (Sandbox) • No real charges' : 'Lifetime access • No subscriptions'}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-700 dark:to-orange-700 dark:hover:from-amber-800 dark:hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
              data-testid="button-purchase"
            >
              {isPurchasing ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Unlock for {price}
                </span>
              )}
            </Button>

            {/* Restore Button */}
            <Button
              onClick={handleRestore}
              disabled={isRestoring}
              variant="ghost"
              className="w-full text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950"
              data-testid="button-restore"
            >
              {isRestoring ? 'Restoring...' : 'Restore Previous Purchase'}
            </Button>

            {/* Footer Text */}
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              {isTestFlight ? (
                <>TestFlight sandbox: Sign in with a sandbox Apple ID to test the purchase flow. No actual charge will occur.</>
              ) : (
                <>Payment will be charged to your Apple ID account. One-time purchase with lifetime access.</>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
