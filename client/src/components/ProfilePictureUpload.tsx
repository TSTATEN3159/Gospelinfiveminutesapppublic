import { useState, useEffect, useRef } from "react";
import { Camera, User, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { safeLocalStorage } from "@/utils/capabilities";

interface ProfilePictureUploadProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProfilePictureUpload({ className, size = "md" }: ProfilePictureUploadProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileReaderRef = useRef<FileReader | null>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  useEffect(() => {
    const savedPicture = safeLocalStorage.getItem("gospelAppProfilePicture");
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }

    // Cleanup FileReader on unmount
    return () => {
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
        fileReaderRef.current = null;
      }
    };
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Abort any pending file read
    if (fileReaderRef.current) {
      fileReaderRef.current.abort();
    }

    setIsLoading(true);

    try {
      const reader = new FileReader();
      fileReaderRef.current = reader;
      
      reader.onloadend = () => {
        try {
          if (reader.readyState === FileReader.DONE && reader.result) {
            const base64String = reader.result as string;
            const storageResult = safeLocalStorage.setItem("gospelAppProfilePicture", base64String);
            
            if (storageResult) {
              setProfilePicture(base64String);
              toast({
                title: "Profile picture updated",
                description: "Your profile picture has been saved",
              });
            } else {
              toast({
                title: "Storage unavailable",
                description: "Unable to save profile picture. Storage may be full or restricted.",
                variant: "destructive",
              });
            }
          }
        } catch (error) {
          toast({
            title: "Storage error",
            description: "Unable to save your profile picture. Storage quota may be exceeded.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
          fileReaderRef.current = null;
        }
      };
      
      reader.onerror = () => {
        setIsLoading(false);
        fileReaderRef.current = null;
        toast({
          title: "Upload failed",
          description: "Unable to process the image. Please try again.",
          variant: "destructive",
        });
      };
      
      reader.onabort = () => {
        setIsLoading(false);
        fileReaderRef.current = null;
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      setIsLoading(false);
      fileReaderRef.current = null;
      toast({
        title: "Upload failed",
        description: "Unable to save your profile picture",
        variant: "destructive",
      });
    }
    
    // Clear the input so the same file can be selected again
    event.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRemoveDialog(true);
  };

  const handleRemoveConfirm = () => {
    try {
      const removeResult = safeLocalStorage.removeItem("gospelAppProfilePicture");
      
      if (removeResult === true) {
        setProfilePicture(null);
        setShowRemoveDialog(false);
        toast({
          title: "Profile picture removed",
          description: "Your profile picture has been deleted",
        });
      } else {
        setShowRemoveDialog(false);
        toast({
          title: "Removal failed",
          description: "Unable to remove profile picture. Storage may be restricted.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setShowRemoveDialog(false);
      toast({
        title: "Removal failed",
        description: "Unable to remove profile picture due to storage error.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className={cn("relative inline-block", className)}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClick}
          className="relative group h-10 w-10 rounded-full p-0"
          disabled={isLoading}
          data-testid="button-profile-picture-upload"
          aria-label={profilePicture ? "Change profile picture" : "Upload profile picture"}
        >
          <Avatar className={cn(sizeClasses[size])}>
            {profilePicture ? (
              <AvatarImage src={profilePicture} alt="Profile picture" />
            ) : (
              <AvatarFallback className="bg-muted">
                <User className="w-5 h-5 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          
          {/* Camera overlay on hover */}
          {!isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </Button>

        {/* Remove button when picture exists - small visual but accessible tap target */}
        {profilePicture && !isLoading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveClick}
            className="absolute -top-0.5 -right-0.5 h-7 w-7 rounded-full p-0 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1"
            data-testid="button-remove-profile-picture"
            aria-label="Remove profile picture"
          >
            <X className="w-3 h-3" />
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          data-testid="input-profile-picture"
          aria-label="Profile picture file input"
        />
      </div>

      {/* Remove confirmation dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent data-testid="dialog-remove-profile-picture">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove profile picture?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete your profile picture. You can upload a new one anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-remove">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemoveConfirm}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="button-confirm-remove"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
