import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Tabs from '@/src/tabs/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tabs', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tabs />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Tabs value={1} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Tabs value={'large'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':placement', () => {
      const wrapper = mount({
        render() {
          return <Tabs placement={'left'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':addable', () => {
      const wrapper = mount({
        render() {
          return <Tabs addable={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('@add', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} addable={true} onAdd={fn} />;
        },
      });
      const tabs = wrapper.findComponent(Tabs);
      tabs.find('.t-tabs__add-btn').trigger('click');
      await Vue.nextTick();
      expect(tabs.emitted().add).toBeTruthy();
    });
  });

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => null);
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => null);
  // });
});
