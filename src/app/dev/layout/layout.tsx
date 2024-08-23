import BtnClose from "@/components/ui/BtnClose";
import CommonLayout from "@/components/ui/CommonLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonLayout
      title={"test"}
      header={
        <>
          <h2 className="text-center text-stock-dark-800 text-xl font-bold py-2">
            검색할게요
          </h2>
          <BtnClose />
        </>
      }
    >
      {children}
    </CommonLayout>
  );
}
