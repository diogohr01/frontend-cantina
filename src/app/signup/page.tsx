"use client"
import Image from "next/image";
import styles from "../page.module.scss";
import logoImgCafe from '/public/logoCafe.svg'
import Link from 'next/link'
import { toastSuccess } from "../components/toast";
import { handleRegister } from "./components/register";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export default function Signup() {
      const router = useRouter();
      const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
          

            const formData = new FormData(event.currentTarget)
            const result = await handleRegister(formData)

            if (result.success) {
                  toast.success(result.message)
                  router.push('/')  // Redirect on success
            } else {
                  toast.error(result.message)
            }

      
      }
      return (
            <>
                  <div className={styles.containerCenter}>
                        <Image
                              src={logoImgCafe}
                              alt="Logo da pizzaria"
                        />

                        <section className={styles.login}>
                              <h1>Criando sua conta</h1>
                              <form

                                    onSubmit={onSubmit}
                              >

                                    <input type="text" required name="name" placeholder="Digite seu nome..." className={styles.input} />

                                    <input type="email" required name="email" placeholder="Digite seu email..." className={styles.input} />
                                    <input type="password" required name="password" placeholder="Digite sua senha..." className={styles.input} />

                                    <button type="submit" className={styles.button}>Cadastrar</button>
                              </form>
                              <Link href='/' className={styles.text} >Já possui uma conta? Faça o login</Link>
                        </section>
                  </div>
            </>
      );
}



