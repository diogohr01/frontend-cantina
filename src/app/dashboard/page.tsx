"use client"
import { api } from '@/services/api'
import styles from './styles.module.scss'
import { getCookieClient } from '@/lib/cookieClient';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

interface SoldData {
    totalValue: number;
}

export default function Dashboard() {
    const [soldData, setSoldData] = useState<SoldData | null>(null);
    const [rankingProduct, setRankingProduct] = useState<{ id: string; produto: string; quantidade: number; price: number }[]>([]);
    const router = useRouter();
    const [segundos, setSegundos] = useState<number>(60);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
            setRankingProduct(response.data.produtos);
        } catch (error) {
            console.error("Erro ao buscar os dados do Ranking de produtos:", error);
        }
    }

    function setContagem() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setSegundos(60);

        const intervalId = setInterval(() => {
            setSegundos((prevSegundos) => {
                if (prevSegundos <= 1) {
                    getSold();
                    getRankingProduct();
                    return 60; 
                }
                return prevSegundos - 1;
            });
        }, 1000);

        intervalRef.current = intervalId;
    }

    function startContagem() {
        router.refresh();
        getSold();
        getRankingProduct();
        setContagem();
    }

    useEffect(() => {
        getSold();
        getRankingProduct();
        setContagem();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <div className={styles.card}>
                    <div className={styles.description}>

                        <span className={styles.totalVendido}>
                            Total vendido: {soldData ? `R$${soldData.totalValue.toFixed(2)}` : "Carregando..."}
                        </span>
                        <div>
            <div className={styles.atualizar}>
                Tempo de atualização: {segundos}
            

            <button className={styles.buttonOrder} onClick={startContagem}>                
            Atualizar
            </button>
            </div>
            </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <article className={styles.article}>
                        <span className={styles.rankingProdutos}>
                            <span className={styles.ranking}> Ranking de produtos</span>
                            { rankingProduct.length > 0 ? rankingProduct.map((produto) => (
                                <div key={produto.id} className={styles.rankingProduct}>
                                    <div className={styles.descriptionProduct}>
                                    <p > {produto.produto}</p>
                                    <p > {produto.quantidade}</p>
                                    <p> R${produto.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            )) : <span className={styles.noProducts}>Nenhum produto encontrado...</span>}
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

//olá 