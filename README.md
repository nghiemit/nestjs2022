Generate migrations:

POSTGRES_DB_NAME=sample_db POSTGRES_USER=thiennv POSTGRES_PASSWORD=thiennv123 npx ts-node --project tsconfig.build.json -r tsconfig-paths/register ./node_modules/typeorm/cli migration:generate "./src/database/migrations/InitMigration" -d "./src/database/data-source.ts"

Installation steps:
