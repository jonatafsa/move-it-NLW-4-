//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from '../contexts/ChallengesContext'

//Import da folha de Estilos
import styles from '../styles/components/CompleteChallengs.module.css'

export function CompleteChallenges() {
    
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'challengesCompleted' - É uma função dentro do Context Pai 'ChallengesContext'
    const { challengesCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles.completedeChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}