import Vue from 'vue';
import HelloWorld from '@/components/Generator';

describe('Generator.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('button').textContent)
      .to.equal('generate random');
  });
});
