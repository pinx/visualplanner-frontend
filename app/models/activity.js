import DS from 'ember-data';
import ActivityDecorator from '../decorators/activity';

export default DS.Model.extend(ActivityDecorator, {
  description: DS.attr('string'),
  start_at: DS.attr('number'),
  end_at: DS.attr('date')

});
