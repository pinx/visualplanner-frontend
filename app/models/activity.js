import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  start_at: DS.attr('date'),
  end_at: DS.attr('date')

});
