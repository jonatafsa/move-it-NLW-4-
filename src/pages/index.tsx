//Import dos Componentes
import { CompleteChallenges } from "../components/completeChallengs";
import { Countdown } from "../components/cowntdown";
import { Experiencebar } from "../components/ExperienceBar";
import { Profile } from "../components/profile";
import { ChallengeBox } from "../components/challengeBox";
import Sidebar from "../components/sidebar";

//Import dos Contextos
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ServerProvider } from "../contexts/ServerapiContext";

//Import da Tag Head(<head> </head>)
import Head from 'next/head'

//Import do Router para fazer o redirecionamento de rotas
import { useRouter } from 'next/router'

//import dos Cookies
import Cookies from 'js-cookie'

//Geração estática e Renderização do lado do servidor
import { GetServerSideProps } from 'next'

//Folha de Estilos da página Home
import styles from '../styles/pages/Home.module.css'

import Login from "./login";
import { AuthenticateProvider } from "../contexts/AuthenticateContext";
import { useEffect } from "react";

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props) {
  const sessionUser = Cookies.get('code')
  const router = useRouter()

  useEffect(() => {
    if (!sessionUser) {
      router.push('/login')
    }
  }, [])

  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
      <AuthenticateProvider>
        <ServerProvider>
          <div className={styles.container}>
            <Head>
              <title>
                Início | Move It
        </title>
            </Head>

            <Sidebar />
            <Experiencebar />

            <CountdownProvider>
              <section>
                <div>
                  <Profile />
                  <CompleteChallenges />
                  <Countdown />
                </div>

                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </ServerProvider>
      </AuthenticateProvider>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}