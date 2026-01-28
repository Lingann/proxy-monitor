import { defineComponent, computed } from 'vue';
import * as icons from 'lucide-vue-next';
import './styles/index.scss';

export default defineComponent({
  name: 'Icon',
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 16 },
    color: String
  },
  setup(props) {
    const iconComponent = computed(() => {
      if (!props.name) return null;
      const pascalName = props.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
      return (icons as any)[pascalName] || (icons as any).HelpCircle;
    });

    return () => {
      const Comp = iconComponent.value;
      if (!Comp) return null;
      return <Comp size={props.size} color={props.color} />;
    };
  }
});

export type IconProps = {
  name: string;
  size?: number | string;
  color?: string;
};