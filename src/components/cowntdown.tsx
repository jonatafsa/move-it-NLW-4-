//Import do useContext que é responsável a fornecer suas importações a seus componentes filho
import { useContext } from 'react'

//Import do Context PAI responsável por todos o Cowntdown(Contagem regressiva)
import { CountdownContext } from '../contexts/CountdownContext'

//Import da folha de Estilos
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    //Busca os métodos necessários dentro do Context Pai responsável pelo Cowntdown(Contagem regressiva)
    //'resetCountdown' 'startCowuntdown' - São funções dentro do Context Pai 'CountdownContext'
    // 'minutes' 'seconds' 'hasFinished' 'isActive' - São Variáveis dentro do Context Pai 'CountdownContext'
  const { minutes, seconds, hasFinished, isActive, startCowuntdown, resetCountdown } = useContext(CountdownContext)
  
  //Constante está separando Variável ''minutes' e transformando em duas variáveis a serem mostradas em tela
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')

  //Constante está separando Variável ''seconds' e transformando em duas variáveis a serem mostradas em tela
  const [secondeLeft, secondeRight] = String(seconds).padStart(2, '0').split('')

  return (

    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondeLeft}</span>
          <span>{secondeRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button disabled className={styles.countdwonButton}>
          Ciclo Encerrado
        </button>
      ) : (
          <>
            { isActive ? (
              <button type='button' className={`${styles.countdwonButton} ${styles.countdwonButtonActive}`} onClick={resetCountdown}>
                Abandonar Ciclo
              </button>
            ) : (
                <button type='button' className={styles.countdwonButton} onClick={startCowuntdown}>
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}



    </div>

  )
}