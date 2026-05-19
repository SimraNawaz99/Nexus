// User roles
export const UserRole = {
  ENTREPRENEUR: 'entrepreneur',
  INVESTOR: 'investor',
};

// User base object (reference structure)
export const User = {
  id: '',
  name: '',
  email: '',
  role: '',
  avatarUrl: '',
  bio: '',
  isOnline: false,
  createdAt: '',
};

// Entrepreneur example structure
export const Entrepreneur = {
  ...User,
  role: 'entrepreneur',
  startupName: '',
  pitchSummary: '',
  fundingNeeded: '',
  industry: '',
  location: '',
  foundedYear: 0,
  teamSize: 0,
};

// Investor example structure
export const Investor = {
  ...User,
  role: 'investor',
  investmentInterests: [],
  investmentStage: [],
  portfolioCompanies: [],
  totalInvestments: 0,
  minimumInvestment: '',
  maximumInvestment: '',
};

// Message structure
export const Message = {
  id: '',
  senderId: '',
  receiverId: '',
  content: '',
  timestamp: '',
  isRead: false,
};

// Chat Conversation structure
export const ChatConversation = {
  id: '',
  participants: [],
  lastMessage: null,
  updatedAt: '',
};

// Collaboration Request
export const CollaborationRequest = {
  id: '',
  investorId: '',
  entrepreneurId: '',
  message: '',
  status: 'pending', // pending | accepted | rejected
  createdAt: '',
};

// Document structure
export const Document = {
  id: '',
  name: '',
  type: '',
  size: '',
  lastModified: '',
  shared: false,
  url: '',
  ownerId: '',
};

// Auth Context (no types in JS)
export const AuthContextDefaults = {
  user: null,
  login: async (email, password, role) => {},
  register: async (name, email, password, role) => {},
  logout: () => {},
  forgotPassword: async (email) => {},
  resetPassword: async (token, newPassword) => {},
  updateProfile: async (userId, updates) => {},
  isAuthenticated: false,
  isLoading: false,
};