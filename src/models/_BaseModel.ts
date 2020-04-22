import { Model } from 'objection';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

abstract class BaseModel extends Model {
	static _resolver: any;

	[x: string]: any;

	static ZERO_DATE: string = '1970-01-01 00:00:00.0000';

	$parseDatabaseJson(json) {
		json = super.$parseDatabaseJson(json);

		const keys = Object.keys(json);

		for (const key of keys) {
			json[key.charAt(0).toLowerCase() + key.substr(1, key.length)] =
				json[key];

			if (
				key.toLowerCase() === this.__proto__.constructor.idColumn &&
				!json.hasOwnProperty('id')
			) {
				json.id = json[key];
			}
		}

		return json;
	}

	static get modelPaths() {
		return [__dirname];
	}

	static get resolver() {
		const wrappedResolvers = {};

		const _resolver: any = Object.entries(this._resolver);

		for (const [name, resolve] of _resolver) {
			wrappedResolvers[name] = (parent, args, context, info) => {
				if (canSkipDatabase(parent[name], info)) {
					return parent[name];
				} else {
					++context.x;
					console.log('x', context.x);
					return resolve(parent, args, context, info);
				}
			};
		}

		return wrappedResolvers;

		function getChildRequestedFields(info: GraphQLResolveInfo): string[] {
			return Object.keys(
				graphqlFields(info, {}, { excludedFields: ['__typename'] })
			);
		}

		function areAllFieldsDefined(field, info): boolean {
			const selections = getChildRequestedFields(info);

			return selections.every(
				selection => field[selection] !== undefined
			);
		}

		function canSkipDatabase(field, info: GraphQLResolveInfo): boolean {
			if (field === undefined) {
				return false;
			} else if (Array.isArray(field)) {
				if (field.length === 0) {
					return true;
				}

				for (const element of field) {
					return areAllFieldsDefined(element, info);
				}
			} else {
				return areAllFieldsDefined(field, info);
			}
		}
	}

	static filterQueryToRelationMappings(query) {
		const relationKeys = [
			...Object.keys(this.relationMappings),
			...Object.values(this.relationMappings).flatMap(relation =>
				Object.keys(relation.modelClass.relationMappings)
			)
		];

		console.log('relationKeys', relationKeys);

		return filterObjectToObjectsByKeys(relationKeys, query);

		function filterObjectToObjectsByKeys(
			keys: Array<string>,
			obj: object
		): object {
			const output = {};

			for (const [key, value] of Object.entries(obj)) {
				if (typeof value === 'object') {
					if (keys.includes(key)) {
						const filteredObject = filterObjectToObjectsByKeys(
							keys,
							value
						);

						if (Object.keys(filteredObject).length > 0) {
							output[key] = filteredObject;
						} else {
							output[key] = true;
						}
					}
				}
			}

			return output;
		}
	}
}

export default BaseModel;
