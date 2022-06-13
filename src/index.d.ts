// 声明CSS Modules 防止tsc报错
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
