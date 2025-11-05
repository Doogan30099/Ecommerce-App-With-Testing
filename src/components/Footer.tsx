const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
      <p className="text-muted text-center mt-auto small mb-0 ">
        Built using React, Redux Toolkit, and React Query.
      </p>
    </footer>
  );
};

export default Footer;
