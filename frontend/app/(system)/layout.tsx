import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default async function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt-token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3 d-flex flex-column">
            <div className="flex-grow-1">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
