import React, {
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import {
  PublicKey,
  Connection,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  ConfirmOptions,
  SYSVAR_CLOCK_PUBKEY
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";

// import { toast } from "react-toastify";

import { sendTransactions, awaitTransactionSignatureConfirmation } from "./utils";

import MyWallet from "./MyWallet";
// import program_idl from "./presale.json";
import program_idl from "./presale.json";
// import { error } from "console";

const REACT_APP_SOLANA_HOST: any = import.meta.env.VITE_APP_SOLANA_RPC_HOST;
// console.log(REACT_APP_SOLANA_HOST);
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
  userBalance: number,
  poolState: poolStateInterface,
  contributeInfo: contributeInfoInterface,
  depositSol: Function;
  getUserInfo: Function,
  getPoolStateData: Function;
}

export const PersonalInfoContext = React.createContext<PersonalInfoInterface>({
  userBalance: 0,
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
  depositSol: async () => {},
  getPoolStateData: async() => {},
  getUserInfo: async() => {},
});

export const PersonalInfoContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // const { connection } = useConnection();
  const { wallet } = useWallet();
  const [userBalance, setUserBalance] = useState<number>(0);
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

  useEffect(() => {
    getPoolStateData();
  }, [])

  // useEffect(() => {
  //   if(wallet?.adapter.publicKey) {
  //     getUserInfo();
  //   } else {
  //     setUserBalance(0);
  //   }
  // }, [wallet?.adapter.publicKey])

  const getUserInfo = async () => {
    if(wallet?.adapter.publicKey) {
      await getUserBalance(wallet.adapter.publicKey);
      await getUserContributeInfo();
    }
  }

  const getUserBalance = async (userkey: PublicKey) => {
    let balance = await conn.getBalance(userkey);
    // console.log("user balance", balance / LAMPORTS_PER_SOL);
    setUserBalance(balance / LAMPORTS_PER_SOL);
  }

  const getPoolStateData = async () => {
    try {
      // console.log("connected");
      const wallet = new MyWallet(Keypair.generate());
      const provider = new anchor.AnchorProvider(
        conn,
        wallet as any,
        confirmOption
      );
      const program = new anchor.Program(program_idl as unknown as anchor.Idl, programId, provider);
      const poolData = await program.account.pool.fetch(poolAddress);

      // console.log(poolData);

      setPoolState({
        owner: poolData.owner.toBase58(),
        withdrawer: poolData.withdrawer.toBase58(),
        minsol: poolData.minSol.toNumber() / LAMPORTS_PER_SOL,
        maxsol: poolData.maxSol.toNumber() / LAMPORTS_PER_SOL,
        softcap: poolData.softcap.toNumber() / LAMPORTS_PER_SOL,
        hardcap: poolData.hardcap.toNumber() / LAMPORTS_PER_SOL,
        raised: poolData.raised.toNumber() / LAMPORTS_PER_SOL,
        withdrawAmount: poolData.withdrawAmount.toNumber() / LAMPORTS_PER_SOL,
        pause: poolData.pause
      });
      return {
        owner: poolData.owner.toBase58(),
        withdrawer: poolData.withdrawer.toBase58(),
        minsol: poolData.minSol.toNumber() / LAMPORTS_PER_SOL,
        maxsol: poolData.maxSol.toNumber() / LAMPORTS_PER_SOL,
        softcap: poolData.hardcap.toNumber() / LAMPORTS_PER_SOL,
        hardcap: poolData.softcap.toNumber() / LAMPORTS_PER_SOL,
        raised: poolData.raised.toNumber() / LAMPORTS_PER_SOL,
        withdrawAmount: poolData.withdrawAmount.toNumber() / LAMPORTS_PER_SOL,
        pause: poolData.pause
      };
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  async function getContributeInfoAccount(owner : PublicKey, pool: PublicKey) {
    // console.log(owner, pool, token);
    return await PublicKey.findProgramAddress([owner.toBuffer(),pool.toBuffer()], programId)
  }

  const getContributeInfo = async (conn: Connection, address: PublicKey) => {
    const wallet = new MyWallet(Keypair.generate());
    const provider = new anchor.AnchorProvider(
      conn,
      wallet as any,
      confirmOption
    );
    const program = new anchor.Program(program_idl as unknown as anchor.Idl, programId, provider);
    let data = await program.account.contributeInfo.fetch(address)
    return data;
  }

  // const getAllInfo = async () => {
  //   await getPoolStateData();
  //   await getUserInfo();
  // }

  const getUserContributeInfo = async () => {
    try {
      if(wallet?.adapter.publicKey){
        const [contributeState] = await getContributeInfoAccount(wallet?.adapter.publicKey, poolAddress);
        if ((await conn.getAccountInfo(contributeState)) != null) {
          const contributeInfoData = await getContributeInfo(conn, contributeState);
          // console.log("contributeinfo", contributeInfoData);
          // console.log({
          //   pool: contributeInfoData.pool.toBase58(),
          //   contributer: contributeInfoData.contributer.toBase58(),
          //   contributeStart: contributeInfoData.contributeStart.toNumber(),
          //   contributeLast: contributeInfoData.contributeLast.toNumber(),
          //   amount: contributeInfoData.amount.toNumber(),
          // })
          setContributeInfo({
            pool: contributeInfoData.pool.toBase58(),
            contributer: contributeInfoData.contributer.toBase58(),
            contributeStart: contributeInfoData.contributeStart.toNumber(),
            contributeLast: contributeInfoData.contributeLast.toNumber(),
            amount: contributeInfoData.amount.toNumber(),
          })
        }
      }
    } catch (error) {
      console.log(error);
    }    
  }

  const getErrorMessage = (code: number) => {
    const rlt = program_idl.errors.find((ele) => ele.code == code);
    return rlt;
  }

  const depositSol = async (amount: number) => {
    try {
      if (wallet?.adapter.publicKey) {
        console.log("deposit");
        const provider = new anchor.AnchorProvider(
          conn,
          wallet as any,
          confirmOption
        );
        const program = new anchor.Program(program_idl as unknown as anchor.Idl, programId, provider);
        // let transaction = new Transaction();

        let instructionsMatrixIndex = 0;

        const signersMatrix: any[] = [];
        const instructionsMatrix: any[] = [];

        signersMatrix.push([]);
        instructionsMatrix.push([]);

        // const rand = Keypair.generate().publicKey;

        const [contributeState, bump] = await getContributeInfoAccount(wallet?.adapter.publicKey, poolAddress);

        if ((await conn.getAccountInfo(contributeState)) == null) {
          // console.log("account Address", contributeState.toBase58())

          instructionsMatrix[instructionsMatrixIndex].push(
            program.instruction.initContributeInfo(new anchor.BN(bump), {
              accounts: {
                owner: wallet?.adapter.publicKey,
                pool: poolAddress,
                data: contributeState,
                clock : SYSVAR_CLOCK_PUBKEY,
                systemProgram: SystemProgram.programId,
              },
            })
          );
        }
        // } else {
        //   const contributeInfoData = await getContributeInfo(conn, contributeState);
        //   setContributeInfo({
        //     pool: contributeInfoData.pool.toBase58(),
        //     contributer: contributeInfoData.contributer.toBase58(),
        //     contributeStart: contributeInfoData.contributeStart.toNumber(),
        //     contributeLast: contributeInfoData.contributeLast.toNumber(),
        //     amount: contributeInfoData.amount.toNumber(),
        //   })
        // }

        instructionsMatrix[instructionsMatrixIndex].push(
          program.instruction.depositSol(
            new anchor.BN(Number(amount * LAMPORTS_PER_SOL)),
            {
              accounts: {
                owner: wallet?.adapter.publicKey,
                pool: poolAddress,
                contributeInfo: contributeState,
                clock : SYSVAR_CLOCK_PUBKEY,
                systemProgram : SystemProgram.programId
              },
            }
          )
        );

        // console.log("instruction", instructionsMatrix);
        // await sendTransaction(transaction, conn);
        const txns = (await sendTransactions(conn, wallet, instructionsMatrix, signersMatrix,)).txs.map(t => t.txid);

        const sendTxId = txns[0];

        // console.log(txns);

        let status: any = await awaitTransactionSignatureConfirmation(
          sendTxId,
          txTimeoutInMilliseconds,
          conn,
          true,
        );

        // console.log("status", status);
        // await getAllInfo();
        // console.log(poolState);
        let newRaisedAmount = Number(poolState.raised) + Number(amount);
        setPoolState({
          ...poolState,
          raised: Number(newRaisedAmount.toFixed(2))
        })

        // console.log("deposit success");
        return {
          state: status,
          error: null,
        }
      }
    } catch (err: any) {
      // setDepositingFlag(true);
      // console.log("transaction error", err.InstructionError[1].Custom);
      // const temp = getErrorMessage(err.InstructionError[1].Custom);
      // console.log(temp);
      // const error = getErrorMessage(err.InstructionError[1].Custom);
      // if(!error) {

      // }
      console.log(err);
      return {
        state: false,
        error: getErrorMessage(err.InstructionError[1].Custom)
      }
    }
  }

  return (
    <PersonalInfoContext.Provider
      value={{
        userBalance,
        poolState,
        contributeInfo,
        depositSol,
        getPoolStateData,
        getUserInfo
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};
