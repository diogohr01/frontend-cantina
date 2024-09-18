"use client"
import { api } from '@/services/api'
import styles from './styles.module.scss'
import { getCookieClient } from '@/lib/cookieClient';
import { useEffect, useState } from 'react';


interface SoldData {
    totalValue: number;

}


export default function Dashboard() {
    const [soldData, setSoldData] = useState<SoldData | null>(null);
    const [rankingProduct, setRankingProduct] = useState<{ id: string; produto: string; quantidade: number }[]>([]);

    async function getSold() {
        const token = getCookieClient();

        try {
            const response = await api.get('/sold', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSoldData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados de vendas:", error);
        }
    }

    async function getRankingProduct() {
        const token = getCookieClient();

        try {
            const response = await api.get('/rankingProduct', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.produtos);
            setRankingProduct(response.data.produtos);
        } catch (error) {
            console.error("Erro ao buscar os dados do Rankind de produtos:", error);
        }
    }

    useEffect(() => {
        getSold();
        getRankingProduct();
    }, []);

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <div className={styles.card}>
                    <div className={styles.description}>
                        <div className={styles.tag}></div>

                        <span className={styles.totalVendido}>
                            Total vendido: {soldData ? `R$${soldData.totalValue},00` : "Carregando..."}
                        </span>
                    </div>
                </div>
                <div className={styles.main}>
                    <article className={styles.article}>
                        <span className={styles.rankingProdutos}>
                            <span className={styles.ranking}> Ranking de produtos</span>
                            { rankingProduct.length > 0 ?rankingProduct.map((produto) => (
                                <div key={produto.id} className={styles.rankingProduct}>
                                    <div className={styles.descriptionProduct}>
                                    <p >Produto: {produto.produto}</p>
                                    <p >Quantidade: {produto.quantidade}</p>
                                    </div>
                                   
                                </div>
                            )): <span className={styles.noProducts}>Carregando produtos...</span>}
                        </span>
                    </article>
                    <aside className={styles.aside}>
                        <span className={styles.center}>
                            Teste
                        </span>
                    </aside>
                    <aside className={styles.aside}>
                        <span className={styles.extrato}>
                            Teste
                        </span>
                    </aside>
                </div>
            </section>
        </main>
    );
}
