import index from '../app/index';
import chai from 'chai';

describe('index.js', () => {
  it('should pass a dummy test', () => {
    expect(true).to.be.equal(true);
  });
  it('should return the string "Hello, world!"', () => {
    expect(index()).to.be.equal("Hello, world!");
  });
});
