import s from './Button.module.scss'
const Button = (props: any) => {
  return (
    <div className="wrapper">
      <button className={s.button}>{props.children}</button>
    </div>
  )
}
export default Button