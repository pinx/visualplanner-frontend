import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  resourceAvailabilities: DS.hasMany('resourceAvailability')
});
