import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <p>© 2025 - All rights reserved</p>
        <div className={styles.social}>
          <a
            href="https://github.com/marcomonteirobrito"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/marco-antonio-monteiro-de-brito-541ba0144/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
