//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

//Axios é respnsável por fazer a chamada a minha Api
import axios from 'axios'

//Tipagem do Componente PAI(UserLoginProvider)
interface UserLoginProviderProps {
    children: ReactNode;
}

//Tipagem dos métodos e variáveis dentro do Context
interface UserLoginContextData {
    register: () => void

}

//Exporta todos os métodos e variáveis do Context
export const UserLoginContext = createContext({} as UserLoginContextData)

//Exporta o Componente PAI responsável pelo UserLoginless(UserLogin)
export function UserLoginProvider({ children }: UserLoginProviderProps) {

    //Variáveis que guarda a informação se o usário estiver logado ou não
    const [userLoggingIn, setUserLoggingIn] = useState(false)
    const [id, setId] = useState(false)
    const [userLogin, setUserLogin] = useState(true)
    const [username, setUsername] = useState(false)
    const [avatar, setAvatar] = useState(false)


    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'level' 'currentExperience' 'challengesCompleted' - São variáveis dentro do Context Pai 'ChallengesContext'
    //const { level, currentExperience, challengesCompleted } = useContext(ChallengesContext)

    //Função responsável por chamar uma Chamada API a meu serveless
    function register() {
        
                //Pega o URL e splita o 'code'
                const url = window.location.href
                const result = url.split('?')
        
                const stringParams = result[1]
                const paramsBusca = new URLSearchParams(stringParams);
        
                const code = paramsBusca.get("code")
        
                //dentro da Função 'post' tem a ROTA e as informações a serem enviadas
                axios.post('/api/github', { code }).then(response => {
                    setAvatar(response.data.userLoggingIn)
                    setId(response.data.id)
                    setUserLogin(response.data.username)
                    setUsername(response.data.name)
                    setAvatar(response.data.avatar)
                    
                    console.log('Tô indo pro banco')
                })

    }

    return (
        <UserLoginContext.Provider value={{
            //Exportações de todos os métodos_e_variáveis(UserLoginContext) dentro do Componente PAI(UserLoginProvider)
            register
        }}>
            {children}
        </UserLoginContext.Provider>
    )
}