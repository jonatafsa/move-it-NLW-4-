//Import do método de navegação SPA
import Link from 'next/link'

//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'
import { AuthenticateContext } from '../contexts/AuthenticateContext'

//Import do Context PAI responsável pela Sidebar(Menulateral)
import { SidebarContext } from '../contexts/SidebarContext'

//Import da folha de estilos
import styles from '../styles/components/Sidebar.module.css'

export default function Sidebar() {
    //'activeHome' 'activeRanking' - São funções dentro do Context Pai 'ChallengesContext'
    //'homeIsActive' 'rankingIsActive' - São variáveis dentro do Context Pai 'SidebarContext'
    const { activeHome, activeRanking, homeIsActive, rankingIsActive } = useContext(SidebarContext)
    const { logout } = useContext(AuthenticateContext)

    return (
        <div className={styles.container}>
            <img src="/icons/logo.svg" alt="" />

            <div className={styles.navigation}>
                <Link href="/">
                    <img src={ homeIsActive ? ('/icons/homeactive.svg') : ('/icons/home.svg') } alt="início" onClick={activeHome} />
                </Link>
                <Link href="ranking">
                    <img src={ rankingIsActive ? ('/icons/rankingactive.svg') : ('/icons/ranking.svg') } alt="ranking" onClick={activeRanking} />
                </Link>
            </div>
            <div className={styles.exit}>
            <a onClick={logout}><img src="/icons/back.svg" alt="voltar"/></a>
            </div>
        </div>
    )
}