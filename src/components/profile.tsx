//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'
import Cookie from 'js-cookie'

//Import do Context PAI responsável por todos os Challenges(Desafios)
import { ChallengesContext } from '../contexts/ChallengesContext'

//Import da folha de Estilos
import styles from '../styles/components/Profile.module.css'


export function Profile() {
    // 'level' - É uma variável dentro do Context Pai 'ChallengesContext'
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src={ Cookie.get('avatar') } alt="Imagem de perfil"/>
            <div>
                <strong>{Cookie.get('name')}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}</p>
            </div>
        </div>
    )
}