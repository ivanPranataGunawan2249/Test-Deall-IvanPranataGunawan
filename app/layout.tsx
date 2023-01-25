import "../styles/globals.css";
import Sidebar from "./(components)/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <div className="md:flex min-h-screen relative">
          <Sidebar />
          <div className="w-full p-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
