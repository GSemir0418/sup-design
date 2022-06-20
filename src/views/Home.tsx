import { Button } from 'sup-design'
import Icon from '../components/icon/Icon'
import s from './Home.module.scss'
const Home = () => {
  return (
    <>
      <div className={s.wrapper}>This is Home Page</div>
      <Button>haha</Button>
      <Icon
        name={'factory'}
        className={s['custom_icon_style']}
        color={'red'}
      ></Icon>
    </>
  )
}
export default Home
