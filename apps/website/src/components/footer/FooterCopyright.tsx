import { AppConfig } from '../../utils/AppConfig';
import FooterCopyrightClassNames from './FooterCopyright.module.css';

const FooterCopyright = () => (
  <div className={FooterCopyrightClassNames['footer-copyright']}>
    © Copyright {new Date().getFullYear()} {AppConfig.title}.{' '}
    {/* Powered with{' '}
    <span role="img" aria-label="Love">
      ♥
    </span>{' '}
    by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a> */}
  </div>
);

export { FooterCopyright };
