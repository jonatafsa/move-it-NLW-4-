//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

//Tipagem do Componente PAI(SidebarProvider)
interface SidebarProviderProps {
    children: ReactNode;
}

//Tipagem dos métodos e variáveis dentro do Context
interface SidebarContextData {
    homeIsActive: boolean
    rankingIsActive: boolean
    activeHome: () => void
    activeRanking: () => void
}

//Exporta todos os métodos e variáveis do Context
export const SidebarContext = createContext({} as SidebarContextData) 

//Exporta o Componente PAI responsável pelo Sideber(Menu lateral)
export function SidebarProvider({ children }: SidebarProviderProps) {
   
    //Variável responsável armazenar a informação se a página Home está ativa
    const [homeIsActive, setHomeIsActive] = useState(true)

    //Variável responsável armazenar a informação se a página Leaderboards está ativa
    const [rankingIsActive, setRankingIsHomeActive] = useState(false)

    //Função responsável por dizer que a página Home está ativa
    function activeHome() {
        setHomeIsActive(true)
        setRankingIsHomeActive(false)
        console.log('HOME: ', homeIsActive)
    }

    //Função responsável por dizer que a página Leaderboards está ativa
    function activeRanking() {
        setHomeIsActive(false)
        setRankingIsHomeActive(true)
        console.log('Ranking: ', rankingIsActive)
    }

    return (
        <SidebarContext.Provider value={{
            //Exportações de todos os métodos_e_variáveis(SidebarContext) dentro do Componente PAI(SidebarProvider)
            homeIsActive,
            rankingIsActive,
            activeHome,
            activeRanking,
        }}>
            {children}
        </SidebarContext.Provider>
    )
}