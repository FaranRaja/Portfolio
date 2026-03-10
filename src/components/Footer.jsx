import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Designed &amp; Built by{' '}
        <span className={styles.name}>Faran Raja</span>{' '}
        · {new Date().getFullYear()}
      </p>
      <p className={styles.sub}>React · Vite · Open Source</p>
    </footer>
  )
}
