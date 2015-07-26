import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  description: 'Resource ' + faker.random.number(100),
  level: 0
  // tall: true,                           // booleans

  // email: function(i) {                  // and functions
  //   return 'person' + i + '@test.com';
  // }

  // firstName: faker.name.firstName       // using faker
  // lastName: faker.name.firstName
  // zipCode: faker.address.zipCode
});
