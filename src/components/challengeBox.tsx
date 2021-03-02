//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from '../contexts/ChallengesContext'

//Import do Context PAI responsável por todos o Cowntdown(Contagem regressiva)
import { CountdownContext } from '../contexts/CountdownContext'

//Import da folha de Estilos
import styles from '../styles/components/challengeBox.module.css'

export function ChallengeBox() {
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'activeChallenge' 'resetChallenge' 'completeChallenge' - São funções dentro do Context Pai 'ChallengesContext'
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)

    //Busca os métodos necessários dentro do Context Pai responsável pelo Cowntdown(Contagem regressiva)
    //'resetCountdown' - É uma função dentro do Context Pai 'CountdownContext'
    const { resetCountdown } = useContext(CountdownContext)

    //Função sendo chamada peplo Onlick do botão de sucesso
    //Responsável por chamar duas outras funções dentro do useContext
    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountdown()
    }

    //Função sendo chamada peplo Onlick do botão de Falha
    //Responsável por chamar duas outras funções dentro do useContext
    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type='button' className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type='button' className={styles.challengeSucessButton} onClick={handleChallengeSucceeded}>Completei</button>
                    </footer>

                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finzalize um ciclo para receber desafios</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level up" />
                            avance de level completando desafios
                        </p>
                    </div>
                )}
        </div>
    )
}