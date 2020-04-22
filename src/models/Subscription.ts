import { Model } from 'objection';

import { v4 } from 'uuid';

import BaseModel from './_BaseModel';
import User from './User';

export default class Subscription extends BaseModel {
	id: string;
	token: string;
	level: string;
	start: Date;
	end: Date;
	user?: User;

	static get tableName() {
		return 'subscription';
	}

	static get idColumn() {
		return 'id';
	}

	static get virtualAttributes(): Array<string> {
		return ['__typename'];
	}

	static get __typename(): string {
		return 'Subscription';
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.HasOneRelation,
				modelClass: User,
				join: {
					from: 'subscription.userId',
					to: 'user.id'
				}
			}
		};
	}

	static _resolver = {
		async user(parent, args, context, info) {
			console.log('Subscription.user resolver');

			const user = await parent.$relatedQuery('user');

			return user;
		}
	};

	static async subscribe(parent, args, context, info) {
		console.log('Subscription.subscribe resolver');

		const subscription = {
			id: v4(),
			userId: args.subscription.userId,
			paymentId: args.subscription.token,
			level: args.subscription.level,
			start: new Date(),
			end: args.subscription.end
		};

		const newSubscription = await Subscription.query()
		.insertAndFetch(subscription);

		return newSubscription;
	}
}
