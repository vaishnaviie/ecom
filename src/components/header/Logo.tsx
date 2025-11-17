const Logo = ({ logoUrl }: { logoUrl: string }) => {
  return (
    <img
      src={logoUrl}
      height="40px"
      width="40px"
      alt="logo"
      className="rounded"
    />
  );
};

export default Logo;
