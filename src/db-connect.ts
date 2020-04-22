import Knex from 'knex';
import { Model } from 'objection';

import config from './db-config';

const knex = Knex(config);

Model.knex(knex);

export default knex;
