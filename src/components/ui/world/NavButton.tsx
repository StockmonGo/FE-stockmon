import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  type: "books" | "alliances" | "profile";
};

export default function NavButton({ children, type }: Props) {
  const router = useRouter();
  return (
    <button className={`flex justify-center items-center w-1/3 min-h-16`} onClick={() => router.push(`/${type}`)}>
      {children}
    </button>
  );
}
