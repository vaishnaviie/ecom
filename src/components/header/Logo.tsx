const Logo = ({ logoUrl }: { logoUrl: string }) => {
  return (
    <div>
      <img
        src={logoUrl}
        height="40px"
        width="40px"
        alt="logo"
        className="rounded"
      />
    </div>
  );
};

export default Logo;
