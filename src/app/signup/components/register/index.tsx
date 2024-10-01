"use server"
import { redirect } from "next/navigation"
import { api } from "@/services/api"

export async function handleRegister(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  if (!name || !email || !password) {
    return { success: false, message: 'Preencha todos os campos' }
  }

  try {
    await api.post('/users', {
      name,
      email,
      password
    })
    
    // Instead of redirecting here, we'll return a success status
    return { success: true, message: 'Usuário cadastrado com sucesso' }
  } catch (err) {
    console.error('Error during registration:', err)
    return { success: false, message: 'Erro ao cadastrar' }
  }
}