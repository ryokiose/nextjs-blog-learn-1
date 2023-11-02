import styles from "./index.module.css"

export const Loading = () => {
  return (
    <>
      <div className={styles.loading}>
        <div className={styles.loader_container}>
          <div className={styles.loader}></div>
          <div className={styles.text}>Now Loading...</div>
        </div>
      </div>
    </>
  )
}