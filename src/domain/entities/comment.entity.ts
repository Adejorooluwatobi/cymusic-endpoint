export class CommentEntity {
  id: string;
  musicId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<CommentEntity>) {
    Object.assign(this, data);
  }
}