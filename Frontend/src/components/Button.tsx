interface Props {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ text, onClick, type = 'button', disabled = false }: Props) {
  return (
    <div className="flex justify-center items-center gap-12 h-full">
      <div
        className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]"
      >
        <button
          onClick={() => onClick && onClick()}
          type={type}
          disabled={disabled}
          className="group p-[4px] rounded-[12px] hover:bg-gray-300 hover:transition-all ease-linear duration-300 bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
        >
          <div
            className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2"
          >
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm">{text}</span>
            </div>
          </div>
        </button>
      </div>
    </div>

  )
}
