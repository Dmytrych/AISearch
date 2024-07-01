import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tool-item-image')
export class ToolItemImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column()
  originalFileName: string;

  @Column()
  extension: string;
}