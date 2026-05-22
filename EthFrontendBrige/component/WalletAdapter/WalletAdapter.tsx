import { useConnect, useConnection, useConnectors, useDisconnect } from "wagmi";

const WalletAdapter = () => {
  const { connect } = useConnect();
  const connectors = useConnectors();
  const { address } = useConnection();
  const {disconnect} = useDisconnect();

   return (
    <div>
      <p>{address}</p>

      {connectors.map((connector) => (
        <div key={connector.uid}>
          <button
            onClick={() =>
              connect({ connector })
            }
          >
            {connector.name}
          </button>
        </div>
      ))}

      <button onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
};

export default WalletAdapter;
