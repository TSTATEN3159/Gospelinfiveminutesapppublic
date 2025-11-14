import { useState, useEffect, useRef } from "react";
import { Camera, User, Upload, Trash2 } from "lucide-react";
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
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
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
    setShowOptionsDialog(false);

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

  const handleAvatarClick = () => {
    setShowOptionsDialog(true);
  };

  const handleUploadClick = () => {
    setShowOptionsDialog(false);
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    setShowOptionsDialog(false);
    setShowDeleteConfirmDialog(true);
  };

  const handleDeleteConfirm = () => {
    try {
      const removeResult = safeLocalStorage.removeItem("gospelAppProfilePicture");
      
      if (removeResult === true) {
        setProfilePicture(null);
        setShowDeleteConfirmDialog(false);
        toast({
          title: "Profile picture removed",
          description: "Your profile picture has been deleted",
        });
      } else {
        setShowDeleteConfirmDialog(false);
        toast({
          title: "Removal failed",
          description: "Unable to remove profile picture. Storage may be restricted.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setShowDeleteConfirmDialog(false);
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
          onClick={handleAvatarClick}
          className="relative group h-10 w-10 rounded-full p-0"
          disabled={isLoading}
          data-testid="button-profile-picture-upload"
          aria-label={profilePicture ? "Manage profile picture" : "Upload profile picture"}
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

      {/* Options dialog */}
      <AlertDialog open={showOptionsDialog} onOpenChange={setShowOptionsDialog}>
        <AlertDialogContent data-testid="dialog-profile-picture-options">
          <AlertDialogHeader>
            <AlertDialogTitle>Profile Picture</AlertDialogTitle>
            <AlertDialogDescription>
              Choose an action for your profile picture
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleUploadClick}
              className="w-full justify-start"
              variant="outline"
              data-testid="button-upload-photo"
            >
              <Upload className="w-4 h-4 mr-2" />
              {profilePicture ? "Upload New Photo" : "Upload Photo"}
            </Button>
            {profilePicture && (
              <Button
                onClick={handleDeleteClick}
                className="w-full justify-start"
                variant="outline"
                data-testid="button-delete-photo"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Photo
              </Button>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-options">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <AlertDialogContent data-testid="dialog-delete-confirmation">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete profile picture?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete your profile picture. You can upload a new one anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
