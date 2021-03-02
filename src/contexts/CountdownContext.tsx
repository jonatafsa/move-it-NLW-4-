//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from './ChallengesContext'

//Tipagem do Componente PAI(CountdownProvider)
interface CountdownProviderProps {
    children: ReactNode;
}

//Tipagem dos métodos e variáveis dentro do Context
interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCowuntdown: () => void
    resetCountdown: () => void
}

//Exporta todos os métodos e variáveis do Context
export const CountdownContext = createContext({} as CountdownContextData) 

//Variável necessária ao timeout para parada instantânea do timer
let countdownTimeout: NodeJS.Timeout

//Exporta o Componente PAI responsável pelo Cowntdown
export function CountdownProvider({ children }: CountdownProviderProps) {
  
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'startNewChallenge' - É uma função dentro do Context Pai 'ChallengesContext'
    const { startNewChallenge } = useContext(ChallengesContext)

  //Variável responsável em definir o tempo inicial para o Desafio
  const [time, setTime] = useState(0.1 * 60)

  //Variável responsável a armazenar o dado que diz Cowntdown está ativo
  const [isActive, setIsActive] = useState(false)

  //Variável responsável a armazenar o dado que diz se o Cowntdown chegou ao fim
  const [hasFinished, setHasFineshed] = useState(false)

  //Constantes resnponsáveis por definir o tempo em minutos e segundos
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  //Função que iniciar o Cowntdown
  function startCowuntdown() {
    setIsActive(true)
  }

  //Função que reseta o Countdwon
  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFineshed(false)
  }

  //useEffect que faz a contagem regressiva e verifica se chegou a 0
  useEffect(() => {
    if (isActive && time > 0) {

      //função que faz a cntagem regressiva
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)

      }, 1000)
    } else if (isActive && time == 0) {

      //Se o Countdown chegou a 0
      setHasFineshed(true)
      setIsActive(false)
      startNewChallenge()

    }
  }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
          //Exportações de todos os métodos_e_variáveis(CountdownContext) dentro do Componente PAI(CountdownProvider)
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCowuntdown,
            resetCountdown,

        }}>
            {children}
        </CountdownContext.Provider>
    )
}