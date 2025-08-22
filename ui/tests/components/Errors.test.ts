import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Errors } from '../../src/components';

describe('Errors', () => {
    it('renders provided errors', () => {
        const wrapper = mount(Errors, { props: { errors: ['foo'] } });
        const items = wrapper.findAll('li');
        expect(items.length).toBe(1);
        expect(items[0].text()).toBe('foo');
    });

    it('applies pass-through classes', () => {
        const wrapper = mount(Errors, {
            props: { errors: ['foo'], pt: { root: 'test-root' } },
        });
        expect(wrapper.attributes('class')).toContain('test-root');
    });
});

