import './App.css'
import WalletAdapter from "../component/WalletAdapter/WalletAdapter"
import Balance from "../component/Balance/Balance"
import Approve from "../component/Approve/Approve"

function App() {

  return (
    <div>
      <WalletAdapter></WalletAdapter>
      <Balance></Balance>
      <Approve></Approve>
    </div>
  )
}

export default App
