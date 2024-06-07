import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'decimal', precision: 2, nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;
}
