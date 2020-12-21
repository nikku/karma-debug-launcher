import { expect } from 'chai';

import LauncherExport from '..';

describe('karma-debug-launcher', function() {

  it('should expose launcher:Debug', function() {

    // then
    expect(LauncherExport).to.have.key('launcher:Debug');
  });

});