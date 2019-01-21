

export interface Pic {
  file_id: number;
  user_id: number;
  filesize: number;
  media_type: string;
  title: string;
  description: string;
  filename: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
}
export interface Thumbnail {
  160: string;
}
