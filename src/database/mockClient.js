import pgp from 'pg-promise';

const mockClient = (config) => {
	const db = pgp()(config);

	const mock = {
		query: (text, values) => Promise.resolve([]),
		one: (text, values) => Promise.resolve({}),
		none: (text, values) => Promise.resolve(),
		result: (text, values) =>
			Promise.resolve({
				rowCount: 0,
				rows: [],
				fields: [],
			}),
		tx: () => ({
			commit: () => Promise.resolve(),
			rollback: () => Promise.resolve(),
		}),
	};

	return {
		...db,
		...mock,
	};
};

export default mockClient;
