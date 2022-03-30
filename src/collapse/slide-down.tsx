import { defineComponent, Transition } from 'vue';

export default defineComponent({
  setup() {
    const beforeEnter = (el: HTMLElement) => {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    };
    const enter = (el: HTMLElement) => {
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = `${el.scrollHeight}px`;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
      el.style.overflow = 'hidden';
    };
    const afterEnter = (el: HTMLElement) => {
      // for safari: remove class then reset height is necessary
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    };
    const beforeLeave = (el: HTMLElement) => {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = `${el.scrollHeight}px`;
      el.style.overflow = 'hidden';
    };
    const leave = (el: HTMLElement) => {
      if (el.scrollHeight !== 0) {
        el.style.height = '0';
        el.style.paddingTop = '0';
        el.style.paddingBottom = '0';
      }
    };
    const afterLeave = (el: HTMLElement) => {
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    return { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave };
  },
  render() {
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = this;
    return (
      <Transition
        name="td-slide-down"
        onBeforeEnter={beforeEnter}
        onEnter={enter}
        onAfterEnter={afterEnter}
        onBeforeLeave={beforeLeave}
        onLeave={leave}
        onAfterLeave={afterLeave}
      >
        {this.$slots.default && this.$slots.default(null)}
      </Transition>
    );
  },
});
