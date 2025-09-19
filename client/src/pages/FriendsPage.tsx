import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Users, Heart, UserCheck, UserX, Trash2, ArrowLeft } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";

type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate?: string;
};

type FriendRequestItem = {
  friendshipId: string;
  user: AppUser;
};

interface FriendsPageProps {
  currentUserId: string;
  language: string;
  onNavigate?: (page: string) => void;
}

export default function FriendsPage({ currentUserId, language, onNavigate }: FriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const t = useTranslations(language);

  // Search users
  const { data: searchResults = { users: [] }, isLoading: isSearching } = useQuery({
    queryKey: ['/api/users/search', searchQuery],
    queryFn: () => searchQuery.length >= 2 ? fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`).then(r => r.json()) : Promise.resolve({ users: [] }),
    enabled: searchQuery.length >= 2
  });

  // Get friends list
  const { data: friendsData, isLoading: isLoadingFriends } = useQuery({
    queryKey: ['/api/friends', currentUserId],
    queryFn: () => fetch(`/api/friends/${currentUserId}`).then(r => r.json())
  });

  // Get friend requests
  const { data: requestsData, isLoading: isLoadingRequests } = useQuery({
    queryKey: ['/api/friends/requests', currentUserId],
    queryFn: () => fetch(`/api/friends/requests/${currentUserId}`).then(r => r.json())
  });

  // Send friend request mutation
  const sendRequestMutation = useMutation({
    mutationFn: (addresseeId: string) => 
      apiRequest('POST', '/api/friends/request', { requesterId: currentUserId, addresseeId }),
    onSuccess: () => {
      toast({
        title: t.success,
        description: t.friendRequestSent,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/friends/requests', currentUserId] });
    },
    onError: () => {
      toast({
        title: t.error,
        description: t.friendRequestFailed,
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

  const renderUserCard = (user: AppUser, type: 'search' | 'friend' = 'search') => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    
    return (
      <Card key={user.id} className="p-4 shadow-lg border-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
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
          )}
        </div>
      </Card>
    );
  };

  const renderRequestCard = (request: FriendRequestItem, type: 'incoming' | 'outgoing') => {
    const { user, friendshipId } = request;
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    
    return (
      <Card key={friendshipId} className="p-4 shadow-lg border-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
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
            <Badge variant="secondary" data-testid={`badge-pending-${user.id}`}>
              {t.pending}
            </Badge>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.('more')}
              className="mr-3"
              data-testid="button-back-friends"
              aria-label="Go back to More page"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.friends}
                </h1>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center">
            {t.friendsPageDescription}
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" data-testid="tab-search-friends">
              <Search className="w-4 h-4 mr-2" />
              {t.searchFriends}
            </TabsTrigger>
            <TabsTrigger value="friends" data-testid="tab-my-friends">
              <Users className="w-4 h-4 mr-2" />
              {t.myFriends} {friendsData?.friends && `(${friendsData.friends.length})`}
            </TabsTrigger>
            <TabsTrigger value="requests" data-testid="tab-friend-requests">
              <UserPlus className="w-4 h-4 mr-2" />
              {t.requests} {requestsData?.incoming && requestsData.incoming.length > 0 && `(${requestsData.incoming.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Search Friends Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="text-center">{t.findNewFriends}</CardTitle>
                <CardDescription>
                  {t.searchByNameOrEmail}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-users"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  {isSearching && searchQuery.length >= 2 && (
                    <p className="text-center text-muted-foreground">{t.searching}</p>
                  )}
                  
                  {searchResults?.users?.map((user: AppUser) => 
                    renderUserCard(user, 'search')
                  )}
                  
                  {searchResults?.users?.length === 0 && searchQuery.length >= 2 && !isSearching && (
                    <p className="text-center text-muted-foreground" data-testid="text-no-results">
                      {t.noUsersFound}
                    </p>
                  )}
                  
                  {searchQuery.length < 2 && (
                    <p className="text-center text-muted-foreground">
                      {t.typeToSearch}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="text-center">{t.myFriends}</CardTitle>
                <CardDescription>
                  {t.friendsListDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingFriends && (
                    <p className="text-center text-muted-foreground">{t.loading}</p>
                  )}
                  
                  {friendsData?.friends?.map((friend: AppUser) => 
                    renderUserCard(friend, 'friend')
                  )}
                  
                  {friendsData?.friends?.length === 0 && !isLoadingFriends && (
                    <div className="text-center py-8" data-testid="text-no-friends">
                      <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">{t.noFriendsYet}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t.startSearching}
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
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="text-center">{t.incomingRequests}</CardTitle>
                <CardDescription>
                  {t.incomingRequestsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingRequests && (
                    <p className="text-center text-muted-foreground">{t.loading}</p>
                  )}
                  
                  {requestsData?.incoming?.map((request: FriendRequestItem) => 
                    renderRequestCard(request, 'incoming')
                  )}
                  
                  {requestsData?.incoming?.length === 0 && !isLoadingRequests && (
                    <p className="text-center text-muted-foreground py-8" data-testid="text-no-incoming-requests">
                      {t.noIncomingRequests}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Outgoing Requests */}
            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="text-center">{t.outgoingRequests}</CardTitle>
                <CardDescription>
                  {t.outgoingRequestsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requestsData?.outgoing?.map((request: FriendRequestItem) => 
                    renderRequestCard(request, 'outgoing')
                  )}
                  
                  {requestsData?.outgoing?.length === 0 && !isLoadingRequests && (
                    <p className="text-center text-muted-foreground py-8" data-testid="text-no-outgoing-requests">
                      {t.noOutgoingRequests}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}