import Ember from 'ember';

const {
  assert,
  run
} = Ember;

export default function patchSchedule() {
  let cancelationToken = run.schedule('afterRender', () => {});
  if (cancelationToken == null) {
    run.schedule = function(/* queue, target, method */) {
      assert(
        'You have turned on testing mode, which disabled the run-loop\'s autorun. '
        + 'You will need to wrap any code with asynchronous side-effects in a run',
        // eslint-disable-next-line ember-suave/no-direct-property-access
        run.currentRunLoop || !Ember.testing
      );

      return run.backburner.schedule(...arguments);
    };
  }
}
