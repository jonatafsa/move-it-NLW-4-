//Import do Sidevar(Menu lateral)
import { SidebarProvider } from '../contexts/SidebarContext'

//Import da FLOHA DE ESTILOS GLOBAL(todo o app irá seguir)
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    //Componente PAI responsável por trazer o contexto do menu lateral para o todo APP
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  )
}

export default MyApp
