export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'supervisor' | 'user';
  status: 'pending' | 'active' | 'inactive';
  phone?: string;
  avatar?: string;
  companyId?: string;
  company?: Company;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Company {
  id: string;
  name: string;
  tradeName?: string;
  cnpj?: string;
  type: 'headquarters' | 'branch';
  parentId?: string;
  parent?: Company;
  branches?: Company[];
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'inactive';
  settings?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  acquisitionDate?: Date;
  acquisitionValue?: number;
  currentValue?: number;
  depreciationRate?: number;
  status: 'in_use' | 'maintenance' | 'available' | 'retired';
  location?: string;
  responsible?: string;
  companyId: string;
  company?: Company;
  qrCode?: string;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  photos?: string[];
  notes?: string;
  movements?: AssetMovement[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssetMovement {
  id: string;
  assetId: string;
  asset?: Asset;
  type: 'transfer' | 'maintenance' | 'return' | 'retirement' | 'assignment';
  fromLocation?: string;
  toLocation?: string;
  fromResponsible?: string;
  toResponsible?: string;
  date: Date;
  reason?: string;
  userId?: string;
  user?: User;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  unit?: string;
  minimumStock?: number;
  currentStock?: number;
  unitPrice?: number;
  companyId: string;
  company?: Company;
  barcode?: string;
  photo?: string;
  status: 'active' | 'inactive';
  movements?: StockMovement[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  product?: Product;
  type: 'entry' | 'exit';
  subtype: 'purchase' | 'transfer' | 'donation' | 'sale' | 'loan' | 'disposal' | 'return' | 'adjustment';
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  date: Date;
  companyId: string;
  company?: Company;
  userId?: string;
  user?: User;
  invoiceId?: string;
  invoice?: Invoice;
  lot?: string;
  expirationDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Invoice {
  id: string;
  number: string;
  series?: string;
  type: 'incoming' | 'outgoing';
  date: Date;
  partnerId?: string;
  partner?: Partner;
  companyId: string;
  company?: Company;
  totalValue?: number;
  accessKey?: string;
  xmlContent?: string;
  status: 'pending' | 'verified' | 'divergent' | 'cancelled';
  notes?: string;
  items?: any[];
  stockMovements?: StockMovement[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Partner {
  id: string;
  type: 'supplier' | 'customer' | 'service_provider' | 'carrier';
  name: string;
  tradeName?: string;
  cnpjCpf?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  contact?: string;
  status: 'active' | 'inactive';
  notes?: string;
  companyId: string;
  company?: Company;
  invoices?: Invoice[];
  createdAt?: Date;
  updatedAt?: Date;
}
