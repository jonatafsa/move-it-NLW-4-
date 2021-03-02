import Sidebar from '../components/sidebar'
import { AuthenticateProvider } from '../contexts/AuthenticateContext'
import Cookie from 'js-cookie'
import styles from '../styles/pages/Ranking.module.css'

export default function Ranking() {
    return (
        <AuthenticateProvider>
            <div className={styles.container}>
                <Sidebar />

                <strong>Leaderboard</strong>

                <div className={styles.spanLeaderbord}>
                    <span className={styles.spamOne}>POSIÇÃO</span>
                    <span className={styles.spamTwo}>USUÁRIO</span>
                    <span className={styles.spamThree}>DESAFIOS</span>
                    <span className={styles.spamFour}>EXPERIÊNCIA</span>
                </div>

                <div className={styles.resultLeaderbord}>

                    <div className={styles.positionLeaderboard}>
                        1
                </div>

                    <div className={styles.userLeaderbord}>
                        <img src="https://github.com/jonatafsa.png" alt="Imagem de perfil" />
                        <div className={styles.userLeaderbordDetails}>
                            <span>Jonata Santos</span>
                            <p>
                                <img src="icons/level.svg" alt="level" />
                        Level 43
                    </p>
                        </div>
                    </div>

                    <div className={styles.challengesLeaderbord}>
                        <span>84</span> <p>completados</p>
                    </div>

                    <div className={styles.expLeaderbord}>
                        <span>154000</span> <p>xp</p>
                    </div>
                </div>
                <div className={styles.resultLeaderbord}>

                    <div className={styles.positionLeaderboard}>
                        1
                </div>

                    <div className={styles.userLeaderbord}>
                        <img src="https://github.com/jonatafsa.png" alt="Imagem de perfil" />
                        <div className={styles.userLeaderbordDetails}>
                            <span>Jonata Santos</span>
                            <p>
                                <img src="icons/level.svg" alt="level" />
                        Level 43
                    </p>
                        </div>
                    </div>

                    <div className={styles.challengesLeaderbord}>
                        <span>84</span> <p>completados</p>
                    </div>

                    <div className={styles.expLeaderbord}>
                        <span>154000</span> <p>xp</p>
                    </div>
                </div>
                <div className={styles.resultLeaderbord}>

                    <div className={styles.positionLeaderboard}>
                        1
                </div>

                    <div className={styles.userLeaderbord}>
                        <img src="https://github.com/jonatafsa.png" alt="Imagem de perfil" />
                        <div className={styles.userLeaderbordDetails}>
                            <span>Jonata Santos</span>
                            <p>
                                <img src="icons/level.svg" alt="level" />
                        Level 43
                    </p>
                        </div>
                    </div>

                    <div className={styles.challengesLeaderbord}>
                        <span>84</span> <p>completados</p>
                    </div>

                    <div className={styles.expLeaderbord}>
                        <span>154000</span> <p>xp</p>
                    </div>
                </div>
            </div>
        </AuthenticateProvider>
    )
}