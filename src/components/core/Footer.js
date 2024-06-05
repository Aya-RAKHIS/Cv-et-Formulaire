import classes from './Footer.module.css';

const Footer = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className={classes.footer}>
      <p>
        Créé par : Aya et Fatima Zahra
      </p>
      <p>
        Édité par : RAKHIS et EL ABDI EL ALAOUI
      </p>
      <p>
        Dernière mise à jour : {currentDate}
      </p>
      <p>
        &copy; {new Date().getFullYear()} EMI. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
