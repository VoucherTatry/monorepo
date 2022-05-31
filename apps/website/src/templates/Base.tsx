import { Navbar } from '../components/navigation/Navbar';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Footer } from './Footer';

const Base = ({
  children,
  title = AppConfig.title,
  description = AppConfig.description,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-stone-50 text-stone-600 antialiased">
    <Meta title={title} description={description} />
    <Navbar />
    {children}
    <Footer />
  </div>
);

export { Base };
