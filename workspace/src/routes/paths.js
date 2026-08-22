export const rootPaths = {
  root: '/',
  dashboardRoot: 'dashboard',
  pagesRoot: 'pages',
  miscRoot: 'misc',
  authRoot: 'authentication',
  pricingRoot: 'pricing',
  authZitadelRoot: 'zitadel',
  errorRoot: 'error',
  ecommerceRoot: 'ecommerce',
  ecommerceAdminRoot: 'admin',
  ecommerceCustomerRoot: 'customer',
  eventsRoot: 'events',
  emailRoot: 'email',
  kanbanRoot: 'kanban',
  calendarRoot: 'calendar',
  schedulerRoot: 'scheduler',
  appsRoot: 'apps',
  crmRoot: 'crm',
  hrmRoot: 'hrm',
  hrmPayrollRoot: 'payroll',
  hrmPerformanceRoot: 'performance-management',
  fileManagerRoot: 'file-manager',
  invoiceRoot: 'invoice',
  landingRoot: 'landing',
  projectRoot: 'project',
  contentRoot: 'content',
  hiringRoot: 'hiring',
  hiringAdmin: 'admin',
  hiringCandidate: 'candidate',
  timeTrackerRoot: 'time-tracker',
  memberRoot: 'member',
};

const paths = {
  showcase: `/showcase`,

  ecommerce: `/${rootPaths.dashboardRoot}/ecommerce`,
  crm: `/${rootPaths.dashboardRoot}/crm`,
  project: `/${rootPaths.dashboardRoot}/project`,
  analytics: `/${rootPaths.dashboardRoot}/analytics`,
  hrm: `/${rootPaths.dashboardRoot}/hrm`,
  timeTracker: `/${rootPaths.dashboardRoot}/time-tracker`,
  hiring: `/${rootPaths.dashboardRoot}/${rootPaths.hiringRoot}`,
  employee: `/${rootPaths.dashboardRoot}/employee`,

  starter: `/${rootPaths.pagesRoot}/starter`,
  notifications: `/${rootPaths.pagesRoot}/notifications`,
  zitadelLogin: `/${rootPaths.authRoot}/${rootPaths.authZitadelRoot}/login`,
  zitadelLoggedOut: `/${rootPaths.authRoot}/${rootPaths.authZitadelRoot}/logged-out`,
  zitadelCallback: `/${rootPaths.authRoot}/callback`,
  pricingColumn: `/${rootPaths.pagesRoot}/${rootPaths.pricingRoot}/column`,
  pricingTable: `/${rootPaths.pagesRoot}/${rootPaths.pricingRoot}/table`,

  account: `/${rootPaths.pagesRoot}/account`,
  faq: `/${rootPaths.pagesRoot}/faq`,
  comingSoon: `/${rootPaths.pagesRoot}/coming-soon`,
  404: `/${rootPaths.errorRoot}/404`,

  ecommerceRoot: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}`,
  ecommerceHomepage: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/homepage`,
  products: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/products`,
  productDetails: (productId) =>
    `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/product-details${
      productId ? `/${productId}` : ''
    }`,
  cart: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/cart`,
  customerAccount: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/customer-account`,
  checkout: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/checkout`,
  payment: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/payment`,
  orderConfirmation: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/order-confirmation`,
  wishlist: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/wishlist`,
  orderList: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/order-list`,
  orderDetails: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/order-details`,
  orderTrack: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceCustomerRoot}/order-track`,

  adminProductListing: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/product-listing`,
  adminProductList: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/product-list`,
  adminOrderList: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/order-list`,
  adminOrder: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/order`,
  adminCreateOrder: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/create-order`,
  adminRefund: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/refund`,
  adminInvoiceList: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/invoice-list`,
  adminInvoice: `/${rootPaths.appsRoot}/${rootPaths.ecommerceRoot}/${rootPaths.ecommerceAdminRoot}/invoice`,

  email: `/${rootPaths.appsRoot}/${rootPaths.emailRoot}`,
  emailLabel: (label) => `/${rootPaths.appsRoot}/email/list/${label}`,
  emailDetails: (label, id) => `/${rootPaths.appsRoot}/email/details/${label}/${id}`,

  kanban: `/${rootPaths.appsRoot}/${rootPaths.kanbanRoot}`,
  boards: `/${rootPaths.appsRoot}/${rootPaths.kanbanRoot}/boards`,
  createBoard: `/${rootPaths.appsRoot}/${rootPaths.kanbanRoot}/create-board`,

  eventsRoot: `/${rootPaths.appsRoot}/${rootPaths.eventsRoot}`,
  createEvent: `/${rootPaths.appsRoot}/${rootPaths.eventsRoot}/create-event`,
  events: `/${rootPaths.appsRoot}/${rootPaths.eventsRoot}/event-detail`,

  crmRoot: `/${rootPaths.appsRoot}/${rootPaths.crmRoot}`,
  leadDetails: `/${rootPaths.appsRoot}/${rootPaths.crmRoot}/lead-details`,
  dealDetails: `/${rootPaths.appsRoot}/${rootPaths.crmRoot}/deal-details`,
  addContact: `/${rootPaths.appsRoot}/${rootPaths.crmRoot}/add-contact`,
  deals: `/${rootPaths.appsRoot}/${rootPaths.crmRoot}/deals`,

  projectManagement: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}`,
  projectList: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/project-list`,
  createProject: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/create-project`,
  teamMemberList: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/team-member-list`,
  ganttChart: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/gantt-chart`,
  timelineView: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/timeline-view`,
  automationList: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/automations`,
  createAutomation: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/automations/create`,
  tableView: `/${rootPaths.appsRoot}/${rootPaths.projectRoot}/table-view`,

  chat: `/${rootPaths.appsRoot}/chat`,
  newChat: `/${rootPaths.appsRoot}/chat/new`,
  chatConversation: (userId) => `${paths.chat}/${userId ? `${userId}` : ''}`,
  social: `/${rootPaths.appsRoot}/social`,
  fileManager: `/${rootPaths.appsRoot}/${rootPaths.fileManagerRoot}`,
  fileManagerFolder: (folderId) =>
    `/${rootPaths.appsRoot}/${rootPaths.fileManagerRoot}/${folderId}`,

  invoice: `/${rootPaths.appsRoot}/${rootPaths.invoiceRoot}`,
  invoiceList: `/${rootPaths.appsRoot}/${rootPaths.invoiceRoot}/invoice-list`,
  createInvoice: `/${rootPaths.appsRoot}/${rootPaths.invoiceRoot}/create-invoice`,
  invoicePreview: `/${rootPaths.appsRoot}/${rootPaths.invoiceRoot}/invoice-preview`,
  invoicePreviewWithId: (id) =>
    `/${rootPaths.appsRoot}/${rootPaths.invoiceRoot}/invoice-preview/${id}`,

  calendar: `/${rootPaths.appsRoot}/${rootPaths.calendarRoot}`,
  scheduler: `/${rootPaths.appsRoot}/${rootPaths.schedulerRoot}`,

  landingHomepage: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/homepage`,
  landingAbout: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/about-us`,
  landingContact: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/contact`,
  landingFaq: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/faq`,
  landing404: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/404`,
  landingComingSoon: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/coming-soon`,
  landingMaintenance: `/${rootPaths.pagesRoot}/${rootPaths.landingRoot}/maintenance`,

  // HRM Pages
  hrmRoot: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}`,
  hrmPayrollRoot: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPayrollRoot}`,
  hrmPayrollDashboard: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPayrollRoot}/dashboard`,
  hrmPayrollRun: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPayrollRoot}/run-payroll`,
  hrmPayrollReview: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPayrollRoot}/payroll-review`,
  hrmPerformanceRoot: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}`,
  hrmPerformanceGoals: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}/goals`,
  hrmPerformanceNewGoal: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}/new-goal`,
  hrmPerformanceAppraisalList: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}/appraisal-list`,
  hrmPerformanceAppraisalCycle: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}/appraisal-cycle`,
  hrmPerformanceFeedback: `/${rootPaths.appsRoot}/${rootPaths.hrmRoot}/${rootPaths.hrmPerformanceRoot}/feedback`,

  content: `/${rootPaths.appsRoot}/${rootPaths.contentRoot}`,
  contentSearch: `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/search`,
  contentTopics: `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/topics`,
  blogDetails: (blogId) => `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/blogs/${blogId}`,
  videoDetails: (videosId) => `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/videos/${videosId}`,
  podcastDetails: (podcastId) =>
    `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/podcasts/${podcastId}`,
  createBlog: `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/create-blog`,
  uploadMedia: `/${rootPaths.appsRoot}/${rootPaths.contentRoot}/upload-media`,
  hiringRoot: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}`,
  hiringCandidate: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringCandidate}`,
  hiringJobList: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringCandidate}/job-list`,
  hiringJobDetails: (jobId) =>
    `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringCandidate}/job-details${
      jobId ? `/${jobId}` : ''
    }`,
  hiringJobApplication: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringCandidate}/job-application`,

  hiringAdmin: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringAdmin}`,
  hiringJobOpening: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringAdmin}/job-opening`,
  hiringPipeline: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringAdmin}/pipeline`,
  hiringNewOpening: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringAdmin}/new-opening`,
  hiringCandidateDetails: `/${rootPaths.appsRoot}/${rootPaths.hiringRoot}/${rootPaths.hiringAdmin}/candidate-details`,

  timeTrackerRoot: `/${rootPaths.appsRoot}/${rootPaths.timeTrackerRoot}`,
  timeTrackerTimeSheets: `/${rootPaths.appsRoot}/${rootPaths.timeTrackerRoot}/time-sheets`,
  timeTrackerScreenshots: `/${rootPaths.appsRoot}/${rootPaths.timeTrackerRoot}/screenshots`,
  timeTrackerAppsSites: `/${rootPaths.appsRoot}/${rootPaths.timeTrackerRoot}/apps-sites`,
  timeTrackerReport: `/${rootPaths.appsRoot}/${rootPaths.timeTrackerRoot}/report`,

  members: `/${rootPaths.appsRoot}/${rootPaths.memberRoot}`,
  memberProfile: `/${rootPaths.appsRoot}/${rootPaths.memberRoot}/profile`,
  memberNewMember: `/${rootPaths.appsRoot}/${rootPaths.memberRoot}/new-member`,
};

export const authPaths = {
  login: paths.zitadelLogin,
};

const runtimeBasePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export const workbenchEntryPath =
  runtimeBasePath === '/workbench' ? rootPaths.root : '/workbench';

export const publicAuthPaths = {
  login: `/workbench${paths.zitadelLogin}`,
};

export const apiEndpoints = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  profile: '/auth/profile',
  verifyEmail: '/auth/verify-email',
  contactRequests: '/public/contact-requests',
  getUsers: '/users',
  forgotPassword: '/auth/forgot-password',
  setPassword: '/auth/set-password',
  notifications: '/v1/notifications',
  notificationRead: (id) => `/v1/notifications/${id}/read`,
  plugins: '/v1/plugins',
  pluginPurchase: (id) => `/v1/plugins/${id}/purchase`,
  pluginAction: (id, action) => `/v1/plugins/${id}/${action}`,
  getProduct: (id) => `e-commerce/products/${id}`,
};

export default paths;
