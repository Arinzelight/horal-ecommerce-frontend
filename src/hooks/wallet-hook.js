import React from 'react'
import api from '../utils/api'

const useWallet = () => {
    //fetch all bank
    const fetchBanks = async () => {
        try {
            const response = await api.get("/dashboard/seller/wallet/banks/");
            return response.data.data || []
        } catch (error) {
            console.error('Error fetching bank information:', error)
            throw error
        }
    }

    //fetch all transactions
    const fetchTransactions = async () => {
        try {
            const response = await api.get("/dashboard/seller/wallet/transaction/");
            return response.data.data || {};
        } catch (error) {
            console.error('Error fetching transaction information:', error)
            throw error
        }
    }

    //verify sellers bank
    const verifySellerBank = async ({bankData}) => {
        try {
            const response = await api.post(`/dashboard/seller/wallet/verify-bank/`, bankData);
            return response.data.account_name || null;
        } catch (error) {
            console.error('Error verifying seller bank:', error)
            throw error
        }
    }

    //initiate withdrawal
    const initiateWithdrawal = async () => {
        try {
            const response = await api.get(
              `/dashboard/seller/wallet/initiate-withdrawal/`
            );
            return response.data.data || null;
        } catch (error) {
            console.error('Error initiating withdrawal:', error)
            throw error
        }
    }

    //withdraw funds
    const withdrawFunds = async () => {
        try {
            const response = await api.post(`/dashboard/seller/wallet/withdraw/`);
            return response.data.data || null;
        } catch (error) {
            console.error('Error withdrawing funds:', error)
            throw error
        }
    }

  return (
    {
      fetchBanks,
      fetchTransactions,
      withdrawFunds,
      verifySellerBank,
      initiateWithdrawal
    }
  )
}

export default useWallet
