# The schema

```graphql
scalar Date

enum SubscriptionLevel {
	TRIAL
	PRO
	BUSINESS
}

type User {
	id: ID!
	username: String!
	profile: Profile
	subscriptions: [Subscription]
}

type Profile {
	id: ID!
	firstName: String
	lastName: String
	age: Int
	user: User
}

type Subscription {
	id: ID!
	level: SubscriptionLevel!
	start: Date!
	end: Date!
	user: User
}

type Query {
	users: [User]!
	usersWithoutGraphFetched: [User]!

	user(id: ID!): User
	profile(id: ID!): Profile
	subscription(id: ID!): Subscription
}

input UserInput {
	username: String!
	password: String!
	profile: ProfileInput!
}

input ProfileInput {
	firstName: String
	lastName: String
	age: Int
	user: UserInput
}

input SubscriptionInput {
	userId: ID!
	token: String!
	level: SubscriptionLevel
	end: Date!
}

type Mutation {
	createUser(user: UserInput!): User
	updateProfile(id: ID!, profile: ProfileInput!): Profile
	subscribe(subscription: SubscriptionInput!): Subscription
}
```

# Comparing `users` to `usersWithoutGraphFetched`

## The resolvers

```js

const resolvers = {
	// ...
	Query: {
		async users(_, __, context, info) {
			const fields = graphqlFields(info);

			const filteredQuery = User.filterQueryToRelationMappings(fields);

			const users = await User.query().withGraphFetched(filteredQuery);

			return users;
		},
		async usersWithoutGraphFetched(_, __, context, info) {
			const users = await User.query();

			return users;
		},
		// ...
	}
	// ...
}

```

The following queries were executed on a database containing the data found in
`testdb.sql`. Try them out for yourself!

## Number of database queries for the same GraphQL query:

## Example 1

### `users` db queries: 1

### `usersWithoutGraphFetched` db queries: 1

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
	}
}
```

## Example 2

### `users` db queries: 3

### `usersWithoutGraphFetched` db queries: 7

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		username
		profile {
			id
			firstName
			lastName
			age
		}
		subscriptions {
			id
			level
			start
			end
		}
	}
}
```

## Example 3

### `users` db queries: 6

### `usersWithoutGraphFetched` db queries: 43

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		username
		profile {
			id
			firstName
			lastName
			age
		}
		subscriptions {
			id
			level
			start
			end
			user {
				id
				username
				profile {
					id
				}
				subscriptions {
					id
				}
			}
		}
	}
}
```

## Example 4

### `users` db queries: 8

### `usersWithoutGraphFetched` db queries: 49

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		username
		profile {
			id
			firstName
			lastName
			age
			user {
				id
				subscriptions {
					id
				}
			}
		}
		subscriptions {
			id
			level
			start
			end
			user {
				id
				username
				profile {
					id
				}
				subscriptions {
					id
				}
			}
		}
	}
}
```

## Example 5

### `users` db queries: 6

### `usersWithoutGraphFetched` db queries: 316

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		subscriptions {
			user {
				subscriptions {
					user {
						subscriptions {
							id
						}
					}
				}
			}
		}
	}
}
```

## Example 6

### `users` db queries: 8

### `usersWithoutGraphFetched` db queries: 3,772

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		subscriptions {
			user {
				subscriptions {
					user {
						subscriptions {
							user {
								subscriptions {
									id
								}
							}
						}
					}
				}
			}
		}
	}
}
```

## Example 7

### `users` db queries: 10

### `usersWithoutGraphFetched` db queries: 45,244

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		subscriptions {
			user {
				subscriptions {
					user {
						subscriptions {
							user {
								subscriptions {
									user {
										subscriptions {
											id
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
```

## Example 8

### `users` db queries: 35

### `usersWithoutGraphFetched` db queries: 12,244

### The query

```graphql
{
	usersWithoutGraphFetched {
		# or simply "users"
		id
		username
		profile {
			id
			firstName
			lastName
			age
			user {
				id
				username
				profile {
					id
					firstName
					lastName
					age
				}
				subscriptions {
					id
					level
					start
					end
					user {
						id
						username
						profile {
							id
							firstName
							lastName
							age
							user {
								id
								username
								profile {
									id
									firstName
									lastName
									age
								}
								subscriptions {
									id
									level
									start
									end
								}
							}
						}
						subscriptions {
							id
							level
							start
							end
							user {
								id
								username
								profile {
									id
									firstName
									lastName
									age
									user {
										id
										username
										profile {
											id
											firstName
											lastName
											age
										}
										subscriptions {
											id
											level
											start
											end
										}
									}
								}
								subscriptions {
									id
									level
									start
									end
								}
							}
						}
					}
				}
			}
		}
		subscriptions {
			id
			level
			start
			end
			user {
				id
				username
				profile {
					id
					firstName
					lastName
					age
					user {
						id
						username
						profile {
							id
							firstName
							lastName
							age
						}
						subscriptions {
							id
							level
							start
							end
							user {
								id
								username
								profile {
									id
									firstName
									lastName
									age
									user {
										id
										username
										profile {
											id
											firstName
											lastName
											age
										}
										subscriptions {
											id
											level
											start
											end
										}
									}
								}
								subscriptions {
									id
									level
									start
									end
									user {
										id
										username
										profile {
											id
											firstName
											lastName
											age
											user {
												id
												username
												profile {
													id
													firstName
													lastName
													age
												}
												subscriptions {
													id
													level
													start
													end
												}
											}
										}
										subscriptions {
											id
											level
											start
											end
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
```
