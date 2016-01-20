import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: 'Link',
  description: function(i) {return 'Res ' + i},
  available_from: function() {
    return moment([2015,1,1]).add(this.random(1,50), 'h');
  },
  available_to: function() {
    return moment([2015,1,1]).add(this.random(1,50), 'h');
  },

  random(min,max)
    {return Math.floor(Math.random()*(max-min+1)+min);}
});
