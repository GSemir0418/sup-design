import { Button } from 'sup-design'
import Icon from '../components/icon/Icon'
import s from './Home.module.scss'
const Home = () => {
  return (
    <>
      <div className={s.wrapper}>This is Home Page</div>
      <Button>haha</Button>
      <Icon name={'factory'}></Icon>
    </>
  )
}
export default Home
