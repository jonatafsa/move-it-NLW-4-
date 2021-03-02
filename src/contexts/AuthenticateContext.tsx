//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

//Axios é respnsável por fazer a chamada a minha Api
import axios from 'axios'

import Cookies from 'js-cookie'

//Página de Login se o usuário não estiver logado
import Login from '../pages/login'

import { useRouter } from 'next/router'

//Tipagem do Componente PAI(AuthenticateProvider)
interface AuthenticateProviderProps {
    children: ReactNode;
}

//Tipagem dos métodos e variáveis dentro do Context
interface AuthenticateContextData {
    logout: () => void
    sessionCode: string
    userLoggingIn: boolean

}

//Exporta todos os métodos e variáveis do Context
export const AuthenticateContext = createContext({} as AuthenticateContextData)

//Exporta o Componente PAI responsável pelo Authenticateless(Authenticate)
export function AuthenticateProvider({ children }: AuthenticateProviderProps) {

    //Variáveis que guarda a informação se o usário estiver logado ou não
    const [userLoggingIn, setUserLoggingIn] = useState(false)
    const [sessionCode, setSessionCode] = useState(null)

    const routes = useRouter()


    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'level' 'currentExperience' 'challengesCompleted' - São variáveis dentro do Context Pai 'ChallengesContext'
    //const { level, currentExperience, challengesCompleted } = useContext(ChallengesContext)

    function logout() {
        Cookies.set('userLoggingIn', 'false')
        Cookies.remove('code')
        Cookies.remove('id')
        Cookies.remove('username')
        Cookies.remove('name')
        Cookies.remove('avatar')
        console.log('Saindo do App', Cookies.get())
        routes.push('/login')
    }


    return (
        <AuthenticateContext.Provider value={{
            //Exportações de todos os métodos_e_variáveis(AuthenticateContext) dentro do Componente PAI(AuthenticateProvider)
            logout,
            sessionCode,
            userLoggingIn,
        }}>
            {children}
        </AuthenticateContext.Provider>
    )
}