//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { createContext, ReactNode, useContext, useEffect } from 'react'

//Axios é respnsável por fazer a chamada a minha Api
import axios from 'axios'

import Cookie from 'js-cookie'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from './ChallengesContext'

//Tipagem do Componente PAI(ServerProvider)
interface ServerProviderProps {
    children: ReactNode;
}

//Tipagem dos métodos e variáveis dentro do Context
interface ServerContextData {
    handleRegisterData: () => void

}

//Exporta todos os métodos e variáveis do Context
export const ServerContext = createContext({} as ServerContextData) 

//Exporta o Componente PAI responsável pelo Serverless(Server)
export function ServerProvider({ children }: ServerProviderProps) {
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'startNewChallenge' - É uma função dentro do Context Pai 'ChallengesContext'
    const { startNewChallenge } = useContext(ChallengesContext)

    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'level' 'currentExperience' 'challengesCompleted' - São variáveis dentro do Context Pai 'ChallengesContext'
    const { level, currentExperience, challengesCompleted } = useContext(ChallengesContext)

    useEffect(() => {
        axios.post('/api/experience', { 
            user: { username: Cookie.get('username')}, 
            level: level, 
            experience: currentExperience, 
            challenges: challengesCompleted
        } )
    }, [level, currentExperience, challengesCompleted])

    //Função responsável por chamar uma Chamada API a meu serveless
    function handleRegisterData() {
        //dentro da Função 'post' tem a ROTA e as informações a serem enviadas
        axios.post('/api/experience', { 
            login: Cookie.get('username'), 
            level: level, 
            experience: currentExperience, 
            challenges: challengesCompleted
        } )
    }

    return (
        <ServerContext.Provider value={{
            //Exportações de todos os métodos_e_variáveis(ServerContext) dentro do Componente PAI(ServerProvider)
            handleRegisterData,
        }}>
            {children}
        </ServerContext.Provider>
    )
}