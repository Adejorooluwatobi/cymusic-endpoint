import { plainToClass, classToPlain } from 'class-transformer';
import { UserEntity } from '../../domain/entities/user.entity';

// Example of using class-transformer for auto-mapping
export class AutoMapperExample {
  static mapToEntity<T>(cls: new () => T, plain: any): T {
    return plainToClass(cls, plain, { excludeExtraneousValues: true });
  }

  static mapToPlain<T>(entity: T): any {
    return classToPlain(entity);
  }

  // Usage example:
  // const userEntity = AutoMapperExample.mapToEntity(UserEntity, prismaResult);
}