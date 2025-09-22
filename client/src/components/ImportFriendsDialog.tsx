import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Users, UserPlus, Check, X, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Contacts } from '@capacitor-community/contacts';
import { apiRequest } from "@/lib/queryClient";

interface Contact {
  contactId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface ImportFriendsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appUserId: string;
  onNavigateToFriends?: () => void;
}

export default function ImportFriendsDialog({ isOpen, onClose, appUserId, onNavigateToFriends }: ImportFriendsDialogProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [showContactList, setShowContactList] = useState(false);
  const [importComplete, setImportComplete] = useState(false);
  const [importResults, setImportResults] = useState<{ totalImported: number; appUsersFound: number } | null>(null);
  const { toast } = useToast();

  const handleStartImport = async () => {
    setIsImporting(true);
    setPermissionDenied(false);
    
    try {
      const permission = await Contacts.requestPermissions();
      if (permission.contacts === 'granted') {
        const result = await Contacts.getContacts({ 
          projection: { 
            name: true, 
            phones: true, 
            emails: true 
          } 
        });
        
        const contactsList = result.contacts.map(contact => ({
          contactId: contact.contactId,
          firstName: contact.name?.given || null,
          lastName: contact.name?.family || null,
          displayName: contact.name?.display || null,
          email: contact.emails?.[0]?.address || null,
          phone: contact.phones?.[0]?.number || null
        })).filter(contact => 
          // Only include contacts with name and either email or phone
          (contact.firstName || contact.lastName || contact.displayName) && 
          (contact.email || contact.phone)
        ).slice(0, 50); // Limit to 50 contacts
        
        setContacts(contactsList);
        // Pre-select all contacts initially
        setSelectedContacts(new Set(contactsList.map((_, index) => index)));
        setShowContactList(true);
      } else {
        setPermissionDenied(true);
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      setPermissionDenied(true);
    } finally {
      setIsImporting(false);
    }
  };

  const handleConfirmImport = async () => {
    setIsImporting(true);
    
    try {
      const selectedContactsArray = Array.from(selectedContacts).map(index => contacts[index]);
      
      const result = await apiRequest('POST', `/api/contacts/${appUserId}/import?fromSignup=true`, {
        contacts: selectedContactsArray
      }) as any;
      
      setImportResults({
        totalImported: result.totalImported || 0,
        appUsersFound: result.appUsersFound || 0
      });
      setImportComplete(true);
      
      toast({
        title: "Success!",
        description: `${result.totalImported || 0} contacts imported, ${result.appUsersFound || 0} friends found`,
      });
    } catch (error) {
      console.error('Error importing contacts:', error);
      toast({
        title: "Import Failed",
        description: "Failed to import contacts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const toggleContact = (index: number) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedContacts(newSelected);
  };

  const getContactDisplayName = (contact: Contact) => {
    if (contact.displayName) return contact.displayName;
    if (contact.firstName && contact.lastName) return `${contact.firstName} ${contact.lastName}`;
    if (contact.firstName) return contact.firstName;
    if (contact.lastName) return contact.lastName;
    return contact.email || contact.phone || 'Unknown Contact';
  };

  const getContactInitials = (contact: Contact) => {
    const name = getContactDisplayName(contact);
    return name.substring(0, 2).toUpperCase();
  };

  const handleSkip = () => {
    onClose();
  };

  const handleFinish = () => {
    onClose();
    if (onNavigateToFriends) {
      onNavigateToFriends();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Find Friends
          </DialogTitle>
          <DialogDescription>
            {importComplete 
              ? "Import completed successfully!"
              : showContactList 
                ? `Select up to 50 contacts to import (${selectedContacts.size}/50 selected)`
                : "Import your contacts to find friends who use the Gospel app"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!showContactList && !importComplete && !permissionDenied && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  We'll check your contacts to find friends who use the app. Only names, emails, and phone numbers are stored.
                </p>
                <p className="text-xs text-gray-500">
                  You can manage this data later in Settings.
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleStartImport}
                  disabled={isImporting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  data-testid="button-import-friends"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  {isImporting ? 'Accessing...' : 'Import up to 50 friends'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="flex-1"
                  data-testid="button-skip-import"
                >
                  Not now
                </Button>
              </div>
            </div>
          )}

          {permissionDenied && (
            <div className="text-center space-y-4">
              <Alert>
                <Settings className="w-4 h-4" />
                <AlertDescription>
                  Contact permission was denied. You can enable it in your device settings and try again, or skip for now.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleStartImport}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={handleSkip}
                  className="flex-1"
                  data-testid="button-skip-after-permission-denied"
                >
                  Skip
                </Button>
              </div>
            </div>
          )}

          {showContactList && !importComplete && (
            <div className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-2">
                {contacts.map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleContact(index)}
                    data-testid={`contact-item-${index}`}
                  >
                    <Checkbox 
                      checked={selectedContacts.has(index)}
                      onChange={() => toggleContact(index)}
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {getContactInitials(contact)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {getContactDisplayName(contact)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.email || contact.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-2 border-t">
                <Button 
                  onClick={handleConfirmImport}
                  disabled={isImporting || selectedContacts.size === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  data-testid="button-confirm-import"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {isImporting ? 'Importing...' : `Import ${selectedContacts.size} contacts`}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Skip
                </Button>
              </div>
            </div>
          )}

          {importComplete && importResults && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Import Successful!</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {importResults.totalImported} contacts imported
                    </Badge>
                  </div>
                  {importResults.appUsersFound > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Users className="w-3 h-3 mr-1" />
                        {importResults.appUsersFound} friends found
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {importResults.appUsersFound > 0 
                    ? "You can now connect with friends who use the Gospel app!"
                    : "We'll let you know when your contacts join the app."
                  }
                </p>
              </div>
              <div className="flex gap-3">
                {importResults.appUsersFound > 0 && onNavigateToFriends && (
                  <Button 
                    onClick={handleFinish}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    data-testid="button-see-friends"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    See Friends
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  data-testid="button-continue"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}