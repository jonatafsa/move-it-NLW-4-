//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from '../contexts/ChallengesContext'

//Import da folha de Estilos
import styles from '../styles/components/ExperienceBar.module.css'

export function Experiencebar() {
    //Busca os métodos necessários dentro do Context Pai responsável pelos Challenges(desafios)
    //'currentExperience' 'experienceToNextLevel' - São Variáveis dentro do Context Pai 'ChallengesContext'
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    //Constante responsável por calcular a porcentagem da barra visual da Experiencia
    const percetToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <div className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percetToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percetToNextLevel}%` }}>{currentExperience} px</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </div>
    )
}