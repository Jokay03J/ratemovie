export interface Movie {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  poster?: Blob;
  note?: number | null;
}
