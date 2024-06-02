export interface Item {
  id: number;
  name: string;
  url: string;
  subtitle: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageId: number;
  imageName: string;
  rating: number;
  views: number;
  saves: number;
  ratedCount: number;
  labels: string[];
}

// Body is Form Data
export interface CreateItemData {
  name: string;
  url: string;
  subtitle: string;
  description: string;
  labels: string[];
  image?: File | string;
}

export interface UpdateItemBody {
  name: string;
  url: string;
  subtitle: string;
  description: string;
  labels: string[];
}
