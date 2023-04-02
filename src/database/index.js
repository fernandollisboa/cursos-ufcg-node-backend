import { Client } from 'pg';
import mockClient from './mockClient';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// export const client = new Client({
// 	connectionString,
// });

export const client = mockClient({ connectionString });

client.connect(function (err) {
	if (err) {
		console.error('Error connecting to PostgreSQL database');
		console.error(err);
	} else {
		console.log('Connected to PostgreSQL database');
	}
});
