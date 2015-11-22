import DS from 'ember-data';
import ResourceDecorator from '../decorators/resource';

export default DS.Model.extend(ResourceDecorator, {
  description: DS.attr('string'),
  available_from: DS.attr('date'),
  available_to: DS.attr('date'),
  resourceAvailabilities: DS.hasMany('resourceAvailability')
});
