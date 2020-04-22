import { Model } from 'objection';

import BaseModel from './_BaseModel';
import User from './User';

export default class Profile extends BaseModel {
	id: string;
	firstName?: string;
	lastName?: string;
	age?: number;
	user?: User;

	static get tableName(): string {
		return 'profile';
	}

	static get idColumn(): string {
		return 'id';
	}

	static get virtualAttributes(): Array<string> {
		return ['__typename'];
	}

	static get __typename(): string {
		return 'Profile';
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.HasOneRelation,
				modelClass: User,
				join: {
					from: 'profile.userId',
					to: 'user.id'
				}
			}
		};
	}

	static _resolver = {
		async user(parent, args, context, info) {
			console.log('Profile.user resolver');

			const user = await parent.$relatedQuery('user');

			return user;
		}
	};

	static async updateProfile(parent, args, context, info) {
		console.log('Profile.updateProfile resolver');

		const updatedProfile = await Profile.query()

			.findById(args.id)
			.updateAndFetch(args.profile);

		return updatedProfile;
	}
}
