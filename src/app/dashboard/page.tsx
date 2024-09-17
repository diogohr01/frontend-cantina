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

    async function getSold() {
        const token = getCookieClient();

        try {
            const response = await api.get('/sold', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setSoldData(response.data);  
        } catch (error) {
            console.error("Erro ao buscar os dados de vendas:", error);
        }
    }

    useEffect(() => {
        getSold();  
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
                            Teste
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
