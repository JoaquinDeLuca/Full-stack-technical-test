import { Loading } from "./Loading";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  questionText: string;
  isloading: boolean
}

export function AlertModal({ isOpen, onClose, onConfirm, questionText, isloading }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h3 className="text-lg text-center font-semibold text-gray-800 mb-5 text-balance">{questionText}</h3>
        <div className="flex justify-center space-x-4">
          {!isloading ? (
            <>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 font-medium hover:bg-gray-400 transition duration-200"
              >
                No
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white rounded-md px-4 py-2 font-medium hover:bg-red-600 transition duration-200"
              >
                Sí
              </button>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
