export interface Pic {
  file_id: string;
  filename: string;
  title: string;
  description: string;
  user_id: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnails;
}

export interface Thumbnails {
  160: string;
  320?: string;
  640?: string;
}

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface AutoLoginResponse {
  status: number;
  user: User;
}
