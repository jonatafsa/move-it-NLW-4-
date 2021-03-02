//Import da folha de estilos
import axios from 'axios'
import Cookies from 'js-cookie'
import { useContext, useEffect } from 'react'
import { AuthenticateContext } from '../contexts/AuthenticateContext'
import { useRouter } from 'next/router'
import styles from '../styles/pages/Login.module.css'

export default function Login() {
    //const { getData } = useContext(AuthenticateContext)
    const sessionCode = Cookies.get('code')

    const router = useRouter()

    async function getData() {
        const userSession = Cookies.get('code')
        console.log('trigou')
        await axios.post('/api/github', { userSession }).then(response => {

            Cookies.set('userLoggingIn', response.data.userLoggingIn)
            Cookies.set('id', response.data.id)
            Cookies.set('username', response.data.username)
            Cookies.set('name', response.data.name)
            Cookies.set('avatar', response.data.avatar)
            console.log(response.data)
            router.push('/')
        })
    }

    useEffect(() => {
        const url = window.location.href
        const result = url.split('?')

        const stringParams = result[1]
        const paramsBusca = new URLSearchParams(stringParams);

        const code = paramsBusca.get("code")
        if (!code) {
            console.log('Estou sem código, não vou fazer nada!')
            Cookies.remove('code')
            console.log(Cookies.get('code'))
        } else {
            console.log('Defini o Code')
            console.log(Cookies.get('code'))
            Cookies.set('code', code)
            getData()
        }
    }, [])

    return (
        <div className={styles.container}>
            <img src="/landing.svg" alt="landing" />

            <div className={styles.leftContent}>
                <img src="/logowhite.svg" alt="logo" />

                {!sessionCode ? (
                    <>
                        <strong>Bem-vindo</strong>
                        <p>
                            <img src="/icons/logo.svg" alt="githublogo" />
                                    Faça login com seu Guithub para começar
                                </p>
                        <a href="https://github.com/login/oauth/authorize?client_id=b263019b332553f85c1b&redirect_uri=http://localhost:3000/login">
                            <button>
                                Buscar Usuário
                            <img src="/icons/githublogo.svg" alt="githublogo" />
                            </button>
                        </a>
                    </>
                ) : (
                        <>
                            <strong>Entrando...</strong>
                            <div className={styles.loading} >
                                <img src="/icons/loading.gif" alt="githublogo" />
                            </div>
                        </>
                    )}

            </div>
        </div>
    )
}