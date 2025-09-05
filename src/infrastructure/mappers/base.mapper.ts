export interface BaseMapper<Domain, Persistence> {
  toDomain(persistence: Persistence): Domain;
  toDomainArray(persistence: Persistence[]): Domain[];
  toPersistence(domain: Domain): Persistence;
}