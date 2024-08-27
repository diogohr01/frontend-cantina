import styles from './styles.module.scss'

export default function Dashboard() {
      return (
            <main className={styles.container}>
                  <section className={styles.containerHeader}>
                        <div className={styles.card}>
                              <div className={styles.description}>

                                    <span className={styles.totalVendido}>
                                          Total vendido:
                                    </span>
                                    <span>R$ 400,00</span>
                              </div>
                        </div>
                        <div className={styles.main}>
                              <article className={styles.article}>
                                    <span className={styles.rankingProdutos}>
                                          Teste
                                    </span>
                              </article>
                              <aside className={styles.aside}>
                                    <span className={styles.extrato}>
                                          Teste
                                    </span>
                              </aside>
                        </div>
                  </section>
            </main>
      )
}