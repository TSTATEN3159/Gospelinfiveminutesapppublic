import { useState } from 'react';
import { usePurchase } from '@/contexts/PurchaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Sparkles, BookOpen, Heart, MessageCircle, Video, Calendar } from 'lucide-react';

export default function PaywallPage() {
  const { products, purchaseProduct, restorePurchases } = usePurchase();
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">The Gospel in 5 Minutes</CardTitle>
          <CardDescription>
            Unlock lifetime access to all premium features
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <feature.icon className="w-4 h-4 text-muted-foreground" />
                  <span>{feature.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">One-time payment</div>
            <div className="text-3xl font-bold text-primary">{price}</div>
            <div className="text-xs text-muted-foreground mt-1">Lifetime access • No subscriptions</div>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="w-full"
            size="lg"
            data-testid="button-purchase"
          >
            {isPurchasing ? 'Processing...' : `Unlock for ${price}`}
          </Button>

          <Button
            onClick={handleRestore}
            disabled={isRestoring}
            variant="ghost"
            className="w-full"
            data-testid="button-restore"
          >
            {isRestoring ? 'Restoring...' : 'Restore Previous Purchase'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Payment will be charged to your Apple ID account. 
            One-time purchase with lifetime access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
