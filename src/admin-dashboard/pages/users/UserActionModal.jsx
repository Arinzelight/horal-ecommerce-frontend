import { useState } from "react"
import { FiX, FiAlertTriangle } from "react-icons/fi"

export function ActivateUserModal({ isOpen, onClose, user, onConfirm }) {
  const [notifyByEmail, setNotifyByEmail] = useState(true)

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(user, { notifyByEmail })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 items-center justify-center  overflow-y-auto">
      <div className="bg-white rounded-[4px] shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Activate User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-[12px]">
          You are about to reactivate this user's account. They will be able to
          log in and use Hiral's platform immediately.
        </p>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700 text-[12px]">Notify user by email</span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-[100px] h-[33px] px-4  border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-[132px] h-[33px] px-4 bg-primary text-white rounded-sm hover:opacity-85 disabled:opacity-50"
          >
            Activate User
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeactivateUserModal({ isOpen, onClose, user, onConfirm }) {
  const [reason, setReason] = useState("")
  const [notifyByEmail, setNotifyByEmail] = useState(true)
  const [preventLogin, setPreventLogin] = useState(true)

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(user, { reason, notifyByEmail, preventLogin })
    onClose()
    setReason("")
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 items-center justify-center  overflow-y-auto">
      <div className="bg-white rounded-[4px] p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deactivate User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for deactivation"
            className="w-full bg-neutral-200 h-[50px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Notify user by email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preventLogin}
              onChange={(e) => setPreventLogin(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Prevent user from logging in
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-[100px] h-[33px] px-4 border border-gray-300 rounded-[4px] text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="w-[134px] h-[33px] px-4 text-[12px]  bg-error text-white rounded-[4px] hover:opacity-85 disabled:opacity-50"
          >
            Deactivate User
          </button>
        </div>
      </div>
    </div>
  );
}

export function BanUserModal({ isOpen, onClose, user, onConfirm }) {
  const [reason, setReason] = useState("")
  const [notifyByEmail, setNotifyByEmail] = useState(true)

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(user, { reason, notifyByEmail })
    onClose()
    setReason("")
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 items-center justify-center  overflow-y-auto">
      <div className="bg-white rounded-[4px] p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Ban User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center mb-4 p-3 bg-[#F4C4C4]">
          <FiAlertTriangle className="h-5 w-5  mr-2" />
          <p className="text-xs">
            This action will permanently block this user from having access to
            Hiral's platform. You can still view their archived data.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason <span className="text-red-500">*</span>

          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for deactivation"
            className="w-full h-[50px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Notify user by email</span>
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-[100px] h-[33px] px-4 border border-gray-300 rounded-[4px] text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="w-[134px] h-[33px] px-4 text-[12px]  bg-error text-white rounded-[4px] hover:opacity-85 disabled:opacity-50"
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}
