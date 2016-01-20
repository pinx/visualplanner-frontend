import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: 'Link',
  description: function(i) {return 'Act ' + i},
  start_at: function() {
    return moment('2015-1-1').add(this.random(1,10), 'h');
  },
  end_at: function() {
    return moment('2015-1-1').add(this.random(1,10), 'h');
  },

  random(min,max)
    {return Math.floor(Math.random()*(max-min+1)+min);}
});
