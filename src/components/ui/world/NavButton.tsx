type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

export default function NavButton({ onClick: click, children }: Props) {
  return (
    <button className={`flex justify-center items-center w-1/3 min-h-16`} onClick={click}>
      {children}
    </button>
  );
}
