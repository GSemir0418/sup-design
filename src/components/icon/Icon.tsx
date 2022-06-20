import s from './Icon.module.scss'
interface IconProps {
  name: IconName
}
type IconName = 'factory' | 'workshop' | 'resource'
const Icon = (props: IconProps) => {
  const { name } = props
  return (
    <svg className={s.icon}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
export default Icon
