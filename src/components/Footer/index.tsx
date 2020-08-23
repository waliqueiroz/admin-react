import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <strong>Copyright &copy; 2014-2020.</strong>
      Todos os direitos reservados.
      <div className="float-right d-none d-sm-inline-block">
        <b>Versão</b>
        0.0.1
      </div>
    </footer>
  );
};

export default Footer;
