# Task Board App Backend

## Description

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start docker-compose development environment
$ yarn run dev:env:up

# start development server in watch mode
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrations

```bash
# create new migration
$ yarn run knex migrate:make $MIGRATION_NAME

# run latest migrations
$ yarn run migrate
```

## Add/update database queries

1. Edit `sql` file.
2. Run `pgtyped`.

```bash
$ yarn run pgtyped
```

## TODO

- Fix e2e tests
