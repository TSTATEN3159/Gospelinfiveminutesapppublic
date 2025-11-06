import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePurchase } from "@/contexts/PurchaseContext";
import { Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PaywallPageProps {
  onClose?: () => void;
}

export default function PaywallPage({ onClose }: PaywallPageProps) {
  const { purchaseProduct, isLoading, offerings } = usePurchase();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await purchaseProduct();
      toast({
        title: "Welcome to The Gospel!",
        description: "Thank you for your purchase. Enjoy unlimited access!",
      });
      onClose?.();
    } catch (error: any) {
      if (!error.userCancelled) {
        toast({
          title: "Purchase Failed",
          description: "Please try again or contact support if the problem persists.",
          variant: "destructive",
        });
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  // Get the price from offerings
  const lifetimePackage = offerings?.current?.availablePackages.find(
    pkg => pkg.identifier === '$rc_lifetime' || pkg.packageType === 'LIFETIME'
  );
  const price = lifetimePackage?.product?.priceString || "$3.99";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      {/* Close button */}
      {onClose && (
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-paywall"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-paywall-title">
            Unlock Full Access
          </h1>
          <p className="text-muted-foreground">
            Experience the complete Gospel in 5 Minutes app
          </p>
        </div>

        {/* Features */}
        <Card className="w-full max-w-md mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FeatureItem text="Daily Scripture & Devotionals" />
              <FeatureItem text="AI Pastor - Ask Spiritual Questions" />
              <FeatureItem text="Bible Reading Plans (1-Year & 6-Month)" />
              <FeatureItem text="Advanced Bible Search" />
              <FeatureItem text="Scripture Memory Helper" />
              <FeatureItem text="Unlimited Verse Bookmarks & Notes" />
              <FeatureItem text="Bible Videos & Teaching" />
              <FeatureItem text="Offline Reading" />
              <FeatureItem text="No Ads, Ever" />
            </div>
          </CardContent>
        </Card>

        {/* Purchase Button */}
        <div className="w-full max-w-md space-y-3">
          <Button
            size="lg"
            className="w-full text-lg h-14"
            onClick={handlePurchase}
            disabled={isPurchasing || isLoading}
            data-testid="button-purchase"
          >
            {isPurchasing ? (
              "Processing..."
            ) : (
              <>
                Unlock for {price} - One Time
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            One-time purchase • Lifetime access • All features included
          </p>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            ✓ Secure payment via Apple
          </p>
          <p className="text-sm text-muted-foreground">
            ✓ Syncs across all your devices
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">
        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-3 w-3 text-primary" />
        </div>
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
}
