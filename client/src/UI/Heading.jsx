const Heading = ({ children, className }) => {
  return (
    <h1 className={`text-3xl uppercase font-bold ${className}`}>{children}</h1>
  );
};

export default Heading;
