export class GenreEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<GenreEntity>) {
    Object.assign(this, data);
  }
}