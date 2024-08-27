"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImgCafe from '/public/logoCafe.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Header(){
      const router = useRouter();
      async function handleLogout(){
            deleteCookie('session', {path: '/'})
            toast.success("Deslogado com sucesso")
            router.replace('/')

      }
      return(
            <header className={styles.HhaderContainer}>
                 <div className={styles.headerContent}>
                  <Link href='/dashboard'>
                        <Image
                        alt='Logo sujeito pizza'
                        src={logoImgCafe}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}/>
                  </Link>

                  <nav>
                        <Link href='/dashboard/orders'>
                              Pedidos
                        </Link>
                        <Link href='/dashboard/category'>
                        Categoria
                        </Link>
                        <Link href='/dashboard/product'>
                        Produtos
                        </Link>
                        <form action={handleLogout}>
                              <button>
                                    <LogOutIcon size={24} color='#fff'/>
                              </button>
                        </form>
                  </nav>


                 </div>
            </header>
      )
}