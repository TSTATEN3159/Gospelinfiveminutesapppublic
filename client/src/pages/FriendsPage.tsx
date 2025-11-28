import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, UserPlus, Users, Heart, UserCheck, UserX, Trash2, ArrowLeft, Contact, Download, Share, BookOpen, Smartphone, Shield, MessageCircle, Sparkles, Globe, Mail, Clock, CheckCircle, XCircle, Bell, Send } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { apiUrl } from "@/lib/api-config";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";
import { Contacts } from '@capacitor-community/contacts';
import prayingCommunityImage from '@assets/stock_images/people_praying_toget_e65e5a90.jpg';

type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  joinDate?: string;
};

type Contact = {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  isAppUser: boolean;
  appUserId?: string;
};

type FriendRequestItem = {
  friendshipId: string;
  user: AppUser;
};

type VerseShare = {
  id: string;
  verseText: string;
  verseReference: string;
  imageUrl?: string;
  message?: string;
  senderName: string;
  isRead: boolean;
  createdAt: string;
};

interface FriendsPageProps {
  currentUserId: string;
  language: string;
  onNavigate?: (page: string) => void;
}

export default function FriendsPage({ currentUserId, language, onNavigate }: FriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isImportingContacts, setIsImportingContacts] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<AppUser | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const { toast } = useToast();
  const t = useTranslations(language);

  // Search users
  const { data: searchResults = { users: [] }, isLoading: isSearching } = useQuery({
    queryKey: ['/api/users/search', searchQuery],
    queryFn: () => searchQuery.length >= 2 ? fetch(apiUrl(`/api/users/search?q=${encodeURIComponent(searchQuery)}`)).then(r => r.json()) : Promise.resolve({ users: [] }),
    enabled: searchQuery.length >= 2
  });

  // Get friends list
  const { data: friendsData, isLoading: isLoadingFriends } = useQuery({
    queryKey: ['/api/friends', currentUserId],
    queryFn: async () => {
      console.log('[Friends] Fetching for userId:', currentUserId);
      const res = await fetch(apiUrl(`/api/friends/${currentUserId}`));
      console.log('[Friends] GET status:', res.status);
      const json = await res.json();
      console.log('[Friends] Response:', json);
      return json;
    }
  });

  // Get friend requests
  const { data: requestsData, isLoading: isLoadingRequests } = useQuery({
    queryKey: ['/api/friends/requests', currentUserId],
    queryFn: () => fetch(apiUrl(`/api/friends/requests/${currentUserId}`)).then(r => r.json())
  });

  // Get contacts
  const { data: contactsData, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['/api/contacts', currentUserId],
    queryFn: () => fetch(apiUrl(`/api/contacts/${currentUserId}`)).then(r => r.json())
  });

  // Get received verses
  const { data: receivedVersesData, isLoading: isLoadingVerses } = useQuery({
    queryKey: ['/api/verses/received', currentUserId],
    queryFn: () => fetch(apiUrl(`/api/verses/received/${currentUserId}`)).then(r => r.json())
  });

  // Get friend invitations sent by user
  const { data: invitationsData, isLoading: isLoadingInvitations } = useQuery({
    queryKey: ['/api/friends/invitations', currentUserId],
    queryFn: () => fetch(apiUrl(`/api/friends/invitations/${currentUserId}`)).then(r => r.json())
  });

  // Get friends who joined via invitation (for notifications)
  const { data: joinedFriendsData } = useQuery({
    queryKey: ['/api/friends/joined', currentUserId],
    queryFn: () => fetch(apiUrl(`/api/friends/joined/${currentUserId}`)).then(r => r.json())
  });

  // Send friend invitation mutation
  const sendInvitationMutation = useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message?: string }) => {
      const res = await apiRequest('POST', '/api/friends/invite', {
        inviterUserId: currentUserId,
        inviteeName: name,
        inviteeEmail: email,
        message
      });
      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to send invitation');
      }
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Invitation Sent!",
        description: data.message || `Your invitation has been sent.`,
      });
      setInviteName("");
      setInviteEmail("");
      setInviteMessage("");
      queryClient.invalidateQueries({ queryKey: ['/api/friends/invitations', currentUserId] });
    },
    onError: (error: any) => {
      toast({
        title: "Could not send invitation",
        description: error?.message || 'Please try again.',
        variant: "destructive",
      });
    }
  });

  // Cancel invitation mutation
  const cancelInvitationMutation = useMutation({
    mutationFn: async (invitationId: string) => {
      const res = await apiRequest('DELETE', `/api/friends/invite/${invitationId}`, {
        userId: currentUserId
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Invitation Cancelled",
        description: "The invitation has been cancelled.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/invitations', currentUserId] });
    }
  });

  // Mark invitation as notified
  const markNotifiedMutation = useMutation({
    mutationFn: async (invitationId: string) => {
      const res = await apiRequest('POST', `/api/friends/invite/${invitationId}/mark-notified`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/friends/joined', currentUserId] });
    }
  });

  // Send friend request mutation
  const sendRequestMutation = useMutation({
    mutationFn: async (addresseeId: string) => {
      console.log('[Friends] API base:', apiUrl(""));
      console.log('[Friends] Sending request from:', currentUserId, 'to:', addresseeId);
      const res = await apiRequest('POST', '/api/friends/request', { requesterId: currentUserId, addresseeId });
      console.log('[Friends] Request status:', res.status);
      const result = await res.json();
      console.log('[Friends] Request response:', JSON.stringify(result));
      return result;
    },
    onSuccess: () => {
      toast({
        title: t.success,
        description: t.friendRequestSent,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/requests', currentUserId] });
    },
    onError: (error: any) => {
      console.error('[Friends] Request error:', error);
      console.error('[Friends] Error message:', error?.message);
      toast({
        title: t.error,
        description: error?.message || t.friendRequestFailed,
        variant: "destructive",
      });
    }
  });

  // Accept friend request mutation  
  const acceptRequestMutation = useMutation({
    mutationFn: (friendshipId: string) => 
      apiRequest('PUT', `/api/friends/request/${friendshipId}`, { status: 'accepted' }),
    onSuccess: () => {
      toast({
        title: t.success,
        description: t.friendRequestAccepted,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends', currentUserId] });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/requests', currentUserId] });
    }
  });

  // Decline friend request mutation
  const declineRequestMutation = useMutation({
    mutationFn: (friendshipId: string) => 
      apiRequest('PUT', `/api/friends/request/${friendshipId}`, { status: 'declined' }),
    onSuccess: () => {
      toast({
        title: t.success,
        description: t.friendRequestDeclined,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/requests', currentUserId] });
    }
  });

  // Remove friend mutation
  const removeFriendMutation = useMutation({
    mutationFn: (friendId: string) => 
      apiRequest('DELETE', `/api/friends/${currentUserId}/${friendId}`),
    onSuccess: () => {
      toast({
        title: t.success,
        description: t.friendRemoved,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends', currentUserId] });
    }
  });

  // Import contacts mutation
  const importContactsMutation = useMutation({
    mutationFn: async () => {
      const permission = await Contacts.requestPermissions();
      if (permission.contacts === 'granted') {
        const result = await Contacts.getContacts({ projection: { name: true, phones: true, emails: true } });
        const allContacts = result.contacts.map(contact => ({
          contactId: contact.contactId,
          firstName: contact.name?.given || null,
          lastName: contact.name?.family || null,
          displayName: contact.name?.display || null,
          email: contact.emails?.[0]?.address || null,
          phone: contact.phones?.[0]?.number || null
        })).filter(c => (c.firstName || c.lastName || c.displayName) && (c.email || c.phone));
        
        const contactsList = allContacts.slice(0, 50); // Limit to 50 contacts for signup

        const res = await apiRequest(
          'POST',
          `/api/contacts/${currentUserId}/import?fromSignup=true`,
          { contacts: contactsList }
        );

        const json = await res.json();
        return json;
      } else {
        throw new Error('Contact permission not granted');
      }
    },
    onSuccess: (data) => {
      toast({
        title: 'Contacts Imported!',
        description: `${data.totalImported} contacts imported, ${data.appUsersFound} friends found.`,
      });

      queryClient.invalidateQueries({ queryKey: ['/api/contacts', currentUserId] });
      queryClient.invalidateQueries({ queryKey: ['/api/friends', currentUserId] });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/requests', currentUserId] });
    },
    onError: () => {
      toast({
        title: t.error,
        description: 'Failed to import contacts',
        variant: "destructive",
      });
    }
  });

  // Share verse mutation
  const shareVerseMutation = useMutation({
    mutationFn: (data: { receiverId: string; verseText: string; verseReference: string; message?: string }) => 
      apiRequest('POST', '/api/verses/share', { senderId: currentUserId, ...data }),
    onSuccess: () => {
      toast({
        title: t.success,
        description: 'Bible verse shared successfully',
      });
      setShareDialogOpen(false);
      setSelectedFriend(null);
    },
    onError: () => {
      toast({
        title: t.error,
        description: 'Failed to share Bible verse',
        variant: "destructive",
      });
    }
  });

  // Handle contact import
  const handleImportContacts = async () => {
    setIsImportingContacts(true);
    try {
      await importContactsMutation.mutateAsync();
    } finally {
      setIsImportingContacts(false);
    }
  };

  // Handle verse sharing
  const handleShareVerse = (friend: AppUser) => {
    setSelectedFriend(friend);
    setShareDialogOpen(true);
  };

  const renderUserCard = (user: AppUser, type: 'search' | 'friend' = 'search') => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    
    return (
      <Card key={user.id} className="p-4 shadow-md border bg-white hover-elevate transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          
          {type === 'search' && (
            <Button
              size="sm"
              onClick={() => sendRequestMutation.mutate(user.id)}
              disabled={sendRequestMutation.isPending}
              data-testid={`button-add-friend-${user.id}`}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {t.addFriend}
            </Button>
          )}
          
          {type === 'friend' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleShareVerse(user)}
                data-testid={`button-share-verse-${user.id}`}
              >
                <Share className="w-4 h-4 mr-2" />
                Share Verse
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeFriendMutation.mutate(user.id)}
                disabled={removeFriendMutation.isPending}
                data-testid={`button-remove-friend-${user.id}`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.remove}
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderContactCard = (contact: Contact) => {
    const initials = contact.firstName && contact.lastName 
      ? `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase()
      : contact.displayName 
        ? contact.displayName.substring(0, 2).toUpperCase()
        : '??';
    
    return (
      <Card key={contact.id} className="p-3 shadow-sm border bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className={contact.isAppUser ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-sm">
                {contact.displayName || `${contact.firstName || ''} ${contact.lastName || ''}`.trim()}
              </h4>
              <p className="text-xs text-gray-500">
                {contact.email || contact.phone || 'No contact info'}
              </p>
            </div>
          </div>
          
          {contact.isAppUser && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              <Users className="w-3 h-3 mr-1" />
              App User
            </Badge>
          )}
        </div>
      </Card>
    );
  };

  const renderRequestCard = (request: FriendRequestItem, type: 'incoming' | 'outgoing') => {
    const { user, friendshipId } = request;
    
    // Safety check for undefined user
    if (!user || !user.firstName || !user.lastName) {
      console.warn('Invalid request data:', request);
      return null;
    }
    
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    
    return (
      <Card key={friendshipId} className="p-4 shadow-md border bg-white hover-elevate transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          
          {type === 'incoming' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => acceptRequestMutation.mutate(friendshipId)}
                disabled={acceptRequestMutation.isPending}
                data-testid={`button-accept-request-${user.id}`}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {t.accept}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => declineRequestMutation.mutate(friendshipId)}
                disabled={declineRequestMutation.isPending}
                data-testid={`button-decline-request-${user.id}`}
              >
                <UserX className="w-4 h-4 mr-2" />
                {t.decline}
              </Button>
            </div>
          )}
          
          {type === 'outgoing' && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700" data-testid={`badge-pending-${user.id}`}>
              {t.pending}
            </Badge>
          )}
        </div>
      </Card>
    );
  };

  const renderVerseCard = (verse: VerseShare) => {
    return (
      <Card key={verse.id} className="p-4 shadow-md border bg-white hover-elevate transition-all duration-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-600">{verse.verseReference}</span>
            </div>
            {!verse.isRead && (
              <Badge variant="destructive" className="text-xs">New</Badge>
            )}
          </div>
          
          <blockquote className="text-gray-700 italic border-l-4 border-blue-300 pl-4">
            "{verse.verseText}"
          </blockquote>
          
          {verse.message && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">{verse.message}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>From: {verse.senderName}</span>
            <span>{new Date(verse.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white dark:bg-background px-4 py-6 border-b border-gray-100 dark:border-border ios-safe-top shadow-sm">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
            data-testid="button-back-friends"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center pr-11">
            <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-300" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive'
            }}>
              Friends & Community
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Connect, share, and grow together in faith</p>
          </div>
        </div>
      </div>

      {/* Informational Tiles Section */}
      <div className="bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-muted/20 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Banner */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to our Faith Community</h2>
                <p className="text-blue-100 dark:text-blue-200 text-lg mb-4">Connect with fellow believers and grow in faith together</p>
                <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      className="border-white/30 bg-white/10 text-white"
                      onClick={() => setActiveTab("contacts")}
                      data-testid="button-banner-import-contacts"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Import Contacts
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white/30 bg-white/10 text-white"
                      onClick={() => setActiveTab("search")}
                      data-testid="button-banner-find-friends"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Find Friends
                    </Button>
                  </div>
                <div className="hidden md:block mt-4">
                  <img 
                    src={prayingCommunityImage} 
                    alt="Community praying together" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30 mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('friends')} data-testid="tile-share-verses">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <Share className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Share Bible Verses</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Send meaningful scriptures to friends with personal messages and beautiful verse cards
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('search')} data-testid="tile-find-friends">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Find Friends</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Connect with friends from your contacts who also use the Gospel app
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('friends')} data-testid="tile-grow-together">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <MessageCircle className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Grow Together</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Build a supportive community where faith grows through shared experiences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => onNavigate?.('more')} data-testid="tile-safe-private">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Safe & Private</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Your data is protected with industry-standard security and privacy controls
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => onNavigate?.('home')} data-testid="tile-daily-inspiration">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Daily Inspiration</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Share daily verses and inspirational content to uplift and encourage each other
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0 hover-elevate transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('friends')} data-testid="tile-global-community">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md backdrop-blur-sm">
                  <Globe className="w-8 h-8 text-white dark:text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Global Community</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Join believers worldwide in a community centered on God's love and truth
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started Guide */}
          <Card className="bg-gradient-to-br from-green-700 to-emerald-700 dark:from-green-800 dark:to-emerald-800 shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-white flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-white" />
                Getting Started with Friends & Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center cursor-pointer hover-elevate p-4 rounded-lg transition-all" onClick={() => setActiveTab('contacts')} data-testid="step-import-contacts">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 text-sky-600 dark:text-sky-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold shadow-md">1</div>
                  <h4 className="font-semibold text-white mb-2">Import Contacts</h4>
                  <p className="text-green-100 text-sm">Allow access to your contacts to find friends who use the app</p>
                </div>
                <div className="text-center cursor-pointer hover-elevate p-4 rounded-lg transition-all" onClick={() => setActiveTab('search')} data-testid="step-send-requests">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 text-sky-600 dark:text-sky-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold shadow-md">2</div>
                  <h4 className="font-semibold text-white mb-2">Send Friend Requests</h4>
                  <p className="text-green-100 text-sm">Connect with discovered friends or search for new ones</p>
                </div>
                <div className="text-center cursor-pointer hover-elevate p-4 rounded-lg transition-all" onClick={() => setActiveTab('friends')} data-testid="step-share-grow">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 text-sky-600 dark:text-sky-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold shadow-md">3</div>
                  <h4 className="font-semibold text-white mb-2">Share & Grow</h4>
                  <p className="text-green-100 text-sm">Start sharing Bible verses and growing together in faith</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-card shadow-sm border dark:border-border">
            <TabsTrigger value="invite" data-testid="tab-invite-friends" className="data-[state=active]:bg-pink-50 dark:data-[state=active]:bg-pink-900/20 data-[state=active]:text-pink-700 dark:data-[state=active]:text-pink-300">
              <Mail className="w-4 h-4 mr-1" />
              Invite
            </TabsTrigger>
            <TabsTrigger value="search" data-testid="tab-search-friends" className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300">
              <Search className="w-4 h-4 mr-1" />
              Search
            </TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts" className="data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300">
              <Contact className="w-4 h-4 mr-1" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="friends" data-testid="tab-my-friends" className="data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">
              <Users className="w-4 h-4 mr-1" />
              Friends {friendsData?.friends && `(${friendsData.friends.length})`}
            </TabsTrigger>
            <TabsTrigger value="requests" data-testid="tab-friend-requests" className="data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20 data-[state=active]:text-orange-700 dark:data-[state=active]:text-orange-300">
              <UserPlus className="w-4 h-4 mr-1" />
              Requests {requestsData?.incoming && requestsData.incoming.length > 0 && `(${requestsData.incoming.length})`}
            </TabsTrigger>
            <TabsTrigger value="verses" data-testid="tab-received-verses" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300">
              <BookOpen className="w-4 h-4 mr-1" />
              Verses
            </TabsTrigger>
          </TabsList>

          {/* Invite Friends Tab */}
          <TabsContent value="invite" className="space-y-6">
            {/* New Friend Notification */}
            {joinedFriendsData?.newJoins > 0 && (
              <Alert className="bg-green-50 border-green-200">
                <Bell className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <span className="font-semibold">{joinedFriendsData.newJoins} friend{joinedFriendsData.newJoins > 1 ? 's' : ''} you invited just joined!</span>
                  <div className="mt-2 space-y-1">
                    {joinedFriendsData.joinedFriends?.filter((f: any) => !f.notified).map((friend: any) => (
                      <div key={friend.invitationId} className="flex items-center justify-between bg-white p-2 rounded-lg">
                        <span>{friend.inviteeName} is now on the app!</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markNotifiedMutation.mutate(friend.invitationId)}
                          data-testid={`button-dismiss-notification-${friend.invitationId}`}
                        >
                          Dismiss
                        </Button>
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Card className="shadow-lg border bg-card">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Mail className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Invite a Friend</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Send an invitation to someone you'd like to connect with in the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Friend's First Name</label>
                  <Input
                    placeholder="Enter their first name..."
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="border-gray-300 focus:border-pink-500"
                    data-testid="input-invite-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Friend's Email</label>
                  <Input
                    type="email"
                    placeholder="Enter their email address..."
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="border-gray-300 focus:border-pink-500"
                    data-testid="input-invite-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Personal Message (optional)</label>
                  <Input
                    placeholder="Add a personal note..."
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    className="border-gray-300 focus:border-pink-500"
                    data-testid="input-invite-message"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  disabled={!inviteName || !inviteEmail || sendInvitationMutation.isPending}
                  onClick={() => sendInvitationMutation.mutate({ name: inviteName, email: inviteEmail, message: inviteMessage || undefined })}
                  data-testid="button-send-invitation"
                >
                  {sendInvitationMutation.isPending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Sent Invitations List */}
            <Card className="shadow-lg border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                  Your Invitations
                </CardTitle>
                <CardDescription>Track the status of invitations you've sent</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingInvitations ? (
                  <p className="text-center text-muted-foreground py-4">Loading invitations...</p>
                ) : invitationsData?.invitations?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">You haven't sent any invitations yet</p>
                ) : (
                  <div className="space-y-3">
                    {invitationsData?.invitations?.map((invitation: any) => (
                      <div key={invitation.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className={
                              invitation.status === 'accepted' ? 'bg-green-100 text-green-600' :
                              invitation.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }>
                              {invitation.inviteeName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-foreground">{invitation.inviteeName}</h4>
                            <p className="text-sm text-muted-foreground">{invitation.inviteeEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {invitation.status === 'pending' && (
                            <>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => cancelInvitationMutation.mutate(invitation.id)}
                                disabled={cancelInvitationMutation.isPending}
                                data-testid={`button-cancel-invite-${invitation.id}`}
                              >
                                <XCircle className="w-4 h-4 text-gray-500" />
                              </Button>
                            </>
                          )}
                          {invitation.status === 'accepted' && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Joined!
                            </Badge>
                          )}
                          {invitation.status === 'expired' && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Expired
                            </Badge>
                          )}
                          {invitation.status === 'cancelled' && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Cancelled
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Friends Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="shadow-lg border bg-card">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Find New Friends</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Search for friends by name or email to connect with them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500"
                    data-testid="input-search-users"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  {isSearching && searchQuery.length >= 2 && (
                    <p className="text-center text-gray-500">Searching...</p>
                  )}
                  
                  {searchResults?.users?.map((user: AppUser) => 
                    renderUserCard(user, 'search')
                  )}
                  
                  {searchResults?.users?.length === 0 && searchQuery.length >= 2 && !isSearching && (
                    <p className="text-center text-gray-500" data-testid="text-no-results">
                      No users found with that search
                    </p>
                  )}
                  
                  {searchQuery.length < 2 && (
                    <p className="text-center text-gray-500">
                      Type at least 2 characters to search
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="shadow-lg border bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">My Contacts</CardTitle>
                <CardDescription className="text-gray-600">
                  Import your phone contacts to find friends who use the app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Button
                    onClick={handleImportContacts}
                    disabled={isImportingContacts || importContactsMutation.isPending}
                    data-testid="button-import-contacts"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    {isImportingContacts ? 'Importing...' : 'Import Contacts'}
                  </Button>
                </div>
                
                {contactsData?.appUsers?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Friends Found in Contacts ({Math.min(contactsData.appUsers.length, 10)}{contactsData.appUsers.length > 10 ? ' of ' + contactsData.appUsers.length : ''})
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {contactsData.appUsers.slice(0, 10).map((contact: Contact) => renderContactCard(contact))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {isLoadingContacts && (
                    <p className="text-center text-gray-500">Loading contacts...</p>
                  )}
                  
                  {contactsData?.allContacts?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <Contact className="w-4 h-4 mr-2" />
                        All Contacts ({contactsData.allContacts.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {contactsData.allContacts.map((contact: Contact) => renderContactCard(contact))}
                      </div>
                    </div>
                  )}
                  
                  {contactsData?.allContacts?.length === 0 && !isLoadingContacts && (
                    <div className="text-center py-8" data-testid="text-no-contacts">
                      <Contact className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No contacts imported yet</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Tap the import button to sync your phone contacts
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <Card className="shadow-lg border bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">My Friends</CardTitle>
                <CardDescription className="text-gray-600">
                  Your connected friends in the Gospel app community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingFriends && (
                    <p className="text-center text-gray-500">Loading friends...</p>
                  )}
                  
                  {friendsData?.friends?.map((friend: AppUser) => 
                    renderUserCard(friend, 'friend')
                  )}
                  
                  {friendsData?.friends?.length === 0 && !isLoadingFriends && (
                    <div className="text-center py-8" data-testid="text-no-friends">
                      <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No friends added yet</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Search for friends or import contacts to get started
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Friend Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Incoming Requests */}
            <Card className="shadow-lg border bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">Incoming Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Friend requests you have received from other users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingRequests && (
                    <p className="text-center text-gray-500">Loading requests...</p>
                  )}
                  
                  {requestsData?.incoming?.map((request: FriendRequestItem) => 
                    renderRequestCard(request, 'incoming')
                  )}
                  
                  {requestsData?.incoming?.length === 0 && !isLoadingRequests && (
                    <p className="text-center text-gray-500 py-8" data-testid="text-no-incoming-requests">
                      No incoming friend requests
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Outgoing Requests */}
            <Card className="shadow-lg border bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">Outgoing Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Friend requests you have sent to other users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requestsData?.outgoing?.map((request: FriendRequestItem) => 
                    renderRequestCard(request, 'outgoing')
                  )}
                  
                  {requestsData?.outgoing?.length === 0 && !isLoadingRequests && (
                    <p className="text-center text-gray-500 py-8" data-testid="text-no-outgoing-requests">
                      No outgoing friend requests
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Received Verses Tab */}
          <TabsContent value="verses" className="space-y-6">
            <Card className="shadow-lg border bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">Shared Bible Verses</CardTitle>
                <CardDescription className="text-gray-600">
                  Bible verses that friends have shared with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingVerses && (
                    <p className="text-center text-gray-500">Loading verses...</p>
                  )}
                  
                  {receivedVersesData?.verses?.map((verse: VerseShare) => 
                    renderVerseCard(verse)
                  )}
                  
                  {receivedVersesData?.verses?.length === 0 && !isLoadingVerses && (
                    <div className="text-center py-8" data-testid="text-no-verses">
                      <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No Bible verses shared yet</p>
                      <p className="text-sm text-gray-400 mt-2">
                        When friends share verses with you, they'll appear here
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bible Verse Sharing Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Bible Verse</DialogTitle>
              <DialogDescription>
                Share a meaningful Bible verse with {selectedFriend?.firstName} {selectedFriend?.lastName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Verse Reference</label>
                <Input 
                  placeholder="e.g., John 3:16" 
                  id="verseReference"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Verse Text</label>
                <textarea 
                  placeholder="Enter the Bible verse text..."
                  id="verseText"
                  className="w-full mt-1 p-2 border rounded-md resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Personal Message (Optional)</label>
                <textarea 
                  placeholder="Add a personal message..."
                  id="message"
                  className="w-full mt-1 p-2 border rounded-md resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    const verseReference = (document.getElementById('verseReference') as HTMLInputElement)?.value;
                    const verseText = (document.getElementById('verseText') as HTMLTextAreaElement)?.value;
                    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;
                    
                    if (selectedFriend && verseReference && verseText) {
                      shareVerseMutation.mutate({
                        receiverId: selectedFriend.id,
                        verseText,
                        verseReference,
                        message: message || undefined
                      });
                    }
                  }}
                  disabled={shareVerseMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                >
                  <Share className="w-4 h-4 mr-2" />
                  {shareVerseMutation.isPending ? 'Sharing...' : 'Share Verse'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShareDialogOpen(false);
                    setSelectedFriend(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}