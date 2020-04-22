import { knexSnakeCaseMappers } from 'objection';

const {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_DATABASE,
} = require('./config');

export default {
	client: 'mysql',
	connection: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		typeCast(field, useDefaultTypeCasting) {
			// We only want to cast bit fields that have a single-bit in them. If the field
			// has more than one bit, then we cannot assume it is supposed to be a Boolean.
			if (field.type === 'BIT' && field.length === 1) {
				var bytes = field.buffer();

				// A Buffer in Node represents a collection of 8-bit unsigned integers.
				// Therefore, our single "bit field" comes back as the bits '0000 0001',
				// which is equivalent to the number 1.
				if (bytes === null) {
					return false;
				} else {
					return bytes[0] === 1;
				}
			}

			return useDefaultTypeCasting();
		},
	},
	...knexSnakeCaseMappers(),
};
