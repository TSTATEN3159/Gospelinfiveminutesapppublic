// Translation system for The Gospel in 5 Minutes app

export interface Translations {
  // Navigation & Common
  home: string;
  ask: string;
  search: string;
  more: string;
  
  // Home Page
  welcome: string;
  dailyVerse: string;
  bibleStudyPlans: string;
  askThePastor: string;
  
  // Time-based greetings
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  
  // Ask Page
  askPageDescription: string;
  feelingsScripture: string;
  
  // Search Page
  searchPageDescription: string;
  helpSpreadGodsWord: string;
  donationAppealText: string;
  makeADonation: string;
  
  // More Page
  settingsDescription: string;
  language: string;
  givingImpact: string;
  givingImpactDesc: string;
  faithVideos: string;
  faithVideosDesc: string;
  christianBlog: string;
  christianBlogDesc: string;
  settings: string;
  settingsDesc: string;
  friends: string;
  friendsDesc: string;
  privacyStatement: string;
  privacyStatementDesc: string;
  endUserAgreement: string;
  endUserAgreementDesc: string;
  donate: string;
  donateDesc: string;
  supportLegal: string;
  supportPrivacyRights: string;
  comingSoon: string;
  
  // Common Actions
  follow: string;
  share: string;
  shareText: string;
  
  // Footer
  visitWebsite: string;
  websiteDescription: string;
  
  // App Info
  appTitle: string;
  appTagline: string;
  version: string;
  
  // Ask Page specific
  askPageShareText: string;
  
  // Friends functionality
  friendsPageDescription: string;
  searchFriends: string;
  myFriends: string;
  requests: string;
  findNewFriends: string;
  searchByNameOrEmail: string;
  searchPlaceholder: string;
  addFriend: string;
  remove: string;
  accept: string;
  decline: string;
  pending: string;
  friendsListDescription: string;
  incomingRequests: string;
  incomingRequestsDescription: string;
  outgoingRequests: string;
  outgoingRequestsDescription: string;
  noUsersFound: string;
  typeToSearch: string;
  noFriendsYet: string;
  startSearching: string;
  noIncomingRequests: string;
  noOutgoingRequests: string;
  searching: string;
  loading: string;
  success: string;
  error: string;
  friendRequestSent: string;
  friendRequestFailed: string;
  friendRequestAccepted: string;
  friendRequestDeclined: string;
  friendRemoved: string;
  
  // Saved Verses
  savedVerses: string;
  verse: string;
  verses: string;
  saved: string;
  noSavedVersesYet: string;
  bookmarkVersesMessage: string;
  read: string;
  bookmarkRemoved: string;
  removedFromSavedVerses: string;
  errorLoadingVerse: string;
  couldNotLoadVerse: string;
  scripture: string;
  bibleVerse: string;
  noVerseContentAvailable: string;
  
  // Support Page
  supportAndPrivacy: string;
  contactSupport: string;
  contactSupportDesc: string;
  messageOnFacebook: string;
  legalDocuments: string;
  viewLegalPolicies: string;
  privacyPolicy: string;
  howWeProtectData: string;
  termsOfService: string;
  ourTermsAndConditions: string;
  yourPrivacyRights: string;
  managePersonalData: string;
  exportMyData: string;
  downloadCopyOfData: string;
  export: string;
  deleteMyData: string;
  permanentlyRemoveInfo: string;
  deleteData: string;
  confirmDelete: string;
  deleting: string;
  areYouSure: string;
  deleteWarning: string;
  cancel: string;
  crisisResources: string;
  crisisResourcesDesc: string;
  nationalSuicidePrevention: string;
  crisisTextLine: string;
  emergencyServices: string;
  accountDeletedSuccess: string;
  failedToDeleteAccount: string;
  localDataDeleted: string;
  noUserDataFound: string;
  errorDeletingAccount: string;
  appInformation: string;
  build: string;
  platform: string;
  
  // Privacy Policy Page
  privacyPolicyTitle: string;
  effectiveDate: string;
  privacyIntro: string;
  infoWeCollect: string;
  personalInformation: string;
  personalInfoDesc: string;
  usageData: string;
  usageDataDesc: string;
  aiPastorQuestions: string;
  aiPastorQuestionsDesc: string;
  howWeUseInfo: string;
  usePersonalizeDailyVerses: string;
  useTrackProgress: string;
  useProvideBiblicalGuidance: string;
  useSendRelevantContent: string;
  useImproveApp: string;
  dataSharingThirdParties: string;
  openAIServicesLabel: string;
  openAIServicesDesc: string;
  openAIPrivacyPolicyLink: string;
  noSellingLabel: string;
  noSellingDesc: string;
  analyticsLabel: string;
  analyticsDesc: string;
  dataStorageSecurity: string;
  dataStorageSecurityDesc: string;
  yourRightsChoices: string;
  rightsAccessLabel: string;
  rightsAccessDesc: string;
  rightsCorrectionLabel: string;
  rightsCorrectionDesc: string;
  rightsDeletionLabel: string;
  rightsDeletionDesc: string;
  rightsPortabilityLabel: string;
  rightsPortabilityDesc: string;
  childrensPrivacy: string;
  childrensPrivacyDesc: string;
  dataRetention: string;
  dataRetentionDesc: string;
  changesToPolicy: string;
  changesToPolicyDesc: string;
  contactUs: string;
  contactUsIntro: string;
  contactEmailLabel: string;
  contactFacebookLabel: string;
  contactAddressLabel: string;
  
  // Terms of Service Page
  tosWelcomeText: string;
  tosSection1Title: string;
  tosSection1Content: string;
  tosSection2Title: string;
  tosSection2Intro: string;
  tosSection2Item1: string;
  tosSection2Item2: string;
  tosSection2Item3: string;
  tosSection2Item4: string;
  tosSection2NotIntro: string;
  tosSection2NotItem1: string;
  tosSection2NotItem2: string;
  tosSection2NotItem3: string;
  tosSection2NotItem4: string;
  tosSection3Title: string;
  tosSection3Intro: string;
  tosSection3Item1: string;
  tosSection3Item2: string;
  tosSection3Item3: string;
  tosSection3Item4: string;
  tosSection4Title: string;
  tosSection4BiblicalContentLabel: string;
  tosSection4BiblicalContentText: string;
  tosSection4OriginalContentLabel: string;
  tosSection4OriginalContentText: string;
  tosSection4UserContentLabel: string;
  tosSection4UserContentText: string;
  tosSection5Title: string;
  tosSection5EducationalLabel: string;
  tosSection5EducationalText: string;
  tosSection5Item1: string;
  tosSection5Item2: string;
  tosSection5Item3: string;
  tosSection5Item4: string;
  tosSection5DoctrinalLabel: string;
  tosSection5DoctrinalText: string;
  tosSection6Title: string;
  tosSection6Content: string;
  tosSection7Title: string;
  tosSection7Content: string;
  tosSection8Title: string;
  tosSection8Content: string;
  tosSection9Title: string;
  tosSection9Content: string;
  tosSection10Title: string;
  tosSection10Intro: string;
  tosSection10Email: string;
  tosSection10Facebook: string;
  tosSection10Address: string;
  tosFinalAcknowledgement: string;
  
  // Donation Page
  donationPageTitle: string;
  donationPageSubtitle: string;
  donationMissionText: string;
  donationImpactText: string;
  totalDonationsLabel: string;
  soulsTouchedLabel: string;
  bibleImpactText: string;
  chooseGiftTitle: string;
  chooseGiftSubtitle: string;
  chooseGiftDescription: string;
  chooseAmountLabel: string;
  chooseAmountDescription: string;
  popularAmountsText: string;
  customAmountLabel: string;
  customAmountDescription: string;
  customAmountPlaceholder: string;
  yourGiftLabel: string;
  thankYouGenerousHeart: string;
  processing: string;
  importantInformation: string;
  donationDisclaimer: string;
  taxAdvisorNote: string;
  agreeToTermsPrefix: string;
  and: string;
  yourImpactTitle: string;
  yourImpactDescription: string;
  ourMissionTitle: string;
  ourMissionDescription: string;
  completeDonation: string;
  completeYourDonation: string;
  cancelPayment: string;
  paymentFailed: string;
  paymentError: string;
  donationSuccessful: string;
  donationSuccessMessage: string;
  paymentErrorOccurred: string;
  unexpectedError: string;
  invalidAmount: string;
  invalidAmountMessage: string;
  applePayNotAvailable: string;
  applePayNotAvailableMessage: string;
  verificationFailed: string;
  verificationFailedMessage: string;
  paymentProcessingFailed: string;
  paymentSetupFailed: string;
  applePaySetupFailed: string;
  paymentSetupFailedGeneric: string;
  failedToCreatePayment: string;
  paymentVerificationFailed: string;
  goBackToMore: string;
  cancelPaymentAction: string;
  
  // Settings Page
  profileInformation: string;
  edit: string;
  firstName: string;
  lastName: string;
  nameCannotBeChanged: string;
  email: string;
  phoneNumber: string;
  birthMonth: string;
  birthDay: string;
  timezone: string;
  timezoneCannotBeChanged: string;
  saveProfile: string;
  bibleVersion: string;
  loadingVersions: string;
  notifications: string;
  dailyReminders: string;
  reminderToReadDailyVerse: string;
  reminderTime: string;
  testNotification: string;
  streakNotifications: string;
  celebrateReadingStreaks: string;
  emailUpdates: string;
  receiveNewsletters: string;
  appSettings: string;
  soundEffects: string;
  enableAppSounds: string;
  appLanguage: string;
  dataPrivacy: string;
  viewPrivacyPolicy: string;
  deleteAccountData: string;
  deleteAllAccountData: string;
  deleteAccountWarning: string;
  deleteAccountWarningProfile: string;
  deleteAccountWarningBookmarks: string;
  deleteAccountWarningNotes: string;
  deleteAccountWarningPreferences: string;
  deleteAccountWarningStreak: string;
  actionCannotBeUndone: string;
  deleteAllData: string;
  accountActions: string;
  needHelpWithAccount: string;
  profileUpdated: string;
  profileSavedSuccessfully: string;
  failedToSaveProfile: string;
  dataExported: string;
  dataDownloadedSuccessfully: string;
  exportFailed: string;
  failedToExportData: string;
  accountDataDeleted: string;
  allDataRemovedFromDevice: string;
  deletionFailed: string;
  failedToDeleteAccountData: string;
  dailyRemindersEnabled: string;
  dailyReminderConfirmation: string;
  permissionRequired: string;
  notificationPermissionMessage: string;
  dailyRemindersDisabled: string;
  noMoreDailyReminders: string;
  reminderTimeUpdated: string;
  reminderTimeConfirmation: string;
  settingsUpdated: string;
  preferencesSaved: string;
  goBackToMorePage: string;
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
  easternTime: string;
  centralTime: string;
  mountainTime: string;
  pacificTime: string;
  utc: string;
  
  // Giving Page
  givingPageTitle: string;
  givingPageSubtitle: string;
  currentGoalSpreadGodsWord: string;
  of: string;
  goal: string;
  percentComplete: string;
  biblesPurchased: string;
  biblesDistributed: string;
  thisMonthsImpact: string;
  monthlyDonations: string;
  livesReached: string;
  joinOurMission: string;
  givingPageCTADescription: string;
  globalBibleDistribution: string;
  worldwideImpactComingSoon: string;
  worldwideImpactDescription: string;
  
  // Videos Page
  videosPageTitle: string;
  videosPageSubtitle: string;
  featuredThisWeek: string;
  handpickedSpiritualContent: string;
  loadingError: string;
  videoContentNotAvailable: string;
  noFeaturedVideoAvailable: string;
  browseByCategory: string;
  discoverTailoredContent: string;
  sermons: string;
  faithMessages: string;
  gospelTidbits: string;
  quickInsights: string;
  christianAdvice: string;
  lifeGuidance: string;
  categoryVideos: string;
  recentVideos: string;
  showAll: string;
  noVideosAvailable: string;
  checkInternetConnection: string;
  views: string;
  moreVideosComingSoon: string;
  moreVideosDescription: string;
  sermon: string;
  gospelTidbit: string;
  video: string;
  
  // Blog Page
  blogPageTitle: string;
  blogPageSubtitle: string;
  featuredArticle: string;
  todaysHighlightedInsight: string;
  by: string;
  minRead: string;
  published: string;
  readFullArticle: string;
  recentArticles: string;
  latestInsightsToStrengthen: string;
  min: string;
  readMore: string;
  browseByTopic: string;
  exploreContentByThemes: string;
  articles: string;
  neverMissAnArticle: string;
  latestChristianInsights: string;
  subscribeToUpdates: string;
  subscribeToBlog: string;
  joinCommunityBiweekly: string;
  biweeklyInsightsInbox: string;
  nameOptional: string;
  yourName: string;
  emailAddressRequired: string;
  emailPlaceholder: string;
  subscribing: string;
  biweeklyEmailDisclaimer: string;
  emailRequired: string;
  enterEmailToSubscribe: string;
  successfullySubscribed: string;
  thankYouSubscribing: string;
  subscriptionFailed: string;
  subscriptionError: string;
  unableToLoadArticles: string;
  loadingArticles: string;
  errorLoadingArticles: string;
  retry: string;
  
  // Bible Studies Page
  bibleStudiesTitle: string;
  bibleStudiesSubtitle: string;
  featuredStudies: string;
  browseAllStudies: string;
  searchBibleStudies: string;
  allCategory: string;
  discipleship: string;
  encouragement: string;
  character: string;
  prayer: string;
  prophecy: string;
  love: string;
  featured: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  lessons: string;
  startStudy: string;
  moreStudies: string;
  viewStudy: string;
  noStudiesFound: string;
  adjustSearchTerms: string;
  whatYouLearn: string;
  deepBiblicalInsights: string;
  guidedReflectionQuestions: string;
  scriptureMemorization: string;
  communityDiscussionPoints: string;
  close: string;
  lessonOf: string;
  day: string;
  todaysScripture: string;
  reflectionQuestions: string;
  todaysPrayer: string;
  previousLesson: string;
  completeLesson: string;
  nextLesson: string;
  lessonCompleted: string;
  greatProgress: string;
  continueToNextLesson: string;
  backToStudyOverview: string;
  
  // Bible Trivia Page
  bibleTriviaResults: string;
  bibleTriviaTitle: string;
  bibleExpert: string;
  bibleScholar: string;
  bibleStudent: string;
  keepStudying: string;
  level: string;
  gamesPlayed: string;
  bestScore: string;
  playAgain: string;
  backToHome: string;
  questionOf: string;
  score: string;
  testBiblicalKnowledge: string;
  latest: string;
  lastScore: string;
  best: string;
  games: string;
  chooseDifficultyLevel: string;
  easy: string;
  medium: string;
  difficult: string;
  easyDescription: string;
  mediumDescription: string;
  difficultDescription: string;
  scoringGuide: string;
  correctAnswers9to10: string;
  correctAnswers7to8: string;
  correctAnswers5to6: string;
  correctAnswers1to4: string;
  generatingQuestions: string;
  startTrivia10Questions: string;
  finishQuiz: string;
  nextQuestion: string;
  failedToGenerateTriviaQuestions: string;
  
  // AI Pastor Section
  aiPastor: string;
  scriptureGuidance: string;
  welcomeHelp: string;
  askAnythingGodsWord: string;
  tryTheseQuestions: string;
  growStrongerFaith: string;
  bibleSayAnxiety: string;
  knowGodsWill: string;
  connectionTrouble: string;
  aiPastorUnavailable: string;
  seekingWisdomScripture: string;
  askBibleQuestion: string;
  clearConversation: string;
  copyMessage: string;
  sendQuestion: string;
  biblicallyGuidedResponses: string;
  
  // AI Pastor Dialog
  askTheAIPastor: string;
  aiPoweredGuidance: string;
  pastorGreeting: string;
  technicalDifficulty: string;
  pastor: string;
  scriptureReferences: string;
  needPrayerFor: string;
  healing: string;
  guidance: string;
  strength: string;
  peace: string;
  commonQuestionsHelp: string;
  askAnythingFaith: string;
  guidanceRootedGodsWord: string;
  seekingWisdom: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation & Common
    home: "Home",
    ask: "Ask",
    search: "Search", 
    more: "More",
    
    // Home Page
    welcome: "Welcome!",
    dailyVerse: "Daily Verse",
    bibleStudyPlans: "3-Day Bible Study Plans",
    askThePastor: "Ask the AI Pastor",
    
    // Time-based greetings
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    
    // Ask Page
    askPageDescription: "Get AI-powered Scripture-based guidance and biblical wisdom",
    feelingsScripture: "Feelings & Scripture",
    
    // Search Page
    searchPageDescription: "Search for any Bible verse by reference",
    helpSpreadGodsWord: "Help Spread God's Word",
    donationAppealText: "The Gospel in 5 Minutes™ is accepting donations to get the Holy Bible to more people around the world. Your support helps us reach souls in need of spiritual guidance.",
    makeADonation: "Make a Donation",
    
    // More Page
    settingsDescription: "Settings and additional features",
    language: "Language",
    givingImpact: "Giving Impact",
    givingImpactDesc: "See how donations spread God's word",
    faithVideos: "Faith Videos",
    faithVideosDesc: "Sermons, Gospel tidbits, and Christian advice",
    christianBlog: "Christian Blog",
    christianBlogDesc: "Inspiring articles to grow your faith",
    settings: "Settings",
    settingsDesc: "Manage your profile and preferences",
    friends: "Friends",
    friendsDesc: "Connect with fellow believers",
    privacyStatement: "Privacy Statement",
    privacyStatementDesc: "Learn how we protect your data",
    endUserAgreement: "End User Agreement",
    endUserAgreementDesc: "Terms and conditions of use",
    donate: "Donate",
    donateDesc: "Support our mission to spread the Gospel",
    supportLegal: "Support & Legal",
    supportPrivacyRights: "Support & Privacy Rights",
    comingSoon: "New Feature",
    
    // Common Actions
    follow: "Follow",
    share: "Share The Gospel in 5 Minutes",
    shareText: "Discover daily Bible verses and spiritual guidance with The Gospel in 5 Minutes app!",
    
    // Footer
    visitWebsite: "Visit our website for more resources",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "The Gospel in 5 Minutes™",
    appTagline: "Daily scripture for spiritual growth",
    version: "Version 1.0.0",
    
    // Ask Page specific
    askPageShareText: "Ask the AI Pastor questions and get Scripture-based guidance!",
    
    // AI Pastor Section
    aiPastor: "AI Pastor",
    scriptureGuidance: "Scripture-based guidance powered by biblical wisdom",
    welcomeHelp: "Welcome! I'm here to help",
    askAnythingGodsWord: "Ask me anything about God's word, and I'll help you find answers in Scripture.",
    tryTheseQuestions: "Try these questions:",
    growStrongerFaith: "How can I grow stronger in my faith?",
    bibleSayAnxiety: "What does the Bible say about anxiety?",
    knowGodsWill: "How do I know God's will for my life?",
    connectionTrouble: "I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
    aiPastorUnavailable: "AI Pastor Unavailable",
    seekingWisdomScripture: "AI Pastor is seeking wisdom in Scripture...",
    askBibleQuestion: "Ask your Bible question here...",
    clearConversation: "Clear conversation",
    copyMessage: "Copy message",
    sendQuestion: "Send question",
    biblicallyGuidedResponses: "Biblically guided AI responses",
    
    // AI Pastor Dialog
    askTheAIPastor: "Ask the AI Pastor",
    aiPoweredGuidance: "AI-powered biblical guidance and spiritual counsel based on Scripture",
    aiDisclaimer: "This is an AI assistant based on biblical scripture. For serious matters, please consult with a live pastor or spiritual advisor.",
    pastorGreeting: "Hello! I'm here to provide biblical guidance and spiritual counsel. What's on your heart today? Whether you're facing challenges, have questions about faith, or need prayer, I'm here to help with God's wisdom.",
    technicalDifficulty: "I apologize for the technical difficulty. Please know that God hears your heart even when technology fails. Feel free to try your question again.",
    pastor: "Pastor",
    scriptureReferences: "Scripture References:",
    needPrayerFor: "Need prayer for:",
    healing: "healing",
    guidance: "guidance",
    strength: "strength",
    peace: "peace",
    commonQuestionsHelp: "Common questions I can help with:",
    askAnythingFaith: "Ask me anything about faith, life, or the Bible...",
    guidanceRootedGodsWord: "Guidance rooted in God's Word • Press Enter to send",
    seekingWisdom: "Seeking wisdom in Scripture...",
    
    // Friends functionality
    friendsPageDescription: "Connect with fellow believers and grow your faith together",
    searchFriends: "Search Friends",
    myFriends: "My Friends",
    requests: "Requests",
    findNewFriends: "Find New Friends",
    searchByNameOrEmail: "Search by name or email address",
    searchPlaceholder: "Enter name or email...",
    addFriend: "Add Friend",
    remove: "Remove",
    accept: "Accept",
    decline: "Decline",
    pending: "Pending",
    friendsListDescription: "Manage your connections with fellow believers",
    incomingRequests: "Incoming Requests",
    incomingRequestsDescription: "Friend requests you've received",
    outgoingRequests: "Outgoing Requests",
    outgoingRequestsDescription: "Friend requests you've sent",
    noUsersFound: "No users found matching your search",
    typeToSearch: "Type at least 2 characters to search",
    noFriendsYet: "You don't have any friends yet",
    startSearching: "Start by searching for friends to connect with",
    noIncomingRequests: "No pending friend requests",
    noOutgoingRequests: "No pending outgoing requests",
    searching: "Searching...",
    loading: "Loading...",
    success: "Success",
    error: "Error",
    friendRequestSent: "Friend request sent successfully!",
    friendRequestFailed: "Failed to send friend request",
    friendRequestAccepted: "Friend request accepted!",
    friendRequestDeclined: "Friend request declined",
    friendRemoved: "Friend removed successfully",
    
    // Saved Verses
    savedVerses: "Saved Verses",
    verse: "verse",
    verses: "verses",
    saved: "saved",
    noSavedVersesYet: "No Saved Verses Yet",
    bookmarkVersesMessage: "When you bookmark verses, they'll appear here for easy access.",
    tapToViewVerseInContext: "Tap to view this verse in context",
    read: "Read",
    bookmarkRemoved: "Bookmark Removed",
    removedFromSavedVerses: "removed from saved verses.",
    errorLoadingVerse: "Error Loading Verse",
    couldNotLoadVerse: "Could not load the verse content. Please try again.",
    scripture: "Scripture",
    bibleVerse: "Bible Verse",
    noVerseContentAvailable: "No verse content available",
    
    // Support Page
    supportAndPrivacy: "Support & Privacy",
    contactSupport: "Contact Support",
    contactSupportDesc: "Need help? Have questions? We're here to support your spiritual journey.",
    messageOnFacebook: "Message us on Facebook",
    legalDocuments: "Legal Documents",
    viewLegalPolicies: "View our legal policies and terms",
    privacyPolicy: "Privacy Policy",
    howWeProtectData: "How we protect your data",
    termsOfService: "Terms of Service",
    ourTermsAndConditions: "Our terms and conditions",
    yourPrivacyRights: "Your Privacy Rights",
    managePersonalData: "Manage your personal data and privacy settings.",
    exportMyData: "Export My Data",
    downloadCopyOfData: "Download a copy of your personal data",
    export: "Export",
    deleteMyData: "Delete My Data",
    permanentlyRemoveInfo: "Permanently remove all your personal information",
    deleteData: "Delete Data",
    confirmDelete: "Confirm Delete",
    deleting: "Deleting...",
    areYouSure: "Are you sure?",
    deleteWarning: "This will permanently delete all your data including your profile, streak count, preferences, and settings. This action cannot be undone.",
    cancel: "Cancel",
    crisisResources: "Crisis Resources",
    crisisResourcesDesc: "If you're in crisis, please reach out to these resources",
    nationalSuicidePrevention: "National Suicide Prevention Lifeline",
    crisisTextLine: "Crisis Text Line",
    emergencyServices: "Emergency Services",
    accountDeletedSuccess: "Your account and all associated data have been permanently deleted from our servers. The app will now restart.",
    failedToDeleteAccount: "Failed to delete your account from our servers. Please contact support for assistance.",
    localDataDeleted: "Your local data has been deleted successfully. The app will now restart.",
    noUserDataFound: "No user data found. The app will now restart.",
    errorDeletingAccount: "An error occurred while deleting your account. Please contact support for assistance.",
    appInformation: "App Information",
    build: "Build",
    platform: "Platform",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Privacy Policy",
    effectiveDate: "Effective Date:",
    privacyIntro: "The Gospel in 5 Minutes (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.",
    infoWeCollect: "Information We Collect",
    personalInformation: "Personal Information",
    personalInfoDesc: "When you register, we collect your first name, last name, email address, phone number, and birth month/day to personalize your spiritual journey.",
    usageData: "Usage Data",
    usageDataDesc: "We track your daily app usage, streak counters, verse preferences, and language settings to improve your experience and provide personalized content.",
    aiPastorQuestions: "AI Pastor Questions",
    aiPastorQuestionsDesc: "Questions submitted to our \"Ask the Pastor\" feature are processed by OpenAI's services to provide Biblical guidance. These interactions are subject to OpenAI's privacy policy.",
    howWeUseInfo: "How We Use Your Information",
    usePersonalizeDailyVerses: "Personalize daily verses and spiritual content",
    useTrackProgress: "Track your progress and maintain streak counters",
    useProvideBiblicalGuidance: "Provide AI-powered Biblical guidance and answers",
    useSendRelevantContent: "Send relevant spiritual content based on your preferences",
    useImproveApp: "Improve app functionality and user experience",
    dataSharingThirdParties: "Data Sharing and Third Parties",
    openAIServicesLabel: "OpenAI Services:",
    openAIServicesDesc: "Your \"Ask the Pastor\" questions are processed by OpenAI to generate Biblical responses.",
    openAIPrivacyPolicyLink: "OpenAI's privacy policy",
    noSellingLabel: "No Selling:",
    noSellingDesc: "We do not sell, rent, or trade your personal information to third parties.",
    analyticsLabel: "Analytics:",
    analyticsDesc: "We may use anonymized usage data to improve app performance and features.",
    dataStorageSecurity: "Data Storage and Security",
    dataStorageSecurityDesc: "Your personal information is stored locally on your device and on secure servers. We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.",
    yourRightsChoices: "Your Rights and Choices",
    rightsAccessLabel: "Access:",
    rightsAccessDesc: "You can view your personal information in the app settings",
    rightsCorrectionLabel: "Correction:",
    rightsCorrectionDesc: "You can update your information at any time",
    rightsDeletionLabel: "Deletion:",
    rightsDeletionDesc: "You can delete your account and all associated data",
    rightsPortabilityLabel: "Data Portability:",
    rightsPortabilityDesc: "You can export your data in a readable format",
    childrensPrivacy: "Children's Privacy",
    childrensPrivacyDesc: "Our app is designed for users 13 years and older. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.",
    dataRetention: "Data Retention",
    dataRetentionDesc: "We retain your personal information for as long as your account is active or as needed to provide services. You can request deletion of your data at any time through the app settings.",
    changesToPolicy: "Changes to This Policy",
    changesToPolicyDesc: "We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy in the app and updating the effective date.",
    contactUs: "Contact Us",
    contactUsIntro: "If you have questions about this Privacy Policy, please contact us:",
    contactEmailLabel: "Email:",
    contactFacebookLabel: "Facebook:",
    contactAddressLabel: "Address:",
    
    // Terms of Service Page
    tosWelcomeText: "Welcome to The Gospel in 5 Minutes. These Terms of Service (\"Terms\") govern your use of our mobile application and services. By using our app, you agree to these Terms.",
    tosSection1Title: "1. License to Use",
    tosSection1Content: "We grant you a limited, non-exclusive, non-transferable license to use The Gospel in 5 Minutes for your personal, non-commercial use. This license does not include the right to resell, redistribute, or create derivative works.",
    tosSection2Title: "2. Acceptable Use",
    tosSection2Intro: "You agree to use our app in a manner consistent with:",
    tosSection2Item1: "Christian values and biblical principles",
    tosSection2Item2: "Respectful engagement with spiritual content",
    tosSection2Item3: "Lawful purposes only",
    tosSection2Item4: "Personal spiritual growth and education",
    tosSection2NotIntro: "You agree NOT to:",
    tosSection2NotItem1: "Use the app for commercial purposes without permission",
    tosSection2NotItem2: "Attempt to reverse engineer or hack the app",
    tosSection2NotItem3: "Share inappropriate or offensive content",
    tosSection2NotItem4: "Violate any applicable laws or regulations",
    tosSection3Title: "3. AI-Powered Features",
    tosSection3Intro: "Our \"Ask the Pastor\" feature uses artificial intelligence to provide Biblical guidance. Please understand:",
    tosSection3Item1: "AI responses are for educational and inspirational purposes",
    tosSection3Item2: "Responses should not replace professional counseling or medical advice",
    tosSection3Item3: "AI-generated content may contain errors or limitations",
    tosSection3Item4: "For serious spiritual matters, consult with a qualified pastor or counselor",
    tosSection4Title: "4. Content and Intellectual Property",
    tosSection4BiblicalContentLabel: "Biblical Content:",
    tosSection4BiblicalContentText: "Scripture quotations are from public domain translations or used under appropriate licenses.",
    tosSection4OriginalContentLabel: "Original Content:",
    tosSection4OriginalContentText: "Our original content, including study plans, commentary, and app features, are protected by copyright and remain our property.",
    tosSection4UserContentLabel: "User Content:",
    tosSection4UserContentText: "Any questions or input you provide may be used to improve our services while respecting your privacy.",
    tosSection5Title: "5. Disclaimers",
    tosSection5EducationalLabel: "Educational Purpose:",
    tosSection5EducationalText: "This app is for educational and inspirational purposes. It is not a substitute for:",
    tosSection5Item1: "Professional pastoral counseling",
    tosSection5Item2: "Medical or psychological advice",
    tosSection5Item3: "Legal advice or financial guidance",
    tosSection5Item4: "Crisis intervention or emergency services",
    tosSection5DoctrinalLabel: "Doctrinal Neutrality:",
    tosSection5DoctrinalText: "While we strive for biblical accuracy, interpretations may vary among Christian denominations. Consult your local church for doctrinal guidance.",
    tosSection6Title: "6. Limitation of Liability",
    tosSection6Content: "To the maximum extent permitted by law, The Gospel in 5 Minutes and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app, including but not limited to spiritual, emotional, or personal decisions based on app content.",
    tosSection7Title: "7. Termination",
    tosSection7Content: "You may stop using the app at any time and delete your account. We reserve the right to terminate or suspend access to users who violate these Terms or engage in inappropriate behavior.",
    tosSection8Title: "8. Updates and Changes",
    tosSection8Content: "We may update these Terms periodically. Continued use of the app after changes constitutes acceptance of the new Terms. Material changes will be communicated through the app.",
    tosSection9Title: "9. Governing Law",
    tosSection9Content: "These Terms are governed by the laws of the United States. Any disputes will be resolved through binding arbitration in accordance with Christian principles of reconciliation where possible.",
    tosSection10Title: "10. Contact Information",
    tosSection10Intro: "For questions about these Terms, please contact us:",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "The Gospel in 5 Minutes, Legal Department",
    tosFinalAcknowledgement: "By using The Gospel in 5 Minutes, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
    
    // Donation Page
    donationPageTitle: "Make a Donation",
    donationPageSubtitle: "Share God's Love Through Your Generosity",
    donationMissionText: "Support our mission to spread God's word around the world through",
    donationImpactText: "Every donation brings hope and salvation to someone in need",
    totalDonationsLabel: "Total Love Shared Through Donations",
    soulsTouchedLabel: "Souls Touched with God's Word",
    bibleImpactText: "Every Bible brings hope, healing, and eternal transformation",
    chooseGiftTitle: "Choose Your Gift of Love",
    chooseGiftSubtitle: "Every gift plants seeds of eternal hope",
    chooseGiftDescription: "Join thousands spreading God's love worldwide",
    chooseAmountLabel: "Choose Your Gift Amount",
    chooseAmountDescription: "Select the amount that speaks to your heart",
    popularAmountsText: "Popular amounts chosen by our loving community",
    customAmountLabel: "Or Enter Your Heart's Desire",
    customAmountDescription: "Every amount, no matter the size, makes a difference",
    customAmountPlaceholder: "Enter your loving gift amount...",
    yourGiftLabel: "Your Gift",
    thankYouGenerousHeart: "Thank you for your generous heart!",
    processing: "Processing...",
    importantInformation: "Important Information",
    donationDisclaimer: "Donations are processed securely through Stripe. No goods or services are provided in exchange for donations.",
    taxAdvisorNote: "Please consult your tax advisor regarding the deductibility of donations. For questions about donations or refunds, please contact our support team.",
    agreeToTermsPrefix: "By donating, you agree to our",
    and: "and",
    yourImpactTitle: "Your Impact",
    yourImpactDescription: "Every donation helps us distribute Bibles and share God's word with those who need it most. Together, we're bringing hope and salvation to communities worldwide.",
    ourMissionTitle: "Our Mission",
    ourMissionDescription: "Every donation helps us reach more souls with daily Bible verses, spiritual guidance, and the transformative power of God's word. Your generosity makes eternal impact possible.",
    completeDonation: "Complete Donation",
    completeYourDonation: "Complete Your",
    cancelPayment: "Cancel",
    paymentFailed: "Payment Failed",
    paymentError: "Payment Error",
    donationSuccessful: "Donation Successful!",
    donationSuccessMessage: "Thank you for your donation to spread God's word.",
    paymentErrorOccurred: "An error occurred while processing your payment.",
    unexpectedError: "An unexpected error occurred.",
    invalidAmount: "Invalid Amount",
    invalidAmountMessage: "Please enter an amount between $1 and $10,000.",
    applePayNotAvailable: "Apple Pay Not Available",
    applePayNotAvailableMessage: "Please add a card to Apple Wallet to use Apple Pay.",
    verificationFailed: "Verification Failed",
    verificationFailedMessage: "Payment may still be processing. Please check back later.",
    paymentProcessingFailed: "Your donation could not be processed. Please try again.",
    paymentSetupFailed: "Payment Setup Failed",
    applePaySetupFailed: "Failed to setup Apple Pay. Please try again.",
    paymentSetupFailedGeneric: "Failed to setup payment. Please try again.",
    failedToCreatePayment: "Failed to create payment intent",
    paymentVerificationFailed: "Payment verification failed",
    goBackToMore: "Go back to More page",
    cancelPaymentAction: "Cancel payment",
    
    // Settings Page
    profileInformation: "Profile Information",
    edit: "Edit",
    firstName: "First Name",
    lastName: "Last Name",
    nameCannotBeChanged: "Name cannot be changed",
    email: "Email",
    phoneNumber: "Phone Number",
    birthMonth: "Birth Month",
    birthDay: "Birth Day",
    timezone: "Timezone",
    timezoneCannotBeChanged: "Timezone cannot be changed",
    saveProfile: "Save Profile",
    bibleVersion: "Bible Version",
    loadingVersions: "Loading versions...",
    notifications: "Notifications",
    dailyReminders: "Daily Reminders",
    reminderToReadDailyVerse: "Get reminded to read your daily verse",
    reminderTime: "Reminder Time",
    testNotification: "Test Notification",
    streakNotifications: "Streak Notifications",
    celebrateReadingStreaks: "Celebrate your reading streaks",
    emailUpdates: "Email Updates",
    receiveNewsletters: "Receive newsletters and updates",
    appSettings: "App Settings",
    soundEffects: "Sound Effects",
    enableAppSounds: "Enable app sounds and notifications",
    appLanguage: "App Language",
    dataPrivacy: "Data & Privacy",
    viewPrivacyPolicy: "View Privacy Policy",
    deleteAccountData: "Delete Account Data",
    deleteAllAccountData: "Delete All Account Data?",
    deleteAccountWarning: "This will permanently delete all your data from this device, including:",
    deleteAccountWarningProfile: "Profile information",
    deleteAccountWarningBookmarks: "Bookmarks and saved verses",
    deleteAccountWarningNotes: "Personal notes",
    deleteAccountWarningPreferences: "App preferences",
    deleteAccountWarningStreak: "Reading streak data",
    actionCannotBeUndone: "This action cannot be undone.",
    deleteAllData: "Delete All Data",
    accountActions: "Account Actions",
    needHelpWithAccount: "Need help with your account? Contact our support team.",
    profileUpdated: "Profile Updated",
    profileSavedSuccessfully: "Your profile information has been saved successfully.",
    failedToSaveProfile: "Failed to save profile changes. Please try again.",
    dataExported: "Data Exported",
    dataDownloadedSuccessfully: "Your data has been downloaded successfully.",
    exportFailed: "Export Failed",
    failedToExportData: "Failed to export your data. Please try again.",
    accountDataDeleted: "Account Data Deleted",
    allDataRemovedFromDevice: "All your local data has been removed from this device.",
    deletionFailed: "Deletion Failed",
    failedToDeleteAccountData: "Failed to delete account data. Please try again.",
    dailyRemindersEnabled: "Daily Reminders Enabled",
    dailyReminderConfirmation: "You'll receive daily verse reminders at",
    permissionRequired: "Permission Required",
    notificationPermissionMessage: "Please allow notifications to receive daily verse reminders.",
    dailyRemindersDisabled: "Daily Reminders Disabled",
    noMoreDailyReminders: "You will no longer receive daily verse reminders.",
    reminderTimeUpdated: "Reminder Time Updated",
    reminderTimeConfirmation: "Daily reminders will now be sent at",
    settingsUpdated: "Settings Updated",
    preferencesSaved: "Your preferences have been saved.",
    goBackToMorePage: "Go back to More page",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    easternTime: "Eastern Time (EST)",
    centralTime: "Central Time (CST)",
    mountainTime: "Mountain Time (MST)",
    pacificTime: "Pacific Time (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "Giving Impact",
    givingPageSubtitle: "See how your generosity spreads God's word worldwide",
    currentGoalSpreadGodsWord: "Current Goal: Spread God's Word",
    of: "of",
    goal: "goal",
    percentComplete: "% Complete",
    biblesPurchased: "Bibles Purchased",
    biblesDistributed: "Bibles Distributed",
    thisMonthsImpact: "This Month's Impact",
    monthlyDonations: "Monthly Donations",
    livesReached: "Lives Reached",
    joinOurMission: "Join Our Mission",
    givingPageCTADescription: "Your donation helps us purchase and distribute Bibles to those who need God's word most. Every contribution brings the Gospel to someone seeking hope and salvation.",
    globalBibleDistribution: "Global Bible Distribution",
    worldwideImpactComingSoon: "Growing Global Impact",
    worldwideImpactDescription: "We're actively distributing Bibles worldwide. Your donations are reaching communities across the globe, bringing hope and the Gospel to those who need it most.",
    
    // Videos Page
    videosPageTitle: "Faith Videos",
    videosPageSubtitle: "Sermons, Gospel insights, and Christian guidance",
    featuredThisWeek: "Featured This Week",
    handpickedSpiritualContent: "Handpicked spiritual content for your growth",
    loadingError: "Loading Error",
    videoContentNotAvailable: "Some video content may not be available right now.",
    noFeaturedVideoAvailable: "No featured video available",
    browseByCategory: "Browse by Category",
    discoverTailoredContent: "Discover content tailored to your spiritual journey",
    sermons: "Sermons",
    faithMessages: "Faith messages",
    gospelTidbits: "Gospel Tidbits",
    quickInsights: "Quick insights",
    christianAdvice: "Christian Advice",
    lifeGuidance: "Life guidance",
    categoryVideos: "Videos",
    recentVideos: "Recent Videos",
    showAll: "Show All",
    noVideosAvailable: "No videos available",
    checkInternetConnection: "Please check your internet connection and try again",
    views: "views",
    moreVideosComingSoon: "Expanding Video Library",
    moreVideosDescription: "Our collection grows with new sermons, Gospel insights, and Christian advice videos. Explore regularly for fresh spiritual content to strengthen your faith journey.",
    sermon: "Sermon",
    gospelTidbit: "Gospel Tidbit",
    video: "Video",
    
    // Blog Page
    blogPageTitle: "Christian Blog",
    blogPageSubtitle: "Inspiring articles to grow your faith",
    featuredArticle: "Featured Article",
    todaysHighlightedInsight: "Today's highlighted Christian insight",
    by: "By",
    minRead: "min read",
    published: "Published",
    readFullArticle: "Read Full Article",
    recentArticles: "Recent Articles",
    latestInsightsToStrengthen: "Latest insights to strengthen your faith journey",
    min: "min",
    readMore: "Read More",
    browseByTopic: "Browse by Topic",
    exploreContentByThemes: "Explore content organized by spiritual themes",
    articles: "articles",
    neverMissAnArticle: "Never Miss an Article",
    latestChristianInsights: "Get the latest Christian insights and faith-building content delivered to your inbox.",
    subscribeToUpdates: "Subscribe to Updates",
    subscribeToBlog: "Subscribe to Our Blog",
    joinCommunityBiweekly: "Join our community and receive bi-weekly Christian insights and faith-building content delivered to your inbox.",
    biweeklyInsightsInbox: "Get bi-weekly Christian insights and faith-building content delivered to your inbox.",
    nameOptional: "Name (Optional)",
    yourName: "Your name",
    emailAddressRequired: "Email Address *",
    emailPlaceholder: "your.email@example.com",
    subscribing: "Subscribing...",
    biweeklyEmailDisclaimer: "We'll send you updates every two weeks. You can unsubscribe at any time.",
    emailRequired: "Email Required",
    enterEmailToSubscribe: "Please enter your email address to subscribe.",
    successfullySubscribed: "Successfully Subscribed!",
    thankYouSubscribing: "Thank you for subscribing to our blog updates.",
    subscriptionFailed: "Subscription Failed",
    subscriptionError: "There was an error processing your subscription. Please try again.",
    unableToLoadArticles: "Unable to load articles. Please try again later.",
    loadingArticles: "Loading articles...",
    errorLoadingArticles: "Error Loading Articles",
    retry: "Retry",
    
    // Bible Studies Page
    bibleStudiesTitle: "Bible Studies",
    bibleStudiesSubtitle: "Grow deeper in your faith journey",
    featuredStudies: "Featured Studies",
    browseAllStudies: "Browse all Studies",
    searchBibleStudies: "Search Bible studies...",
    allCategory: "All",
    discipleship: "Discipleship",
    encouragement: "Encouragement",
    character: "Character",
    prayer: "Prayer",
    prophecy: "Prophecy",
    love: "Love",
    featured: "Featured",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    lessons: "lessons",
    startStudy: "Start Study",
    moreStudies: "More Studies",
    viewStudy: "View Study",
    noStudiesFound: "No studies found",
    adjustSearchTerms: "Try adjusting your search terms or category filter",
    whatYouLearn: "What You'll Learn:",
    deepBiblicalInsights: "Deep biblical insights and practical applications",
    guidedReflectionQuestions: "Guided reflection questions for personal growth",
    scriptureMemorization: "Scripture memorization and meditation techniques",
    communityDiscussionPoints: "Community discussion points for group study",
    close: "Close",
    lessonOf: "Lesson",
    day: "Day",
    todaysScripture: "Today's Scripture",
    reflectionQuestions: "Reflection Questions",
    todaysPrayer: "Today's Prayer",
    previousLesson: "Previous Lesson",
    completeLesson: "Complete Lesson",
    nextLesson: "Next Lesson",
    lessonCompleted: "Lesson Completed!",
    greatProgress: "Great progress! You're one step closer to completing this study.",
    continueToNextLesson: "Continue to Next Lesson",
    backToStudyOverview: "Back to Study Overview",
    
    // Bible Trivia Page
    bibleTriviaResults: "Bible Trivia Results",
    bibleTriviaTitle: "Bible Trivia",
    bibleExpert: "Bible Expert",
    bibleScholar: "Bible Scholar",
    bibleStudent: "Bible Student",
    keepStudying: "Keep Studying!",
    level: "Level",
    gamesPlayed: "Games Played",
    bestScore: "Best Score",
    playAgain: "Play Again",
    backToHome: "Back to Home",
    questionOf: "Question",
    score: "Score",
    testBiblicalKnowledge: "Test your biblical knowledge",
    latest: "Latest",
    lastScore: "Last Score",
    best: "Best",
    games: "games",
    chooseDifficultyLevel: "Choose Difficulty Level",
    easy: "Easy",
    medium: "Medium",
    difficult: "Difficult",
    easyDescription: "Basic Bible knowledge and well-known stories",
    mediumDescription: "Intermediate biblical facts and characters",
    difficultDescription: "Advanced theology and lesser-known details",
    scoringGuide: "Scoring Guide",
    correctAnswers9to10: "9-10 correct",
    correctAnswers7to8: "7-8 correct",
    correctAnswers5to6: "5-6 correct",
    correctAnswers1to4: "1-4 correct",
    generatingQuestions: "Generating Questions...",
    startTrivia10Questions: "Start Trivia (10 Questions)",
    finishQuiz: "Finish Quiz",
    nextQuestion: "Next Question",
    failedToGenerateTriviaQuestions: "Failed to generate trivia questions. Please try again."
  },
  
  es: {
    // Navigation & Common
    home: "Inicio",
    ask: "Preguntar",
    search: "Buscar",
    more: "Más",
    
    // Home Page
    welcome: "¡Bienvenido!",
    dailyVerse: "Versículo Diario",
    bibleStudyPlans: "Planes de Estudio Bíblico de 3 Días",
    
    // Time-based greetings
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
    askThePastor: "Pregunta al Pastor IA",
    
    // Ask Page
    askPageDescription: "Obtén orientación bíblica basada en las Escrituras con IA",
    feelingsScripture: "Sentimientos y Escritura",
    
    // Search Page
    searchPageDescription: "Busca cualquier versículo bíblico por referencia",
    helpSpreadGodsWord: "Ayuda a Difundir la Palabra de Dios",
    donationAppealText: "El Evangelio en 5 Minutos™ acepta donaciones para llevar la Santa Biblia a más personas en todo el mundo. Tu apoyo nos ayuda a llegar a almas necesitadas de guía espiritual.",
    makeADonation: "Hacer una Donación",
    
    // More Page
    settingsDescription: "Configuración y funciones adicionales",
    language: "Idioma",
    givingImpact: "Impacto de Donaciones",
    givingImpactDesc: "Ve cómo las donaciones difunden la palabra de Dios",
    faithVideos: "Videos de Fe",
    faithVideosDesc: "Sermones, consejos del Evangelio y consejos cristianos",
    christianBlog: "Blog Cristiano",
    christianBlogDesc: "Artículos inspiradores para hacer crecer tu fe",
    settings: "Configuración",
    settingsDesc: "Administra tu perfil y preferencias",
    friends: "Amigos",
    friendsDesc: "Conéctate con otros creyentes",
    privacyStatement: "Declaración de Privacidad",
    privacyStatementDesc: "Aprende cómo protegemos tus datos",
    endUserAgreement: "Acuerdo de Usuario Final",
    endUserAgreementDesc: "Términos y condiciones de uso",
    donate: "Donar",
    donateDesc: "Apoya nuestra misión de difundir el Evangelio",
    supportLegal: "Soporte y Legal",
    supportPrivacyRights: "Soporte y Derechos de Privacidad",
    comingSoon: "Nueva Función",
    
    // Common Actions
    follow: "Seguir",
    share: "Comparte El Evangelio en 5 Minutos",
    shareText: "¡Descubre versículos bíblicos diarios y orientación espiritual con la aplicación El Evangelio en 5 Minutos!",
    
    // Footer
    visitWebsite: "Visita nuestro sitio web para más recursos",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "El Evangelio en 5 Minutos™",
    appTagline: "Llevando la palabra de Dios al mundo",
    version: "Versión 1.0.0",
    
    // Ask Page specific
    askPageShareText: "¡Haz preguntas al Pastor IA y obtén orientación basada en las Escrituras!",
    
    // AI Pastor Section
    aiPastor: "Pastor IA",
    scriptureGuidance: "Orientación basada en las Escrituras impulsada por sabiduría bíblica",
    welcomeHelp: "¡Bienvenido! Estoy aquí para ayudarte",
    askAnythingGodsWord: "Pregúntame lo que quieras sobre la palabra de Dios y te ayudaré a encontrar respuestas en las Escrituras.",
    tryTheseQuestions: "Prueba estas preguntas:",
    growStrongerFaith: "¿Cómo puedo fortalecer mi fe?",
    bibleSayAnxiety: "¿Qué dice la Biblia sobre la ansiedad?",
    knowGodsWill: "¿Cómo sé la voluntad de Dios para mi vida?",
    connectionTrouble: "Estoy teniendo problemas de conexión en este momento. Por favor, inténtalo de nuevo en un momento, y estaré aquí para ayudarte con tu pregunta espiritual.",
    aiPastorUnavailable: "Pastor IA No Disponible",
    seekingWisdomScripture: "El Pastor IA está buscando sabiduría en las Escrituras...",
    askBibleQuestion: "Haz tu pregunta bíblica aquí...",
    clearConversation: "Limpiar conversación",
    copyMessage: "Copiar mensaje",
    sendQuestion: "Enviar pregunta",
    biblicallyGuidedResponses: "Respuestas guiadas bíblicamente por IA",
    
    // AI Pastor Dialog
    askTheAIPastor: "Pregunta al Pastor IA",
    aiPoweredGuidance: "Orientación bíblica y consejería espiritual impulsada por IA basada en las Escrituras",
    pastorGreeting: "¡Hola! Estoy aquí para proporcionar orientación bíblica y consejería espiritual. ¿Qué hay en tu corazón hoy? Ya sea que enfrentes desafíos, tengas preguntas sobre la fe o necesites oración, estoy aquí para ayudarte con la sabiduría de Dios.",
    technicalDifficulty: "Pido disculpas por la dificultad técnica. Por favor, ten en cuenta que Dios escucha tu corazón incluso cuando la tecnología falla. Siéntete libre de intentar tu pregunta de nuevo.",
    pastor: "Pastor",
    scriptureReferences: "Referencias de las Escrituras:",
    needPrayerFor: "¿Necesitas oración por:",
    healing: "sanación",
    guidance: "orientación",
    strength: "fortaleza",
    peace: "paz",
    commonQuestionsHelp: "Preguntas comunes con las que puedo ayudarte:",
    askAnythingFaith: "Pregúntame lo que quieras sobre la fe, la vida o la Biblia...",
    guidanceRootedGodsWord: "Orientación arraigada en la Palabra de Dios • Presiona Enter para enviar",
    seekingWisdom: "Buscando sabiduría en las Escrituras...",
    
    // Friends functionality
    friendsPageDescription: "Conecta con otros creyentes en tu jornada espiritual",
    searchFriends: "Buscar Amigos",
    myFriends: "Mis Amigos",
    requests: "Solicitudes",
    findNewFriends: "Encontrar Nuevos Amigos",
    searchByNameOrEmail: "Buscar por nombre o email",
    searchPlaceholder: "Nombre o email",
    addFriend: "Agregar Amigo",
    remove: "Eliminar",
    accept: "Aceptar",
    decline: "Rechazar",
    pending: "Pendiente",
    friendsListDescription: "Tus amigos espirituales",
    noFriendsFound: "No se encontraron amigos",
    incomingRequests: "Solicitudes Recibidas",
    outgoingRequests: "Solicitudes Enviadas",
    startSearching: "Comienza buscando amigos para conectarte",
    noIncomingRequests: "No hay solicitudes pendientes",
    noOutgoingRequests: "No hay solicitudes enviadas pendientes",
    searching: "Buscando...",
    loading: "Cargando...",
    success: "Éxito",
    error: "Error",
    friendRequestSent: "¡Solicitud de amistad enviada exitosamente!",
    friendRequestFailed: "Error al enviar solicitud de amistad",
    friendRequestAccepted: "¡Solicitud de amistad aceptada!",
    friendRequestDeclined: "Solicitud de amistad rechazada",
    friendRemoved: "Amigo eliminado exitosamente",
    
    // Saved Verses
    savedVerses: "Versículos Guardados",
    verse: "versículo",
    verses: "versículos",
    saved: "guardados",
    noSavedVersesYet: "Aún No Hay Versículos Guardados",
    bookmarkVersesMessage: "Cuando guardes versículos, aparecerán aquí para fácil acceso.",
    tapToViewVerseInContext: "Toca para ver este versículo en contexto",
    read: "Leer",
    bookmarkRemoved: "Marcador Eliminado",
    removedFromSavedVerses: "eliminado de versículos guardados.",
    errorLoadingVerse: "Error al Cargar Versículo",
    couldNotLoadVerse: "No se pudo cargar el contenido del versículo. Por favor, inténtalo de nuevo.",
    scripture: "Escritura",
    bibleVerse: "Versículo Bíblico",
    noVerseContentAvailable: "No hay contenido del versículo disponible",
    
    // Support Page
    supportAndPrivacy: "Soporte y Privacidad",
    contactSupport: "Contactar Soporte",
    contactSupportDesc: "¿Necesitas ayuda? ¿Tienes preguntas? Estamos aquí para apoyar tu viaje espiritual.",
    messageOnFacebook: "Envíanos un mensaje en Facebook",
    legalDocuments: "Documentos Legales",
    viewLegalPolicies: "Ver nuestras políticas legales y términos",
    privacyPolicy: "Política de Privacidad",
    howWeProtectData: "Cómo protegemos tus datos",
    termsOfService: "Términos de Servicio",
    ourTermsAndConditions: "Nuestros términos y condiciones",
    yourPrivacyRights: "Tus Derechos de Privacidad",
    managePersonalData: "Administra tus datos personales y configuración de privacidad.",
    exportMyData: "Exportar Mis Datos",
    downloadCopyOfData: "Descarga una copia de tus datos personales",
    export: "Exportar",
    deleteMyData: "Eliminar Mis Datos",
    permanentlyRemoveInfo: "Eliminar permanentemente toda tu información personal",
    deleteData: "Eliminar Datos",
    confirmDelete: "Confirmar Eliminación",
    deleting: "Eliminando...",
    areYouSure: "¿Estás seguro?",
    deleteWarning: "Esto eliminará permanentemente todos tus datos incluyendo tu perfil, contador de rachas, preferencias y configuraciones. Esta acción no se puede deshacer.",
    cancel: "Cancelar",
    crisisResources: "Recursos de Crisis",
    crisisResourcesDesc: "Si estás en crisis, por favor contacta estos recursos",
    nationalSuicidePrevention: "Línea Nacional de Prevención del Suicidio",
    crisisTextLine: "Línea de Texto de Crisis",
    emergencyServices: "Servicios de Emergencia",
    accountDeletedSuccess: "Tu cuenta y todos los datos asociados han sido eliminados permanentemente de nuestros servidores. La aplicación se reiniciará ahora.",
    failedToDeleteAccount: "No se pudo eliminar tu cuenta de nuestros servidores. Por favor contacta al soporte para asistencia.",
    localDataDeleted: "Tus datos locales han sido eliminados exitosamente. La aplicación se reiniciará ahora.",
    noUserDataFound: "No se encontraron datos de usuario. La aplicación se reiniciará ahora.",
    errorDeletingAccount: "Ocurrió un error al eliminar tu cuenta. Por favor contacta al soporte para asistencia.",
    appInformation: "Información de la Aplicación",
    build: "Compilación",
    platform: "Plataforma",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Política de Privacidad",
    effectiveDate: "Fecha de Vigencia:",
    privacyIntro: "El Evangelio en 5 Minutos (\"nosotros\", \"nuestro\" o \"nos\") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y salvaguardamos su información cuando usa nuestra aplicación móvil.",
    infoWeCollect: "Información que Recopilamos",
    personalInformation: "Información Personal",
    personalInfoDesc: "Cuando se registra, recopilamos su nombre, apellido, dirección de correo electrónico, número de teléfono y mes/día de nacimiento para personalizar su viaje espiritual.",
    usageData: "Datos de Uso",
    usageDataDesc: "Rastreamos su uso diario de la aplicación, contadores de rachas, preferencias de versículos y configuración de idioma para mejorar su experiencia y proporcionar contenido personalizado.",
    aiPastorQuestions: "Preguntas al Pastor IA",
    aiPastorQuestionsDesc: "Las preguntas enviadas a nuestra función \"Pregunta al Pastor\" son procesadas por los servicios de OpenAI para proporcionar orientación bíblica. Estas interacciones están sujetas a la política de privacidad de OpenAI.",
    howWeUseInfo: "Cómo Usamos su Información",
    usePersonalizeDailyVerses: "Personalizar versículos diarios y contenido espiritual",
    useTrackProgress: "Rastrear su progreso y mantener contadores de rachas",
    useProvideBiblicalGuidance: "Proporcionar orientación bíblica impulsada por IA y respuestas",
    useSendRelevantContent: "Enviar contenido espiritual relevante según sus preferencias",
    useImproveApp: "Mejorar la funcionalidad de la aplicación y la experiencia del usuario",
    dataSharingThirdParties: "Compartir Datos y Terceros",
    openAIServicesLabel: "Servicios de OpenAI:",
    openAIServicesDesc: "Sus preguntas \"Pregunta al Pastor\" son procesadas por OpenAI para generar respuestas bíblicas.",
    openAIPrivacyPolicyLink: "Política de privacidad de OpenAI",
    noSellingLabel: "No Vendemos:",
    noSellingDesc: "No vendemos, alquilamos ni comerciamos su información personal a terceros.",
    analyticsLabel: "Análisis:",
    analyticsDesc: "Podemos usar datos de uso anonimizados para mejorar el rendimiento y las características de la aplicación.",
    dataStorageSecurity: "Almacenamiento y Seguridad de Datos",
    dataStorageSecurityDesc: "Su información personal se almacena localmente en su dispositivo y en servidores seguros. Implementamos medidas de seguridad apropiadas para proteger sus datos contra acceso no autorizado, alteración, divulgación o destrucción.",
    yourRightsChoices: "Sus Derechos y Opciones",
    rightsAccessLabel: "Acceso:",
    rightsAccessDesc: "Puede ver su información personal en la configuración de la aplicación",
    rightsCorrectionLabel: "Corrección:",
    rightsCorrectionDesc: "Puede actualizar su información en cualquier momento",
    rightsDeletionLabel: "Eliminación:",
    rightsDeletionDesc: "Puede eliminar su cuenta y todos los datos asociados",
    rightsPortabilityLabel: "Portabilidad de Datos:",
    rightsPortabilityDesc: "Puede exportar sus datos en un formato legible",
    childrensPrivacy: "Privacidad de los Niños",
    childrensPrivacyDesc: "Nuestra aplicación está diseñada para usuarios de 13 años o más. No recopilamos conscientemente información personal de niños menores de 13 años. Si cree que hemos recopilado información de un niño menor de 13 años, contáctenos de inmediato.",
    dataRetention: "Retención de Datos",
    dataRetentionDesc: "Conservamos su información personal mientras su cuenta esté activa o según sea necesario para proporcionar servicios. Puede solicitar la eliminación de sus datos en cualquier momento a través de la configuración de la aplicación.",
    changesToPolicy: "Cambios a Esta Política",
    changesToPolicyDesc: "Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos de cualquier cambio material publicando la nueva política en la aplicación y actualizando la fecha de vigencia.",
    contactUs: "Contáctenos",
    contactUsIntro: "Si tiene preguntas sobre esta Política de Privacidad, contáctenos:",
    contactEmailLabel: "Correo electrónico:",
    contactFacebookLabel: "Facebook:",
    contactAddressLabel: "Dirección:",
    
    // Terms of Service Page
    tosWelcomeText: "Bienvenido a El Evangelio en 5 Minutos. Estos Términos de Servicio (\"Términos\") rigen su uso de nuestra aplicación móvil y servicios. Al usar nuestra aplicación, usted acepta estos Términos.",
    tosSection1Title: "1. Licencia de Uso",
    tosSection1Content: "Le otorgamos una licencia limitada, no exclusiva e intransferible para usar El Evangelio en 5 Minutos para su uso personal y no comercial. Esta licencia no incluye el derecho de revender, redistribuir o crear obras derivadas.",
    tosSection2Title: "2. Uso Aceptable",
    tosSection2Intro: "Usted acepta usar nuestra aplicación de manera consistente con:",
    tosSection2Item1: "Valores cristianos y principios bíblicos",
    tosSection2Item2: "Compromiso respetuoso con el contenido espiritual",
    tosSection2Item3: "Solo propósitos legales",
    tosSection2Item4: "Crecimiento espiritual personal y educación",
    tosSection2NotIntro: "Usted acepta NO:",
    tosSection2NotItem1: "Usar la aplicación con fines comerciales sin permiso",
    tosSection2NotItem2: "Intentar realizar ingeniería inversa o hackear la aplicación",
    tosSection2NotItem3: "Compartir contenido inapropiado u ofensivo",
    tosSection2NotItem4: "Violar cualquier ley o regulación aplicable",
    tosSection3Title: "3. Funciones Impulsadas por IA",
    tosSection3Intro: "Nuestra función \"Pregunta al Pastor\" utiliza inteligencia artificial para proporcionar orientación bíblica. Por favor entienda:",
    tosSection3Item1: "Las respuestas de IA son para fines educativos e inspiradores",
    tosSection3Item2: "Las respuestas no deben reemplazar el asesoramiento profesional o médico",
    tosSection3Item3: "El contenido generado por IA puede contener errores o limitaciones",
    tosSection3Item4: "Para asuntos espirituales serios, consulte con un pastor o consejero calificado",
    tosSection4Title: "4. Contenido y Propiedad Intelectual",
    tosSection4BiblicalContentLabel: "Contenido Bíblico:",
    tosSection4BiblicalContentText: "Las citas de las Escrituras provienen de traducciones de dominio público o se usan bajo licencias apropiadas.",
    tosSection4OriginalContentLabel: "Contenido Original:",
    tosSection4OriginalContentText: "Nuestro contenido original, incluidos planes de estudio, comentarios y características de la aplicación, están protegidos por derechos de autor y siguen siendo nuestra propiedad.",
    tosSection4UserContentLabel: "Contenido del Usuario:",
    tosSection4UserContentText: "Cualquier pregunta o aporte que proporcione puede usarse para mejorar nuestros servicios respetando su privacidad.",
    tosSection5Title: "5. Descargos de Responsabilidad",
    tosSection5EducationalLabel: "Propósito Educativo:",
    tosSection5EducationalText: "Esta aplicación es para fines educativos e inspiradores. No es un sustituto de:",
    tosSection5Item1: "Consejería pastoral profesional",
    tosSection5Item2: "Asesoramiento médico o psicológico",
    tosSection5Item3: "Asesoramiento legal o financiero",
    tosSection5Item4: "Intervención en crisis o servicios de emergencia",
    tosSection5DoctrinalLabel: "Neutralidad Doctrinal:",
    tosSection5DoctrinalText: "Si bien nos esforzamos por la precisión bíblica, las interpretaciones pueden variar entre las denominaciones cristianas. Consulte a su iglesia local para orientación doctrinal.",
    tosSection6Title: "6. Limitación de Responsabilidad",
    tosSection6Content: "En la máxima medida permitida por la ley, El Evangelio en 5 Minutos y sus creadores no serán responsables de ningún daño indirecto, incidental, especial o consecuente que surja de su uso de la aplicación, incluidas, entre otras, decisiones espirituales, emocionales o personales basadas en el contenido de la aplicación.",
    tosSection7Title: "7. Terminación",
    tosSection7Content: "Puede dejar de usar la aplicación en cualquier momento y eliminar su cuenta. Nos reservamos el derecho de terminar o suspender el acceso a los usuarios que violen estos Términos o participen en comportamientos inapropiados.",
    tosSection8Title: "8. Actualizaciones y Cambios",
    tosSection8Content: "Podemos actualizar estos Términos periódicamente. El uso continuado de la aplicación después de los cambios constituye la aceptación de los nuevos Términos. Los cambios materiales se comunicarán a través de la aplicación.",
    tosSection9Title: "9. Ley Aplicable",
    tosSection9Content: "Estos Términos se rigen por las leyes de los Estados Unidos. Cualquier disputa se resolverá mediante arbitraje vinculante de acuerdo con los principios cristianos de reconciliación cuando sea posible.",
    tosSection10Title: "10. Información de Contacto",
    tosSection10Intro: "Para preguntas sobre estos Términos, contáctenos:",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "El Evangelio en 5 Minutos, Departamento Legal",
    tosFinalAcknowledgement: "Al usar El Evangelio en 5 Minutos, usted reconoce que ha leído, entendido y acepta estar sujeto a estos Términos de Servicio.",
    
    // Donation Page
    donationPageTitle: "Hacer una Donación",
    donationPageSubtitle: "Comparte el Amor de Dios con Tu Generosidad",
    donationMissionText: "Apoya nuestra misión de difundir la palabra de Dios alrededor del mundo a través de",
    donationImpactText: "Cada donación trae esperanza y salvación a alguien necesitado",
    totalDonationsLabel: "Amor Total Compartido a Través de Donaciones",
    soulsTouchedLabel: "Almas Tocadas con la Palabra de Dios",
    bibleImpactText: "Cada Biblia trae esperanza, sanación y transformación eterna",
    chooseGiftTitle: "Elige Tu Regalo de Amor",
    chooseGiftSubtitle: "Cada regalo planta semillas de esperanza eterna",
    chooseGiftDescription: "Únete a miles difundiendo el amor de Dios en todo el mundo",
    chooseAmountLabel: "Elige Tu Monto de Regalo",
    chooseAmountDescription: "Selecciona el monto que habla a tu corazón",
    popularAmountsText: "Montos populares elegidos por nuestra amorosa comunidad",
    customAmountLabel: "O Ingresa el Deseo de Tu Corazón",
    customAmountDescription: "Cada monto, sin importar el tamaño, hace la diferencia",
    customAmountPlaceholder: "Ingresa el monto de tu regalo amoroso...",
    yourGiftLabel: "Tu Regalo",
    thankYouGenerousHeart: "¡Gracias por tu corazón generoso!",
    processing: "Procesando...",
    importantInformation: "Información Importante",
    donationDisclaimer: "Las donaciones se procesan de forma segura a través de Stripe. No se proporcionan bienes o servicios a cambio de donaciones.",
    taxAdvisorNote: "Consulte a su asesor fiscal sobre la deducibilidad de las donaciones. Para preguntas sobre donaciones o reembolsos, contacte a nuestro equipo de soporte.",
    agreeToTermsPrefix: "Al donar, aceptas nuestros",
    and: "y",
    yourImpactTitle: "Tu Impacto",
    yourImpactDescription: "Cada donación nos ayuda a distribuir Biblias y compartir la palabra de Dios con quienes más la necesitan. Juntos, estamos llevando esperanza y salvación a comunidades en todo el mundo.",
    ourMissionTitle: "Nuestra Misión",
    ourMissionDescription: "Cada donación nos ayuda a alcanzar más almas con versículos bíblicos diarios, orientación espiritual y el poder transformador de la palabra de Dios. Tu generosidad hace posible el impacto eterno.",
    completeDonation: "Completar Donación",
    completeYourDonation: "Completa Tu",
    cancelPayment: "Cancelar",
    paymentFailed: "Pago Fallido",
    paymentError: "Error de Pago",
    donationSuccessful: "¡Donación Exitosa!",
    donationSuccessMessage: "Gracias por tu donación para difundir la palabra de Dios.",
    paymentErrorOccurred: "Ocurrió un error al procesar tu pago.",
    unexpectedError: "Ocurrió un error inesperado.",
    invalidAmount: "Monto Inválido",
    invalidAmountMessage: "Por favor ingresa un monto entre $1 y $10,000.",
    applePayNotAvailable: "Apple Pay No Disponible",
    applePayNotAvailableMessage: "Por favor agrega una tarjeta a Apple Wallet para usar Apple Pay.",
    verificationFailed: "Verificación Fallida",
    verificationFailedMessage: "El pago puede estar todavía procesándose. Por favor verifica más tarde.",
    paymentProcessingFailed: "Tu donación no pudo ser procesada. Por favor intenta de nuevo.",
    paymentSetupFailed: "Configuración de Pago Fallida",
    applePaySetupFailed: "Falló la configuración de Apple Pay. Por favor intenta de nuevo.",
    paymentSetupFailedGeneric: "Falló la configuración del pago. Por favor intenta de nuevo.",
    failedToCreatePayment: "Falló la creación de la intención de pago",
    paymentVerificationFailed: "Verificación de pago fallida",
    goBackToMore: "Volver a la página de Más",
    cancelPaymentAction: "Cancelar pago",
    
    // Settings Page
    profileInformation: "Información del Perfil",
    edit: "Editar",
    firstName: "Nombre",
    lastName: "Apellido",
    nameCannotBeChanged: "El nombre no se puede cambiar",
    email: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    birthMonth: "Mes de Nacimiento",
    birthDay: "Día de Nacimiento",
    timezone: "Zona Horaria",
    timezoneCannotBeChanged: "La zona horaria no se puede cambiar",
    saveProfile: "Guardar Perfil",
    bibleVersion: "Versión de la Biblia",
    loadingVersions: "Cargando versiones...",
    notifications: "Notificaciones",
    dailyReminders: "Recordatorios Diarios",
    reminderToReadDailyVerse: "Recibe recordatorios para leer tu versículo diario",
    reminderTime: "Hora del Recordatorio",
    testNotification: "Probar Notificación",
    streakNotifications: "Notificaciones de Racha",
    celebrateReadingStreaks: "Celebra tus rachas de lectura",
    emailUpdates: "Actualizaciones por Correo",
    receiveNewsletters: "Recibir boletines y actualizaciones",
    appSettings: "Configuración de la App",
    soundEffects: "Efectos de Sonido",
    enableAppSounds: "Activar sonidos y notificaciones de la app",
    appLanguage: "Idioma de la App",
    dataPrivacy: "Datos y Privacidad",
    viewPrivacyPolicy: "Ver Política de Privacidad",
    deleteAccountData: "Eliminar Datos de la Cuenta",
    deleteAllAccountData: "¿Eliminar Todos los Datos de la Cuenta?",
    deleteAccountWarning: "Esto eliminará permanentemente todos tus datos de este dispositivo, incluyendo:",
    deleteAccountWarningProfile: "Información del perfil",
    deleteAccountWarningBookmarks: "Marcadores y versículos guardados",
    deleteAccountWarningNotes: "Notas personales",
    deleteAccountWarningPreferences: "Preferencias de la app",
    deleteAccountWarningStreak: "Datos de racha de lectura",
    actionCannotBeUndone: "Esta acción no se puede deshacer.",
    deleteAllData: "Eliminar Todos los Datos",
    accountActions: "Acciones de la Cuenta",
    needHelpWithAccount: "¿Necesitas ayuda con tu cuenta? Contacta a nuestro equipo de soporte.",
    profileUpdated: "Perfil Actualizado",
    profileSavedSuccessfully: "Tu información de perfil se ha guardado exitosamente.",
    failedToSaveProfile: "No se pudo guardar los cambios del perfil. Por favor intenta de nuevo.",
    dataExported: "Datos Exportados",
    dataDownloadedSuccessfully: "Tus datos se han descargado exitosamente.",
    exportFailed: "Exportación Fallida",
    failedToExportData: "No se pudieron exportar tus datos. Por favor intenta de nuevo.",
    accountDataDeleted: "Datos de la Cuenta Eliminados",
    allDataRemovedFromDevice: "Todos tus datos locales han sido eliminados de este dispositivo.",
    deletionFailed: "Eliminación Fallida",
    failedToDeleteAccountData: "No se pudieron eliminar los datos de la cuenta. Por favor intenta de nuevo.",
    dailyRemindersEnabled: "Recordatorios Diarios Activados",
    dailyReminderConfirmation: "Recibirás recordatorios de versículos diarios a las",
    permissionRequired: "Permiso Requerido",
    notificationPermissionMessage: "Por favor permite las notificaciones para recibir recordatorios de versículos diarios.",
    dailyRemindersDisabled: "Recordatorios Diarios Desactivados",
    noMoreDailyReminders: "Ya no recibirás recordatorios de versículos diarios.",
    reminderTimeUpdated: "Hora del Recordatorio Actualizada",
    reminderTimeConfirmation: "Los recordatorios diarios ahora se enviarán a las",
    settingsUpdated: "Configuración Actualizada",
    preferencesSaved: "Tus preferencias han sido guardadas.",
    goBackToMorePage: "Volver a la página de Más",
    january: "Enero",
    february: "Febrero",
    march: "Marzo",
    april: "Abril",
    may: "Mayo",
    june: "Junio",
    july: "Julio",
    august: "Agosto",
    september: "Septiembre",
    october: "Octubre",
    november: "Noviembre",
    december: "Diciembre",
    easternTime: "Hora del Este (EST)",
    centralTime: "Hora Central (CST)",
    mountainTime: "Hora de la Montaña (MST)",
    pacificTime: "Hora del Pacífico (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "Impacto de Donaciones",
    givingPageSubtitle: "Ve cómo tu generosidad difunde la palabra de Dios en todo el mundo",
    currentGoalSpreadGodsWord: "Meta Actual: Difundir la Palabra de Dios",
    of: "de",
    goal: "meta",
    percentComplete: "% Completado",
    biblesPurchased: "Biblias Compradas",
    biblesDistributed: "Biblias Distribuidas",
    thisMonthsImpact: "Impacto de Este Mes",
    monthlyDonations: "Donaciones Mensuales",
    livesReached: "Vidas Alcanzadas",
    joinOurMission: "Únete a Nuestra Misión",
    givingPageCTADescription: "Tu donación nos ayuda a comprar y distribuir Biblias a quienes más necesitan la palabra de Dios. Cada contribución lleva el Evangelio a alguien que busca esperanza y salvación.",
    globalBibleDistribution: "Distribución Global de Biblias",
    worldwideImpactComingSoon: "Impacto Global Creciente",
    worldwideImpactDescription: "Estamos distribuyendo activamente Biblias en todo el mundo. Tus donaciones están llegando a comunidades de todo el globo, llevando esperanza y el Evangelio a quienes más lo necesitan.",
    
    // Videos Page
    videosPageTitle: "Videos de Fe",
    videosPageSubtitle: "Sermones, perspectivas del Evangelio y orientación cristiana",
    featuredThisWeek: "Destacado Esta Semana",
    handpickedSpiritualContent: "Contenido espiritual seleccionado para tu crecimiento",
    loadingError: "Error de Carga",
    videoContentNotAvailable: "Algún contenido de video puede no estar disponible en este momento.",
    noFeaturedVideoAvailable: "No hay video destacado disponible",
    browseByCategory: "Explorar por Categoría",
    discoverTailoredContent: "Descubre contenido adaptado a tu viaje espiritual",
    sermons: "Sermones",
    faithMessages: "Mensajes de fe",
    gospelTidbits: "Perspectivas del Evangelio",
    quickInsights: "Ideas rápidas",
    christianAdvice: "Consejos Cristianos",
    lifeGuidance: "Guía de vida",
    categoryVideos: "Videos",
    recentVideos: "Videos Recientes",
    showAll: "Mostrar Todo",
    noVideosAvailable: "No hay videos disponibles",
    checkInternetConnection: "Por favor verifica tu conexión a internet e intenta nuevamente",
    views: "vistas",
    moreVideosComingSoon: "Biblioteca de Videos en Expansión",
    moreVideosDescription: "Nuestra colección crece con nuevos sermones, perspectivas del Evangelio y videos de consejos cristianos. Explora regularmente para obtener contenido espiritual fresco que fortalezca tu camino de fe.",
    sermon: "Sermón",
    gospelTidbit: "Perspectiva del Evangelio",
    video: "Video",
    
    // Blog Page
    blogPageTitle: "Blog Cristiano",
    blogPageSubtitle: "Artículos inspiradores para hacer crecer tu fe",
    featuredArticle: "Artículo Destacado",
    todaysHighlightedInsight: "Perspectiva cristiana destacada de hoy",
    by: "Por",
    minRead: "min de lectura",
    published: "Publicado",
    readFullArticle: "Leer Artículo Completo",
    recentArticles: "Artículos Recientes",
    latestInsightsToStrengthen: "Últimas perspectivas para fortalecer tu viaje de fe",
    min: "min",
    readMore: "Leer Más",
    browseByTopic: "Explorar por Tema",
    exploreContentByThemes: "Explora contenido organizado por temas espirituales",
    articles: "artículos",
    neverMissAnArticle: "Nunca Te Pierdas un Artículo",
    latestChristianInsights: "Recibe las últimas perspectivas cristianas y contenido edificador de fe en tu bandeja de entrada.",
    subscribeToUpdates: "Suscribirse a Actualizaciones",
    subscribeToBlog: "Suscríbete a Nuestro Blog",
    joinCommunityBiweekly: "Únete a nuestra comunidad y recibe perspectivas cristianas quincenales y contenido edificador de fe en tu bandeja de entrada.",
    biweeklyInsightsInbox: "Recibe perspectivas cristianas quincenales y contenido edificador de fe en tu bandeja de entrada.",
    nameOptional: "Nombre (Opcional)",
    yourName: "Tu nombre",
    emailAddressRequired: "Dirección de Correo Electrónico *",
    emailPlaceholder: "tu.correo@ejemplo.com",
    subscribing: "Suscribiendo...",
    biweeklyEmailDisclaimer: "Te enviaremos actualizaciones cada dos semanas. Puedes cancelar la suscripción en cualquier momento.",
    emailRequired: "Correo Electrónico Requerido",
    enterEmailToSubscribe: "Por favor ingresa tu dirección de correo electrónico para suscribirte.",
    successfullySubscribed: "¡Suscripción Exitosa!",
    thankYouSubscribing: "Gracias por suscribirte a las actualizaciones de nuestro blog.",
    subscriptionFailed: "Suscripción Fallida",
    subscriptionError: "Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.",
    unableToLoadArticles: "No se pueden cargar los artículos. Por favor intenta más tarde.",
    loadingArticles: "Cargando artículos...",
    errorLoadingArticles: "Error al Cargar Artículos",
    retry: "Reintentar",
    
    // Bible Studies Page
    bibleStudiesTitle: "Estudios Bíblicos",
    bibleStudiesSubtitle: "Profundiza en tu camino de fe",
    featuredStudies: "Estudios Destacados",
    browseAllStudies: "Explorar Todos los Estudios",
    searchBibleStudies: "Buscar estudios bíblicos...",
    allCategory: "Todos",
    discipleship: "Discipulado",
    encouragement: "Ánimo",
    character: "Carácter",
    prayer: "Oración",
    prophecy: "Profecía",
    love: "Amor",
    featured: "Destacado",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    lessons: "lecciones",
    startStudy: "Comenzar Estudio",
    moreStudies: "Más Estudios",
    viewStudy: "Ver Estudio",
    noStudiesFound: "No se encontraron estudios",
    adjustSearchTerms: "Intenta ajustar tus términos de búsqueda o filtro de categoría",
    whatYouLearn: "Lo que Aprenderás:",
    deepBiblicalInsights: "Profundas perspectivas bíblicas y aplicaciones prácticas",
    guidedReflectionQuestions: "Preguntas de reflexión guiadas para el crecimiento personal",
    scriptureMemorization: "Técnicas de memorización y meditación de las Escrituras",
    communityDiscussionPoints: "Puntos de discusión comunitaria para estudio en grupo",
    close: "Cerrar",
    lessonOf: "Lección",
    day: "Día",
    todaysScripture: "Escritura de Hoy",
    reflectionQuestions: "Preguntas de Reflexión",
    todaysPrayer: "Oración de Hoy",
    previousLesson: "Lección Anterior",
    completeLesson: "Completar Lección",
    nextLesson: "Siguiente Lección",
    lessonCompleted: "¡Lección Completada!",
    greatProgress: "¡Buen progreso! Estás un paso más cerca de completar este estudio.",
    continueToNextLesson: "Continuar a la Siguiente Lección",
    backToStudyOverview: "Volver a la Descripción del Estudio",
    
    // Bible Trivia Page
    bibleTriviaResults: "Resultados de Trivia Bíblica",
    bibleTriviaTitle: "Trivia Bíblica",
    bibleExpert: "Experto Bíblico",
    bibleScholar: "Erudito Bíblico",
    bibleStudent: "Estudiante Bíblico",
    keepStudying: "¡Sigue Estudiando!",
    level: "Nivel",
    gamesPlayed: "Juegos Jugados",
    bestScore: "Mejor Puntuación",
    playAgain: "Jugar de Nuevo",
    backToHome: "Volver al Inicio",
    questionOf: "Pregunta",
    score: "Puntuación",
    testBiblicalKnowledge: "Pon a prueba tu conocimiento bíblico",
    latest: "Último",
    lastScore: "Última Puntuación",
    best: "Mejor",
    games: "juegos",
    chooseDifficultyLevel: "Elegir Nivel de Dificultad",
    easy: "Fácil",
    medium: "Medio",
    difficult: "Difícil",
    easyDescription: "Conocimiento bíblico básico e historias conocidas",
    mediumDescription: "Hechos y personajes bíblicos intermedios",
    difficultDescription: "Teología avanzada y detalles menos conocidos",
    scoringGuide: "Guía de Puntuación",
    correctAnswers9to10: "9-10 correctas",
    correctAnswers7to8: "7-8 correctas",
    correctAnswers5to6: "5-6 correctas",
    correctAnswers1to4: "1-4 correctas",
    generatingQuestions: "Generando Preguntas...",
    startTrivia10Questions: "Comenzar Trivia (10 Preguntas)",
    finishQuiz: "Terminar Prueba",
    nextQuestion: "Siguiente Pregunta",
    failedToGenerateTriviaQuestions: "Error al generar preguntas de trivia. Por favor, inténtalo de nuevo."
  },
  
  fr: {
    // Navigation & Common
    home: "Accueil",
    ask: "Demander",
    search: "Rechercher",
    more: "Plus",
    
    // Home Page
    welcome: "Bienvenue !",
    dailyVerse: "Verset Quotidien",
    bibleStudyPlans: "Plans d'Étude Biblique de 3 Jours",
    askThePastor: "Demandez au Pasteur IA",
    
    // Time-based greetings
    goodMorning: "Bonjour",
    goodAfternoon: "Bon après-midi",
    goodEvening: "Bonsoir",
    
    // Ask Page
    askPageDescription: "Obtenez des conseils bibliques basés sur les Écritures avec l'IA",
    feelingsScripture: "Sentiments et Écriture",
    
    // Search Page
    searchPageDescription: "Recherchez n'importe quel verset biblique par référence",
    helpSpreadGodsWord: "Aidez à Répandre la Parole de Dieu",
    donationAppealText: "L'Évangile en 5 Minutes™ accepte les dons pour apporter la Sainte Bible à plus de personnes dans le monde entier. Votre soutien nous aide à atteindre les âmes qui ont besoin de guidance spirituelle.",
    makeADonation: "Faire un Don",
    
    // More Page
    settingsDescription: "Paramètres et fonctionnalités supplémentaires",
    language: "Langue",
    givingImpact: "Impact des Dons",
    givingImpactDesc: "Voyez comment les dons répandent la parole de Dieu",
    faithVideos: "Vidéos de Foi",
    faithVideosDesc: "Sermons, conseils évangéliques et conseils chrétiens",
    christianBlog: "Blog Chrétien",
    christianBlogDesc: "Articles inspirants pour faire grandir votre foi",
    settings: "Paramètres",
    settingsDesc: "Gérez votre profil et vos préférences",
    friends: "Amis",
    friendsDesc: "Connectez-vous avec d'autres croyants",
    privacyStatement: "Déclaration de Confidentialité",
    privacyStatementDesc: "Apprenez comment nous protégeons vos données",
    endUserAgreement: "Accord Utilisateur Final",
    endUserAgreementDesc: "Conditions générales d'utilisation",
    donate: "Faire un Don",
    donateDesc: "Soutenez notre mission de répandre l'Évangile",
    supportLegal: "Support et Légal",
    supportPrivacyRights: "Support et Droits de Confidentialité",
    comingSoon: "Nouvelle Fonctionnalité",
    
    // Common Actions
    follow: "Suivre",
    share: "Partager L'Évangile en 5 Minutes",
    shareText: "Découvrez des versets bibliques quotidiens et des conseils spirituels avec l'application L'Évangile en 5 Minutes !",
    
    // Footer
    visitWebsite: "Visitez notre site web pour plus de ressources",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "L'Évangile en 5 Minutes™",
    appTagline: "Apporter la parole de Dieu au monde",
    version: "Version 1.0.0",
    
    // Ask Page specific
    askPageShareText: "Posez des questions au Pasteur IA et obtenez des conseils basés sur les Écritures !",
    
    // AI Pastor Section
    aiPastor: "Pasteur IA",
    scriptureGuidance: "Conseils basés sur les Écritures alimentés par la sagesse biblique",
    welcomeHelp: "Bienvenue ! Je suis là pour vous aider",
    askAnythingGodsWord: "Demandez-moi n'importe quoi sur la parole de Dieu, et je vous aiderai à trouver des réponses dans les Écritures.",
    tryTheseQuestions: "Essayez ces questions :",
    growStrongerFaith: "Comment puis-je renforcer ma foi ?",
    bibleSayAnxiety: "Que dit la Bible sur l'anxiété ?",
    knowGodsWill: "Comment connaître la volonté de Dieu pour ma vie ?",
    connectionTrouble: "J'ai des problèmes de connexion en ce moment. Veuillez réessayer dans un moment, et je serai là pour vous aider avec votre question spirituelle.",
    aiPastorUnavailable: "Pasteur IA Indisponible",
    seekingWisdomScripture: "Le Pasteur IA cherche la sagesse dans les Écritures...",
    askBibleQuestion: "Posez votre question biblique ici...",
    clearConversation: "Effacer la conversation",
    copyMessage: "Copier le message",
    sendQuestion: "Envoyer la question",
    biblicallyGuidedResponses: "Réponses guidées bibliquement par l'IA",
    
    // AI Pastor Dialog
    askTheAIPastor: "Demandez au Pasteur IA",
    aiPoweredGuidance: "Conseils bibliques et conseil spirituel alimentés par l'IA basés sur les Écritures",
    pastorGreeting: "Bonjour ! Je suis là pour fournir des conseils bibliques et un conseil spirituel. Qu'est-ce qui est dans votre cœur aujourd'hui ? Que vous fassiez face à des défis, ayez des questions sur la foi ou ayez besoin de prière, je suis là pour vous aider avec la sagesse de Dieu.",
    technicalDifficulty: "Je m'excuse pour la difficulté technique. Sachez que Dieu entend votre cœur même quand la technologie échoue. N'hésitez pas à réessayer votre question.",
    pastor: "Pasteur",
    scriptureReferences: "Références des Écritures :",
    needPrayerFor: "Besoin de prière pour :",
    healing: "guérison",
    guidance: "conseils",
    strength: "force",
    peace: "paix",
    commonQuestionsHelp: "Questions courantes avec lesquelles je peux vous aider :",
    askAnythingFaith: "Demandez-moi n'importe quoi sur la foi, la vie ou la Bible...",
    guidanceRootedGodsWord: "Conseils enracinés dans la Parole de Dieu • Appuyez sur Entrée pour envoyer",
    seekingWisdom: "Cherchant la sagesse dans les Écritures...",
    
    // Friends functionality
    friendsPageDescription: "Connectez-vous avec d'autres croyants dans votre parcours spirituel",
    searchFriends: "Rechercher des Amis",
    myFriends: "Mes Amis",
    requests: "Demandes",
    findNewFriends: "Trouver de Nouveaux Amis",
    searchByNameOrEmail: "Rechercher par nom ou email",
    searchPlaceholder: "Nom ou email",
    addFriend: "Ajouter Ami",
    remove: "Supprimer",
    accept: "Accepter",
    decline: "Refuser",
    pending: "En attente",
    friendsListDescription: "Vos amis spirituels",
    noFriendsFound: "Aucun ami trouvé",
    incomingRequests: "Demandes Reçues",
    outgoingRequests: "Demandes Envoyées",
    startSearching: "Commencez en recherchant des amis pour vous connecter",
    noIncomingRequests: "Aucune demande en attente",
    noOutgoingRequests: "Aucune demande envoyée en attente",
    searching: "Recherche...",
    loading: "Chargement...",
    success: "Succès",
    error: "Erreur",
    friendRequestSent: "Demande d'ami envoyée avec succès !",
    friendRequestFailed: "Échec de l'envoi de la demande d'ami",
    friendRequestAccepted: "Demande d'ami acceptée !",
    friendRequestDeclined: "Demande d'ami refusée",
    friendRemoved: "Ami supprimé avec succès",
    
    // Saved Verses
    savedVerses: "Versets Sauvegardés",
    verse: "verset",
    verses: "versets",
    saved: "sauvegardés",
    noSavedVersesYet: "Aucun Verset Sauvegardé",
    bookmarkVersesMessage: "Lorsque vous ajoutez des versets aux favoris, ils apparaîtront ici.",
    tapToViewVerseInContext: "Appuyez pour voir ce verset dans son contexte",
    read: "Lire",
    bookmarkRemoved: "Favori Supprimé",
    removedFromSavedVerses: "supprimé des versets sauvegardés.",
    errorLoadingVerse: "Erreur de Chargement",
    couldNotLoadVerse: "Impossible de charger le contenu du verset. Veuillez réessayer.",
    scripture: "Écriture",
    bibleVerse: "Verset Biblique",
    noVerseContentAvailable: "Aucun contenu de verset disponible",
    
    // Support Page
    supportAndPrivacy: "Support et Confidentialité",
    contactSupport: "Contacter le Support",
    contactSupportDesc: "Besoin d'aide ? Des questions ? Nous sommes là pour soutenir votre parcours spirituel.",
    messageOnFacebook: "Envoyez-nous un message sur Facebook",
    legalDocuments: "Documents Légaux",
    viewLegalPolicies: "Consultez nos politiques légales et nos conditions",
    privacyPolicy: "Politique de Confidentialité",
    howWeProtectData: "Comment nous protégeons vos données",
    termsOfService: "Conditions de Service",
    ourTermsAndConditions: "Nos conditions générales",
    yourPrivacyRights: "Vos Droits de Confidentialité",
    managePersonalData: "Gérez vos données personnelles et paramètres de confidentialité.",
    exportMyData: "Exporter Mes Données",
    downloadCopyOfData: "Télécharger une copie de vos données personnelles",
    export: "Exporter",
    deleteMyData: "Supprimer Mes Données",
    permanentlyRemoveInfo: "Supprimer définitivement toutes vos informations personnelles",
    deleteData: "Supprimer les Données",
    confirmDelete: "Confirmer la Suppression",
    deleting: "Suppression...",
    areYouSure: "Êtes-vous sûr ?",
    deleteWarning: "Cela supprimera définitivement toutes vos données, y compris votre profil, votre compteur de séries, vos préférences et vos paramètres. Cette action est irréversible.",
    cancel: "Annuler",
    crisisResources: "Ressources de Crise",
    crisisResourcesDesc: "Si vous êtes en crise, veuillez contacter ces ressources",
    nationalSuicidePrevention: "Ligne Nationale de Prévention du Suicide",
    crisisTextLine: "Ligne de Texte de Crise",
    emergencyServices: "Services d'Urgence",
    accountDeletedSuccess: "Votre compte et toutes les données associées ont été définitivement supprimés de nos serveurs. L'application va redémarrer.",
    failedToDeleteAccount: "Échec de la suppression de votre compte de nos serveurs. Veuillez contacter le support pour obtenir de l'aide.",
    localDataDeleted: "Vos données locales ont été supprimées avec succès. L'application va redémarrer.",
    noUserDataFound: "Aucune donnée utilisateur trouvée. L'application va redémarrer.",
    errorDeletingAccount: "Une erreur s'est produite lors de la suppression de votre compte. Veuillez contacter le support pour obtenir de l'aide.",
    appInformation: "Informations de l'Application",
    build: "Version",
    platform: "Plateforme",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Politique de Confidentialité",
    effectiveDate: "Date d'Entrée en Vigueur :",
    privacyIntro: "L'Évangile en 5 Minutes (\"nous\", \"notre\" ou \"nos\") s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application mobile.",
    infoWeCollect: "Informations que Nous Collectons",
    personalInformation: "Informations Personnelles",
    personalInfoDesc: "Lorsque vous vous inscrivez, nous collectons votre prénom, nom de famille, adresse e-mail, numéro de téléphone et mois/jour de naissance pour personnaliser votre parcours spirituel.",
    usageData: "Données d'Utilisation",
    usageDataDesc: "Nous suivons votre utilisation quotidienne de l'application, vos compteurs de séries, vos préférences de versets et vos paramètres linguistiques pour améliorer votre expérience et fournir un contenu personnalisé.",
    aiPastorQuestions: "Questions au Pasteur IA",
    aiPastorQuestionsDesc: "Les questions soumises à notre fonction \"Demandez au Pasteur\" sont traitées par les services d'OpenAI pour fournir des conseils bibliques. Ces interactions sont soumises à la politique de confidentialité d'OpenAI.",
    howWeUseInfo: "Comment Nous Utilisons Vos Informations",
    usePersonalizeDailyVerses: "Personnaliser les versets quotidiens et le contenu spirituel",
    useTrackProgress: "Suivre votre progression et maintenir les compteurs de séries",
    useProvideBiblicalGuidance: "Fournir des conseils bibliques et des réponses alimentés par l'IA",
    useSendRelevantContent: "Envoyer du contenu spirituel pertinent selon vos préférences",
    useImproveApp: "Améliorer les fonctionnalités de l'application et l'expérience utilisateur",
    dataSharingThirdParties: "Partage de Données et Tiers",
    openAIServicesLabel: "Services OpenAI :",
    openAIServicesDesc: "Vos questions \"Demandez au Pasteur\" sont traitées par OpenAI pour générer des réponses bibliques.",
    openAIPrivacyPolicyLink: "Politique de confidentialité d'OpenAI",
    noSellingLabel: "Pas de Vente :",
    noSellingDesc: "Nous ne vendons, ne louons ni n'échangeons vos informations personnelles à des tiers.",
    analyticsLabel: "Analytique :",
    analyticsDesc: "Nous pouvons utiliser des données d'utilisation anonymisées pour améliorer les performances et les fonctionnalités de l'application.",
    dataStorageSecurity: "Stockage et Sécurité des Données",
    dataStorageSecurityDesc: "Vos informations personnelles sont stockées localement sur votre appareil et sur des serveurs sécurisés. Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès, altération, divulgation ou destruction non autorisés.",
    yourRightsChoices: "Vos Droits et Choix",
    rightsAccessLabel: "Accès :",
    rightsAccessDesc: "Vous pouvez consulter vos informations personnelles dans les paramètres de l'application",
    rightsCorrectionLabel: "Correction :",
    rightsCorrectionDesc: "Vous pouvez mettre à jour vos informations à tout moment",
    rightsDeletionLabel: "Suppression :",
    rightsDeletionDesc: "Vous pouvez supprimer votre compte et toutes les données associées",
    rightsPortabilityLabel: "Portabilité des Données :",
    rightsPortabilityDesc: "Vous pouvez exporter vos données dans un format lisible",
    childrensPrivacy: "Confidentialité des Enfants",
    childrensPrivacyDesc: "Notre application est conçue pour les utilisateurs de 13 ans et plus. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans. Si vous pensez que nous avons collecté des informations auprès d'un enfant de moins de 13 ans, veuillez nous contacter immédiatement.",
    dataRetention: "Conservation des Données",
    dataRetentionDesc: "Nous conservons vos informations personnelles tant que votre compte est actif ou selon les besoins pour fournir des services. Vous pouvez demander la suppression de vos données à tout moment via les paramètres de l'application.",
    changesToPolicy: "Modifications de Cette Politique",
    changesToPolicyDesc: "Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement. Nous vous informerons de tout changement important en publiant la nouvelle politique dans l'application et en mettant à jour la date d'entrée en vigueur.",
    contactUs: "Nous Contacter",
    contactUsIntro: "Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter :",
    contactEmailLabel: "E-mail :",
    contactFacebookLabel: "Facebook :",
    contactAddressLabel: "Adresse :",
    
    // Terms of Service Page
    tosWelcomeText: "Bienvenue dans L'Évangile en 5 Minutes. Ces Conditions de Service (\"Conditions\") régissent votre utilisation de notre application mobile et de nos services. En utilisant notre application, vous acceptez ces Conditions.",
    tosSection1Title: "1. Licence d'Utilisation",
    tosSection1Content: "Nous vous accordons une licence limitée, non exclusive et non transférable pour utiliser L'Évangile en 5 Minutes pour votre usage personnel et non commercial. Cette licence n'inclut pas le droit de revendre, redistribuer ou créer des œuvres dérivées.",
    tosSection2Title: "2. Utilisation Acceptable",
    tosSection2Intro: "Vous acceptez d'utiliser notre application de manière cohérente avec :",
    tosSection2Item1: "Les valeurs chrétiennes et les principes bibliques",
    tosSection2Item2: "Un engagement respectueux avec le contenu spirituel",
    tosSection2Item3: "Des fins légales uniquement",
    tosSection2Item4: "La croissance spirituelle personnelle et l'éducation",
    tosSection2NotIntro: "Vous acceptez de NE PAS :",
    tosSection2NotItem1: "Utiliser l'application à des fins commerciales sans autorisation",
    tosSection2NotItem2: "Tenter de faire de l'ingénierie inverse ou de pirater l'application",
    tosSection2NotItem3: "Partager du contenu inapproprié ou offensant",
    tosSection2NotItem4: "Violer toute loi ou réglementation applicable",
    tosSection3Title: "3. Fonctionnalités Alimentées par l'IA",
    tosSection3Intro: "Notre fonctionnalité \"Demandez au Pasteur\" utilise l'intelligence artificielle pour fournir des conseils bibliques. Veuillez comprendre :",
    tosSection3Item1: "Les réponses de l'IA sont à des fins éducatives et inspirantes",
    tosSection3Item2: "Les réponses ne doivent pas remplacer les conseils professionnels ou médicaux",
    tosSection3Item3: "Le contenu généré par l'IA peut contenir des erreurs ou des limitations",
    tosSection3Item4: "Pour les questions spirituelles sérieuses, consultez un pasteur ou un conseiller qualifié",
    tosSection4Title: "4. Contenu et Propriété Intellectuelle",
    tosSection4BiblicalContentLabel: "Contenu Biblique :",
    tosSection4BiblicalContentText: "Les citations des Écritures proviennent de traductions du domaine public ou sont utilisées sous licences appropriées.",
    tosSection4OriginalContentLabel: "Contenu Original :",
    tosSection4OriginalContentText: "Notre contenu original, y compris les plans d'étude, les commentaires et les fonctionnalités de l'application, sont protégés par le droit d'auteur et restent notre propriété.",
    tosSection4UserContentLabel: "Contenu de l'Utilisateur :",
    tosSection4UserContentText: "Toute question ou contribution que vous fournissez peut être utilisée pour améliorer nos services tout en respectant votre vie privée.",
    tosSection5Title: "5. Avertissements",
    tosSection5EducationalLabel: "Objectif Éducatif :",
    tosSection5EducationalText: "Cette application est à des fins éducatives et inspirantes. Ce n'est pas un substitut pour :",
    tosSection5Item1: "Le conseil pastoral professionnel",
    tosSection5Item2: "Les conseils médicaux ou psychologiques",
    tosSection5Item3: "Les conseils juridiques ou financiers",
    tosSection5Item4: "L'intervention de crise ou les services d'urgence",
    tosSection5DoctrinalLabel: "Neutralité Doctrinale :",
    tosSection5DoctrinalText: "Bien que nous nous efforcions d'assurer l'exactitude biblique, les interprétations peuvent varier entre les dénominations chrétiennes. Consultez votre église locale pour des conseils doctrinaux.",
    tosSection6Title: "6. Limitation de Responsabilité",
    tosSection6Content: "Dans toute la mesure permise par la loi, L'Évangile en 5 Minutes et ses créateurs ne seront pas responsables des dommages indirects, accessoires, spéciaux ou consécutifs découlant de votre utilisation de l'application, y compris, mais sans s'y limiter, les décisions spirituelles, émotionnelles ou personnelles basées sur le contenu de l'application.",
    tosSection7Title: "7. Résiliation",
    tosSection7Content: "Vous pouvez cesser d'utiliser l'application à tout moment et supprimer votre compte. Nous nous réservons le droit de résilier ou de suspendre l'accès aux utilisateurs qui violent ces Conditions ou se livrent à un comportement inapproprié.",
    tosSection8Title: "8. Mises à Jour et Modifications",
    tosSection8Content: "Nous pouvons mettre à jour ces Conditions périodiquement. L'utilisation continue de l'application après les modifications constitue l'acceptation des nouvelles Conditions. Les modifications importantes seront communiquées via l'application.",
    tosSection9Title: "9. Loi Applicable",
    tosSection9Content: "Ces Conditions sont régies par les lois des États-Unis. Tout litige sera résolu par arbitrage exécutoire conformément aux principes chrétiens de réconciliation dans la mesure du possible.",
    tosSection10Title: "10. Informations de Contact",
    tosSection10Intro: "Pour toute question concernant ces Conditions, veuillez nous contacter :",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "L'Évangile en 5 Minutes, Département Juridique",
    tosFinalAcknowledgement: "En utilisant L'Évangile en 5 Minutes, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions de Service.",
    
    // Donation Page
    donationPageTitle: "Faire un Don",
    donationPageSubtitle: "Partagez l'Amour de Dieu par Votre Générosité",
    donationMissionText: "Soutenez notre mission de répandre la parole de Dieu dans le monde entier à travers",
    donationImpactText: "Chaque don apporte espoir et salut à quelqu'un dans le besoin",
    totalDonationsLabel: "Amour Total Partagé par les Dons",
    soulsTouchedLabel: "Âmes Touchées par la Parole de Dieu",
    bibleImpactText: "Chaque Bible apporte espoir, guérison et transformation éternelle",
    chooseGiftTitle: "Choisissez Votre Cadeau d'Amour",
    chooseGiftSubtitle: "Chaque cadeau plante des graines d'espoir éternel",
    chooseGiftDescription: "Rejoignez des milliers de personnes répandant l'amour de Dieu dans le monde entier",
    chooseAmountLabel: "Choisissez Votre Montant de Don",
    chooseAmountDescription: "Sélectionnez le montant qui parle à votre cœur",
    popularAmountsText: "Montants populaires choisis par notre communauté aimante",
    customAmountLabel: "Ou Entrez le Désir de Votre Cœur",
    customAmountDescription: "Chaque montant, quelle que soit sa taille, fait la différence",
    customAmountPlaceholder: "Entrez le montant de votre don généreux...",
    yourGiftLabel: "Votre Don",
    thankYouGenerousHeart: "Merci pour votre cœur généreux !",
    processing: "Traitement en cours...",
    importantInformation: "Informations Importantes",
    donationDisclaimer: "Les dons sont traités en toute sécurité via Stripe. Aucun bien ou service n'est fourni en échange de dons.",
    taxAdvisorNote: "Veuillez consulter votre conseiller fiscal concernant la déductibilité des dons. Pour des questions sur les dons ou remboursements, contactez notre équipe d'assistance.",
    agreeToTermsPrefix: "En faisant un don, vous acceptez nos",
    and: "et",
    yourImpactTitle: "Votre Impact",
    yourImpactDescription: "Chaque don nous aide à distribuer des Bibles et à partager la parole de Dieu avec ceux qui en ont le plus besoin. Ensemble, nous apportons espoir et salut aux communautés du monde entier.",
    ourMissionTitle: "Notre Mission",
    ourMissionDescription: "Chaque don nous aide à atteindre plus d'âmes avec des versets bibliques quotidiens, des conseils spirituels et le pouvoir transformateur de la parole de Dieu. Votre générosité rend possible un impact éternel.",
    completeDonation: "Finaliser le Don",
    completeYourDonation: "Finaliser Votre",
    cancelPayment: "Annuler",
    paymentFailed: "Paiement Échoué",
    paymentError: "Erreur de Paiement",
    donationSuccessful: "Don Réussi !",
    donationSuccessMessage: "Merci pour votre don pour répandre la parole de Dieu.",
    paymentErrorOccurred: "Une erreur s'est produite lors du traitement de votre paiement.",
    unexpectedError: "Une erreur inattendue s'est produite.",
    invalidAmount: "Montant Invalide",
    invalidAmountMessage: "Veuillez entrer un montant entre 1 $ et 10 000 $.",
    applePayNotAvailable: "Apple Pay Non Disponible",
    applePayNotAvailableMessage: "Veuillez ajouter une carte à Apple Wallet pour utiliser Apple Pay.",
    verificationFailed: "Vérification Échouée",
    verificationFailedMessage: "Le paiement peut encore être en cours de traitement. Veuillez revérifier plus tard.",
    paymentProcessingFailed: "Votre don n'a pas pu être traité. Veuillez réessayer.",
    paymentSetupFailed: "Configuration du Paiement Échouée",
    applePaySetupFailed: "Échec de la configuration d'Apple Pay. Veuillez réessayer.",
    paymentSetupFailedGeneric: "Échec de la configuration du paiement. Veuillez réessayer.",
    failedToCreatePayment: "Échec de la création de l'intention de paiement",
    paymentVerificationFailed: "Échec de la vérification du paiement",
    goBackToMore: "Retourner à la page Plus",
    cancelPaymentAction: "Annuler le paiement",
    
    // Settings Page
    profileInformation: "Informations du Profil",
    edit: "Modifier",
    firstName: "Prénom",
    lastName: "Nom",
    nameCannotBeChanged: "Le nom ne peut pas être modifié",
    email: "Email",
    phoneNumber: "Numéro de Téléphone",
    birthMonth: "Mois de Naissance",
    birthDay: "Jour de Naissance",
    timezone: "Fuseau Horaire",
    timezoneCannotBeChanged: "Le fuseau horaire ne peut pas être modifié",
    saveProfile: "Enregistrer le Profil",
    bibleVersion: "Version de la Bible",
    loadingVersions: "Chargement des versions...",
    notifications: "Notifications",
    dailyReminders: "Rappels Quotidiens",
    reminderToReadDailyVerse: "Recevez des rappels pour lire votre verset quotidien",
    reminderTime: "Heure du Rappel",
    testNotification: "Tester la Notification",
    streakNotifications: "Notifications de Série",
    celebrateReadingStreaks: "Célébrez vos séries de lecture",
    emailUpdates: "Mises à Jour par Email",
    receiveNewsletters: "Recevoir des newsletters et des mises à jour",
    appSettings: "Paramètres de l'App",
    soundEffects: "Effets Sonores",
    enableAppSounds: "Activer les sons et notifications de l'app",
    appLanguage: "Langue de l'App",
    dataPrivacy: "Données et Confidentialité",
    viewPrivacyPolicy: "Voir la Politique de Confidentialité",
    deleteAccountData: "Supprimer les Données du Compte",
    deleteAllAccountData: "Supprimer Toutes les Données du Compte ?",
    deleteAccountWarning: "Cela supprimera définitivement toutes vos données de cet appareil, y compris :",
    deleteAccountWarningProfile: "Informations du profil",
    deleteAccountWarningBookmarks: "Signets et versets enregistrés",
    deleteAccountWarningNotes: "Notes personnelles",
    deleteAccountWarningPreferences: "Préférences de l'app",
    deleteAccountWarningStreak: "Données de série de lecture",
    actionCannotBeUndone: "Cette action ne peut pas être annulée.",
    deleteAllData: "Supprimer Toutes les Données",
    accountActions: "Actions du Compte",
    needHelpWithAccount: "Besoin d'aide avec votre compte ? Contactez notre équipe d'assistance.",
    profileUpdated: "Profil Mis à Jour",
    profileSavedSuccessfully: "Vos informations de profil ont été enregistrées avec succès.",
    failedToSaveProfile: "Impossible d'enregistrer les modifications du profil. Veuillez réessayer.",
    dataExported: "Données Exportées",
    dataDownloadedSuccessfully: "Vos données ont été téléchargées avec succès.",
    exportFailed: "Échec de l'Exportation",
    failedToExportData: "Impossible d'exporter vos données. Veuillez réessayer.",
    accountDataDeleted: "Données du Compte Supprimées",
    allDataRemovedFromDevice: "Toutes vos données locales ont été supprimées de cet appareil.",
    deletionFailed: "Échec de la Suppression",
    failedToDeleteAccountData: "Impossible de supprimer les données du compte. Veuillez réessayer.",
    dailyRemindersEnabled: "Rappels Quotidiens Activés",
    dailyReminderConfirmation: "Vous recevrez des rappels de versets quotidiens à",
    permissionRequired: "Autorisation Requise",
    notificationPermissionMessage: "Veuillez autoriser les notifications pour recevoir des rappels de versets quotidiens.",
    dailyRemindersDisabled: "Rappels Quotidiens Désactivés",
    noMoreDailyReminders: "Vous ne recevrez plus de rappels de versets quotidiens.",
    reminderTimeUpdated: "Heure du Rappel Mise à Jour",
    reminderTimeConfirmation: "Les rappels quotidiens seront maintenant envoyés à",
    settingsUpdated: "Paramètres Mis à Jour",
    preferencesSaved: "Vos préférences ont été enregistrées.",
    goBackToMorePage: "Retourner à la page Plus",
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre",
    easternTime: "Heure de l'Est (EST)",
    centralTime: "Heure Centrale (CST)",
    mountainTime: "Heure des Montagnes (MST)",
    pacificTime: "Heure du Pacifique (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "Impact des Dons",
    givingPageSubtitle: "Voyez comment votre générosité répand la parole de Dieu dans le monde entier",
    currentGoalSpreadGodsWord: "Objectif Actuel : Répandre la Parole de Dieu",
    of: "de",
    goal: "objectif",
    percentComplete: "% Terminé",
    biblesPurchased: "Bibles Achetées",
    biblesDistributed: "Bibles Distribuées",
    thisMonthsImpact: "Impact de Ce Mois",
    monthlyDonations: "Dons Mensuels",
    livesReached: "Vies Touchées",
    joinOurMission: "Rejoignez Notre Mission",
    givingPageCTADescription: "Votre don nous aide à acheter et distribuer des Bibles à ceux qui ont le plus besoin de la parole de Dieu. Chaque contribution apporte l'Évangile à quelqu'un qui cherche l'espoir et le salut.",
    globalBibleDistribution: "Distribution Mondiale de Bibles",
    worldwideImpactComingSoon: "Impact Mondial Croissant",
    worldwideImpactDescription: "Nous distribuons activement des Bibles dans le monde entier. Vos dons atteignent des communautés à travers le globe, apportant espoir et l'Évangile à ceux qui en ont le plus besoin.",
    
    // Videos Page
    videosPageTitle: "Vidéos de Foi",
    videosPageSubtitle: "Sermons, perspectives évangéliques et conseils chrétiens",
    featuredThisWeek: "À la Une Cette Semaine",
    handpickedSpiritualContent: "Contenu spirituel sélectionné pour votre croissance",
    loadingError: "Erreur de Chargement",
    videoContentNotAvailable: "Certains contenus vidéo peuvent ne pas être disponibles pour le moment.",
    noFeaturedVideoAvailable: "Aucune vidéo en vedette disponible",
    browseByCategory: "Parcourir par Catégorie",
    discoverTailoredContent: "Découvrez du contenu adapté à votre parcours spirituel",
    sermons: "Sermons",
    faithMessages: "Messages de foi",
    gospelTidbits: "Perspectives Évangéliques",
    quickInsights: "Idées rapides",
    christianAdvice: "Conseils Chrétiens",
    lifeGuidance: "Guidance de vie",
    categoryVideos: "Vidéos",
    recentVideos: "Vidéos Récentes",
    showAll: "Tout Afficher",
    noVideosAvailable: "Aucune vidéo disponible",
    checkInternetConnection: "Veuillez vérifier votre connexion Internet et réessayer",
    views: "vues",
    moreVideosComingSoon: "Bibliothèque Vidéo en Expansion",
    moreVideosDescription: "Notre collection s'enrichit de nouveaux sermons, perspectives évangéliques et vidéos de conseils chrétiens. Explorez régulièrement pour du contenu spirituel frais qui renforce votre parcours de foi.",
    sermon: "Sermon",
    gospelTidbit: "Perspective Évangélique",
    video: "Vidéo",
    
    // Blog Page
    blogPageTitle: "Blog Chrétien",
    blogPageSubtitle: "Articles inspirants pour faire grandir votre foi",
    featuredArticle: "Article en Vedette",
    todaysHighlightedInsight: "Perspective chrétienne mise en avant aujourd'hui",
    by: "Par",
    minRead: "min de lecture",
    published: "Publié",
    readFullArticle: "Lire l'Article Complet",
    recentArticles: "Articles Récents",
    latestInsightsToStrengthen: "Dernières perspectives pour renforcer votre parcours de foi",
    min: "min",
    readMore: "Lire Plus",
    browseByTopic: "Parcourir par Sujet",
    exploreContentByThemes: "Explorez le contenu organisé par thèmes spirituels",
    articles: "articles",
    neverMissAnArticle: "Ne Manquez Jamais un Article",
    latestChristianInsights: "Recevez les dernières perspectives chrétiennes et le contenu édifiant dans votre boîte de réception.",
    subscribeToUpdates: "S'abonner aux Mises à Jour",
    subscribeToBlog: "Abonnez-vous à Notre Blog",
    joinCommunityBiweekly: "Rejoignez notre communauté et recevez des perspectives chrétiennes bihebdomadaires et du contenu édifiant dans votre boîte de réception.",
    biweeklyInsightsInbox: "Recevez des perspectives chrétiennes bihebdomadaires et du contenu édifiant dans votre boîte de réception.",
    nameOptional: "Nom (Facultatif)",
    yourName: "Votre nom",
    emailAddressRequired: "Adresse E-mail *",
    emailPlaceholder: "votre.email@exemple.com",
    subscribing: "Abonnement...",
    biweeklyEmailDisclaimer: "Nous vous enverrons des mises à jour toutes les deux semaines. Vous pouvez vous désabonner à tout moment.",
    emailRequired: "E-mail Requis",
    enterEmailToSubscribe: "Veuillez entrer votre adresse e-mail pour vous abonner.",
    successfullySubscribed: "Abonnement Réussi !",
    thankYouSubscribing: "Merci de vous être abonné aux mises à jour de notre blog.",
    subscriptionFailed: "Échec de l'Abonnement",
    subscriptionError: "Une erreur s'est produite lors du traitement de votre abonnement. Veuillez réessayer.",
    unableToLoadArticles: "Impossible de charger les articles. Veuillez réessayer plus tard.",
    loadingArticles: "Chargement des articles...",
    errorLoadingArticles: "Erreur de Chargement des Articles",
    retry: "Réessayer",
    
    // Bible Studies Page
    bibleStudiesTitle: "Études Bibliques",
    bibleStudiesSubtitle: "Approfondissez votre parcours de foi",
    featuredStudies: "Études En Vedette",
    browseAllStudies: "Parcourir Toutes les Études",
    searchBibleStudies: "Rechercher des études bibliques...",
    allCategory: "Tous",
    discipleship: "Discipulat",
    encouragement: "Encouragement",
    character: "Caractère",
    prayer: "Prière",
    prophecy: "Prophétie",
    love: "Amour",
    featured: "En Vedette",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    lessons: "leçons",
    startStudy: "Commencer l'Étude",
    moreStudies: "Plus d'Études",
    viewStudy: "Voir l'Étude",
    noStudiesFound: "Aucune étude trouvée",
    adjustSearchTerms: "Essayez d'ajuster vos termes de recherche ou le filtre de catégorie",
    whatYouLearn: "Ce Que Vous Apprendrez:",
    deepBiblicalInsights: "Perspectives bibliques profondes et applications pratiques",
    guidedReflectionQuestions: "Questions de réflexion guidées pour la croissance personnelle",
    scriptureMemorization: "Techniques de mémorisation et de méditation des Écritures",
    communityDiscussionPoints: "Points de discussion communautaire pour l'étude en groupe",
    close: "Fermer",
    lessonOf: "Leçon",
    day: "Jour",
    todaysScripture: "Écriture d'Aujourd'hui",
    reflectionQuestions: "Questions de Réflexion",
    todaysPrayer: "Prière d'Aujourd'hui",
    previousLesson: "Leçon Précédente",
    completeLesson: "Terminer la Leçon",
    nextLesson: "Prochaine Leçon",
    lessonCompleted: "Leçon Terminée!",
    greatProgress: "Excellent progrès! Vous êtes un pas de plus vers la complétion de cette étude.",
    continueToNextLesson: "Continuer à la Prochaine Leçon",
    backToStudyOverview: "Retour à l'Aperçu de l'Étude",
    
    // Bible Trivia Page
    bibleTriviaResults: "Résultats du Quiz Biblique",
    bibleTriviaTitle: "Quiz Biblique",
    bibleExpert: "Expert Biblique",
    bibleScholar: "Érudit Biblique",
    bibleStudent: "Étudiant Biblique",
    keepStudying: "Continuez à Étudier!",
    level: "Niveau",
    gamesPlayed: "Jeux Joués",
    bestScore: "Meilleur Score",
    playAgain: "Rejouer",
    backToHome: "Retour à l'Accueil",
    questionOf: "Question",
    score: "Score",
    testBiblicalKnowledge: "Testez vos connaissances bibliques",
    latest: "Dernier",
    lastScore: "Dernier Score",
    best: "Meilleur",
    games: "jeux",
    chooseDifficultyLevel: "Choisir le Niveau de Difficulté",
    easy: "Facile",
    medium: "Moyen",
    difficult: "Difficile",
    easyDescription: "Connaissances bibliques de base et histoires bien connues",
    mediumDescription: "Faits bibliques et personnages intermédiaires",
    difficultDescription: "Théologie avancée et détails moins connus",
    scoringGuide: "Guide de Notation",
    correctAnswers9to10: "9-10 correctes",
    correctAnswers7to8: "7-8 correctes",
    correctAnswers5to6: "5-6 correctes",
    correctAnswers1to4: "1-4 correctes",
    generatingQuestions: "Génération de Questions...",
    startTrivia10Questions: "Commencer le Quiz (10 Questions)",
    finishQuiz: "Terminer le Quiz",
    nextQuestion: "Question Suivante",
    failedToGenerateTriviaQuestions: "Échec de la génération des questions du quiz. Veuillez réessayer."
  },
  
  pt: {
    // Navigation & Common
    home: "Início",
    ask: "Perguntar",
    search: "Pesquisar",
    more: "Mais",
    
    // Home Page
    welcome: "Bem-vindo!",
    dailyVerse: "Versículo Diário",
    bibleStudyPlans: "Planos de Estudo Bíblico de 3 Dias",
    askThePastor: "Pergunte ao Pastor IA",
    
    // Time-based greetings
    goodMorning: "Bom dia",
    goodAfternoon: "Boa tarde",
    goodEvening: "Boa noite",
    
    // Ask Page
    askPageDescription: "Obtenha orientação bíblica baseada nas Escrituras com IA",
    feelingsScripture: "Sentimentos e Escritura",
    
    // Search Page
    searchPageDescription: "Pesquise qualquer versículo bíblico por referência",
    helpSpreadGodsWord: "Ajude a Espalhar a Palavra de Deus",
    donationAppealText: "O Evangelho em 5 Minutos™ aceita doações para levar a Santa Bíblia para mais pessoas ao redor do mundo. Seu apoio nos ajuda a alcançar almas necessitadas de orientação espiritual.",
    makeADonation: "Fazer uma Doação",
    
    // More Page
    settingsDescription: "Configurações e recursos adicionais",
    language: "Idioma",
    givingImpact: "Impacto das Doações",
    givingImpactDesc: "Veja como as doações espalham a palavra de Deus",
    faithVideos: "Vídeos de Fé",
    faithVideosDesc: "Sermões, dicas do Evangelho e conselhos cristãos",
    christianBlog: "Blog Cristão",
    christianBlogDesc: "Artigos inspiradores para crescer sua fé",
    settings: "Configurações",
    settingsDesc: "Gerencie seu perfil e preferências",
    friends: "Amigos",
    friendsDesc: "Conecte-se com outros crentes",
    privacyStatement: "Declaração de Privacidade",
    privacyStatementDesc: "Saiba como protegemos seus dados",
    endUserAgreement: "Acordo de Usuário Final",
    endUserAgreementDesc: "Termos e condições de uso",
    donate: "Doar",
    donateDesc: "Apoie nossa missão de espalhar o Evangelho",
    supportLegal: "Suporte e Legal",
    supportPrivacyRights: "Suporte e Direitos de Privacidade",
    comingSoon: "Novo Recurso",
    
    // Common Actions
    follow: "Seguir",
    share: "Compartilhar O Evangelho em 5 Minutos",
    shareText: "Descubra versículos bíblicos diários e orientação espiritual com o aplicativo O Evangelho em 5 Minutos!",
    
    // Footer
    visitWebsite: "Visite nosso site para mais recursos",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "O Evangelho em 5 Minutos™",
    appTagline: "Levando a palavra de Deus ao mundo",
    version: "Versão 1.0.0",
    
    // Ask Page specific
    askPageShareText: "Faça perguntas ao Pastor IA e obtenha orientação baseada nas Escrituras!",
    
    // AI Pastor Section
    aiPastor: "Pastor IA",
    scriptureGuidance: "Orientação baseada nas Escrituras impulsionada pela sabedoria bíblica",
    welcomeHelp: "Bem-vindo! Estou aqui para ajudar",
    askAnythingGodsWord: "Pergunte-me qualquer coisa sobre a palavra de Deus e vou ajudá-lo a encontrar respostas nas Escrituras.",
    tryTheseQuestions: "Experimente estas perguntas:",
    growStrongerFaith: "Como posso fortalecer minha fé?",
    bibleSayAnxiety: "O que a Bíblia diz sobre ansiedade?",
    knowGodsWill: "Como sei a vontade de Deus para minha vida?",
    connectionTrouble: "Estou tendo problemas de conexão agora. Por favor, tente novamente em um momento, e estarei aqui para ajudá-lo com sua pergunta espiritual.",
    aiPastorUnavailable: "Pastor IA Indisponível",
    seekingWisdomScripture: "O Pastor IA está buscando sabedoria nas Escrituras...",
    askBibleQuestion: "Faça sua pergunta bíblica aqui...",
    clearConversation: "Limpar conversa",
    copyMessage: "Copiar mensagem",
    sendQuestion: "Enviar pergunta",
    biblicallyGuidedResponses: "Respostas guiadas biblicamente por IA",
    
    // AI Pastor Dialog
    askTheAIPastor: "Pergunte ao Pastor IA",
    aiPoweredGuidance: "Orientação bíblica e aconselhamento espiritual impulsionado por IA baseado nas Escrituras",
    pastorGreeting: "Olá! Estou aqui para fornecer orientação bíblica e aconselhamento espiritual. O que está em seu coração hoje? Seja enfrentando desafios, tendo perguntas sobre fé ou precisando de oração, estou aqui para ajudá-lo com a sabedoria de Deus.",
    technicalDifficulty: "Peço desculpas pela dificuldade técnica. Saiba que Deus ouve seu coração mesmo quando a tecnologia falha. Sinta-se livre para tentar sua pergunta novamente.",
    pastor: "Pastor",
    scriptureReferences: "Referências das Escrituras:",
    needPrayerFor: "Precisa de oração por:",
    healing: "cura",
    guidance: "orientação",
    strength: "força",
    peace: "paz",
    commonQuestionsHelp: "Perguntas comuns com as quais posso ajudar:",
    askAnythingFaith: "Pergunte-me qualquer coisa sobre fé, vida ou a Bíblia...",
    guidanceRootedGodsWord: "Orientação enraizada na Palavra de Deus • Pressione Enter para enviar",
    seekingWisdom: "Buscando sabedoria nas Escrituras...",
    
    // Friends functionality
    friendsPageDescription: "Conecte-se com outros crentes em sua jornada espiritual",
    searchFriends: "Buscar Amigos",
    myFriends: "Meus Amigos",
    requests: "Solicitações",
    findNewFriends: "Encontrar Novos Amigos",
    searchByNameOrEmail: "Buscar por nome ou email",
    searchPlaceholder: "Nome ou email",
    addFriend: "Adicionar Amigo",
    remove: "Remover",
    accept: "Aceitar",
    decline: "Recusar",
    pending: "Pendente",
    friendsListDescription: "Seus amigos espirituais",
    incomingRequests: "Solicitações Recebidas",
    outgoingRequests: "Solicitações Enviadas",
    startSearching: "Comece procurando por amigos para se conectar",
    noIncomingRequests: "Nenhuma solicitação pendente",
    noOutgoingRequests: "Nenhuma solicitação enviada pendente",
    searching: "Procurando...",
    loading: "Carregando...",
    success: "Sucesso",
    error: "Erro",
    friendRequestSent: "Solicitação de amizade enviada com sucesso!",
    friendRequestFailed: "Falha ao enviar solicitação de amizade",
    friendRequestAccepted: "Solicitação de amizade aceita!",
    friendRequestDeclined: "Solicitação de amizade recusada",
    friendRemoved: "Amigo removido com sucesso",
    incomingRequestsDescription: "Solicitações de amizade recebidas",
    outgoingRequestsDescription: "Suas solicitações de amizade enviadas",
    noUsersFound: "Nenhum usuário encontrado",
    typeToSearch: "Digite para pesquisar",
    noFriendsYet: "Você ainda não tem amigos",
    
    // Saved Verses
    savedVerses: "Versículos Salvos",
    verse: "versículo",
    verses: "versículos",
    saved: "salvos",
    noSavedVersesYet: "Nenhum Versículo Salvo",
    bookmarkVersesMessage: "Quando você favoritar versículos, eles aparecerão aqui.",
    tapToViewVerseInContext: "Toque para ver este versículo no contexto",
    read: "Ler",
    bookmarkRemoved: "Favorito Removido",
    removedFromSavedVerses: "removido dos versículos salvos.",
    errorLoadingVerse: "Erro ao Carregar",
    couldNotLoadVerse: "Não foi possível carregar o conteúdo do versículo. Tente novamente.",
    scripture: "Escritura",
    bibleVerse: "Versículo Bíblico",
    noVerseContentAvailable: "Nenhum conteúdo de versículo disponível",
    
    // Support Page
    supportAndPrivacy: "Suporte e Privacidade",
    contactSupport: "Contatar Suporte",
    contactSupportDesc: "Precisa de ajuda? Tem perguntas? Estamos aqui para apoiar sua jornada espiritual.",
    messageOnFacebook: "Envie-nos uma mensagem no Facebook",
    legalDocuments: "Documentos Legais",
    viewLegalPolicies: "Veja nossas políticas legais e termos",
    privacyPolicy: "Política de Privacidade",
    howWeProtectData: "Como protegemos seus dados",
    termsOfService: "Termos de Serviço",
    ourTermsAndConditions: "Nossos termos e condições",
    yourPrivacyRights: "Seus Direitos de Privacidade",
    managePersonalData: "Gerencie seus dados pessoais e configurações de privacidade.",
    exportMyData: "Exportar Meus Dados",
    downloadCopyOfData: "Baixe uma cópia dos seus dados pessoais",
    export: "Exportar",
    deleteMyData: "Excluir Meus Dados",
    permanentlyRemoveInfo: "Remover permanentemente todas as suas informações pessoais",
    deleteData: "Excluir Dados",
    confirmDelete: "Confirmar Exclusão",
    deleting: "Excluindo...",
    areYouSure: "Você tem certeza?",
    deleteWarning: "Isso excluirá permanentemente todos os seus dados, incluindo seu perfil, contagem de sequência, preferências e configurações. Esta ação não pode ser desfeita.",
    cancel: "Cancelar",
    crisisResources: "Recursos de Crise",
    crisisResourcesDesc: "Se você está em crise, entre em contato com estes recursos",
    nationalSuicidePrevention: "Linha Nacional de Prevenção ao Suicídio",
    crisisTextLine: "Linha de Texto de Crise",
    emergencyServices: "Serviços de Emergência",
    accountDeletedSuccess: "Sua conta e todos os dados associados foram permanentemente excluídos de nossos servidores. O aplicativo será reiniciado agora.",
    failedToDeleteAccount: "Falha ao excluir sua conta de nossos servidores. Entre em contato com o suporte para obter assistência.",
    localDataDeleted: "Seus dados locais foram excluídos com sucesso. O aplicativo será reiniciado agora.",
    noUserDataFound: "Nenhum dado de usuário encontrado. O aplicativo será reiniciado agora.",
    errorDeletingAccount: "Ocorreu um erro ao excluir sua conta. Entre em contato com o suporte para obter assistência.",
    appInformation: "Informações do Aplicativo",
    build: "Versão",
    platform: "Plataforma",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Política de Privacidade",
    effectiveDate: "Data de Vigência:",
    privacyIntro: "O Evangelho em 5 Minutos (\"nós\", \"nosso\" ou \"nos\") está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você usa nosso aplicativo móvel.",
    infoWeCollect: "Informações que Coletamos",
    personalInformation: "Informações Pessoais",
    personalInfoDesc: "Quando você se registra, coletamos seu nome, sobrenome, endereço de e-mail, número de telefone e mês/dia de nascimento para personalizar sua jornada espiritual.",
    usageData: "Dados de Uso",
    usageDataDesc: "Rastreamos seu uso diário do aplicativo, contadores de sequência, preferências de versículos e configurações de idioma para melhorar sua experiência e fornecer conteúdo personalizado.",
    aiPastorQuestions: "Perguntas ao Pastor IA",
    aiPastorQuestionsDesc: "As perguntas enviadas ao nosso recurso \"Pergunte ao Pastor\" são processadas pelos serviços da OpenAI para fornecer orientação bíblica. Essas interações estão sujeitas à política de privacidade da OpenAI.",
    howWeUseInfo: "Como Usamos Suas Informações",
    usePersonalizeDailyVerses: "Personalizar versículos diários e conteúdo espiritual",
    useTrackProgress: "Rastrear seu progresso e manter contadores de sequência",
    useProvideBiblicalGuidance: "Fornecer orientação bíblica e respostas alimentadas por IA",
    useSendRelevantContent: "Enviar conteúdo espiritual relevante com base em suas preferências",
    useImproveApp: "Melhorar a funcionalidade do aplicativo e a experiência do usuário",
    dataSharingThirdParties: "Compartilhamento de Dados e Terceiros",
    openAIServicesLabel: "Serviços OpenAI:",
    openAIServicesDesc: "Suas perguntas \"Pergunte ao Pastor\" são processadas pela OpenAI para gerar respostas bíblicas.",
    openAIPrivacyPolicyLink: "Política de privacidade da OpenAI",
    noSellingLabel: "Não Vendemos:",
    noSellingDesc: "Não vendemos, alugamos ou negociamos suas informações pessoais com terceiros.",
    analyticsLabel: "Análise:",
    analyticsDesc: "Podemos usar dados de uso anonimizados para melhorar o desempenho e os recursos do aplicativo.",
    dataStorageSecurity: "Armazenamento e Segurança de Dados",
    dataStorageSecurityDesc: "Suas informações pessoais são armazenadas localmente em seu dispositivo e em servidores seguros. Implementamos medidas de segurança apropriadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.",
    yourRightsChoices: "Seus Direitos e Escolhas",
    rightsAccessLabel: "Acesso:",
    rightsAccessDesc: "Você pode visualizar suas informações pessoais nas configurações do aplicativo",
    rightsCorrectionLabel: "Correção:",
    rightsCorrectionDesc: "Você pode atualizar suas informações a qualquer momento",
    rightsDeletionLabel: "Exclusão:",
    rightsDeletionDesc: "Você pode excluir sua conta e todos os dados associados",
    rightsPortabilityLabel: "Portabilidade de Dados:",
    rightsPortabilityDesc: "Você pode exportar seus dados em um formato legível",
    childrensPrivacy: "Privacidade de Crianças",
    childrensPrivacyDesc: "Nosso aplicativo é projetado para usuários com 13 anos ou mais. Não coletamos conscientemente informações pessoais de crianças menores de 13 anos. Se você acredita que coletamos informações de uma criança menor de 13 anos, entre em contato conosco imediatamente.",
    dataRetention: "Retenção de Dados",
    dataRetentionDesc: "Retemos suas informações pessoais enquanto sua conta estiver ativa ou conforme necessário para fornecer serviços. Você pode solicitar a exclusão de seus dados a qualquer momento através das configurações do aplicativo.",
    changesToPolicy: "Alterações a Esta Política",
    changesToPolicyDesc: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações materiais publicando a nova política no aplicativo e atualizando a data de vigência.",
    contactUs: "Contate-nos",
    contactUsIntro: "Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:",
    contactEmailLabel: "E-mail:",
    contactFacebookLabel: "Facebook:",
    contactAddressLabel: "Endereço:",
    
    // Terms of Service Page
    tosWelcomeText: "Bem-vindo a O Evangelho em 5 Minutos. Estes Termos de Serviço (\"Termos\") regem o uso de nosso aplicativo móvel e serviços. Ao usar nosso aplicativo, você concorda com estes Termos.",
    tosSection1Title: "1. Licença de Uso",
    tosSection1Content: "Concedemos a você uma licença limitada, não exclusiva e intransferível para usar O Evangelho em 5 Minutos para seu uso pessoal e não comercial. Esta licença não inclui o direito de revender, redistribuir ou criar obras derivadas.",
    tosSection2Title: "2. Uso Aceitável",
    tosSection2Intro: "Você concorda em usar nosso aplicativo de maneira consistente com:",
    tosSection2Item1: "Valores cristãos e princípios bíblicos",
    tosSection2Item2: "Engajamento respeitoso com conteúdo espiritual",
    tosSection2Item3: "Apenas propósitos legais",
    tosSection2Item4: "Crescimento espiritual pessoal e educação",
    tosSection2NotIntro: "Você concorda em NÃO:",
    tosSection2NotItem1: "Usar o aplicativo para fins comerciais sem permissão",
    tosSection2NotItem2: "Tentar fazer engenharia reversa ou hackear o aplicativo",
    tosSection2NotItem3: "Compartilhar conteúdo inapropriado ou ofensivo",
    tosSection2NotItem4: "Violar qualquer lei ou regulamento aplicável",
    tosSection3Title: "3. Recursos Alimentados por IA",
    tosSection3Intro: "Nosso recurso \"Pergunte ao Pastor\" usa inteligência artificial para fornecer orientação bíblica. Por favor, entenda:",
    tosSection3Item1: "As respostas de IA são para fins educacionais e inspiradores",
    tosSection3Item2: "As respostas não devem substituir aconselhamento profissional ou médico",
    tosSection3Item3: "O conteúdo gerado por IA pode conter erros ou limitações",
    tosSection3Item4: "Para questões espirituais sérias, consulte um pastor ou conselheiro qualificado",
    tosSection4Title: "4. Conteúdo e Propriedade Intelectual",
    tosSection4BiblicalContentLabel: "Conteúdo Bíblico:",
    tosSection4BiblicalContentText: "As citações das Escrituras são de traduções de domínio público ou usadas sob licenças apropriadas.",
    tosSection4OriginalContentLabel: "Conteúdo Original:",
    tosSection4OriginalContentText: "Nosso conteúdo original, incluindo planos de estudo, comentários e recursos do aplicativo, são protegidos por direitos autorais e permanecem nossa propriedade.",
    tosSection4UserContentLabel: "Conteúdo do Usuário:",
    tosSection4UserContentText: "Quaisquer perguntas ou contribuições que você fornecer podem ser usadas para melhorar nossos serviços, respeitando sua privacidade.",
    tosSection5Title: "5. Isenções de Responsabilidade",
    tosSection5EducationalLabel: "Propósito Educacional:",
    tosSection5EducationalText: "Este aplicativo é para fins educacionais e inspiradores. Não é um substituto para:",
    tosSection5Item1: "Aconselhamento pastoral profissional",
    tosSection5Item2: "Aconselhamento médico ou psicológico",
    tosSection5Item3: "Aconselhamento jurídico ou financeiro",
    tosSection5Item4: "Intervenção em crise ou serviços de emergência",
    tosSection5DoctrinalLabel: "Neutralidade Doutrinária:",
    tosSection5DoctrinalText: "Embora nos esforcemos pela precisão bíblica, as interpretações podem variar entre as denominações cristãs. Consulte sua igreja local para orientação doutrinária.",
    tosSection6Title: "6. Limitação de Responsabilidade",
    tosSection6Content: "Na máxima extensão permitida por lei, O Evangelho em 5 Minutos e seus criadores não serão responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequentes decorrentes do seu uso do aplicativo, incluindo, mas não se limitando a, decisões espirituais, emocionais ou pessoais baseadas no conteúdo do aplicativo.",
    tosSection7Title: "7. Rescisão",
    tosSection7Content: "Você pode parar de usar o aplicativo a qualquer momento e excluir sua conta. Reservamo-nos o direito de rescindir ou suspender o acesso a usuários que violarem estes Termos ou se envolverem em comportamento inadequado.",
    tosSection8Title: "8. Atualizações e Mudanças",
    tosSection8Content: "Podemos atualizar estes Termos periodicamente. O uso continuado do aplicativo após as alterações constitui aceitação dos novos Termos. Mudanças materiais serão comunicadas através do aplicativo.",
    tosSection9Title: "9. Lei Aplicável",
    tosSection9Content: "Estes Termos são regidos pelas leis dos Estados Unidos. Quaisquer disputas serão resolvidas através de arbitragem vinculativa de acordo com os princípios cristãos de reconciliação quando possível.",
    tosSection10Title: "10. Informações de Contato",
    tosSection10Intro: "Para perguntas sobre estes Termos, entre em contato conosco:",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "O Evangelho em 5 Minutos, Departamento Jurídico",
    tosFinalAcknowledgement: "Ao usar O Evangelho em 5 Minutos, você reconhece que leu, compreendeu e concorda em estar vinculado por estes Termos de Serviço.",
    
    // Donation Page
    donationPageTitle: "Fazer uma Doação",
    donationPageSubtitle: "Compartilhe o Amor de Deus com Sua Generosidade",
    donationMissionText: "Apoie nossa missão de espalhar a palavra de Deus pelo mundo através de",
    donationImpactText: "Cada doação traz esperança e salvação para alguém necessitado",
    totalDonationsLabel: "Amor Total Compartilhado Através de Doações",
    soulsTouchedLabel: "Almas Tocadas com a Palavra de Deus",
    bibleImpactText: "Cada Bíblia traz esperança, cura e transformação eterna",
    chooseGiftTitle: "Escolha Seu Presente de Amor",
    chooseGiftSubtitle: "Cada presente planta sementes de esperança eterna",
    chooseGiftDescription: "Junte-se a milhares espalhando o amor de Deus pelo mundo",
    chooseAmountLabel: "Escolha Seu Valor de Doação",
    chooseAmountDescription: "Selecione o valor que fala ao seu coração",
    popularAmountsText: "Valores populares escolhidos por nossa comunidade amorosa",
    customAmountLabel: "Ou Digite o Desejo do Seu Coração",
    customAmountDescription: "Cada valor, não importa o tamanho, faz a diferença",
    customAmountPlaceholder: "Digite o valor do seu presente amoroso...",
    yourGiftLabel: "Seu Presente",
    thankYouGenerousHeart: "Obrigado pelo seu coração generoso!",
    processing: "Processando...",
    importantInformation: "Informações Importantes",
    donationDisclaimer: "As doações são processadas com segurança através do Stripe. Nenhum bem ou serviço é fornecido em troca de doações.",
    taxAdvisorNote: "Consulte seu consultor fiscal sobre a dedutibilidade das doações. Para perguntas sobre doações ou reembolsos, entre em contato com nossa equipe de suporte.",
    agreeToTermsPrefix: "Ao doar, você concorda com nossos",
    and: "e",
    yourImpactTitle: "Seu Impacto",
    yourImpactDescription: "Cada doação nos ajuda a distribuir Bíblias e compartilhar a palavra de Deus com aqueles que mais precisam. Juntos, estamos trazendo esperança e salvação para comunidades em todo o mundo.",
    ourMissionTitle: "Nossa Missão",
    ourMissionDescription: "Cada doação nos ajuda a alcançar mais almas com versículos bíblicos diários, orientação espiritual e o poder transformador da palavra de Deus. Sua generosidade torna possível o impacto eterno.",
    completeDonation: "Finalizar Doação",
    completeYourDonation: "Finalize Sua",
    cancelPayment: "Cancelar",
    paymentFailed: "Pagamento Falhou",
    paymentError: "Erro de Pagamento",
    donationSuccessful: "Doação Bem-Sucedida!",
    donationSuccessMessage: "Obrigado por sua doação para espalhar a palavra de Deus.",
    paymentErrorOccurred: "Ocorreu um erro ao processar seu pagamento.",
    unexpectedError: "Ocorreu um erro inesperado.",
    invalidAmount: "Valor Inválido",
    invalidAmountMessage: "Por favor, insira um valor entre $1 e $10.000.",
    applePayNotAvailable: "Apple Pay Não Disponível",
    applePayNotAvailableMessage: "Por favor, adicione um cartão ao Apple Wallet para usar o Apple Pay.",
    verificationFailed: "Verificação Falhou",
    verificationFailedMessage: "O pagamento pode ainda estar sendo processado. Por favor, verifique mais tarde.",
    paymentProcessingFailed: "Sua doação não pôde ser processada. Por favor, tente novamente.",
    paymentSetupFailed: "Configuração de Pagamento Falhou",
    applePaySetupFailed: "Falha ao configurar o Apple Pay. Por favor, tente novamente.",
    paymentSetupFailedGeneric: "Falha ao configurar o pagamento. Por favor, tente novamente.",
    failedToCreatePayment: "Falha ao criar intenção de pagamento",
    paymentVerificationFailed: "Verificação de pagamento falhou",
    goBackToMore: "Voltar para a página Mais",
    cancelPaymentAction: "Cancelar pagamento",
    
    // Settings Page
    profileInformation: "Informações do Perfil",
    edit: "Editar",
    firstName: "Primeiro Nome",
    lastName: "Sobrenome",
    nameCannotBeChanged: "O nome não pode ser alterado",
    email: "Email",
    phoneNumber: "Número de Telefone",
    birthMonth: "Mês de Nascimento",
    birthDay: "Dia de Nascimento",
    timezone: "Fuso Horário",
    timezoneCannotBeChanged: "O fuso horário não pode ser alterado",
    saveProfile: "Salvar Perfil",
    bibleVersion: "Versão da Bíblia",
    loadingVersions: "Carregando versões...",
    notifications: "Notificações",
    dailyReminders: "Lembretes Diários",
    reminderToReadDailyVerse: "Receba lembretes para ler seu versículo diário",
    reminderTime: "Hora do Lembrete",
    testNotification: "Testar Notificação",
    streakNotifications: "Notificações de Sequência",
    celebrateReadingStreaks: "Celebre suas sequências de leitura",
    emailUpdates: "Atualizações por Email",
    receiveNewsletters: "Receber boletins e atualizações",
    appSettings: "Configurações do App",
    soundEffects: "Efeitos Sonoros",
    enableAppSounds: "Ativar sons e notificações do app",
    appLanguage: "Idioma do App",
    dataPrivacy: "Dados e Privacidade",
    viewPrivacyPolicy: "Ver Política de Privacidade",
    deleteAccountData: "Excluir Dados da Conta",
    deleteAllAccountData: "Excluir Todos os Dados da Conta?",
    deleteAccountWarning: "Isso excluirá permanentemente todos os seus dados deste dispositivo, incluindo:",
    deleteAccountWarningProfile: "Informações do perfil",
    deleteAccountWarningBookmarks: "Marcadores e versículos salvos",
    deleteAccountWarningNotes: "Notas pessoais",
    deleteAccountWarningPreferences: "Preferências do app",
    deleteAccountWarningStreak: "Dados de sequência de leitura",
    actionCannotBeUndone: "Esta ação não pode ser desfeita.",
    deleteAllData: "Excluir Todos os Dados",
    accountActions: "Ações da Conta",
    needHelpWithAccount: "Precisa de ajuda com sua conta? Entre em contato com nossa equipe de suporte.",
    profileUpdated: "Perfil Atualizado",
    profileSavedSuccessfully: "Suas informações de perfil foram salvas com sucesso.",
    failedToSaveProfile: "Falha ao salvar alterações do perfil. Por favor, tente novamente.",
    dataExported: "Dados Exportados",
    dataDownloadedSuccessfully: "Seus dados foram baixados com sucesso.",
    exportFailed: "Exportação Falhou",
    failedToExportData: "Falha ao exportar seus dados. Por favor, tente novamente.",
    accountDataDeleted: "Dados da Conta Excluídos",
    allDataRemovedFromDevice: "Todos os seus dados locais foram removidos deste dispositivo.",
    deletionFailed: "Exclusão Falhou",
    failedToDeleteAccountData: "Falha ao excluir dados da conta. Por favor, tente novamente.",
    dailyRemindersEnabled: "Lembretes Diários Ativados",
    dailyReminderConfirmation: "Você receberá lembretes de versículos diários às",
    permissionRequired: "Permissão Necessária",
    notificationPermissionMessage: "Por favor, permita notificações para receber lembretes de versículos diários.",
    dailyRemindersDisabled: "Lembretes Diários Desativados",
    noMoreDailyReminders: "Você não receberá mais lembretes de versículos diários.",
    reminderTimeUpdated: "Hora do Lembrete Atualizada",
    reminderTimeConfirmation: "Lembretes diários agora serão enviados às",
    settingsUpdated: "Configurações Atualizadas",
    preferencesSaved: "Suas preferências foram salvas.",
    goBackToMorePage: "Voltar para a página Mais",
    january: "Janeiro",
    february: "Fevereiro",
    march: "Março",
    april: "Abril",
    may: "Maio",
    june: "Junho",
    july: "Julho",
    august: "Agosto",
    september: "Setembro",
    october: "Outubro",
    november: "Novembro",
    december: "Dezembro",
    easternTime: "Hora do Leste (EST)",
    centralTime: "Hora Central (CST)",
    mountainTime: "Hora das Montanhas (MST)",
    pacificTime: "Hora do Pacífico (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "Impacto das Doações",
    givingPageSubtitle: "Veja como sua generosidade espalha a palavra de Deus pelo mundo",
    currentGoalSpreadGodsWord: "Meta Atual: Espalhar a Palavra de Deus",
    of: "de",
    goal: "meta",
    percentComplete: "% Completo",
    biblesPurchased: "Bíblias Compradas",
    biblesDistributed: "Bíblias Distribuídas",
    thisMonthsImpact: "Impacto Deste Mês",
    monthlyDonations: "Doações Mensais",
    livesReached: "Vidas Alcançadas",
    joinOurMission: "Junte-se à Nossa Missão",
    givingPageCTADescription: "Sua doação nos ajuda a comprar e distribuir Bíblias para aqueles que mais precisam da palavra de Deus. Cada contribuição leva o Evangelho a alguém que busca esperança e salvação.",
    globalBibleDistribution: "Distribuição Global de Bíblias",
    worldwideImpactComingSoon: "Impacto Global Crescente",
    worldwideImpactDescription: "Estamos distribuindo ativamente Bíblias em todo o mundo. Suas doações estão alcançando comunidades em todo o globo, trazendo esperança e o Evangelho para aqueles que mais precisam.",
    
    // Videos Page
    videosPageTitle: "Vídeos de Fé",
    videosPageSubtitle: "Sermões, percepções do Evangelho e orientação cristã",
    featuredThisWeek: "Destaque da Semana",
    handpickedSpiritualContent: "Conteúdo espiritual selecionado para seu crescimento",
    loadingError: "Erro de Carregamento",
    videoContentNotAvailable: "Algum conteúdo de vídeo pode não estar disponível no momento.",
    noFeaturedVideoAvailable: "Nenhum vídeo em destaque disponível",
    browseByCategory: "Navegar por Categoria",
    discoverTailoredContent: "Descubra conteúdo adaptado à sua jornada espiritual",
    sermons: "Sermões",
    faithMessages: "Mensagens de fé",
    gospelTidbits: "Percepções do Evangelho",
    quickInsights: "Insights rápidos",
    christianAdvice: "Conselhos Cristãos",
    lifeGuidance: "Orientação de vida",
    categoryVideos: "Vídeos",
    recentVideos: "Vídeos Recentes",
    showAll: "Mostrar Tudo",
    noVideosAvailable: "Nenhum vídeo disponível",
    checkInternetConnection: "Por favor, verifique sua conexão com a internet e tente novamente",
    views: "visualizações",
    moreVideosComingSoon: "Biblioteca de Vídeos em Expansão",
    moreVideosDescription: "Nossa coleção cresce com novos sermões, percepções do Evangelho e vídeos de conselhos cristãos. Explore regularmente para conteúdo espiritual fresco que fortaleça sua jornada de fé.",
    sermon: "Sermão",
    gospelTidbit: "Percepção do Evangelho",
    video: "Vídeo",
    
    // Blog Page
    blogPageTitle: "Blog Cristão",
    blogPageSubtitle: "Artigos inspiradores para crescer sua fé",
    featuredArticle: "Artigo em Destaque",
    todaysHighlightedInsight: "Percepção cristã destacada de hoje",
    by: "Por",
    minRead: "min de leitura",
    published: "Publicado",
    readFullArticle: "Ler Artigo Completo",
    recentArticles: "Artigos Recentes",
    latestInsightsToStrengthen: "Últimas percepções para fortalecer sua jornada de fé",
    min: "min",
    readMore: "Ler Mais",
    browseByTopic: "Navegar por Tópico",
    exploreContentByThemes: "Explore conteúdo organizado por temas espirituais",
    articles: "artigos",
    neverMissAnArticle: "Nunca Perca um Artigo",
    latestChristianInsights: "Receba as últimas percepções cristãs e conteúdo edificante em sua caixa de entrada.",
    subscribeToUpdates: "Inscrever-se para Atualizações",
    subscribeToBlog: "Inscreva-se em Nosso Blog",
    joinCommunityBiweekly: "Junte-se à nossa comunidade e receba percepções cristãs quinzenais e conteúdo edificante em sua caixa de entrada.",
    biweeklyInsightsInbox: "Receba percepções cristãs quinzenais e conteúdo edificante em sua caixa de entrada.",
    nameOptional: "Nome (Opcional)",
    yourName: "Seu nome",
    emailAddressRequired: "Endereço de E-mail *",
    emailPlaceholder: "seu.email@exemplo.com",
    subscribing: "Inscrevendo...",
    biweeklyEmailDisclaimer: "Enviaremos atualizações a cada duas semanas. Você pode cancelar a inscrição a qualquer momento.",
    emailRequired: "E-mail Obrigatório",
    enterEmailToSubscribe: "Por favor, insira seu endereço de e-mail para se inscrever.",
    successfullySubscribed: "Inscrito com Sucesso!",
    thankYouSubscribing: "Obrigado por se inscrever nas atualizações do nosso blog.",
    subscriptionFailed: "Falha na Inscrição",
    subscriptionError: "Houve um erro ao processar sua inscrição. Por favor, tente novamente.",
    unableToLoadArticles: "Não foi possível carregar os artigos. Por favor, tente mais tarde.",
    loadingArticles: "Carregando artigos...",
    errorLoadingArticles: "Erro ao Carregar Artigos",
    retry: "Tentar Novamente",
    
    // Bible Studies Page
    bibleStudiesTitle: "Estudos Bíblicos",
    bibleStudiesSubtitle: "Aprofunde sua jornada de fé",
    featuredStudies: "Estudos em Destaque",
    browseAllStudies: "Navegar por Todos os Estudos",
    searchBibleStudies: "Pesquisar estudos bíblicos...",
    allCategory: "Todos",
    discipleship: "Discipulado",
    encouragement: "Encorajamento",
    character: "Caráter",
    prayer: "Oração",
    prophecy: "Profecia",
    love: "Amor",
    featured: "Em Destaque",
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
    lessons: "lições",
    startStudy: "Começar Estudo",
    moreStudies: "Mais Estudos",
    viewStudy: "Ver Estudo",
    noStudiesFound: "Nenhum estudo encontrado",
    adjustSearchTerms: "Tente ajustar seus termos de pesquisa ou filtro de categoria",
    whatYouLearn: "O Que Você Aprenderá:",
    deepBiblicalInsights: "Perspectivas bíblicas profundas e aplicações práticas",
    guidedReflectionQuestions: "Questões de reflexão guiadas para crescimento pessoal",
    scriptureMemorization: "Técnicas de memorização e meditação das Escrituras",
    communityDiscussionPoints: "Pontos de discussão comunitária para estudo em grupo",
    close: "Fechar",
    lessonOf: "Lição",
    day: "Dia",
    todaysScripture: "Escritura de Hoje",
    reflectionQuestions: "Questões de Reflexão",
    todaysPrayer: "Oração de Hoje",
    previousLesson: "Lição Anterior",
    completeLesson: "Completar Lição",
    nextLesson: "Próxima Lição",
    lessonCompleted: "Lição Concluída!",
    greatProgress: "Ótimo progresso! Você está um passo mais perto de concluir este estudo.",
    continueToNextLesson: "Continuar para a Próxima Lição",
    backToStudyOverview: "Voltar à Visão Geral do Estudo",
    
    // Bible Trivia Page
    bibleTriviaResults: "Resultados do Quiz Bíblico",
    bibleTriviaTitle: "Quiz Bíblico",
    bibleExpert: "Especialista Bíblico",
    bibleScholar: "Erudito Bíblico",
    bibleStudent: "Estudante Bíblico",
    keepStudying: "Continue Estudando!",
    level: "Nível",
    gamesPlayed: "Jogos Jogados",
    bestScore: "Melhor Pontuação",
    playAgain: "Jogar Novamente",
    backToHome: "Voltar ao Início",
    questionOf: "Questão",
    score: "Pontuação",
    testBiblicalKnowledge: "Teste seu conhecimento bíblico",
    latest: "Último",
    lastScore: "Última Pontuação",
    best: "Melhor",
    games: "jogos",
    chooseDifficultyLevel: "Escolher Nível de Dificuldade",
    easy: "Fácil",
    medium: "Médio",
    difficult: "Difícil",
    easyDescription: "Conhecimento bíblico básico e histórias conhecidas",
    mediumDescription: "Fatos e personagens bíblicos intermediários",
    difficultDescription: "Teologia avançada e detalhes menos conhecidos",
    scoringGuide: "Guia de Pontuação",
    correctAnswers9to10: "9-10 corretas",
    correctAnswers7to8: "7-8 corretas",
    correctAnswers5to6: "5-6 corretas",
    correctAnswers1to4: "1-4 corretas",
    generatingQuestions: "Gerando Perguntas...",
    startTrivia10Questions: "Iniciar Quiz (10 Perguntas)",
    finishQuiz: "Finalizar Quiz",
    nextQuestion: "Próxima Pergunta",
    failedToGenerateTriviaQuestions: "Falha ao gerar perguntas do quiz. Por favor, tente novamente."
  },
  
  zh: {
    // Navigation & Common
    home: "首页",
    ask: "询问",
    search: "搜索",
    more: "更多",
    
    // Home Page
    welcome: "欢迎！",
    dailyVerse: "每日经文",
    bibleStudyPlans: "3天圣经学习计划",
    askThePastor: "询问AI牧师",
    
    // Time-based greetings
    goodMorning: "早上好",
    goodAfternoon: "下午好",
    goodEvening: "晚上好",
    
    // Ask Page
    askPageDescription: "获得基于圣经的AI指导和圣经智慧",
    feelingsScripture: "情感与圣经",
    
    // Search Page
    searchPageDescription: "通过引用搜索任何圣经经文",
    helpSpreadGodsWord: "帮助传播神的话语",
    donationAppealText: "5分钟福音™接受捐款，将圣经带给世界各地更多的人。您的支持帮助我们接触需要精神指导的灵魂。",
    makeADonation: "捐款",
    
    // More Page
    settingsDescription: "设置和附加功能",
    language: "语言",
    givingImpact: "捐赠影响",
    givingImpactDesc: "看看捐款如何传播神的话语",
    faithVideos: "信仰视频",
    faithVideosDesc: "讲道、福音要点和基督教建议",
    christianBlog: "基督教博客",
    christianBlogDesc: "鼓舞人心的文章助你信仰成长",
    settings: "设置",
    settingsDesc: "管理您的个人资料和偏好",
    friends: "朋友",
    friendsDesc: "与信徒同伴联系",
    privacyStatement: "隐私声明",
    privacyStatementDesc: "了解我们如何保护您的数据",
    endUserAgreement: "最终用户协议",
    endUserAgreementDesc: "使用条款和条件",
    donate: "捐赠",
    donateDesc: "支持我们传播福音的使命",
    supportLegal: "支持和法律",
    supportPrivacyRights: "支持和隐私权",
    comingSoon: "新功能",
    
    // Common Actions
    follow: "关注",
    share: "分享5分钟福音",
    shareText: "通过5分钟福音应用程序发现每日圣经经文和精神指导！",
    
    // Footer
    visitWebsite: "访问我们的网站获取更多资源",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "5分钟福音™",
    appTagline: "将神的话语带向世界",
    version: "版本 1.0.0",
    
    // Ask Page specific
    askPageShareText: "向AI牧师提问，获得基于圣经的指导！",
    
    // AI Pastor Section
    aiPastor: "AI牧师",
    scriptureGuidance: "基于圣经的指导，由圣经智慧驱动",
    welcomeHelp: "欢迎！我在这里帮助您",
    askAnythingGodsWord: "向我询问任何关于神的话语的问题，我会帮助你在圣经中找到答案。",
    tryTheseQuestions: "试试这些问题：",
    growStrongerFaith: "我如何能在信仰上更加坚强？",
    bibleSayAnxiety: "圣经对焦虑怎么说？",
    knowGodsWill: "我如何知道神对我生活的旨意？",
    connectionTrouble: "我现在连接有问题。请稍后再试，我会在这里帮助你解答你的灵性问题。",
    aiPastorUnavailable: "AI牧师不可用",
    seekingWisdomScripture: "AI牧师正在圣经中寻求智慧...",
    askBibleQuestion: "在这里提出你的圣经问题...",
    clearConversation: "清除对话",
    copyMessage: "复制消息",
    sendQuestion: "发送问题",
    biblicallyGuidedResponses: "AI圣经指导的回应",
    
    // AI Pastor Dialog
    askTheAIPastor: "询问AI牧师",
    aiPoweredGuidance: "基于圣经的AI驱动的圣经指导和灵性咨询",
    pastorGreeting: "你好！我在这里提供圣经指导和灵性咨询。今天你心里有什么？无论你面临挑战，对信仰有疑问，还是需要祷告，我都在这里用神的智慧帮助你。",
    technicalDifficulty: "对技术困难我深表歉意。请知道，即使技术失败，神也听到你的心。请随时再试你的问题。",
    pastor: "牧师",
    scriptureReferences: "圣经参考：",
    needPrayerFor: "需要为以下祷告：",
    healing: "医治",
    guidance: "指导",
    strength: "力量",
    peace: "平安",
    commonQuestionsHelp: "我可以帮助的常见问题：",
    askAnythingFaith: "向我询问任何关于信仰、生活或圣经的问题...",
    guidanceRootedGodsWord: "植根于神的话语的指导 • 按Enter发送",
    seekingWisdom: "在圣经中寻求智慧...",
    
    // Friends functionality
    friendsPageDescription: "在灵性旅程中与其他信徒连接",
    searchFriends: "搜索朋友",
    myFriends: "我的朋友",
    requests: "请求",
    findNewFriends: "寻找新朋友",
    searchByNameOrEmail: "按姓名或邮箱搜索",
    searchPlaceholder: "姓名或邮箱",
    addFriend: "添加朋友",
    remove: "删除",
    accept: "接受",
    decline: "拒绝",
    pending: "待定",
    friendsListDescription: "你的灵性朋友",
    noFriendsFound: "未找到朋友",
    incomingRequests: "接收的请求",
    outgoingRequests: "发送的请求",
    startSearching: "开始搜索朋友以连接",
    noIncomingRequests: "没有待定的朋友请求",
    noOutgoingRequests: "没有待定的发送请求",
    searching: "搜索中...",
    loading: "加载中...",
    success: "成功",
    error: "错误",
    friendRequestSent: "朋友请求发送成功！",
    friendRequestFailed: "发送朋友请求失败",
    friendRequestAccepted: "朋友请求已接受！",
    friendRequestDeclined: "朋友请求已拒绝",
    friendRemoved: "朋友删除成功",
    
    // Saved Verses
    savedVerses: "保存的经文",
    verse: "经文",
    verses: "经文",
    saved: "已保存",
    noSavedVersesYet: "尚无保存的经文",
    bookmarkVersesMessage: "当你收藏经文时，它们会出现在这里。",
    tapToViewVerseInContext: "点击查看此经文的上下文",
    read: "阅读",
    bookmarkRemoved: "书签已删除",
    removedFromSavedVerses: "已从保存的经文中删除。",
    errorLoadingVerse: "加载错误",
    couldNotLoadVerse: "无法加载经文内容。请重试。",
    scripture: "经文",
    bibleVerse: "圣经经文",
    noVerseContentAvailable: "无可用的经文内容",
    
    // Support Page
    supportAndPrivacy: "支持与隐私",
    contactSupport: "联系支持",
    contactSupportDesc: "需要帮助？有疑问？我们在这里支持您的灵性旅程。",
    messageOnFacebook: "在Facebook上给我们留言",
    legalDocuments: "法律文件",
    viewLegalPolicies: "查看我们的法律政策和条款",
    privacyPolicy: "隐私政策",
    howWeProtectData: "我们如何保护您的数据",
    termsOfService: "服务条款",
    ourTermsAndConditions: "我们的条款和条件",
    yourPrivacyRights: "您的隐私权",
    managePersonalData: "管理您的个人数据和隐私设置。",
    exportMyData: "导出我的数据",
    downloadCopyOfData: "下载您的个人数据副本",
    export: "导出",
    deleteMyData: "删除我的数据",
    permanentlyRemoveInfo: "永久删除您的所有个人信息",
    deleteData: "删除数据",
    confirmDelete: "确认删除",
    deleting: "正在删除...",
    areYouSure: "您确定吗？",
    deleteWarning: "这将永久删除您的所有数据，包括您的个人资料、连续记录、偏好和设置。此操作无法撤销。",
    cancel: "取消",
    crisisResources: "危机资源",
    crisisResourcesDesc: "如果您处于危机中，请联系这些资源",
    nationalSuicidePrevention: "全国自杀预防生命线",
    crisisTextLine: "危机短信热线",
    emergencyServices: "紧急服务",
    accountDeletedSuccess: "您的账户和所有相关数据已从我们的服务器中永久删除。应用程序现在将重新启动。",
    failedToDeleteAccount: "无法从我们的服务器中删除您的账户。请联系支持以获取帮助。",
    localDataDeleted: "您的本地数据已成功删除。应用程序现在将重新启动。",
    noUserDataFound: "未找到用户数据。应用程序现在将重新启动。",
    errorDeletingAccount: "删除您的账户时发生错误。请联系支持以获取帮助。",
    appInformation: "应用信息",
    build: "版本号",
    platform: "平台",
    
    // Privacy Policy Page
    privacyPolicyTitle: "隐私政策",
    effectiveDate: "生效日期：",
    privacyIntro: "5分钟福音（\"我们\"、\"我们的\"或\"本公司\"）致力于保护您的隐私。本隐私政策说明我们在您使用移动应用程序时如何收集、使用和保护您的信息。",
    infoWeCollect: "我们收集的信息",
    personalInformation: "个人信息",
    personalInfoDesc: "当您注册时，我们收集您的名字、姓氏、电子邮件地址、电话号码和出生月/日，以个性化您的精神之旅。",
    usageData: "使用数据",
    usageDataDesc: "我们跟踪您的日常应用使用情况、连续记录计数器、经文偏好和语言设置，以改善您的体验并提供个性化内容。",
    aiPastorQuestions: "AI牧师问题",
    aiPastorQuestionsDesc: "提交给我们\"询问牧师\"功能的问题由OpenAI服务处理，以提供圣经指导。这些互动受OpenAI隐私政策的约束。",
    howWeUseInfo: "我们如何使用您的信息",
    usePersonalizeDailyVerses: "个性化每日经文和精神内容",
    useTrackProgress: "跟踪您的进度并维护连续记录计数器",
    useProvideBiblicalGuidance: "提供AI驱动的圣经指导和答案",
    useSendRelevantContent: "根据您的偏好发送相关精神内容",
    useImproveApp: "改进应用功能和用户体验",
    dataSharingThirdParties: "数据共享和第三方",
    openAIServicesLabel: "OpenAI服务：",
    openAIServicesDesc: "您的\"询问牧师\"问题由OpenAI处理以生成圣经回应。",
    openAIPrivacyPolicyLink: "OpenAI隐私政策",
    noSellingLabel: "不出售：",
    noSellingDesc: "我们不会向第三方出售、出租或交易您的个人信息。",
    analyticsLabel: "分析：",
    analyticsDesc: "我们可能使用匿名使用数据来改善应用性能和功能。",
    dataStorageSecurity: "数据存储和安全",
    dataStorageSecurityDesc: "您的个人信息存储在您的设备本地和安全服务器上。我们实施适当的安全措施来保护您的数据免受未经授权的访问、更改、披露或破坏。",
    yourRightsChoices: "您的权利和选择",
    rightsAccessLabel: "访问：",
    rightsAccessDesc: "您可以在应用设置中查看您的个人信息",
    rightsCorrectionLabel: "更正：",
    rightsCorrectionDesc: "您可以随时更新您的信息",
    rightsDeletionLabel: "删除：",
    rightsDeletionDesc: "您可以删除您的账户和所有相关数据",
    rightsPortabilityLabel: "数据可移植性：",
    rightsPortabilityDesc: "您可以以可读格式导出您的数据",
    childrensPrivacy: "儿童隐私",
    childrensPrivacyDesc: "我们的应用程序专为13岁及以上的用户设计。我们不会有意收集13岁以下儿童的个人信息。如果您认为我们收集了13岁以下儿童的信息，请立即联系我们。",
    dataRetention: "数据保留",
    dataRetentionDesc: "只要您的账户处于活动状态或根据需要提供服务，我们就会保留您的个人信息。您可以随时通过应用设置请求删除您的数据。",
    changesToPolicy: "政策变更",
    changesToPolicyDesc: "我们可能会定期更新本隐私政策。我们将通过在应用中发布新政策并更新生效日期来通知您任何重大更改。",
    contactUs: "联系我们",
    contactUsIntro: "如果您对本隐私政策有任何疑问，请联系我们：",
    contactEmailLabel: "电子邮件：",
    contactFacebookLabel: "Facebook：",
    contactAddressLabel: "地址：",
    
    // Terms of Service Page
    tosWelcomeText: "欢迎使用5分钟福音。这些服务条款（\"条款\"）管理您对我们移动应用程序和服务的使用。使用我们的应用程序，即表示您同意这些条款。",
    tosSection1Title: "1. 使用许可",
    tosSection1Content: "我们授予您有限的、非独占的、不可转让的许可，供您个人非商业使用5分钟福音。此许可不包括转售、重新分发或创建衍生作品的权利。",
    tosSection2Title: "2. 可接受的使用",
    tosSection2Intro: "您同意以符合以下方式使用我们的应用程序：",
    tosSection2Item1: "基督教价值观和圣经原则",
    tosSection2Item2: "对精神内容的尊重参与",
    tosSection2Item3: "仅用于合法目的",
    tosSection2Item4: "个人精神成长和教育",
    tosSection2NotIntro: "您同意不：",
    tosSection2NotItem1: "未经许可将应用程序用于商业目的",
    tosSection2NotItem2: "尝试对应用程序进行逆向工程或黑客攻击",
    tosSection2NotItem3: "分享不当或冒犯性内容",
    tosSection2NotItem4: "违反任何适用的法律或法规",
    tosSection3Title: "3. AI驱动的功能",
    tosSection3Intro: "我们的\"询问牧师\"功能使用人工智能提供圣经指导。请理解：",
    tosSection3Item1: "AI回应仅供教育和启发目的",
    tosSection3Item2: "回应不应替代专业咨询或医疗建议",
    tosSection3Item3: "AI生成的内容可能包含错误或限制",
    tosSection3Item4: "对于严重的精神问题，请咨询合格的牧师或顾问",
    tosSection4Title: "4. 内容和知识产权",
    tosSection4BiblicalContentLabel: "圣经内容：",
    tosSection4BiblicalContentText: "经文引用来自公共领域的翻译或在适当许可下使用。",
    tosSection4OriginalContentLabel: "原创内容：",
    tosSection4OriginalContentText: "我们的原创内容，包括学习计划、评论和应用程序功能，受版权保护并仍属我们所有。",
    tosSection4UserContentLabel: "用户内容：",
    tosSection4UserContentText: "您提供的任何问题或输入可能会被用于改进我们的服务，同时尊重您的隐私。",
    tosSection5Title: "5. 免责声明",
    tosSection5EducationalLabel: "教育目的：",
    tosSection5EducationalText: "此应用程序用于教育和启发目的。它不能替代：",
    tosSection5Item1: "专业牧师咨询",
    tosSection5Item2: "医疗或心理建议",
    tosSection5Item3: "法律建议或财务指导",
    tosSection5Item4: "危机干预或紧急服务",
    tosSection5DoctrinalLabel: "教义中立：",
    tosSection5DoctrinalText: "虽然我们力求圣经准确性，但解释可能在基督教教派之间有所不同。请咨询您当地的教会以获得教义指导。",
    tosSection6Title: "6. 责任限制",
    tosSection6Content: "在法律允许的最大范围内，5分钟福音及其创建者不对因您使用应用程序而产生的任何间接、偶然、特殊或后果性损害承担责任，包括但不限于基于应用程序内容的精神、情感或个人决定。",
    tosSection7Title: "7. 终止",
    tosSection7Content: "您可以随时停止使用应用程序并删除您的账户。我们保留终止或暂停违反这些条款或从事不当行为的用户访问权限的权利。",
    tosSection8Title: "8. 更新和变更",
    tosSection8Content: "我们可能会定期更新这些条款。在变更后继续使用应用程序即表示接受新条款。重大变更将通过应用程序传达。",
    tosSection9Title: "9. 适用法律",
    tosSection9Content: "这些条款受美国法律管辖。任何争议将通过具有约束力的仲裁解决，在可能的情况下遵循基督教和解原则。",
    tosSection10Title: "10. 联系信息",
    tosSection10Intro: "有关这些条款的问题，请联系我们：",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "5分钟福音，法律部门",
    tosFinalAcknowledgement: "使用5分钟福音，即表示您承认您已阅读、理解并同意受这些服务条款的约束。",
    
    // Donation Page
    donationPageTitle: "捐款",
    donationPageSubtitle: "用您的慷慨分享上帝的爱",
    donationMissionText: "支持我们的使命，通过以下方式在全球传播上帝的话语",
    donationImpactText: "每一笔捐款都为有需要的人带来希望和救赎",
    totalDonationsLabel: "通过捐款分享的爱",
    soulsTouchedLabel: "被上帝话语触动的灵魂",
    bibleImpactText: "每本圣经都带来希望、医治和永恒的改变",
    chooseGiftTitle: "选择您的爱心礼物",
    chooseGiftSubtitle: "每份礼物都播下永恒希望的种子",
    chooseGiftDescription: "加入成千上万的人在世界各地传播上帝的爱",
    chooseAmountLabel: "选择您的捐款金额",
    chooseAmountDescription: "选择触动您心灵的金额",
    popularAmountsText: "我们爱心社区选择的热门金额",
    customAmountLabel: "或输入您心中的愿望",
    customAmountDescription: "无论大小，每一笔金额都会产生影响",
    customAmountPlaceholder: "输入您的爱心礼物金额...",
    yourGiftLabel: "您的礼物",
    thankYouGenerousHeart: "感谢您的慷慨之心！",
    processing: "处理中...",
    importantInformation: "重要信息",
    donationDisclaimer: "捐款通过Stripe安全处理。捐款不提供任何商品或服务作为交换。",
    taxAdvisorNote: "请咨询您的税务顾问关于捐款的可抵扣性。有关捐款或退款问题，请联系我们的支持团队。",
    agreeToTermsPrefix: "捐款即表示您同意我们的",
    and: "和",
    yourImpactTitle: "您的影响",
    yourImpactDescription: "每一笔捐款都帮助我们分发圣经并与最需要的人分享上帝的话语。我们一起为世界各地的社区带来希望和救赎。",
    ourMissionTitle: "我们的使命",
    ourMissionDescription: "每一笔捐款都帮助我们通过每日圣经经文、属灵指导和上帝话语的改变力量接触更多灵魂。您的慷慨使永恒的影响成为可能。",
    completeDonation: "完成捐款",
    completeYourDonation: "完成您的",
    cancelPayment: "取消",
    paymentFailed: "支付失败",
    paymentError: "支付错误",
    donationSuccessful: "捐款成功！",
    donationSuccessMessage: "感谢您为传播上帝的话语而捐款。",
    paymentErrorOccurred: "处理您的付款时发生错误。",
    unexpectedError: "发生了意外错误。",
    invalidAmount: "无效金额",
    invalidAmountMessage: "请输入$1到$10,000之间的金额。",
    applePayNotAvailable: "Apple Pay不可用",
    applePayNotAvailableMessage: "请在Apple Wallet中添加卡片以使用Apple Pay。",
    verificationFailed: "验证失败",
    verificationFailedMessage: "付款可能仍在处理中。请稍后再检查。",
    paymentProcessingFailed: "无法处理您的捐款。请重试。",
    paymentSetupFailed: "支付设置失败",
    applePaySetupFailed: "Apple Pay设置失败。请重试。",
    paymentSetupFailedGeneric: "支付设置失败。请重试。",
    failedToCreatePayment: "创建支付意图失败",
    paymentVerificationFailed: "支付验证失败",
    goBackToMore: "返回更多页面",
    cancelPaymentAction: "取消支付",
    
    // Settings Page
    profileInformation: "个人信息",
    edit: "编辑",
    firstName: "名字",
    lastName: "姓氏",
    nameCannotBeChanged: "名字不能更改",
    email: "电子邮件",
    phoneNumber: "电话号码",
    birthMonth: "出生月份",
    birthDay: "出生日期",
    timezone: "时区",
    timezoneCannotBeChanged: "时区不能更改",
    saveProfile: "保存个人资料",
    bibleVersion: "圣经版本",
    loadingVersions: "加载版本中...",
    notifications: "通知",
    dailyReminders: "每日提醒",
    reminderToReadDailyVerse: "收到阅读每日经文的提醒",
    reminderTime: "提醒时间",
    testNotification: "测试通知",
    streakNotifications: "连续通知",
    celebrateReadingStreaks: "庆祝您的阅读连续",
    emailUpdates: "电子邮件更新",
    receiveNewsletters: "接收新闻通讯和更新",
    appSettings: "应用设置",
    soundEffects: "音效",
    enableAppSounds: "启用应用声音和通知",
    appLanguage: "应用语言",
    dataPrivacy: "数据与隐私",
    viewPrivacyPolicy: "查看隐私政策",
    deleteAccountData: "删除账户数据",
    deleteAllAccountData: "删除所有账户数据？",
    deleteAccountWarning: "这将永久删除此设备上的所有数据，包括：",
    deleteAccountWarningProfile: "个人资料信息",
    deleteAccountWarningBookmarks: "书签和保存的经文",
    deleteAccountWarningNotes: "个人笔记",
    deleteAccountWarningPreferences: "应用偏好设置",
    deleteAccountWarningStreak: "阅读连续数据",
    actionCannotBeUndone: "此操作无法撤消。",
    deleteAllData: "删除所有数据",
    accountActions: "账户操作",
    needHelpWithAccount: "需要账户帮助？联系我们的支持团队。",
    profileUpdated: "个人资料已更新",
    profileSavedSuccessfully: "您的个人资料信息已成功保存。",
    failedToSaveProfile: "无法保存个人资料更改。请重试。",
    dataExported: "数据已导出",
    dataDownloadedSuccessfully: "您的数据已成功下载。",
    exportFailed: "导出失败",
    failedToExportData: "无法导出您的数据。请重试。",
    accountDataDeleted: "账户数据已删除",
    allDataRemovedFromDevice: "此设备上的所有本地数据已被删除。",
    deletionFailed: "删除失败",
    failedToDeleteAccountData: "无法删除账户数据。请重试。",
    dailyRemindersEnabled: "每日提醒已启用",
    dailyReminderConfirmation: "您将在以下时间收到每日经文提醒",
    permissionRequired: "需要权限",
    notificationPermissionMessage: "请允许通知以接收每日经文提醒。",
    dailyRemindersDisabled: "每日提醒已禁用",
    noMoreDailyReminders: "您将不再收到每日经文提醒。",
    reminderTimeUpdated: "提醒时间已更新",
    reminderTimeConfirmation: "每日提醒现在将在以下时间发送",
    settingsUpdated: "设置已更新",
    preferencesSaved: "您的偏好设置已保存。",
    goBackToMorePage: "返回更多页面",
    january: "一月",
    february: "二月",
    march: "三月",
    april: "四月",
    may: "五月",
    june: "六月",
    july: "七月",
    august: "八月",
    september: "九月",
    october: "十月",
    november: "十一月",
    december: "十二月",
    easternTime: "东部时间 (EST)",
    centralTime: "中部时间 (CST)",
    mountainTime: "山地时间 (MST)",
    pacificTime: "太平洋时间 (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "捐赠影响",
    givingPageSubtitle: "看看你的慷慨如何在世界各地传播神的话语",
    currentGoalSpreadGodsWord: "当前目标：传播神的话语",
    of: "的",
    goal: "目标",
    percentComplete: "% 完成",
    biblesPurchased: "已购买圣经",
    biblesDistributed: "已分发圣经",
    thisMonthsImpact: "本月影响",
    monthlyDonations: "月度捐款",
    livesReached: "触达生命",
    joinOurMission: "加入我们的使命",
    givingPageCTADescription: "您的捐赠帮助我们购买和分发圣经给最需要神话语的人。每一份贡献都将福音带给寻求希望和救赎的人。",
    globalBibleDistribution: "全球圣经分发",
    worldwideImpactComingSoon: "不断增长的全球影响力",
    worldwideImpactDescription: "我们正在积极向全球分发圣经。您的捐赠正在到达全球各地的社区，为最需要的人带来希望和福音。",
    
    // Videos Page
    videosPageTitle: "信仰视频",
    videosPageSubtitle: "讲道、福音见解和基督教指导",
    featuredThisWeek: "本周精选",
    handpickedSpiritualContent: "为您精心挑选的精神内容",
    loadingError: "加载错误",
    videoContentNotAvailable: "部分视频内容目前可能不可用。",
    noFeaturedVideoAvailable: "没有可用的精选视频",
    browseByCategory: "按类别浏览",
    discoverTailoredContent: "发现适合您精神旅程的内容",
    sermons: "讲道",
    faithMessages: "信仰信息",
    gospelTidbits: "福音要点",
    quickInsights: "快速见解",
    christianAdvice: "基督教建议",
    lifeGuidance: "生活指导",
    categoryVideos: "视频",
    recentVideos: "最新视频",
    showAll: "显示全部",
    noVideosAvailable: "没有可用视频",
    checkInternetConnection: "请检查您的互联网连接并重试",
    views: "观看",
    moreVideosComingSoon: "不断扩展的视频库",
    moreVideosDescription: "我们的收藏不断增长，包含新的讲道、福音见解和基督教建议视频。定期探索，获取能够加强您信仰之旅的新鲜精神内容。",
    sermon: "讲道",
    gospelTidbit: "福音要点",
    video: "视频",
    
    // Blog Page
    blogPageTitle: "基督教博客",
    blogPageSubtitle: "鼓舞人心的文章助您信仰成长",
    featuredArticle: "精选文章",
    todaysHighlightedInsight: "今日精选基督教见解",
    by: "作者",
    minRead: "分钟阅读",
    published: "发布于",
    readFullArticle: "阅读完整文章",
    recentArticles: "最新文章",
    latestInsightsToStrengthen: "最新见解助您加强信仰之旅",
    min: "分钟",
    readMore: "阅读更多",
    browseByTopic: "按主题浏览",
    exploreContentByThemes: "探索按精神主题组织的内容",
    articles: "篇文章",
    neverMissAnArticle: "不要错过任何文章",
    latestChristianInsights: "在您的收件箱中获取最新的基督教见解和信仰建设内容。",
    subscribeToUpdates: "订阅更新",
    subscribeToBlog: "订阅我们的博客",
    joinCommunityBiweekly: "加入我们的社区，在您的收件箱中接收双周基督教见解和信仰建设内容。",
    biweeklyInsightsInbox: "在您的收件箱中接收双周基督教见解和信仰建设内容。",
    nameOptional: "姓名（可选）",
    yourName: "您的姓名",
    emailAddressRequired: "电子邮件地址 *",
    emailPlaceholder: "your.email@example.com",
    subscribing: "订阅中...",
    biweeklyEmailDisclaimer: "我们每两周向您发送更新。您可以随时取消订阅。",
    emailRequired: "需要电子邮件",
    enterEmailToSubscribe: "请输入您的电子邮件地址以订阅。",
    successfullySubscribed: "订阅成功！",
    thankYouSubscribing: "感谢您订阅我们的博客更新。",
    subscriptionFailed: "订阅失败",
    subscriptionError: "处理您的订阅时出错。请重试。",
    unableToLoadArticles: "无法加载文章。请稍后重试。",
    loadingArticles: "加载文章...",
    errorLoadingArticles: "加载文章错误",
    retry: "重试",
    
    // Bible Studies Page
    bibleStudiesTitle: "圣经学习",
    bibleStudiesSubtitle: "深化您的信仰旅程",
    featuredStudies: "精选学习",
    browseAllStudies: "浏览所有学习",
    searchBibleStudies: "搜索圣经学习...",
    allCategory: "全部",
    discipleship: "门徒训练",
    encouragement: "鼓励",
    character: "品格",
    prayer: "祷告",
    prophecy: "预言",
    love: "爱",
    featured: "精选",
    beginner: "初学者",
    intermediate: "中级",
    advanced: "高级",
    lessons: "课程",
    startStudy: "开始学习",
    moreStudies: "更多学习",
    viewStudy: "查看学习",
    noStudiesFound: "未找到学习",
    adjustSearchTerms: "尝试调整您的搜索词或类别筛选",
    whatYouLearn: "您将学到什么：",
    deepBiblicalInsights: "深刻的圣经见解和实际应用",
    guidedReflectionQuestions: "引导式反思问题促进个人成长",
    scriptureMemorization: "经文记忆和默想技巧",
    communityDiscussionPoints: "小组学习的社区讨论要点",
    close: "关闭",
    lessonOf: "课程",
    day: "天",
    todaysScripture: "今日经文",
    reflectionQuestions: "反思问题",
    todaysPrayer: "今日祷告",
    previousLesson: "上一课",
    completeLesson: "完成课程",
    nextLesson: "下一课",
    lessonCompleted: "课程已完成！",
    greatProgress: "很好的进步！您离完成这个学习又近了一步。",
    continueToNextLesson: "继续下一课",
    backToStudyOverview: "返回学习概述",
    
    // Bible Trivia Page
    bibleTriviaResults: "圣经问答结果",
    bibleTriviaTitle: "圣经问答",
    bibleExpert: "圣经专家",
    bibleScholar: "圣经学者",
    bibleStudent: "圣经学生",
    keepStudying: "继续学习！",
    level: "级别",
    gamesPlayed: "已玩游戏",
    bestScore: "最佳分数",
    playAgain: "再玩一次",
    backToHome: "返回主页",
    questionOf: "问题",
    score: "分数",
    testBiblicalKnowledge: "测试您的圣经知识",
    latest: "最新",
    lastScore: "上次分数",
    best: "最佳",
    games: "游戏",
    chooseDifficultyLevel: "选择难度级别",
    easy: "简单",
    medium: "中等",
    difficult: "困难",
    easyDescription: "基本圣经知识和知名故事",
    mediumDescription: "中级圣经事实和人物",
    difficultDescription: "高级神学和较少人知的细节",
    scoringGuide: "评分指南",
    correctAnswers9to10: "9-10题正确",
    correctAnswers7to8: "7-8题正确",
    correctAnswers5to6: "5-6题正确",
    correctAnswers1to4: "1-4题正确",
    generatingQuestions: "生成问题中...",
    startTrivia10Questions: "开始问答（10个问题）",
    finishQuiz: "完成测验",
    nextQuestion: "下一个问题",
    failedToGenerateTriviaQuestions: "生成问答问题失败。请重试。"
  },
  
  ar: {
    // Navigation & Common
    home: "الرئيسية",
    ask: "اسأل",
    search: "البحث",
    more: "المزيد",
    
    // Home Page
    welcome: "مرحباً!",
    dailyVerse: "آية يومية",
    bibleStudyPlans: "خطط دراسة الكتاب المقدس لـ 3 أيام",
    askThePastor: "اسأل القس الذكي",
    
    // Time-based greetings
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",
    
    // Ask Page
    askPageDescription: "احصل على الإرشاد الكتابي القائم على الكتاب المقدس بالذكاء الاصطناعي",
    feelingsScripture: "المشاعر والكتاب المقدس",
    
    // Search Page
    searchPageDescription: "ابحث عن أي آية في الكتاب المقدس بالمرجع",
    helpSpreadGodsWord: "ساعد في نشر كلمة الله",
    donationAppealText: "الإنجيل في 5 دقائق™ يقبل التبرعات لإيصال الكتاب المقدس إلى المزيد من الناس حول العالم. دعمك يساعدنا في الوصول إلى النفوس المحتاجة للإرشاد الروحي.",
    makeADonation: "تبرع",
    
    // More Page
    settingsDescription: "الإعدادات والميزات الإضافية",
    language: "اللغة",
    givingImpact: "تأثير التبرعات",
    givingImpactDesc: "انظر كيف تنشر التبرعات كلمة الله",
    faithVideos: "فيديوهات الإيمان",
    faithVideosDesc: "خطب ونصائح إنجيلية ومشورة مسيحية",
    christianBlog: "المدونة المسيحية",
    christianBlogDesc: "مقالات ملهمة لتنمية إيمانك",
    settings: "الإعدادات",
    settingsDesc: "إدارة ملفك الشخصي وتفضيلاتك",
    friends: "الأصدقاء",
    friendsDesc: "تواصل مع المؤمنين الآخرين",
    privacyStatement: "بيان الخصوصية",
    privacyStatementDesc: "تعلم كيف نحمي بياناتك",
    endUserAgreement: "اتفاقية المستخدم النهائي",
    endUserAgreementDesc: "الشروط والأحكام للاستخدام",
    donate: "تبرع",
    donateDesc: "ادعم مهمتنا في نشر الإنجيل",
    supportLegal: "الدعم والقانوني",
    supportPrivacyRights: "الدعم وحقوق الخصوصية",
    comingSoon: "ميزة جديدة",
    
    // Common Actions
    follow: "تابع",
    share: "شارك الإنجيل في 5 دقائق",
    shareText: "اكتشف آيات الكتاب المقدس اليومية والإرشاد الروحي مع تطبيق الإنجيل في 5 دقائق!",
    
    // Footer
    visitWebsite: "زر موقعنا الإلكتروني للمزيد من الموارد",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "الإنجيل في 5 دقائق™",
    appTagline: "جلب كلمة الله إلى العالم",
    version: "الإصدار 1.0.0",
    
    // Ask Page specific
    askPageShareText: "اسأل القس الذكي أسئلة واحصل على إرشاد مبني على الكتاب المقدس!",
    
    // AI Pastor Section
    aiPastor: "القس الذكي",
    scriptureGuidance: "إرشاد قائم على الكتاب المقدس مدعوم بالحكمة الإنجيلية",
    welcomeHelp: "مرحباً! أنا هنا للمساعدة",
    askAnythingGodsWord: "اسألني أي شيء عن كلمة الله، وسأساعدك في إيجاد الإجابات في الكتاب المقدس.",
    tryTheseQuestions: "جرب هذه الأسئلة:",
    growStrongerFaith: "كيف يمكنني أن أنمو أقوى في إيماني؟",
    bibleSayAnxiety: "ماذا يقول الكتاب المقدس عن القلق؟",
    knowGodsWill: "كيف أعرف إرادة الله لحياتي؟",
    connectionTrouble: "أواجه مشكلة في الاتصال الآن. يرجى المحاولة مرة أخرى بعد قليل، وسأكون هنا لمساعدتك في سؤالك الروحي.",
    aiPastorUnavailable: "القس الذكي غير متاح",
    seekingWisdomScripture: "القس الذكي يبحث عن الحكمة في الكتاب المقدس...",
    askBibleQuestion: "اطرح سؤالك الكتابي هنا...",
    clearConversation: "مسح المحادثة",
    copyMessage: "نسخ الرسالة",
    sendQuestion: "إرسال السؤال",
    biblicallyGuidedResponses: "استجابات موجهة كتابياً بواسطة الذكاء الاصطناعي",
    
    // AI Pastor Dialog
    askTheAIPastor: "اسأل القس الذكي",
    aiPoweredGuidance: "إرشاد كتابي ومشورة روحية مدعومة بالذكاء الاصطناعي بناءً على الكتاب المقدس",
    pastorGreeting: "مرحباً! أنا هنا لتقديم إرشاد كتابي ومشورة روحية. ما الذي في قلبك اليوم؟ سواء كنت تواجه تحديات، أو لديك أسئلة حول الإيمان، أو تحتاج إلى صلاة، أنا هنا لمساعدتك بحكمة الله.",
    technicalDifficulty: "أعتذر عن الصعوبة التقنية. يرجى العلم أن الله يسمع قلبك حتى عندما تفشل التكنولوجيا. لا تتردد في محاولة سؤالك مرة أخرى.",
    pastor: "القس",
    scriptureReferences: "مراجع الكتاب المقدس:",
    needPrayerFor: "بحاجة إلى صلاة من أجل:",
    healing: "شفاء",
    guidance: "إرشاد",
    strength: "قوة",
    peace: "سلام",
    commonQuestionsHelp: "الأسئلة الشائعة التي يمكنني المساعدة فيها:",
    askAnythingFaith: "اسألني أي شيء عن الإيمان أو الحياة أو الكتاب المقدس...",
    guidanceRootedGodsWord: "إرشاد متجذر في كلمة الله • اضغط Enter للإرسال",
    seekingWisdom: "البحث عن الحكمة في الكتاب المقدس...",
    
    // Friends functionality
    friendsPageDescription: "تواصل مع المؤمنين الآخرين في رحلتك الروحية",
    searchFriends: "البحث عن الأصدقاء",
    myFriends: "أصدقائي",
    requests: "الطلبات",
    findNewFriends: "العثور على أصدقاء جدد",
    searchByNameOrEmail: "البحث بالاسم أو البريد الإلكتروني",
    searchPlaceholder: "الاسم أو البريد الإلكتروني",
    addFriend: "إضافة صديق",
    remove: "إزالة",
    accept: "قبول",
    decline: "رفض",
    pending: "في الانتظار",
    friendsListDescription: "أصدقاؤك الروحيون",
    noFriendsFound: "لم يتم العثور على أصدقاء",
    incomingRequests: "الطلبات الواردة",
    outgoingRequests: "الطلبات الصادرة",
    startSearching: "ابدأ بالبحث عن الأصدقاء للتواصل",
    noIncomingRequests: "لا توجد طلبات صداقة معلقة",
    noOutgoingRequests: "لا توجد طلبات صادرة معلقة",
    searching: "البحث...",
    loading: "جاري التحميل...",
    success: "نجح",
    error: "خطأ",
    friendRequestSent: "تم إرسال طلب الصداقة بنجاح!",
    friendRequestFailed: "فشل في إرسال طلب الصداقة",
    friendRequestAccepted: "تم قبول طلب الصداقة!",
    friendRequestDeclined: "تم رفض طلب الصداقة",
    friendRemoved: "تم حذف الصديق بنجاح",
    
    // Saved Verses
    savedVerses: "الآيات المحفوظة",
    verse: "آية",
    verses: "آيات",
    saved: "محفوظة",
    noSavedVersesYet: "لا توجد آيات محفوظة بعد",
    bookmarkVersesMessage: "عندما تحفظ آيات، ستظهر هنا للوصول السريع.",
    tapToViewVerseInContext: "اضغط لرؤية هذه الآية في السياق",
    read: "اقرأ",
    bookmarkRemoved: "تم حذف الإشارة المرجعية",
    removedFromSavedVerses: "تمت الإزالة من الآيات المحفوظة.",
    errorLoadingVerse: "خطأ في التحميل",
    couldNotLoadVerse: "تعذر تحميل محتوى الآية. الرجاء المحاولة مرة أخرى.",
    scripture: "كتاب مقدس",
    bibleVerse: "آية من الكتاب المقدس",
    noVerseContentAvailable: "لا يوجد محتوى آية متاح",
    
    // Support Page
    supportAndPrivacy: "الدعم والخصوصية",
    contactSupport: "اتصل بالدعم",
    contactSupportDesc: "هل تحتاج إلى مساعدة؟ لديك أسئلة؟ نحن هنا لدعم رحلتك الروحية.",
    messageOnFacebook: "أرسل لنا رسالة على فيسبوك",
    legalDocuments: "المستندات القانونية",
    viewLegalPolicies: "اطلع على سياساتنا القانونية وشروطنا",
    privacyPolicy: "سياسة الخصوصية",
    howWeProtectData: "كيف نحمي بياناتك",
    termsOfService: "شروط الخدمة",
    ourTermsAndConditions: "الشروط والأحكام الخاصة بنا",
    yourPrivacyRights: "حقوق الخصوصية الخاصة بك",
    managePersonalData: "إدارة بياناتك الشخصية وإعدادات الخصوصية.",
    exportMyData: "تصدير بياناتي",
    downloadCopyOfData: "قم بتنزيل نسخة من بياناتك الشخصية",
    export: "تصدير",
    deleteMyData: "حذف بياناتي",
    permanentlyRemoveInfo: "حذف جميع معلوماتك الشخصية نهائيًا",
    deleteData: "حذف البيانات",
    confirmDelete: "تأكيد الحذف",
    deleting: "جارٍ الحذف...",
    areYouSure: "هل أنت متأكد؟",
    deleteWarning: "سيؤدي هذا إلى حذف جميع بياناتك نهائيًا بما في ذلك ملفك الشخصي وعدد السلاسل والتفضيلات والإعدادات. لا يمكن التراجع عن هذا الإجراء.",
    cancel: "إلغاء",
    crisisResources: "موارد الأزمات",
    crisisResourcesDesc: "إذا كنت في أزمة، يرجى التواصل مع هذه الموارد",
    nationalSuicidePrevention: "خط المساعدة الوطني للوقاية من الانتحار",
    crisisTextLine: "خط الرسائل النصية للأزمات",
    emergencyServices: "خدمات الطوارئ",
    accountDeletedSuccess: "تم حذف حسابك وجميع البيانات المرتبطة به نهائيًا من خوادمنا. سيتم إعادة تشغيل التطبيق الآن.",
    failedToDeleteAccount: "فشل حذف حسابك من خوادمنا. يرجى الاتصال بالدعم للحصول على المساعدة.",
    localDataDeleted: "تم حذف بياناتك المحلية بنجاح. سيتم إعادة تشغيل التطبيق الآن.",
    noUserDataFound: "لم يتم العثور على بيانات المستخدم. سيتم إعادة تشغيل التطبيق الآن.",
    errorDeletingAccount: "حدث خطأ أثناء حذف حسابك. يرجى الاتصال بالدعم للحصول على المساعدة.",
    appInformation: "معلومات التطبيق",
    build: "الإصدار",
    platform: "المنصة",
    
    // Privacy Policy Page
    privacyPolicyTitle: "سياسة الخصوصية",
    effectiveDate: "تاريخ السريان:",
    privacyIntro: "الإنجيل في 5 دقائق (\"نحن\" أو \"خاصتنا\" أو \"الخاص بنا\") ملتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدامك لتطبيق الهاتف المحمول الخاص بنا.",
    infoWeCollect: "المعلومات التي نجمعها",
    personalInformation: "المعلومات الشخصية",
    personalInfoDesc: "عند التسجيل، نجمع اسمك الأول واسم العائلة وعنوان البريد الإلكتروني ورقم الهاتف وشهر/يوم الميلاد لتخصيص رحلتك الروحية.",
    usageData: "بيانات الاستخدام",
    usageDataDesc: "نتتبع استخدامك اليومي للتطبيق وعدادات السلسلة وتفضيلات الآيات وإعدادات اللغة لتحسين تجربتك وتوفير محتوى مخصص.",
    aiPastorQuestions: "أسئلة القس الذكي",
    aiPastorQuestionsDesc: "يتم معالجة الأسئلة المقدمة إلى ميزة \"اسأل القس\" الخاصة بنا بواسطة خدمات OpenAI لتوفير الإرشاد الكتابي. تخضع هذه التفاعلات لسياسة خصوصية OpenAI.",
    howWeUseInfo: "كيف نستخدم معلوماتك",
    usePersonalizeDailyVerses: "تخصيص الآيات اليومية والمحتوى الروحي",
    useTrackProgress: "تتبع تقدمك والحفاظ على عدادات السلسلة",
    useProvideBiblicalGuidance: "توفير الإرشاد الكتابي والإجابات المدعومة بالذكاء الاصطناعي",
    useSendRelevantContent: "إرسال محتوى روحي ذي صلة بناءً على تفضيلاتك",
    useImproveApp: "تحسين وظائف التطبيق وتجربة المستخدم",
    dataSharingThirdParties: "مشاركة البيانات والأطراف الثالثة",
    openAIServicesLabel: "خدمات OpenAI:",
    openAIServicesDesc: "يتم معالجة أسئلة \"اسأل القس\" الخاصة بك بواسطة OpenAI لإنشاء ردود كتابية.",
    openAIPrivacyPolicyLink: "سياسة خصوصية OpenAI",
    noSellingLabel: "لا بيع:",
    noSellingDesc: "نحن لا نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية مع أطراف ثالثة.",
    analyticsLabel: "التحليلات:",
    analyticsDesc: "قد نستخدم بيانات الاستخدام المجهولة لتحسين أداء التطبيق وميزاته.",
    dataStorageSecurity: "تخزين البيانات والأمن",
    dataStorageSecurityDesc: "يتم تخزين معلوماتك الشخصية محليًا على جهازك وعلى خوادم آمنة. نقوم بتنفيذ تدابير أمنية مناسبة لحماية بياناتك من الوصول أو التعديل أو الكشف أو التدمير غير المصرح به.",
    yourRightsChoices: "حقوقك واختياراتك",
    rightsAccessLabel: "الوصول:",
    rightsAccessDesc: "يمكنك عرض معلوماتك الشخصية في إعدادات التطبيق",
    rightsCorrectionLabel: "التصحيح:",
    rightsCorrectionDesc: "يمكنك تحديث معلوماتك في أي وقت",
    rightsDeletionLabel: "الحذف:",
    rightsDeletionDesc: "يمكنك حذف حسابك وجميع البيانات المرتبطة",
    rightsPortabilityLabel: "قابلية نقل البيانات:",
    rightsPortabilityDesc: "يمكنك تصدير بياناتك بتنسيق قابل للقراءة",
    childrensPrivacy: "خصوصية الأطفال",
    childrensPrivacyDesc: "تم تصميم تطبيقنا للمستخدمين الذين تبلغ أعمارهم 13 عامًا أو أكثر. نحن لا نجمع عن قصد معلومات شخصية من الأطفال دون سن 13 عامًا. إذا كنت تعتقد أننا جمعنا معلومات من طفل دون سن 13 عامًا، يرجى الاتصال بنا على الفور.",
    dataRetention: "الاحتفاظ بالبيانات",
    dataRetentionDesc: "نحتفظ بمعلوماتك الشخصية طالما كان حسابك نشطًا أو حسب الحاجة لتوفير الخدمات. يمكنك طلب حذف بياناتك في أي وقت من خلال إعدادات التطبيق.",
    changesToPolicy: "التغييرات على هذه السياسة",
    changesToPolicyDesc: "قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري. سنخطرك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة في التطبيق وتحديث تاريخ السريان.",
    contactUs: "اتصل بنا",
    contactUsIntro: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:",
    contactEmailLabel: "البريد الإلكتروني:",
    contactFacebookLabel: "فيسبوك:",
    contactAddressLabel: "العنوان:",
    
    // Terms of Service Page
    tosWelcomeText: "مرحبًا بك في الإنجيل في 5 دقائق. تحكم شروط الخدمة هذه (\"الشروط\") استخدامك لتطبيق الهاتف المحمول والخدمات الخاصة بنا. باستخدام تطبيقنا، فإنك توافق على هذه الشروط.",
    tosSection1Title: "1. ترخيص الاستخدام",
    tosSection1Content: "نمنحك ترخيصًا محدودًا وغير حصري وغير قابل للتحويل لاستخدام الإنجيل في 5 دقائق لاستخدامك الشخصي غير التجاري. لا يتضمن هذا الترخيص الحق في إعادة البيع أو إعادة التوزيع أو إنشاء أعمال مشتقة.",
    tosSection2Title: "2. الاستخدام المقبول",
    tosSection2Intro: "أنت توافق على استخدام تطبيقنا بطريقة متسقة مع:",
    tosSection2Item1: "القيم المسيحية والمبادئ الكتابية",
    tosSection2Item2: "المشاركة المحترمة مع المحتوى الروحي",
    tosSection2Item3: "الأغراض القانونية فقط",
    tosSection2Item4: "النمو الروحي الشخصي والتعليم",
    tosSection2NotIntro: "أنت توافق على عدم:",
    tosSection2NotItem1: "استخدام التطبيق لأغراض تجارية دون إذن",
    tosSection2NotItem2: "محاولة إجراء هندسة عكسية أو اختراق التطبيق",
    tosSection2NotItem3: "مشاركة محتوى غير لائق أو مسيء",
    tosSection2NotItem4: "انتهاك أي قوانين أو لوائح معمول بها",
    tosSection3Title: "3. الميزات المدعومة بالذكاء الاصطناعي",
    tosSection3Intro: "تستخدم ميزة \"اسأل القس\" الخاصة بنا الذكاء الاصطناعي لتقديم الإرشاد الكتابي. يرجى الفهم:",
    tosSection3Item1: "استجابات الذكاء الاصطناعي هي لأغراض تعليمية وملهمة",
    tosSection3Item2: "يجب ألا تحل الاستجابات محل الاستشارة المهنية أو النصيحة الطبية",
    tosSection3Item3: "قد يحتوي المحتوى الذي ينشئه الذكاء الاصطناعي على أخطاء أو قيود",
    tosSection3Item4: "بالنسبة للمسائل الروحية الخطيرة، استشر قسًا أو مستشارًا مؤهلاً",
    tosSection4Title: "4. المحتوى والملكية الفكرية",
    tosSection4BiblicalContentLabel: "المحتوى الكتابي:",
    tosSection4BiblicalContentText: "اقتباسات الكتاب المقدس من ترجمات ملك عام أو مستخدمة بموجب التراخيص المناسبة.",
    tosSection4OriginalContentLabel: "المحتوى الأصلي:",
    tosSection4OriginalContentText: "محتوانا الأصلي، بما في ذلك خطط الدراسة والتعليقات وميزات التطبيق، محمي بحقوق النشر ويبقى ملكيتنا.",
    tosSection4UserContentLabel: "محتوى المستخدم:",
    tosSection4UserContentText: "يمكن استخدام أي أسئلة أو مدخلات تقدمها لتحسين خدماتنا مع احترام خصوصيتك.",
    tosSection5Title: "5. إخلاء المسؤولية",
    tosSection5EducationalLabel: "الغرض التعليمي:",
    tosSection5EducationalText: "هذا التطبيق لأغراض تعليمية وملهمة. إنه ليس بديلاً عن:",
    tosSection5Item1: "الإرشاد الرعوي المهني",
    tosSection5Item2: "النصيحة الطبية أو النفسية",
    tosSection5Item3: "المشورة القانونية أو المالية",
    tosSection5Item4: "التدخل في الأزمات أو خدمات الطوارئ",
    tosSection5DoctrinalLabel: "الحياد العقائدي:",
    tosSection5DoctrinalText: "بينما نسعى جاهدين لتحقيق الدقة الكتابية، قد تختلف التفسيرات بين الطوائف المسيحية. استشر كنيستك المحلية للحصول على إرشادات عقائدية.",
    tosSection6Title: "6. تحديد المسؤولية",
    tosSection6Content: "إلى أقصى حد يسمح به القانون، لن يكون الإنجيل في 5 دقائق وصانعوه مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناشئة عن استخدامك للتطبيق، بما في ذلك على سبيل المثال لا الحصر القرارات الروحية أو العاطفية أو الشخصية بناءً على محتوى التطبيق.",
    tosSection7Title: "7. الإنهاء",
    tosSection7Content: "يمكنك التوقف عن استخدام التطبيق في أي وقت وحذف حسابك. نحتفظ بالحق في إنهاء أو تعليق الوصول للمستخدمين الذين ينتهكون هذه الشروط أو ينخرطون في سلوك غير لائق.",
    tosSection8Title: "8. التحديثات والتغييرات",
    tosSection8Content: "قد نقوم بتحديث هذه الشروط بشكل دوري. الاستمرار في استخدام التطبيق بعد التغييرات يشكل قبولاً للشروط الجديدة. سيتم إبلاغ التغييرات الجوهرية من خلال التطبيق.",
    tosSection9Title: "9. القانون الحاكم",
    tosSection9Content: "تحكم هذه الشروط قوانين الولايات المتحدة. سيتم حل أي نزاعات من خلال التحكيم الملزم وفقًا لمبادئ المصالحة المسيحية حيثما أمكن ذلك.",
    tosSection10Title: "10. معلومات الاتصال",
    tosSection10Intro: "للأسئلة حول هذه الشروط، يرجى الاتصال بنا:",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "الإنجيل في 5 دقائق، القسم القانوني",
    tosFinalAcknowledgement: "باستخدام الإنجيل في 5 دقائق، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه.",
    
    // Donation Page
    donationPageTitle: "تقديم تبرع",
    donationPageSubtitle: "شارك حب الله من خلال كرمك",
    donationMissionText: "ادعم مهمتنا لنشر كلمة الله حول العالم من خلال",
    donationImpactText: "كل تبرع يجلب الأمل والخلاص لشخص محتاج",
    totalDonationsLabel: "إجمالي الحب المشترك من خلال التبرعات",
    soulsTouchedLabel: "النفوس التي لمستها كلمة الله",
    bibleImpactText: "كل كتاب مقدس يجلب الأمل والشفاء والتحول الأبدي",
    chooseGiftTitle: "اختر هدية حبك",
    chooseGiftSubtitle: "كل هدية تزرع بذور الأمل الأبدي",
    chooseGiftDescription: "انضم إلى الآلاف في نشر حب الله حول العالم",
    chooseAmountLabel: "اختر مبلغ هديتك",
    chooseAmountDescription: "اختر المبلغ الذي يتحدث إلى قلبك",
    popularAmountsText: "المبالغ الشائعة التي اختارها مجتمعنا المحب",
    customAmountLabel: "أو أدخل رغبة قلبك",
    customAmountDescription: "كل مبلغ، مهما كان حجمه، يحدث فرقًا",
    customAmountPlaceholder: "أدخل مبلغ هديتك المحبة...",
    yourGiftLabel: "هديتك",
    thankYouGenerousHeart: "شكرًا لك على قلبك الكريم!",
    processing: "جاري المعالجة...",
    importantInformation: "معلومات مهمة",
    donationDisclaimer: "تتم معالجة التبرعات بشكل آمن من خلال Stripe. لا يتم تقديم أي سلع أو خدمات مقابل التبرعات.",
    taxAdvisorNote: "يرجى استشارة مستشارك الضريبي بشأن قابلية خصم التبرعات. لأسئلة حول التبرعات أو المبالغ المستردة، اتصل بفريق الدعم لدينا.",
    agreeToTermsPrefix: "بالتبرع، فإنك توافق على",
    and: "و",
    yourImpactTitle: "تأثيرك",
    yourImpactDescription: "كل تبرع يساعدنا على توزيع الأناجيل ومشاركة كلمة الله مع أولئك الذين يحتاجونها أكثر. معًا، نجلب الأمل والخلاص للمجتمعات حول العالم.",
    ourMissionTitle: "مهمتنا",
    ourMissionDescription: "كل تبرع يساعدنا على الوصول إلى المزيد من النفوس بآيات الكتاب المقدس اليومية والإرشاد الروحي والقوة التحويلية لكلمة الله. كرمك يجعل التأثير الأبدي ممكنًا.",
    completeDonation: "إتمام التبرع",
    completeYourDonation: "أكمل",
    cancelPayment: "إلغاء",
    paymentFailed: "فشل الدفع",
    paymentError: "خطأ في الدفع",
    donationSuccessful: "تبرع ناجح!",
    donationSuccessMessage: "شكرًا لتبرعك لنشر كلمة الله.",
    paymentErrorOccurred: "حدث خطأ أثناء معالجة دفعتك.",
    unexpectedError: "حدث خطأ غير متوقع.",
    invalidAmount: "مبلغ غير صالح",
    invalidAmountMessage: "يرجى إدخال مبلغ بين $1 و $10,000.",
    applePayNotAvailable: "Apple Pay غير متاح",
    applePayNotAvailableMessage: "يرجى إضافة بطاقة إلى Apple Wallet لاستخدام Apple Pay.",
    verificationFailed: "فشل التحقق",
    verificationFailedMessage: "قد لا يزال الدفع قيد المعالجة. يرجى التحقق مرة أخرى لاحقًا.",
    paymentProcessingFailed: "تعذرت معالجة تبرعك. يرجى المحاولة مرة أخرى.",
    paymentSetupFailed: "فشل إعداد الدفع",
    applePaySetupFailed: "فشل إعداد Apple Pay. يرجى المحاولة مرة أخرى.",
    paymentSetupFailedGeneric: "فشل إعداد الدفع. يرجى المحاولة مرة أخرى.",
    failedToCreatePayment: "فشل إنشاء نية الدفع",
    paymentVerificationFailed: "فشل التحقق من الدفع",
    goBackToMore: "العودة إلى صفحة المزيد",
    cancelPaymentAction: "إلغاء الدفع",
    
    // Settings Page
    profileInformation: "معلومات الملف الشخصي",
    edit: "تحرير",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    nameCannotBeChanged: "لا يمكن تغيير الاسم",
    email: "البريد الإلكتروني",
    phoneNumber: "رقم الهاتف",
    birthMonth: "شهر الميلاد",
    birthDay: "يوم الميلاد",
    timezone: "المنطقة الزمنية",
    timezoneCannotBeChanged: "لا يمكن تغيير المنطقة الزمنية",
    saveProfile: "حفظ الملف الشخصي",
    bibleVersion: "نسخة الكتاب المقدس",
    loadingVersions: "جاري تحميل الإصدارات...",
    notifications: "الإشعارات",
    dailyReminders: "التذكيرات اليومية",
    reminderToReadDailyVerse: "احصل على تذكيرات لقراءة آيتك اليومية",
    reminderTime: "وقت التذكير",
    testNotification: "اختبار الإشعار",
    streakNotifications: "إشعارات السلسلة",
    celebrateReadingStreaks: "احتفل بسلسلة قراءتك",
    emailUpdates: "تحديثات البريد الإلكتروني",
    receiveNewsletters: "تلقي النشرات الإخبارية والتحديثات",
    appSettings: "إعدادات التطبيق",
    soundEffects: "المؤثرات الصوتية",
    enableAppSounds: "تفعيل أصوات التطبيق والإشعارات",
    appLanguage: "لغة التطبيق",
    dataPrivacy: "البيانات والخصوصية",
    viewPrivacyPolicy: "عرض سياسة الخصوصية",
    deleteAccountData: "حذف بيانات الحساب",
    deleteAllAccountData: "حذف جميع بيانات الحساب؟",
    deleteAccountWarning: "سيؤدي ذلك إلى حذف جميع بياناتك من هذا الجهاز نهائيًا، بما في ذلك:",
    deleteAccountWarningProfile: "معلومات الملف الشخصي",
    deleteAccountWarningBookmarks: "الإشارات المرجعية والآيات المحفوظة",
    deleteAccountWarningNotes: "الملاحظات الشخصية",
    deleteAccountWarningPreferences: "تفضيلات التطبيق",
    deleteAccountWarningStreak: "بيانات سلسلة القراءة",
    actionCannotBeUndone: "لا يمكن التراجع عن هذا الإجراء.",
    deleteAllData: "حذف جميع البيانات",
    accountActions: "إجراءات الحساب",
    needHelpWithAccount: "هل تحتاج مساعدة في حسابك؟ اتصل بفريق الدعم لدينا.",
    profileUpdated: "تم تحديث الملف الشخصي",
    profileSavedSuccessfully: "تم حفظ معلومات ملفك الشخصي بنجاح.",
    failedToSaveProfile: "فشل حفظ تغييرات الملف الشخصي. يرجى المحاولة مرة أخرى.",
    dataExported: "تم تصدير البيانات",
    dataDownloadedSuccessfully: "تم تنزيل بياناتك بنجاح.",
    exportFailed: "فشل التصدير",
    failedToExportData: "فشل تصدير بياناتك. يرجى المحاولة مرة أخرى.",
    accountDataDeleted: "تم حذف بيانات الحساب",
    allDataRemovedFromDevice: "تم إزالة جميع بياناتك المحلية من هذا الجهاز.",
    deletionFailed: "فشل الحذف",
    failedToDeleteAccountData: "فشل حذف بيانات الحساب. يرجى المحاولة مرة أخرى.",
    dailyRemindersEnabled: "تم تفعيل التذكيرات اليومية",
    dailyReminderConfirmation: "ستتلقى تذكيرات الآيات اليومية في",
    permissionRequired: "الإذن مطلوب",
    notificationPermissionMessage: "يرجى السماح بالإشعارات لتلقي تذكيرات الآيات اليومية.",
    dailyRemindersDisabled: "تم تعطيل التذكيرات اليومية",
    noMoreDailyReminders: "لن تتلقى تذكيرات الآيات اليومية بعد الآن.",
    reminderTimeUpdated: "تم تحديث وقت التذكير",
    reminderTimeConfirmation: "سيتم الآن إرسال التذكيرات اليومية في",
    settingsUpdated: "تم تحديث الإعدادات",
    preferencesSaved: "تم حفظ تفضيلاتك.",
    goBackToMorePage: "العودة إلى صفحة المزيد",
    january: "يناير",
    february: "فبراير",
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    july: "يوليو",
    august: "أغسطس",
    september: "سبتمبر",
    october: "أكتوبر",
    november: "نوفمبر",
    december: "ديسمبر",
    easternTime: "التوقيت الشرقي (EST)",
    centralTime: "التوقيت المركزي (CST)",
    mountainTime: "التوقيت الجبلي (MST)",
    pacificTime: "توقيت المحيط الهادئ (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "تأثير التبرعات",
    givingPageSubtitle: "شاهد كيف تنشر كرمك كلمة الله في جميع أنحاء العالم",
    currentGoalSpreadGodsWord: "الهدف الحالي: نشر كلمة الله",
    of: "من",
    goal: "هدف",
    percentComplete: "% مكتمل",
    biblesPurchased: "الكتب المقدسة المشتراة",
    biblesDistributed: "الكتب المقدسة الموزعة",
    thisMonthsImpact: "تأثير هذا الشهر",
    monthlyDonations: "التبرعات الشهرية",
    livesReached: "الأرواح التي تم الوصول إليها",
    joinOurMission: "انضم إلى مهمتنا",
    givingPageCTADescription: "تبرعك يساعدنا في شراء وتوزيع الكتب المقدسة لأولئك الذين يحتاجون كلمة الله أكثر. كل مساهمة تجلب الإنجيل لشخص يبحث عن الأمل والخلاص.",
    globalBibleDistribution: "توزيع الكتاب المقدس العالمي",
    worldwideImpactComingSoon: "تأثير عالمي متزايد",
    worldwideImpactDescription: "نحن نوزع الكتب المقدسة بنشاط في جميع أنحاء العالم. تبرعاتك تصل إلى المجتمعات في جميع أنحاء العالم، وتجلب الأمل والإنجيل لأولئك الذين هم في أمس الحاجة إليه.",
    
    // Videos Page
    videosPageTitle: "فيديوهات الإيمان",
    videosPageSubtitle: "خطب ورؤى إنجيلية وإرشاد مسيحي",
    featuredThisWeek: "مميز هذا الأسبوع",
    handpickedSpiritualContent: "محتوى روحي منتقى بعناية لنموك",
    loadingError: "خطأ في التحميل",
    videoContentNotAvailable: "قد لا يكون بعض محتوى الفيديو متاحاً في الوقت الحالي.",
    noFeaturedVideoAvailable: "لا يوجد فيديو مميز متاح",
    browseByCategory: "تصفح حسب الفئة",
    discoverTailoredContent: "اكتشف المحتوى المصمم خصيصاً لرحلتك الروحية",
    sermons: "خطب",
    faithMessages: "رسائل الإيمان",
    gospelTidbits: "نقاط من الإنجيل",
    quickInsights: "رؤى سريعة",
    christianAdvice: "نصائح مسيحية",
    lifeGuidance: "إرشاد الحياة",
    categoryVideos: "فيديوهات",
    recentVideos: "فيديوهات حديثة",
    showAll: "عرض الكل",
    noVideosAvailable: "لا توجد فيديوهات متاحة",
    checkInternetConnection: "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى",
    views: "مشاهدات",
    moreVideosComingSoon: "مكتبة فيديو متوسعة",
    moreVideosDescription: "تنمو مجموعتنا بخطب جديدة ورؤى إنجيلية وفيديوهات نصائح مسيحية. استكشف بانتظام للحصول على محتوى روحي جديد يقوي رحلتك الإيمانية.",
    sermon: "خطبة",
    gospelTidbit: "نقطة من الإنجيل",
    video: "فيديو",
    
    // Blog Page
    blogPageTitle: "المدونة المسيحية",
    blogPageSubtitle: "مقالات ملهمة لتنمية إيمانك",
    featuredArticle: "مقال مميز",
    todaysHighlightedInsight: "الرؤية المسيحية المميزة اليوم",
    by: "بواسطة",
    minRead: "دقيقة قراءة",
    published: "نُشر",
    readFullArticle: "اقرأ المقال كاملاً",
    recentArticles: "مقالات حديثة",
    latestInsightsToStrengthen: "أحدث الرؤى لتقوية رحلة إيمانك",
    min: "دقيقة",
    readMore: "اقرأ المزيد",
    browseByTopic: "تصفح حسب الموضوع",
    exploreContentByThemes: "استكشف المحتوى المنظم حسب المواضيع الروحية",
    articles: "مقالات",
    neverMissAnArticle: "لا تفوت أي مقال",
    latestChristianInsights: "احصل على أحدث الرؤى المسيحية والمحتوى البناء للإيمان في صندوق بريدك.",
    subscribeToUpdates: "الاشتراك في التحديثات",
    subscribeToBlog: "اشترك في مدونتنا",
    joinCommunityBiweekly: "انضم إلى مجتمعنا واحصل على رؤى مسيحية نصف شهرية ومحتوى بناء للإيمان في صندوق بريدك.",
    biweeklyInsightsInbox: "احصل على رؤى مسيحية نصف شهرية ومحتوى بناء للإيمان في صندوق بريدك.",
    nameOptional: "الاسم (اختياري)",
    yourName: "اسمك",
    emailAddressRequired: "عنوان البريد الإلكتروني *",
    emailPlaceholder: "your.email@example.com",
    subscribing: "جاري الاشتراك...",
    biweeklyEmailDisclaimer: "سنرسل لك تحديثات كل أسبوعين. يمكنك إلغاء الاشتراك في أي وقت.",
    emailRequired: "البريد الإلكتروني مطلوب",
    enterEmailToSubscribe: "يرجى إدخال عنوان بريدك الإلكتروني للاشتراك.",
    successfullySubscribed: "تم الاشتراك بنجاح!",
    thankYouSubscribing: "شكراً لاشتراكك في تحديثات مدونتنا.",
    subscriptionFailed: "فشل الاشتراك",
    subscriptionError: "حدث خطأ أثناء معالجة اشتراكك. يرجى المحاولة مرة أخرى.",
    unableToLoadArticles: "غير قادر على تحميل المقالات. يرجى المحاولة لاحقاً.",
    loadingArticles: "جاري تحميل المقالات...",
    errorLoadingArticles: "خطأ في تحميل المقالات",
    retry: "حاول مرة أخرى",
    
    // Bible Studies Page
    bibleStudiesTitle: "دراسات الكتاب المقدس",
    bibleStudiesSubtitle: "تعمق في رحلة إيمانك",
    featuredStudies: "دراسات مميزة",
    browseAllStudies: "تصفح جميع الدراسات",
    searchBibleStudies: "ابحث عن دراسات الكتاب المقدس...",
    allCategory: "الكل",
    discipleship: "التلمذة",
    encouragement: "التشجيع",
    character: "الشخصية",
    prayer: "الصلاة",
    prophecy: "النبوة",
    love: "المحبة",
    featured: "مميز",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
    lessons: "دروس",
    startStudy: "ابدأ الدراسة",
    moreStudies: "المزيد من الدراسات",
    viewStudy: "عرض الدراسة",
    noStudiesFound: "لم يتم العثور على دراسات",
    adjustSearchTerms: "حاول تعديل مصطلحات البحث أو تصفية الفئة",
    whatYouLearn: "ما ستتعلمه:",
    deepBiblicalInsights: "رؤى كتابية عميقة وتطبيقات عملية",
    guidedReflectionQuestions: "أسئلة تأمل موجهة للنمو الشخصي",
    scriptureMemorization: "تقنيات حفظ وتأمل الكتاب المقدس",
    communityDiscussionPoints: "نقاط نقاش مجتمعية للدراسة الجماعية",
    close: "إغلاق",
    lessonOf: "الدرس",
    day: "اليوم",
    todaysScripture: "كتاب اليوم",
    reflectionQuestions: "أسئلة التأمل",
    todaysPrayer: "صلاة اليوم",
    previousLesson: "الدرس السابق",
    completeLesson: "إتمام الدرس",
    nextLesson: "الدرس التالي",
    lessonCompleted: "تم إنهاء الدرس!",
    greatProgress: "تقدم رائع! أنت على بعد خطوة واحدة من إتمام هذه الدراسة.",
    continueToNextLesson: "الانتقال إلى الدرس التالي",
    backToStudyOverview: "العودة إلى نظرة عامة على الدراسة",
    
    // Bible Trivia Page
    bibleTriviaResults: "نتائج مسابقة الكتاب المقدس",
    bibleTriviaTitle: "مسابقة الكتاب المقدس",
    bibleExpert: "خبير في الكتاب المقدس",
    bibleScholar: "عالم بالكتاب المقدس",
    bibleStudent: "طالب الكتاب المقدس",
    keepStudying: "واصل الدراسة!",
    level: "المستوى",
    gamesPlayed: "الألعاب التي تم لعبها",
    bestScore: "أفضل نتيجة",
    playAgain: "العب مرة أخرى",
    backToHome: "العودة إلى الصفحة الرئيسية",
    questionOf: "السؤال",
    score: "النتيجة",
    testBiblicalKnowledge: "اختبر معرفتك بالكتاب المقدس",
    latest: "الأخير",
    lastScore: "آخر نتيجة",
    best: "الأفضل",
    games: "ألعاب",
    chooseDifficultyLevel: "اختر مستوى الصعوبة",
    easy: "سهل",
    medium: "متوسط",
    difficult: "صعب",
    easyDescription: "معرفة أساسية بالكتاب المقدس وقصص معروفة",
    mediumDescription: "حقائق وشخصيات كتابية متوسطة",
    difficultDescription: "لاهوت متقدم وتفاصيل أقل شهرة",
    scoringGuide: "دليل التسجيل",
    correctAnswers9to10: "9-10 صحيحة",
    correctAnswers7to8: "7-8 صحيحة",
    correctAnswers5to6: "5-6 صحيحة",
    correctAnswers1to4: "1-4 صحيحة",
    generatingQuestions: "إنشاء الأسئلة...",
    startTrivia10Questions: "ابدأ المسابقة (10 أسئلة)",
    finishQuiz: "إنهاء الاختبار",
    nextQuestion: "السؤال التالي",
    failedToGenerateTriviaQuestions: "فشل في إنشاء أسئلة المسابقة. يرجى المحاولة مرة أخرى."
  },
  
  hi: {
    // Navigation & Common
    home: "होम",
    ask: "पूछें",
    search: "खोजें",
    more: "और",
    
    // Home Page
    welcome: "स्वागत!",
    dailyVerse: "दैनिक श्लोक",
    bibleStudyPlans: "3-दिन की बाइबल अध्ययन योजनाएं",
    askThePastor: "AI पादरी से पूछें",
    
    // Time-based greetings
    goodMorning: "सुप्रभात",
    goodAfternoon: "शुभ अपराह्न",
    goodEvening: "शुभ संध्या",
    
    // Ask Page
    askPageDescription: "AI के साथ शास्त्र-आधारित मार्गदर्शन और बाइबल की बुद्धि प्राप्त करें",
    feelingsScripture: "भावनाएं और शास्त्र",
    
    // Search Page
    searchPageDescription: "संदर्भ के द्वारा किसी भी बाइबल श्लोक को खोजें",
    helpSpreadGodsWord: "परमेश्वर के वचन को फैलाने में मदद करें",
    donationAppealText: "5 मिनट में सुसमाचार™ दुनिया भर के अधिक लोगों तक पवित्र बाइबल पहुंचाने के लिए दान स्वीकार करता है। आपका समर्थन हमें आध्यात्मिक मार्गदर्शन की आवश्यकता वाली आत्माओं तक पहुंचने में मदद करता है।",
    makeADonation: "दान करें",
    
    // More Page
    settingsDescription: "सेटिंग्स और अतिरिक्त सुविधाएं",
    language: "भाषा",
    givingImpact: "दान का प्रभाव",
    givingImpactDesc: "देखें कि दान कैसे परमेश्वर के वचन को फैलाता है",
    faithVideos: "विश्वास वीडियो",
    faithVideosDesc: "उपदेश, सुसमाचार के सुझाव और ईसाई सलाह",
    christianBlog: "ईसाई ब्लॉग",
    christianBlogDesc: "आपके विश्वास को बढ़ाने के लिए प्रेरणादायक लेख",
    settings: "सेटिंग्स",
    settingsDesc: "अपनी प्रोफाइल और पसंद का प्रबंधन करें",
    friends: "मित्र",
    friendsDesc: "साथी विश्वासियों से जुड़ें",
    privacyStatement: "गोपनीयता कथन",
    privacyStatementDesc: "जानें कि हम आपके डेटा की सुरक्षा कैसे करते हैं",
    endUserAgreement: "अंतिम उपयोगकर्ता समझौता",
    endUserAgreementDesc: "उपयोग के नियम और शर्तें",
    donate: "दान करें",
    donateDesc: "सुसमाचार फैलाने के हमारे मिशन का समर्थन करें",
    supportLegal: "सहायता और कानूनी",
    supportPrivacyRights: "सहायता और गोपनीयता अधिकार",
    comingSoon: "नई सुविधा",
    
    // Common Actions
    follow: "फॉलो करें",
    share: "5 मिनट में सुसमाचार साझा करें",
    shareText: "5 मिनट में सुसमाचार ऐप के साथ दैनिक बाइबल श्लोक और आध्यात्मिक मार्गदर्शन खोजें!",
    
    // Footer
    visitWebsite: "अधिक संसाधनों के लिए हमारी वेबसाइट पर जाएं",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTitle: "5 मिनट में सुसमाचार™",
    appTagline: "परमेश्वर के वचन को दुनिया में लाना",
    version: "संस्करण 1.0.0",
    
    // Ask Page specific
    askPageShareText: "AI पादरी से प्रश्न पूछें और शास्त्र-आधारित मार्गदर्शन प्राप्त करें!",
    
    // AI Pastor Section
    aiPastor: "AI पादरी",
    scriptureGuidance: "बाइबिल ज्ञान द्वारा संचालित शास्त्र-आधारित मार्गदर्शन",
    welcomeHelp: "स्वागत है! मैं यहां मदद के लिए हूं",
    askAnythingGodsWord: "मुझसे परमेश्वर के वचन के बारे में कुछ भी पूछें, और मैं आपको शास्त्र में उत्तर खोजने में मदद करूंगा।",
    tryTheseQuestions: "इन प्रश्नों को आज़माएं:",
    growStrongerFaith: "मैं अपने विश्वास में कैसे मजबूत हो सकता हूं?",
    bibleSayAnxiety: "बाइबल चिंता के बारे में क्या कहती है?",
    knowGodsWill: "मैं अपने जीवन के लिए परमेश्वर की इच्छा कैसे जानूं?",
    connectionTrouble: "मुझे अभी कनेक्शन में समस्या हो रही है। कृपया एक क्षण में पुनः प्रयास करें, और मैं आपके आध्यात्मिक प्रश्न में मदद के लिए यहां होऊंगा।",
    aiPastorUnavailable: "AI पादरी उपलब्ध नहीं",
    seekingWisdomScripture: "AI पादरी शास्त्र में ज्ञान खोज रहे हैं...",
    askBibleQuestion: "यहां अपना बाइबल प्रश्न पूछें...",
    clearConversation: "बातचीत साफ़ करें",
    copyMessage: "संदेश कॉपी करें",
    sendQuestion: "प्रश्न भेजें",
    biblicallyGuidedResponses: "AI द्वारा बाइबिल मार्गदर्शित प्रतिक्रियाएं",
    
    // AI Pastor Dialog
    askTheAIPastor: "AI पादरी से पूछें",
    aiPoweredGuidance: "शास्त्र पर आधारित AI-संचालित बाइबिल मार्गदर्शन और आध्यात्मिक परामर्श",
    pastorGreeting: "नमस्ते! मैं यहां बाइबिल मार्गदर्शन और आध्यात्मिक परामर्श प्रदान करने के लिए हूं। आज आपके दिल में क्या है? चाहे आप चुनौतियों का सामना कर रहे हों, विश्वास के बारे में प्रश्न हों, या प्रार्थना की आवश्यकता हो, मैं परमेश्वर के ज्ञान से आपकी मदद के लिए यहां हूं।",
    technicalDifficulty: "तकनीकी कठिनाई के लिए मैं क्षमा चाहता हूं। कृपया जान लें कि भले ही तकनीक विफल हो जाए, परमेश्वर आपके दिल को सुनता है। अपना प्रश्न फिर से पूछने में संकोच न करें।",
    pastor: "पादरी",
    scriptureReferences: "शास्त्र संदर्भ:",
    needPrayerFor: "प्रार्थना की आवश्यकता है:",
    healing: "उपचार",
    guidance: "मार्गदर्शन",
    strength: "शक्ति",
    peace: "शांति",
    commonQuestionsHelp: "सामान्य प्रश्न जिनमें मैं मदद कर सकता हूं:",
    askAnythingFaith: "मुझसे विश्वास, जीवन या बाइबल के बारे में कुछ भी पूछें...",
    guidanceRootedGodsWord: "परमेश्वर के वचन में निहित मार्गदर्शन • भेजने के लिए Enter दबाएं",
    seekingWisdom: "शास्त्र में ज्ञान खोज रहे हैं...",
    
    // Friends functionality
    friendsPageDescription: "अपनी आध्यात्मिक यात्रा में अन्य विश्वासियों से जुड़ें",
    searchFriends: "मित्र खोजें",
    myFriends: "मेरे मित्र",
    requests: "अनुरोध",
    findNewFriends: "नए मित्र खोजें",
    searchByNameOrEmail: "नाम या ईमेल से खोजें",
    searchPlaceholder: "नाम या ईमेल",
    addFriend: "मित्र जोड़ें",
    remove: "हटाएं",
    accept: "स्वीकार करें",
    decline: "अस्वीकार करें",
    pending: "लंबित",
    friendsListDescription: "आपके आध्यात्मिक मित्र",
    incomingRequests: "प्राप्त अनुरोध",
    outgoingRequests: "भेजे गए अनुरोध",
    startSearching: "जुड़ने के लिए मित्रों की खोज शुरू करें",
    noIncomingRequests: "कोई लंबित मित्र अनुरोध नहीं",
    noOutgoingRequests: "कोई लंबित भेजा गया अनुरोध नहीं",
    searching: "खोज रहे हैं...",
    loading: "लोड हो रहा है...",
    success: "सफल",
    error: "त्रुटि",
    friendRequestSent: "मित्र अनुरोध सफलतापूर्वक भेजा गया!",
    friendRequestFailed: "मित्र अनुरोध भेजने में विफल",
    friendRequestAccepted: "मित्र अनुरोध स्वीकार किया गया!",
    friendRequestDeclined: "मित्र अनुरोध अस्वीकार किया गया",
    friendRemoved: "मित्र सफलतापूर्वक हटाया गया",
    incomingRequestsDescription: "प्राप्त मित्र अनुरोध",
    outgoingRequestsDescription: "आपके भेजे गए मित्र अनुरोध",
    noUsersFound: "कोई उपयोगकर्ता नहीं मिला",
    typeToSearch: "खोजने के लिए टाइप करें",
    noFriendsYet: "आपके पास अभी तक कोई मित्र नहीं है",
    
    // Saved Verses
    savedVerses: "सहेजे गए श्लोक",
    verse: "श्लोक",
    verses: "श्लोक",
    saved: "सहेजे गए",
    noSavedVersesYet: "अभी तक कोई श्लोक सहेजा नहीं गया",
    bookmarkVersesMessage: "जब आप श्लोक बुकमार्क करेंगे, तो वे यहां दिखाई देंगे।",
    tapToViewVerseInContext: "इस श्लोक को संदर्भ में देखने के लिए टैप करें",
    read: "पढ़ें",
    bookmarkRemoved: "बुकमार्क हटाया गया",
    removedFromSavedVerses: "सहेजे गए श्लोकों से हटाया गया।",
    errorLoadingVerse: "लोड करने में त्रुटि",
    couldNotLoadVerse: "श्लोक सामग्री लोड नहीं की जा सकी। कृपया पुनः प्रयास करें।",
    scripture: "धर्मग्रंथ",
    bibleVerse: "बाइबल श्लोक",
    noVerseContentAvailable: "कोई श्लोक सामग्री उपलब्ध नहीं",
    
    // Support Page
    supportAndPrivacy: "सहायता और गोपनीयता",
    contactSupport: "सहायता से संपर्क करें",
    contactSupportDesc: "मदद चाहिए? प्रश्न हैं? हम आपकी आध्यात्मिक यात्रा का समर्थन करने के लिए यहां हैं।",
    messageOnFacebook: "फेसबुक पर हमें संदेश भेजें",
    legalDocuments: "कानूनी दस्तावेज़",
    viewLegalPolicies: "हमारी कानूनी नीतियां और शर्तें देखें",
    privacyPolicy: "गोपनीयता नीति",
    howWeProtectData: "हम आपके डेटा की सुरक्षा कैसे करते हैं",
    termsOfService: "सेवा की शर्तें",
    ourTermsAndConditions: "हमारे नियम और शर्तें",
    yourPrivacyRights: "आपके गोपनीयता अधिकार",
    managePersonalData: "अपने व्यक्तिगत डेटा और गोपनीयता सेटिंग्स का प्रबंधन करें।",
    exportMyData: "मेरा डेटा निर्यात करें",
    downloadCopyOfData: "अपने व्यक्तिगत डेटा की एक प्रति डाउनलोड करें",
    export: "निर्यात करें",
    deleteMyData: "मेरा डेटा हटाएं",
    permanentlyRemoveInfo: "अपनी सभी व्यक्तिगत जानकारी को स्थायी रूप से हटाएं",
    deleteData: "डेटा हटाएं",
    confirmDelete: "हटाने की पुष्टि करें",
    deleting: "हटाया जा रहा है...",
    areYouSure: "क्या आप सुनिश्चित हैं?",
    deleteWarning: "यह आपके प्रोफ़ाइल, स्ट्रीक काउंट, प्राथमिकताओं और सेटिंग्स सहित आपके सभी डेटा को स्थायी रूप से हटा देगा। यह कार्रवाई पूर्ववत नहीं की जा सकती।",
    cancel: "रद्द करें",
    crisisResources: "संकट संसाधन",
    crisisResourcesDesc: "यदि आप संकट में हैं, तो कृपया इन संसाधनों से संपर्क करें",
    nationalSuicidePrevention: "राष्ट्रीय आत्महत्या रोकथाम हेल्पलाइन",
    crisisTextLine: "संकट टेक्स्ट लाइन",
    emergencyServices: "आपातकालीन सेवाएं",
    accountDeletedSuccess: "आपका खाता और सभी संबद्ध डेटा हमारे सर्वर से स्थायी रूप से हटा दिया गया है। ऐप अब पुनः आरंभ होगा।",
    failedToDeleteAccount: "हमारे सर्वर से आपका खाता हटाने में विफल। कृपया सहायता के लिए समर्थन से संपर्क करें।",
    localDataDeleted: "आपका स्थानीय डेटा सफलतापूर्वक हटा दिया गया है। ऐप अब पुनः आरंभ होगा।",
    noUserDataFound: "कोई उपयोगकर्ता डेटा नहीं मिला। ऐप अब पुनः आरंभ होगा।",
    errorDeletingAccount: "आपका खाता हटाते समय एक त्रुटि हुई। कृपया सहायता के लिए समर्थन से संपर्क करें।",
    appInformation: "ऐप जानकारी",
    build: "बिल्ड",
    platform: "प्लेटफॉर्म",
    
    // Privacy Policy Page
    privacyPolicyTitle: "गोपनीयता नीति",
    effectiveDate: "प्रभावी तिथि:",
    privacyIntro: "5 मिनट में सुसमाचार (\"हम\", \"हमारा\" या \"हमारे\") आपकी गोपनीयता की सुरक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि जब आप हमारे मोबाइल ऐप का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।",
    infoWeCollect: "हम कौन सी जानकारी एकत्र करते हैं",
    personalInformation: "व्यक्तिगत जानकारी",
    personalInfoDesc: "जब आप पंजीकरण करते हैं, तो हम आपकी आध्यात्मिक यात्रा को व्यक्तिगत बनाने के लिए आपका पहला नाम, अंतिम नाम, ईमेल पता, फोन नंबर और जन्म तिथि/माह एकत्र करते हैं।",
    usageData: "उपयोग डेटा",
    usageDataDesc: "हम आपके अनुभव को बेहतर बनाने और व्यक्तिगत सामग्री प्रदान करने के लिए आपके दैनिक ऐप उपयोग, स्ट्रीक काउंटर, वर्स प्राथमिकताओं और भाषा सेटिंग्स को ट्रैक करते हैं।",
    aiPastorQuestions: "AI पादरी प्रश्न",
    aiPastorQuestionsDesc: "हमारी \"पादरी से पूछें\" सुविधा में प्रस्तुत प्रश्नों को बाइबिल मार्गदर्शन प्रदान करने के लिए OpenAI सेवाओं द्वारा संसाधित किया जाता है। ये इंटरैक्शन OpenAI की गोपनीयता नीति के अधीन हैं।",
    howWeUseInfo: "हम आपकी जानकारी का उपयोग कैसे करते हैं",
    usePersonalizeDailyVerses: "दैनिक छंद और आध्यात्मिक सामग्री को व्यक्तिगत बनाएं",
    useTrackProgress: "अपनी प्रगति को ट्रैक करें और स्ट्रीक काउंटर बनाए रखें",
    useProvideBiblicalGuidance: "AI-संचालित बाइबिल मार्गदर्शन और उत्तर प्रदान करें",
    useSendRelevantContent: "आपकी प्राथमिकताओं के आधार पर प्रासंगिक आध्यात्मिक सामग्री भेजें",
    useImproveApp: "ऐप कार्यक्षमता और उपयोगकर्ता अनुभव में सुधार करें",
    dataSharingThirdParties: "डेटा साझाकरण और तीसरे पक्ष",
    openAIServicesLabel: "OpenAI सेवाएं:",
    openAIServicesDesc: "आपके \"पादरी से पूछें\" प्रश्नों को बाइबिल प्रतिक्रियाएं उत्पन्न करने के लिए OpenAI द्वारा संसाधित किया जाता है।",
    openAIPrivacyPolicyLink: "OpenAI गोपनीयता नीति",
    noSellingLabel: "कोई बिक्री नहीं:",
    noSellingDesc: "हम तीसरे पक्ष को आपकी व्यक्तिगत जानकारी बेचते, किराए पर नहीं देते या व्यापार नहीं करते हैं।",
    analyticsLabel: "विश्लेषण:",
    analyticsDesc: "हम ऐप के प्रदर्शन और सुविधाओं को बेहतर बनाने के लिए गुमनाम उपयोग डेटा का उपयोग कर सकते हैं।",
    dataStorageSecurity: "डेटा संग्रहण और सुरक्षा",
    dataStorageSecurityDesc: "आपकी व्यक्तिगत जानकारी आपके डिवाइस पर स्थानीय रूप से और सुरक्षित सर्वर पर संग्रहीत की जाती है। हम अनधिकृत पहुंच, परिवर्तन, प्रकटीकरण या विनाश से आपके डेटा की सुरक्षा के लिए उपयुक्त सुरक्षा उपाय लागू करते हैं।",
    yourRightsChoices: "आपके अधिकार और विकल्प",
    rightsAccessLabel: "पहुंच:",
    rightsAccessDesc: "आप ऐप सेटिंग्स में अपनी व्यक्तिगत जानकारी देख सकते हैं",
    rightsCorrectionLabel: "सुधार:",
    rightsCorrectionDesc: "आप किसी भी समय अपनी जानकारी अपडेट कर सकते हैं",
    rightsDeletionLabel: "हटाना:",
    rightsDeletionDesc: "आप अपना खाता और सभी संबद्ध डेटा हटा सकते हैं",
    rightsPortabilityLabel: "डेटा पोर्टेबिलिटी:",
    rightsPortabilityDesc: "आप अपने डेटा को पठनीय प्रारूप में निर्यात कर सकते हैं",
    childrensPrivacy: "बच्चों की गोपनीयता",
    childrensPrivacyDesc: "हमारा ऐप 13 वर्ष या उससे अधिक आयु के उपयोगकर्ताओं के लिए डिज़ाइन किया गया है। हम जानबूझकर 13 वर्ष से कम आयु के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं। यदि आपको लगता है कि हमने 13 वर्ष से कम आयु के बच्चे से जानकारी एकत्र की है, तो कृपया तुरंत हमसे संपर्क करें।",
    dataRetention: "डेटा प्रतिधारण",
    dataRetentionDesc: "हम आपकी व्यक्तिगत जानकारी को तब तक बनाए रखते हैं जब तक आपका खाता सक्रिय है या सेवाएं प्रदान करने के लिए आवश्यक है। आप ऐप सेटिंग्स के माध्यम से किसी भी समय अपने डेटा को हटाने का अनुरोध कर सकते हैं।",
    changesToPolicy: "इस नीति में परिवर्तन",
    changesToPolicyDesc: "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम ऐप में नई नीति पोस्ट करके और प्रभावी तिथि को अपडेट करके किसी भी महत्वपूर्ण परिवर्तन के बारे में आपको सूचित करेंगे।",
    contactUs: "हमसे संपर्क करें",
    contactUsIntro: "यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:",
    contactEmailLabel: "ईमेल:",
    contactFacebookLabel: "Facebook:",
    contactAddressLabel: "पता:",
    
    // Terms of Service Page
    tosWelcomeText: "5 मिनट में सुसमाचार में आपका स्वागत है। ये सेवा की शर्तें (\"शर्तें\") हमारे मोबाइल एप्लिकेशन और सेवाओं के आपके उपयोग को नियंत्रित करती हैं। हमारे ऐप का उपयोग करके, आप इन शर्तों से सहमत हैं।",
    tosSection1Title: "1. उपयोग का लाइसेंस",
    tosSection1Content: "हम आपको 5 मिनट में सुसमाचार को आपके व्यक्तिगत, गैर-वाणिज्यिक उपयोग के लिए सीमित, गैर-अनन्य, गैर-हस्तांतरणीय लाइसेंस प्रदान करते हैं। इस लाइसेंस में पुनर्विक्रय, पुनर्वितरण, या व्युत्पन्न कार्य बनाने का अधिकार शामिल नहीं है।",
    tosSection2Title: "2. स्वीकार्य उपयोग",
    tosSection2Intro: "आप हमारे ऐप का उपयोग निम्नलिखित के अनुरूप करने के लिए सहमत हैं:",
    tosSection2Item1: "ईसाई मूल्य और बाइबिल सिद्धांत",
    tosSection2Item2: "आध्यात्मिक सामग्री के साथ सम्मानजनक जुड़ाव",
    tosSection2Item3: "केवल कानूनी उद्देश्य",
    tosSection2Item4: "व्यक्तिगत आध्यात्मिक विकास और शिक्षा",
    tosSection2NotIntro: "आप सहमत हैं कि आप नहीं करेंगे:",
    tosSection2NotItem1: "अनुमति के बिना वाणिज्यिक उद्देश्यों के लिए ऐप का उपयोग करें",
    tosSection2NotItem2: "ऐप को रिवर्स इंजीनियर या हैक करने का प्रयास करें",
    tosSection2NotItem3: "अनुचित या आपत्तिजनक सामग्री साझा करें",
    tosSection2NotItem4: "किसी भी लागू कानून या नियमों का उल्लंघन करें",
    tosSection3Title: "3. AI-संचालित सुविधाएं",
    tosSection3Intro: "हमारी \"पादरी से पूछें\" सुविधा बाइबिल मार्गदर्शन प्रदान करने के लिए कृत्रिम बुद्धिमत्ता का उपयोग करती है। कृपया समझें:",
    tosSection3Item1: "AI प्रतिक्रियाएं शैक्षिक और प्रेरणादायक उद्देश्यों के लिए हैं",
    tosSection3Item2: "प्रतिक्रियाओं को पेशेवर परामर्श या चिकित्सा सलाह की जगह नहीं लेना चाहिए",
    tosSection3Item3: "AI-जनित सामग्री में त्रुटियां या सीमाएं हो सकती हैं",
    tosSection3Item4: "गंभीर आध्यात्मिक मामलों के लिए, एक योग्य पादरी या परामर्शदाता से परामर्श लें",
    tosSection4Title: "4. सामग्री और बौद्धिक संपदा",
    tosSection4BiblicalContentLabel: "बाइबिल सामग्री:",
    tosSection4BiblicalContentText: "पवित्रशास्त्र उद्धरण सार्वजनिक डोमेन अनुवादों से हैं या उपयुक्त लाइसेंस के तहत उपयोग किए जाते हैं।",
    tosSection4OriginalContentLabel: "मूल सामग्री:",
    tosSection4OriginalContentText: "हमारी मूल सामग्री, जिसमें अध्ययन योजनाएं, टिप्पणी और ऐप सुविधाएं शामिल हैं, कॉपीराइट द्वारा संरक्षित हैं और हमारी संपत्ति बनी रहती हैं।",
    tosSection4UserContentLabel: "उपयोगकर्ता सामग्री:",
    tosSection4UserContentText: "आपके द्वारा प्रदान किए गए किसी भी प्रश्न या इनपुट का उपयोग आपकी गोपनीयता का सम्मान करते हुए हमारी सेवाओं को बेहतर बनाने के लिए किया जा सकता है।",
    tosSection5Title: "5. अस्वीकरण",
    tosSection5EducationalLabel: "शैक्षिक उद्देश्य:",
    tosSection5EducationalText: "यह ऐप शैक्षिक और प्रेरणादायक उद्देश्यों के लिए है। यह निम्न का प्रतिस्थापन नहीं है:",
    tosSection5Item1: "पेशेवर पादरी परामर्श",
    tosSection5Item2: "चिकित्सा या मनोवैज्ञानिक सलाह",
    tosSection5Item3: "कानूनी सलाह या वित्तीय मार्गदर्शन",
    tosSection5Item4: "संकट हस्तक्षेप या आपातकालीन सेवाएं",
    tosSection5DoctrinalLabel: "सिद्धांतिक तटस्थता:",
    tosSection5DoctrinalText: "जबकि हम बाइबिल की सटीकता के लिए प्रयास करते हैं, ईसाई संप्रदायों के बीच व्याख्याएं भिन्न हो सकती हैं। सिद्धांत संबंधी मार्गदर्शन के लिए अपने स्थानीय चर्च से परामर्श लें।",
    tosSection6Title: "6. दायित्व की सीमा",
    tosSection6Content: "कानून द्वारा अनुमत अधिकतम सीमा तक, 5 मिनट में सुसमाचार और इसके निर्माता ऐप के आपके उपयोग से उत्पन्न किसी भी अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी क्षति के लिए उत्तरदायी नहीं होंगे, जिसमें ऐप सामग्री पर आधारित आध्यात्मिक, भावनात्मक या व्यक्तिगत निर्णय शामिल हैं लेकिन इन्हीं तक सीमित नहीं हैं।",
    tosSection7Title: "7. समाप्ति",
    tosSection7Content: "आप किसी भी समय ऐप का उपयोग बंद कर सकते हैं और अपना खाता हटा सकते हैं। हम उन उपयोगकर्ताओं की पहुंच को समाप्त या निलंबित करने का अधिकार सुरक्षित रखते हैं जो इन शर्तों का उल्लंघन करते हैं या अनुचित व्यवहार में संलग्न होते हैं।",
    tosSection8Title: "8. अद्यतन और परिवर्तन",
    tosSection8Content: "हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं। परिवर्तनों के बाद ऐप का निरंतर उपयोग नई शर्तों की स्वीकृति का गठन करता है। महत्वपूर्ण परिवर्तन ऐप के माध्यम से सूचित किए जाएंगे।",
    tosSection9Title: "9. शासी कानून",
    tosSection9Content: "ये शर्तें संयुक्त राज्य अमेरिका के कानूनों द्वारा शासित हैं। किसी भी विवाद को जहां संभव हो ईसाई सुलह के सिद्धांतों के अनुसार बाध्यकारी मध्यस्थता के माध्यम से हल किया जाएगा।",
    tosSection10Title: "10. संपर्क जानकारी",
    tosSection10Intro: "इन शर्तों के बारे में प्रश्नों के लिए, कृपया हमसे संपर्क करें:",
    tosSection10Email: "support@thegospelin5minutes.com",
    tosSection10Facebook: "@TheGospelIn5Minutes",
    tosSection10Address: "5 मिनट में सुसमाचार, कानूनी विभाग",
    tosFinalAcknowledgement: "5 मिनट में सुसमाचार का उपयोग करके, आप स्वीकार करते हैं कि आपने इन सेवा की शर्तों को पढ़ा है, समझा है और इनसे बंधे रहने के लिए सहमत हैं।",
    
    // Donation Page
    donationPageTitle: "दान करें",
    donationPageSubtitle: "अपनी उदारता से परमेश्वर का प्रेम साझा करें",
    donationMissionText: "दुनिया भर में परमेश्वर के वचन को फैलाने के हमारे मिशन का समर्थन करें",
    donationImpactText: "प्रत्येक दान जरूरतमंद के लिए आशा और मुक्ति लाता है",
    totalDonationsLabel: "दान के माध्यम से साझा किया गया कुल प्रेम",
    soulsTouchedLabel: "परमेश्वर के वचन से स्पर्शित आत्माएं",
    bibleImpactText: "प्रत्येक बाइबल आशा, उपचार और शाश्वत परिवर्तन लाती है",
    chooseGiftTitle: "अपना प्रेम उपहार चुनें",
    chooseGiftSubtitle: "प्रत्येक उपहार शाश्वत आशा के बीज बोता है",
    chooseGiftDescription: "दुनिया भर में परमेश्वर का प्रेम फैलाने में हजारों लोगों के साथ जुड़ें",
    chooseAmountLabel: "अपनी दान राशि चुनें",
    chooseAmountDescription: "वह राशि चुनें जो आपके दिल से बात करती है",
    popularAmountsText: "हमारे प्रेमपूर्ण समुदाय द्वारा चुनी गई लोकप्रिय राशियाँ",
    customAmountLabel: "या अपने दिल की इच्छा दर्ज करें",
    customAmountDescription: "प्रत्येक राशि, चाहे आकार कुछ भी हो, फर्क लाती है",
    customAmountPlaceholder: "अपने प्रेमपूर्ण उपहार की राशि दर्ज करें...",
    yourGiftLabel: "आपका उपहार",
    thankYouGenerousHeart: "आपके उदार दिल के लिए धन्यवाद!",
    processing: "प्रसंस्करण...",
    importantInformation: "महत्वपूर्ण जानकारी",
    donationDisclaimer: "दान Stripe के माध्यम से सुरक्षित रूप से संसाधित किए जाते हैं। दान के बदले कोई सामान या सेवाएं प्रदान नहीं की जाती हैं।",
    taxAdvisorNote: "कृपया दान की कटौती योग्यता के बारे में अपने कर सलाहकार से परामर्श लें। दान या रिफंड के बारे में प्रश्नों के लिए, हमारी सहायता टीम से संपर्क करें।",
    agreeToTermsPrefix: "दान करके, आप हमारे",
    and: "और",
    yourImpactTitle: "आपका प्रभाव",
    yourImpactDescription: "प्रत्येक दान हमें बाइबिल वितरित करने और परमेश्वर के वचन को उन लोगों के साथ साझा करने में मदद करता है जिन्हें इसकी सबसे अधिक आवश्यकता है। एक साथ, हम दुनिया भर के समुदायों में आशा और मुक्ति ला रहे हैं।",
    ourMissionTitle: "हमारा मिशन",
    ourMissionDescription: "प्रत्येक दान हमें दैनिक बाइबल पदों, आध्यात्मिक मार्गदर्शन और परमेश्वर के वचन की परिवर्तनकारी शक्ति के साथ अधिक आत्माओं तक पहुंचने में मदद करता है। आपकी उदारता शाश्वत प्रभाव को संभव बनाती है।",
    completeDonation: "दान पूर्ण करें",
    completeYourDonation: "अपना पूर्ण करें",
    cancelPayment: "रद्द करें",
    paymentFailed: "भुगतान विफल",
    paymentError: "भुगतान त्रुटि",
    donationSuccessful: "दान सफल!",
    donationSuccessMessage: "परमेश्वर के वचन को फैलाने के लिए आपके दान के लिए धन्यवाद।",
    paymentErrorOccurred: "आपके भुगतान को संसाधित करते समय एक त्रुटि हुई।",
    unexpectedError: "एक अप्रत्याशित त्रुटि हुई।",
    invalidAmount: "अमान्य राशि",
    invalidAmountMessage: "कृपया $1 और $10,000 के बीच की राशि दर्ज करें।",
    applePayNotAvailable: "Apple Pay उपलब्ध नहीं है",
    applePayNotAvailableMessage: "कृपया Apple Pay का उपयोग करने के लिए Apple Wallet में एक कार्ड जोड़ें।",
    verificationFailed: "सत्यापन विफल",
    verificationFailedMessage: "भुगतान अभी भी संसाधित हो सकता है। कृपया बाद में फिर से जांचें।",
    paymentProcessingFailed: "आपके दान को संसाधित नहीं किया जा सका। कृपया पुनः प्रयास करें।",
    paymentSetupFailed: "भुगतान सेटअप विफल",
    applePaySetupFailed: "Apple Pay सेटअप विफल रहा। कृपया पुनः प्रयास करें।",
    paymentSetupFailedGeneric: "भुगतान सेटअप विफल रहा। कृपया पुनः प्रयास करें।",
    failedToCreatePayment: "भुगतान इरादा बनाने में विफल",
    paymentVerificationFailed: "भुगतान सत्यापन विफल",
    goBackToMore: "अधिक पृष्ठ पर वापस जाएं",
    cancelPaymentAction: "भुगतान रद्द करें",
    
    // Settings Page
    profileInformation: "प्रोफ़ाइल जानकारी",
    edit: "संपादित करें",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    nameCannotBeChanged: "नाम बदला नहीं जा सकता",
    email: "ईमेल",
    phoneNumber: "फ़ोन नंबर",
    birthMonth: "जन्म महीना",
    birthDay: "जन्म दिन",
    timezone: "समय क्षेत्र",
    timezoneCannotBeChanged: "समय क्षेत्र बदला नहीं जा सकता",
    saveProfile: "प्रोफ़ाइल सहेजें",
    bibleVersion: "बाइबल संस्करण",
    loadingVersions: "संस्करण लोड हो रहे हैं...",
    notifications: "सूचनाएं",
    dailyReminders: "दैनिक अनुस्मारक",
    reminderToReadDailyVerse: "अपना दैनिक श्लोक पढ़ने के लिए अनुस्मारक प्राप्त करें",
    reminderTime: "अनुस्मारक समय",
    testNotification: "परीक्षण सूचना",
    streakNotifications: "स्ट्रीक सूचनाएं",
    celebrateReadingStreaks: "अपनी पढ़ने की स्ट्रीक मनाएं",
    emailUpdates: "ईमेल अपडेट",
    receiveNewsletters: "समाचार पत्र और अपडेट प्राप्त करें",
    appSettings: "ऐप सेटिंग्स",
    soundEffects: "ध्वनि प्रभाव",
    enableAppSounds: "ऐप ध्वनियां और सूचनाएं सक्षम करें",
    appLanguage: "ऐप भाषा",
    dataPrivacy: "डेटा और गोपनीयता",
    viewPrivacyPolicy: "गोपनीयता नीति देखें",
    deleteAccountData: "खाता डेटा हटाएं",
    deleteAllAccountData: "सभी खाता डेटा हटाएं?",
    deleteAccountWarning: "यह इस डिवाइस से आपके सभी डेटा को स्थायी रूप से हटा देगा, जिसमें शामिल हैं:",
    deleteAccountWarningProfile: "प्रोफ़ाइल जानकारी",
    deleteAccountWarningBookmarks: "बुकमार्क और सहेजे गए श्लोक",
    deleteAccountWarningNotes: "व्यक्तिगत नोट्स",
    deleteAccountWarningPreferences: "ऐप प्राथमिकताएं",
    deleteAccountWarningStreak: "पठन स्ट्रीक डेटा",
    actionCannotBeUndone: "इस क्रिया को पूर्ववत नहीं किया जा सकता।",
    deleteAllData: "सभी डेटा हटाएं",
    accountActions: "खाता क्रियाएं",
    needHelpWithAccount: "अपने खाते से मदद चाहिए? हमारी सहायता टीम से संपर्क करें।",
    profileUpdated: "प्रोफ़ाइल अपडेट की गई",
    profileSavedSuccessfully: "आपकी प्रोफ़ाइल जानकारी सफलतापूर्वक सहेजी गई है।",
    failedToSaveProfile: "प्रोफ़ाइल परिवर्तन सहेजने में विफल। कृपया पुनः प्रयास करें।",
    dataExported: "डेटा निर्यात किया गया",
    dataDownloadedSuccessfully: "आपका डेटा सफलतापूर्वक डाउनलोड किया गया है।",
    exportFailed: "निर्यात विफल",
    failedToExportData: "आपका डेटा निर्यात करने में विफल। कृपया पुनः प्रयास करें।",
    accountDataDeleted: "खाता डेटा हटाया गया",
    allDataRemovedFromDevice: "आपका सभी स्थानीय डेटा इस डिवाइस से हटा दिया गया है।",
    deletionFailed: "हटाना विफल",
    failedToDeleteAccountData: "खाता डेटा हटाने में विफल। कृपया पुनः प्रयास करें।",
    dailyRemindersEnabled: "दैनिक अनुस्मारक सक्षम",
    dailyReminderConfirmation: "आपको दैनिक श्लोक अनुस्मारक प्राप्त होंगे",
    permissionRequired: "अनुमति आवश्यक",
    notificationPermissionMessage: "कृपया दैनिक श्लोक अनुस्मारक प्राप्त करने के लिए सूचनाओं की अनुमति दें।",
    dailyRemindersDisabled: "दैनिक अनुस्मारक अक्षम",
    noMoreDailyReminders: "आप अब दैनिक श्लोक अनुस्मारक प्राप्त नहीं करेंगे।",
    reminderTimeUpdated: "अनुस्मारक समय अपडेट किया गया",
    reminderTimeConfirmation: "दैनिक अनुस्मारक अब भेजे जाएंगे",
    settingsUpdated: "सेटिंग्स अपडेट की गईं",
    preferencesSaved: "आपकी प्राथमिकताएं सहेजी गई हैं।",
    goBackToMorePage: "अधिक पृष्ठ पर वापस जाएं",
    january: "जनवरी",
    february: "फरवरी",
    march: "मार्च",
    april: "अप्रैल",
    may: "मई",
    june: "जून",
    july: "जुलाई",
    august: "अगस्त",
    september: "सितंबर",
    october: "अक्टूबर",
    november: "नवंबर",
    december: "दिसंबर",
    easternTime: "पूर्वी समय (EST)",
    centralTime: "केंद्रीय समय (CST)",
    mountainTime: "पर्वतीय समय (MST)",
    pacificTime: "प्रशांत समय (PST)",
    utc: "UTC",
    
    // Giving Page
    givingPageTitle: "दान का प्रभाव",
    givingPageSubtitle: "देखें कि आपकी उदारता कैसे दुनिया भर में परमेश्वर के वचन को फैलाती है",
    currentGoalSpreadGodsWord: "वर्तमान लक्ष्य: परमेश्वर के वचन को फैलाना",
    of: "का",
    goal: "लक्ष्य",
    percentComplete: "% पूर्ण",
    biblesPurchased: "खरीदी गई बाइबल",
    biblesDistributed: "वितरित की गई बाइबल",
    thisMonthsImpact: "इस महीने का प्रभाव",
    monthlyDonations: "मासिक दान",
    livesReached: "पहुंचे हुए जीवन",
    joinOurMission: "हमारे मिशन में शामिल हों",
    givingPageCTADescription: "आपका दान हमें उन लोगों को बाइबल खरीदने और वितरित करने में मदद करता है जिन्हें परमेश्वर के वचन की सबसे अधिक आवश्यकता है। हर योगदान किसी ऐसे व्यक्ति को सुसमाचार लाता है जो आशा और मोक्ष की तलाश में है।",
    globalBibleDistribution: "वैश्विक बाइबल वितरण",
    worldwideImpactComingSoon: "बढ़ता वैश्विक प्रभाव",
    worldwideImpactDescription: "हम दुनिया भर में सक्रिय रूप से बाइबल वितरित कर रहे हैं। आपके दान दुनिया भर के समुदायों तक पहुंच रहे हैं, जो सबसे अधिक जरूरतमंदों के लिए आशा और सुसमाचार ला रहे हैं।",
    
    // Videos Page
    videosPageTitle: "विश्वास वीडियो",
    videosPageSubtitle: "उपदेश, सुसमाचार अंतर्दृष्टि और ईसाई मार्गदर्शन",
    featuredThisWeek: "इस सप्ताह की विशेष",
    handpickedSpiritualContent: "आपकी वृद्धि के लिए चुनी गई आध्यात्मिक सामग्री",
    loadingError: "लोडिंग त्रुटि",
    videoContentNotAvailable: "कुछ वीडियो सामग्री अभी उपलब्ध नहीं हो सकती है।",
    noFeaturedVideoAvailable: "कोई विशेष वीडियो उपलब्ध नहीं",
    browseByCategory: "श्रेणी के अनुसार ब्राउज़ करें",
    discoverTailoredContent: "अपनी आध्यात्मिक यात्रा के अनुरूप सामग्री खोजें",
    sermons: "उपदेश",
    faithMessages: "विश्वास संदेश",
    gospelTidbits: "सुसमाचार के सुझाव",
    quickInsights: "त्वरित अंतर्दृष्टि",
    christianAdvice: "ईसाई सलाह",
    lifeGuidance: "जीवन मार्गदर्शन",
    categoryVideos: "वीडियो",
    recentVideos: "हाल के वीडियो",
    showAll: "सभी दिखाएं",
    noVideosAvailable: "कोई वीडियो उपलब्ध नहीं",
    checkInternetConnection: "कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें",
    views: "दृश्य",
    moreVideosComingSoon: "विस्तारित वीडियो पुस्तकालय",
    moreVideosDescription: "हमारा संग्रह नए उपदेश, सुसमाचार अंतर्दृष्टि और ईसाई सलाह वीडियो के साथ बढ़ता है। अपनी विश्वास यात्रा को मजबूत करने वाली ताज़ा आध्यात्मिक सामग्री के लिए नियमित रूप से अन्वेषण करें।",
    sermon: "उपदेश",
    gospelTidbit: "सुसमाचार का सुझाव",
    video: "वीडियो",
    
    // Blog Page
    blogPageTitle: "ईसाई ब्लॉग",
    blogPageSubtitle: "आपके विश्वास को बढ़ाने के लिए प्रेरणादायक लेख",
    featuredArticle: "विशेष लेख",
    todaysHighlightedInsight: "आज की विशेष ईसाई अंतर्दृष्टि",
    by: "द्वारा",
    minRead: "मिनट पढ़ें",
    published: "प्रकाशित",
    readFullArticle: "पूरा लेख पढ़ें",
    recentArticles: "हाल के लेख",
    latestInsightsToStrengthen: "आपकी विश्वास यात्रा को मजबूत करने के लिए नवीनतम अंतर्दृष्टि",
    min: "मिनट",
    readMore: "और पढ़ें",
    browseByTopic: "विषय के अनुसार ब्राउज़ करें",
    exploreContentByThemes: "आध्यात्मिक विषयों द्वारा संगठित सामग्री का अन्वेषण करें",
    articles: "लेख",
    neverMissAnArticle: "कभी कोई लेख न चूकें",
    latestChristianInsights: "अपने इनबॉक्स में नवीनतम ईसाई अंतर्दृष्टि और विश्वास-निर्माण सामग्री प्राप्त करें।",
    subscribeToUpdates: "अपडेट के लिए सदस्यता लें",
    subscribeToBlog: "हमारे ब्लॉग की सदस्यता लें",
    joinCommunityBiweekly: "हमारे समुदाय में शामिल हों और अपने इनबॉक्स में पाक्षिक ईसाई अंतर्दृष्टि और विश्वास-निर्माण सामग्री प्राप्त करें।",
    biweeklyInsightsInbox: "अपने इनबॉक्स में पाक्षिक ईसाई अंतर्दृष्टि और विश्वास-निर्माण सामग्री प्राप्त करें।",
    nameOptional: "नाम (वैकल्पिक)",
    yourName: "आपका नाम",
    emailAddressRequired: "ईमेल पता *",
    emailPlaceholder: "your.email@example.com",
    subscribing: "सदस्यता ली जा रही है...",
    biweeklyEmailDisclaimer: "हम आपको हर दो सप्ताह में अपडेट भेजेंगे। आप किसी भी समय सदस्यता रद्द कर सकते हैं।",
    emailRequired: "ईमेल आवश्यक",
    enterEmailToSubscribe: "कृपया सदस्यता लेने के लिए अपना ईमेल पता दर्ज करें।",
    successfullySubscribed: "सफलतापूर्वक सदस्यता ली गई!",
    thankYouSubscribing: "हमारे ब्लॉग अपडेट की सदस्यता लेने के लिए धन्यवाद।",
    subscriptionFailed: "सदस्यता विफल",
    subscriptionError: "आपकी सदस्यता संसाधित करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
    unableToLoadArticles: "लेख लोड करने में असमर्थ। कृपया बाद में पुनः प्रयास करें।",
    loadingArticles: "लेख लोड हो रहे हैं...",
    errorLoadingArticles: "लेख लोड करने में त्रुटि",
    retry: "पुनः प्रयास करें",
    
    // Bible Studies Page
    bibleStudiesTitle: "बाइबल अध्ययन",
    bibleStudiesSubtitle: "अपनी विश्वास यात्रा को गहरा करें",
    featuredStudies: "विशेष अध्ययन",
    browseAllStudies: "सभी अध्ययन ब्राउज़ करें",
    searchBibleStudies: "बाइबल अध्ययन खोजें...",
    allCategory: "सभी",
    discipleship: "शिष्यता",
    encouragement: "प्रोत्साहन",
    character: "चरित्र",
    prayer: "प्रार्थना",
    prophecy: "भविष्यवाणी",
    love: "प्रेम",
    featured: "विशेष",
    beginner: "शुरुआती",
    intermediate: "मध्यवर्ती",
    advanced: "उन्नत",
    lessons: "पाठ",
    startStudy: "अध्ययन शुरू करें",
    moreStudies: "अधिक अध्ययन",
    viewStudy: "अध्ययन देखें",
    noStudiesFound: "कोई अध्ययन नहीं मिला",
    adjustSearchTerms: "अपनी खोज शब्द या श्रेणी फ़िल्टर को समायोजित करने का प्रयास करें",
    whatYouLearn: "आप क्या सीखेंगे:",
    deepBiblicalInsights: "गहरी बाइबल अंतर्दृष्टि और व्यावहारिक अनुप्रयोग",
    guidedReflectionQuestions: "व्यक्तिगत विकास के लिए निर्देशित चिंतन प्रश्न",
    scriptureMemorization: "शास्त्र स्मरण और ध्यान तकनीक",
    communityDiscussionPoints: "समूह अध्ययन के लिए सामुदायिक चर्चा बिंदु",
    close: "बंद करें",
    lessonOf: "पाठ",
    day: "दिन",
    todaysScripture: "आज का शास्त्र",
    reflectionQuestions: "चिंतन प्रश्न",
    todaysPrayer: "आज की प्रार्थना",
    previousLesson: "पिछला पाठ",
    completeLesson: "पाठ पूर्ण करें",
    nextLesson: "अगला पाठ",
    lessonCompleted: "पाठ पूर्ण हुआ!",
    greatProgress: "शानदार प्रगति! आप इस अध्ययन को पूरा करने के एक कदम और करीब हैं।",
    continueToNextLesson: "अगले पाठ पर जारी रखें",
    backToStudyOverview: "अध्ययन अवलोकन पर वापस जाएं",
    
    // Bible Trivia Page
    bibleTriviaResults: "बाइबल ट्रिविया परिणाम",
    bibleTriviaTitle: "बाइबल ट्रिविया",
    bibleExpert: "बाइबल विशेषज्ञ",
    bibleScholar: "बाइबल विद्वान",
    bibleStudent: "बाइबल छात्र",
    keepStudying: "अध्ययन जारी रखें!",
    level: "स्तर",
    gamesPlayed: "खेले गए खेल",
    bestScore: "सर्वश्रेष्ठ स्कोर",
    playAgain: "फिर से खेलें",
    backToHome: "होम पर वापस जाएं",
    questionOf: "प्रश्न",
    score: "स्कोर",
    testBiblicalKnowledge: "अपने बाइबल ज्ञान का परीक्षण करें",
    latest: "नवीनतम",
    lastScore: "अंतिम स्कोर",
    best: "सर्वश्रेष्ठ",
    games: "खेल",
    chooseDifficultyLevel: "कठिनाई स्तर चुनें",
    easy: "आसान",
    medium: "मध्यम",
    difficult: "कठिन",
    easyDescription: "मूल बाइबल ज्ञान और प्रसिद्ध कहानियां",
    mediumDescription: "मध्यवर्ती बाइबल तथ्य और पात्र",
    difficultDescription: "उन्नत धर्मशास्त्र और कम ज्ञात विवरण",
    scoringGuide: "स्कोरिंग गाइड",
    correctAnswers9to10: "9-10 सही",
    correctAnswers7to8: "7-8 सही",
    correctAnswers5to6: "5-6 सही",
    correctAnswers1to4: "1-4 सही",
    generatingQuestions: "प्रश्न उत्पन्न हो रहे हैं...",
    startTrivia10Questions: "ट्रिविया शुरू करें (10 प्रश्न)",
    finishQuiz: "क्विज समाप्त करें",
    nextQuestion: "अगला प्रश्न",
    failedToGenerateTriviaQuestions: "ट्रिविया प्रश्न उत्पन्न करने में विफल। कृपया पुनः प्रयास करें।"
  }
};

// Hook to get translations for current language
export const useTranslations = (language: string): Translations => {
  return translations[language] || translations.en;
};