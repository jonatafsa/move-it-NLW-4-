//createContext - disponibiliza uma forma de passar dados entre a árvore de componentes
//sem precisar passar props manualmente em cada nível.
//ReactNode - O tipo ou valor primário que é criado ao usar o React
import { createContext, useState, ReactNode, useEffect } from 'react';

//Import dos Cookies
import Cookies from 'js-cookie'

//Import dos challenges(desafios) dentro de um arquivo JSON da Aplicação
import challenges from '../../challenges.json';

//Import do Modal que mostra ao subor de nível
import { LevelupModal } from '../components/levelUpModal';


//Tipagem do Componente PAI(ChallengesProvider)
interface ChallengesProviderProps {
    children: ReactNode;
    level: number
    currentExperience: number
    challengesCompleted: number
}

//Tipagem dos challenges(desafios)
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//Tipagem dos métodos e variáveis dentro do Context
interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    activeChallenge: Challenge;
    challengesCompleted: number;
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void
    closeLevelUpModal: () => void
}

//Exporta todos os métodos e variáveis do Context
export const ChallengesContext = createContext({} as ChallengesContextData);

//Exporta o Componente PAI responsável pelos Challenges(Desafios)
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    //Variável resposável pelo level
    const [level, setLevel] = useState(rest.level ?? 1);

    //variável responsável pela contagem de Experiência
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);

    //variável responsável pela contagem de challanges(desafios)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    //variável responsável a dizer se um desafio está ativo
    const [activeChallenge, setActiveChallenge] = useState(null);

    //variável responsável por dizer se o modal está aberto
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    //variável responsável por calcular a experiência para o próximo nível
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    //useEffect responsável por requisitar permissão no navegador
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    //useEffect responsável por salvar em Cookies os dados
    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    //Função responsável por subir o nível do usuário e Abrir o Modal
    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    //Função responsável por fechar o Modal
    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
    }

    //Função que Inicia um novo Desafio
    function startNewChallenge() {
        //Constantes responsáveis a pegar um desafio aleatório dentro do challenge JSON
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        //Toca um notificação em áudio iniciar um novo desafio
        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            //Notificação do navegador
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}Exp`
            })
        }
    }

    //Função responsável por resetar o desafio
    function resetChallenge() {
        setActiveChallenge(null);
    }

    //Função responsável por completar o desafio
    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        //Constante responsável por dizer quanta Exp será o challenge(desafio)
        const { amount } = activeChallenge
        
        //Variável responsável por dizer quanta Exp o usuário irá ficar
        let finalExp = currentExperience + amount

        //Condição que upa o usuário se a Exp alcançar o necessário
        if (finalExp >= experienceToNextLevel) {
            finalExp = finalExp - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExp)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider
            
            //Exportações de todos os métodos_e_variáveis(ChallengesContext) dentro do Componente PAI(ChallengesProvider)
            value={{
                level,
                levelUp,
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}
            { isLevelModalOpen && <LevelupModal /> }
        </ChallengesContext.Provider >
    )
}