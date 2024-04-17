# GraphQL null vs undefined input fields

## Background

GraphQL has two semantically different ways to represent the lack of a value:

- Explicitly providing the literal value: {null}.
- Implicitly not providing a value at all.

TODO

## Design Decisions

- Mutation inputs that represent the partial or per-field update of an entity i.e a "patch" will use nullable/optional GraphQL input object fields. These fields can either be `null` or not provided in the input - in which case they will be unset in parsed the JS object. For nullable entity fields an input field value of `null` will be set the corresponding entity field to `null`. For non-nullable entity fields if the input field is not provided or a value of `null` is provided no update will take place - `null` will be interpreted as equivilent to unset/undefined in this case. The API will be lenient in this respect.
  - In summary the interpretation of a nullable input field in an update mutation will be as follows:
    - `null`
      - nullable entity field: set the field to `null`.
      - non-nullable entity field: ignore / no update.
    - Not providing value: ignore / no update

## References

- https://github.com/graphql/graphql-js/issues/133
- https://github.com/graphql/graphql-spec/issues/542
