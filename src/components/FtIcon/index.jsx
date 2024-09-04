const ElementPlusIcon = (name, size, color, className) => (
  <el-icon class={[className, 'ft-icon']} size={size} color={color}>
    {h(resolveComponent(name))}
  </el-icon>
)
const OtherIcon = (name, size, color, className) => (
  <i class={[className, `ft-icon ${name}`]} style={`font-size:${size}; color: ${color};vertical-align: middle;`}></i>
)

export default defineComponent({
  name: 'FtIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    if (props.name.indexOf('el-icon') === 0) {
      return () => ElementPlusIcon(props.name.split('el-icon ')[1], props.size, props.color, props.class)
    } else {
      return () => OtherIcon(props.name, props.size, props.color, props.class)
    }
  }
})
