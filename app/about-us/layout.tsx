export const metadata = {
  title: 'About Us',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      &copy; NextJS is Great!
    </div>
  );
}
