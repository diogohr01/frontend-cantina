"use server"
import { redirect } from "next/navigation"
import { api } from "@/services/api"
import { toastError } from "@/app/components/toast"


export async function handleRegister(formData: FormData){
      const name = formData.get('name')
      const email = formData.get('email')
      const password = formData.get('password')

      if(name == '' || email === '' || password == ''){
            toastError({ message: 'Preencha os campos' })
            return
      }
      try{
            await api.post('/users', {
                  name,
                  email,
                  password
            })
      }catch(err){
            console.log('error')
            console.log(err)
            return;
      }

      redirect('/')
}