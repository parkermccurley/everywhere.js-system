import index from '../app/index';
import { should } from 'chai';
import { describe, it } from 'mocha';

should();

describe('index.js', () => {
  it('should pass a dummy test', () => {
    true.should.equal(true);
  });
  it('should return the string "Hello, world!"', () => {
    index().should.equal("Hello, world!");
  });
});
