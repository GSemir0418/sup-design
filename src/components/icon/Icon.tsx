import classnames from 'classnames'
import s from './Icon.module.scss'
interface IconProps {
  name: IconName
  color?: string
  className?: string
}
type IconName = 'factory' | 'workshop' | 'resource'
const Icon = (props: IconProps) => {
  const { name, color, className } = props
  const symbol = `icon-${name}`
  return (
    <svg className={classnames(s.icon, className)} fill={color}>
      <use xlinkHref={`#${symbol}`} />
    </svg>
  )
}
export default Icon
