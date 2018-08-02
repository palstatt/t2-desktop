import uuidv4 from 'uuid/v4'
import faker from 'faker'

const testCard = () => ({
	id: uuidv4(),
	title: faker.commerce.productName(),
	reporter: faker.name.findName(),
	description: faker.lorem.sentence(),
	company: faker.company.companyName(),
	mainAction: {
		action: () => console.log('main action'),
		icon: 'check',
	},
	footerAction: [
		{
			action: () => console.log('footer action'),
			icon: 'check',
		},
	],
	ts: faker.lorem.word(),
	version: faker.lorem.word(),
})

export default testCard
