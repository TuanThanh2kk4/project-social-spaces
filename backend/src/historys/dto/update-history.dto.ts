import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class UpdateHistoryDto {
  @IsNotEmpty({ message: 'ID not null' })
  target_id: string;

  @IsNotEmpty({ message: 'UpdatedBy not null' })
  updatedBy: string;

  @IsNotEmpty({ message: 'UpdatedAt not null' })
  updatedAt: Date;

  @IsNotEmpty({ message: 'Role not null' })
  role: RoleType;
}
