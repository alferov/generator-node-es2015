import { expect as expect } from 'chai';
import <%= camelizedModuleName %> from '../src/module.js';

describe('<%= camelizedModuleName %>', () => {
  it('should be runing without any problems', () => {
    expect(<%= camelizedModuleName %>).to.not.throw();
  });
});
