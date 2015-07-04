import DS from 'ember-data';

export default DS.Model.extend({
  resource: DS.belongsTo('resource'),
  start_at: DS.attr('date'),
  end_at: DS.attr('date')
});
