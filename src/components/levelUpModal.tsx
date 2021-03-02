//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from '../contexts/ChallengesContext'

//Import da folha de Estilos
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelupModal() {
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'closeLevelUpModal' - É uma função dentro do Context Pai 'ChallengesContext'
    // 'level' - É uma variável dentro do Context Pai 'ChallengesContext'
    const { level, closeLevelUpModal } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button type='button'>
                    <img src="/icons/close.svg" alt="Fechar modal" onClick={closeLevelUpModal}/>
                </button>
            </div>
        </div>
    )
} 