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
  appTagline: string;
  version: string;
  
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
    comingSoon: "Coming Soon",
    
    // Common Actions
    follow: "Follow",
    share: "Share The Gospel in 5 Minutes",
    shareText: "Discover daily Bible verses and spiritual guidance with The Gospel in 5 Minutes app!",
    
    // Footer
    visitWebsite: "Visit our website for more resources",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "Bringing God's word to the world",
    version: "Version 1.0.0",
    
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
    read: "Read",
    bookmarkRemoved: "Bookmark Removed",
    removedFromSavedVerses: "removed from saved verses.",
    errorLoadingVerse: "Error Loading Verse",
    couldNotLoadVerse: "Could not load the verse content. Please try again.",
    scripture: "Scripture",
    bibleVerse: "Bible Verse",
    noVerseContentAvailable: "No verse content available"
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
    comingSoon: "Próximamente",
    
    // Common Actions
    follow: "Seguir",
    share: "Comparte El Evangelio en 5 Minutos",
    shareText: "¡Descubre versículos bíblicos diarios y orientación espiritual con la aplicación El Evangelio en 5 Minutos!",
    
    // Footer
    visitWebsite: "Visita nuestro sitio web para más recursos",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "Llevando la palabra de Dios al mundo",
    version: "Versión 1.0.0",
    
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
    read: "Leer",
    bookmarkRemoved: "Marcador Eliminado",
    removedFromSavedVerses: "eliminado de versículos guardados.",
    errorLoadingVerse: "Error al Cargar Versículo",
    couldNotLoadVerse: "No se pudo cargar el contenido del versículo. Por favor, inténtalo de nuevo.",
    scripture: "Escritura",
    bibleVerse: "Versículo Bíblico",
    noVerseContentAvailable: "No hay contenido del versículo disponible"
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
    comingSoon: "Bientôt Disponible",
    
    // Common Actions
    follow: "Suivre",
    share: "Partager L'Évangile en 5 Minutes",
    shareText: "Découvrez des versets bibliques quotidiens et des conseils spirituels avec l'application L'Évangile en 5 Minutes !",
    
    // Footer
    visitWebsite: "Visitez notre site web pour plus de ressources",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "Apporter la parole de Dieu au monde",
    version: "Version 1.0.0",
    
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
    read: "Lire",
    bookmarkRemoved: "Favori Supprimé",
    removedFromSavedVerses: "supprimé des versets sauvegardés.",
    errorLoadingVerse: "Erreur de Chargement",
    couldNotLoadVerse: "Impossible de charger le contenu du verset. Veuillez réessayer.",
    scripture: "Écriture",
    bibleVerse: "Verset Biblique",
    noVerseContentAvailable: "Aucun contenu de verset disponible"
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
    comingSoon: "Em Breve",
    
    // Common Actions
    follow: "Seguir",
    share: "Compartilhar O Evangelho em 5 Minutos",
    shareText: "Descubra versículos bíblicos diários e orientação espiritual com o aplicativo O Evangelho em 5 Minutos!",
    
    // Footer
    visitWebsite: "Visite nosso site para mais recursos",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "Levando a palavra de Deus ao mundo",
    version: "Versão 1.0.0",
    
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
    read: "Ler",
    bookmarkRemoved: "Favorito Removido",
    removedFromSavedVerses: "removido dos versículos salvos.",
    errorLoadingVerse: "Erro ao Carregar",
    couldNotLoadVerse: "Não foi possível carregar o conteúdo do versículo. Tente novamente.",
    scripture: "Escritura",
    bibleVerse: "Versículo Bíblico",
    noVerseContentAvailable: "Nenhum conteúdo de versículo disponível"
  },
  
  // For other languages (zh, ar, hi), we'll use English as fallback for now
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
    comingSoon: "即将推出",
    
    // Common Actions
    follow: "关注",
    share: "分享5分钟福音",
    shareText: "通过5分钟福音应用程序发现每日圣经经文和精神指导！",
    
    // Footer
    visitWebsite: "访问我们的网站获取更多资源",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "将神的话语带向世界",
    version: "版本 1.0.0",
    
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
    read: "阅读",
    bookmarkRemoved: "书签已删除",
    removedFromSavedVerses: "已从保存的经文中删除。",
    errorLoadingVerse: "加载错误",
    couldNotLoadVerse: "无法加载经文内容。请重试。",
    scripture: "经文",
    bibleVerse: "圣经经文",
    noVerseContentAvailable: "无可用的经文内容"
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
    comingSoon: "قريباً",
    
    // Common Actions
    follow: "تابع",
    share: "شارك الإنجيل في 5 دقائق",
    shareText: "اكتشف آيات الكتاب المقدس اليومية والإرشاد الروحي مع تطبيق الإنجيل في 5 دقائق!",
    
    // Footer
    visitWebsite: "زر موقعنا الإلكتروني للمزيد من الموارد",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "جلب كلمة الله إلى العالم",
    version: "الإصدار 1.0.0",
    
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
    read: "اقرأ",
    bookmarkRemoved: "تم حذف الإشارة المرجعية",
    removedFromSavedVerses: "تمت الإزالة من الآيات المحفوظة.",
    errorLoadingVerse: "خطأ في التحميل",
    couldNotLoadVerse: "تعذر تحميل محتوى الآية. الرجاء المحاولة مرة أخرى.",
    scripture: "كتاب مقدس",
    bibleVerse: "آية من الكتاب المقدس",
    noVerseContentAvailable: "لا يوجد محتوى آية متاح"
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
    comingSoon: "जल्द आ रहा है",
    
    // Common Actions
    follow: "फॉलो करें",
    share: "5 मिनट में सुसमाचार साझा करें",
    shareText: "5 मिनट में सुसमाचार ऐप के साथ दैनिक बाइबल श्लोक और आध्यात्मिक मार्गदर्शन खोजें!",
    
    // Footer
    visitWebsite: "अधिक संसाधनों के लिए हमारी वेबसाइट पर जाएं",
    websiteDescription: "www.thegospelin5minutes.org",
    
    // App Info
    appTagline: "परमेश्वर के वचन को दुनिया में लाना",
    version: "संस्करण 1.0.0",
    
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
    read: "पढ़ें",
    bookmarkRemoved: "बुकमार्क हटाया गया",
    removedFromSavedVerses: "सहेजे गए श्लोकों से हटाया गया।",
    errorLoadingVerse: "लोड करने में त्रुटि",
    couldNotLoadVerse: "श्लोक सामग्री लोड नहीं की जा सकी। कृपया पुनः प्रयास करें।",
    scripture: "धर्मग्रंथ",
    bibleVerse: "बाइबल श्लोक",
    noVerseContentAvailable: "कोई श्लोक सामग्री उपलब्ध नहीं"
  }
};

// Hook to get translations for current language
export const useTranslations = (language: string): Translations => {
  return translations[language] || translations.en;
};