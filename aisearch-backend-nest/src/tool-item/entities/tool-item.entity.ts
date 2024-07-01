import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ToolItemImage } from '../../tool-item-image/entities/tool-item-image.entity';

@Entity('tool-item')
export class ToolItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @OneToOne(() => ToolItemImage, image => image.id)
  image: ToolItemImage;
}