import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import {
  PublicKey,
  Connection,
  SystemProgram,
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  ConfirmOptions,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

import { toast } from "react-toastify";

import { sendTransactions, awaitTransactionSignatureConfirmation } from "./utils";

import MyWallet from "./MyWallet";
// import program_idl from "./presale.json";
import program_idl from "./presale.json";

const REACT_APP_SOLANA_HOST: any = import.meta.env.VITE_APP_SOLANA_RPC_HOST;
console.log(REACT_APP_SOLANA_HOST);
let conn = new Connection(REACT_APP_SOLANA_HOST);
const programId = new PublicKey(import.meta.env.VITE_APP_PROGRAM_KEY as any);
let poolAddress = new PublicKey(import.meta.env.VITE_APP_POOL_ADDRESS as any);
const confirmOption: ConfirmOptions = {
  commitment: "finalized",
  preflightCommitment: "finalized",
  skipPreflight: false,
};

const txTimeoutInMilliseconds = 30000;

export interface poolStateInterface {
  owner: string;
  withdrawer: string;
  minsol: number;
  maxsol: number;
  softcap: number;
  hardcap: number;
  raised: number;
  withdrawAmount: number;
  pause: boolean;
}

export interface contributeInfoInterface {
  pool: string;
  contributer: string;
  contributeStart: number;
  contributeLast: number;
  amount: number;
}

export interface PersonalInfoInterface {
  poolState: poolStateInterface,
  contributeInfo: contributeInfoInterface,
  depositSol: Function;
  getPoolStateData: Function;
}

export const PersonalInfoContext = React.createContext<PersonalInfoInterface>({
  poolState: {
    owner: "",
    withdrawer: "",
    minsol: 0,
    maxsol: 0,
    softcap: 0,
    hardcap: 0,
    raised: 0,
    withdrawAmount: 0,
    pause: false
  },
  contributeInfo: {
    pool: "",
    contributer: "",
    contributeStart: 0,
    contributeLast: 0,
    amount: 0,
  },
  depositSol: async (amount: number) => {
    return 0;
  },
  getPoolStateData: async() => {},
});

export const PersonalInfoContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { connection } = useConnection();
  const { connected, sendTransaction, wallet, publicKey } = useWallet();
  const [poolState, setPoolState] = useState<poolStateInterface>({
    owner: "",
    withdrawer: "",
    minsol: 0,
    maxsol: 0,
    softcap: 0,
    hardcap: 0,
    raised: 0,
    withdrawAmount: 0,
    pause: false
  });
  const [contributeInfo, setContributeInfo] = useState<contributeInfoInterface>({
    pool: "",
    contributer: "",
    contributeStart: 0,
    contributeLast: 0,
    amount: 0,
  })

  // const [program] = useMemo(() => {
  //   if (connected) {
  //     const provider = new anchor.AnchorProvider(
  //       conn,
  //       wallet as any,
  //       confirmOption
  //     );

  //     const program = new anchor.Program(program_idl as unknown as anchor.Idl, programId, provider);
  //     return [program];
  //   }
  //   return [];
  // }, [connected, conn, program_idl, programId, wallet]);

  const getPoolStateData = async () => {
    try {
      console.log("connected");
      const wallet = new MyWallet(Keypair.generate());
      const provider = new anchor.AnchorProvider(
        conn,
        wallet as any,
        confirmOption
      );
      const program = new anchor.Program(program_idl as unknown as anchor.Idl, programId, provider);
      const poolData = await program.account.pool.fetch(poolAddress);

      console.log(poolData);

      setPoolState({
        owner: poolData.owner.toBase58(),
        withdrawer: poolData.withdrawer.toBase58(),
        minsol: poolData.minSol.toNumber(),
        maxsol: poolData.maxSol.toNumber(),
        softcap: poolData.hardcap.toNumber(),
        hardcap: poolData.softcap.toNumber(),
        raised: poolData.raised.toNumber(),
        withdrawAmount: poolData.withdrawAmount.toNumber(),
        pause: poolData.pause
      });
      return {
        owner: poolData.owner.toBase58(),
        withdrawer: poolData.withdrawer.toBase58(),
        minsol: poolData.minSol.toNumber(),
        maxsol: poolData.maxSol.toNumber(),
        softcap: poolData.hardcap.toNumber(),
        hardcap: poolData.softcap.toNumber(),
        raised: poolData.raised.toNumber(),
        withdrawAmount: poolData.withdrawAmount.toNumber(),
        pause: poolData.pause
      };
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  const depositSol = () => {
    
  }

  // const depositSol = useCallback(
  //   async (amount: number) => {
  //     if (wallet?.adapter.publicKey) {
  //       const [state] = await PublicKey.findProgramAddress(
  //         [wallet?.adapter.publicKey.toBuffer(), pool.toBuffer()],
  //         programId
  //       );
  //       let stateData: any = {
  //         owner: "",
  //         pool: "",
  //         amount: 0,
  //         status: "default",
  //         stateAddr: "",
  //       };
  //       if ((await conn.getAccountInfo(state)) != null) {
  //         stateData = await getStateData();
  //       }
  //       // console.log("state data", stateData)
  //       if (
  //         stateData.amount === 0 &&
  //         stateData.status === "default" &&
  //         (await deposit(amount))
  //       ) {
  //         curSocket.emit(
  //           "deposit_fund",
  //           JSON.stringify({
  //             wallet: wallet?.adapter.publicKey?.toBase58(),
  //             amount: Number(amount) * LAMPORTS_PER_SOL,
  //           })
  //         );
  //       } else if (stateData.amount && stateData.status === "deposited") {
  //         toast.warn(`Deposit is pending!`, {
  //           position: "bottom-left",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //         curSocket.emit(
  //           "deposit_fund",
  //           JSON.stringify({
  //             wallet: wallet?.adapter.publicKey?.toBase58(),
  //             amount: Number(stateData.amount),
  //           })
  //         );
  //       } else if (
  //         stateData.amount &&
  //         stateData.status === "withdraw required"
  //       ) {
  //         toast.warn(`Withdraw is pending!`, {
  //           position: "bottom-left",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //         setDepositingFlag(true);
  //       }
  //     } else {
  //       toast.warn(`No wallet Connected!`, {
  //         position: "bottom-left",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       setDepositingFlag(true);
  //     }
  //   },
  //   [wallet?.adapter.publicKey]
  // );

  return (
    <PersonalInfoContext.Provider
      value={{
        poolState,
        contributeInfo,
        depositSol,
        getPoolStateData
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};
